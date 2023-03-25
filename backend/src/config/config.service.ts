class ConfigService {
  private static instance: ConfigService;

  public get(value: string): string {
    return process.env[value];
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }

    return ConfigService.instance;
  }
}

export default ConfigService;
