import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAuthResponse, IHttpOptions } from '../../common/interfaces';
import { ContentType, ENV, HttpMethod } from '../../common/enums';

const BASE_URL = ENV.API_PATH;

class HttpService {
  private $api = axios.create({
    baseURL: BASE_URL,
  });

  constructor() {
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  public async load<T>(url: string, options: IHttpOptions): Promise<T> {
    const defaultOptions: IHttpOptions = {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      hasAuth: false,
      payload: undefined,
      withCredentials: true, // Makes Axios send cookies in its requests automatically
    };

    const requestOptions: IHttpOptions = {
      ...defaultOptions,
      ...options,
    };

    const request = {
      url,
      method: requestOptions.method,
      responseType: requestOptions.contentType,
      data: requestOptions.payload,
      withCredentials: requestOptions.withCredentials,
      headers: requestOptions.headers,
    } as AxiosRequestConfig;

    try {
      const response = await this.$api.request(request);
      return response.data as T;
    } catch (e: any) {
      throw e;
    }
  }

  private initializeRequestInterceptor() {
    this.$api.interceptors.request.use((config: AxiosRequestConfig) => {
      if (config.headers) {
        config.headers.Authorization = this.getAuthorizationHeader();
      }

      return config;
    });
  }

  private initializeResponseInterceptor() {
    this.$api.interceptors.response.use(
      (config: AxiosResponse) => {
        return config;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
          originalRequest._isRetry = true;
          try {
            const response = await axios.get<IAuthResponse>(`${BASE_URL}/auth/refresh`, {
              withCredentials: true,
            });
            this.setAccessToken(response.data.accessToken);
            return this.$api.request(originalRequest);
          } catch (e) {
            console.log('Не авторизований');
          }
        }
        throw error;
      },
    );
  }

  private getAuthorizationHeader(): string {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  private setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }
}

export default HttpService;
