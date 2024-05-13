export class DataHelper {
  public static isJson(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}
