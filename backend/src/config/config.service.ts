class ConfigService {
  private static instance: ConfigService;

  public get<T>(value: string): T {
    return process.env[value] as unknown as T;
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }

    return ConfigService.instance;
  }
}

export default ConfigService;
