import {environment} from '../environments/environment';

/**
 * Settings that are independent to the environment (prod/dev/test)
 */
export class Settings {
  public static APP_NAME = 'File Quota Control';
  public static API_URL = environment.backendAPIHost;
  public static VERSION = '0.1.0';
  public static COMPANY = '-';
  public static DEFAULT_LANGUAGE = environment.defaultLanguage;
  public static AUTHENTICATION = 'FQC_AUTHENTICATION';
}
