import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {IAuthResponse, IHttpOptions} from "../../common/interfaces";
import {ContentType, ENV, HttpCode, HttpMethod} from "../../common/enums";
import HttpException from "../../exceptions/HttpException";

class HttpService {
    private baseURL = ENV.API_PATH;
    private _unauthorizedInterceptorExecuted = false;

    public async load<T>(url: string, options: IHttpOptions): Promise<T> {

        const defaultOptions: IHttpOptions = {
            method: HttpMethod.GET,
            contentType: ContentType.JSON,
            hasAuth: false,
            payload: undefined,
            withCredentials: true // Makes Axios send cookies in its requests automatically
        }

        const requestOptions: IHttpOptions = {
            ...defaultOptions,
            ...options
        }

        const authorizationHeader = this.getAuthorizationHeader();
        requestOptions.headers = {...requestOptions.headers, "Authorization": authorizationHeader};

        const request = {
            url,
            method: requestOptions.method,
            responseType: requestOptions.contentType,
            data: requestOptions.payload,
            withCredentials: requestOptions.withCredentials,
            headers: requestOptions.headers
        } as AxiosRequestConfig;

        try {
            const response = await axios.request(request);
            return response.data as T;
        } catch (e: any) {
            if (e.response.status === HttpCode.UNAUTHORIZED) {
                await this.updateAccessToken();
                const newAuthorizationHeader = this.getAuthorizationHeader();
                request.headers = {...request.headers, "Authorization": newAuthorizationHeader};
                const response = await axios.request(request);
                return response.data as T;
            }
            throw e;
        }
    }

    private getAuthorizationHeader(): string {
        return `Bearer ${localStorage.getItem('token')}`
    }

    private async updateAccessToken(): Promise<void> {
        try {
            const response = await axios.get(`${this.baseURL}/auth/refresh`, {withCredentials: true})
            const responseData = response.data as IAuthResponse;
            localStorage.setItem('token', responseData.accessToken);
        } catch (e) {
            throw e;
        }
    }
}

export default HttpService;