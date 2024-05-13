import { DataHelper } from './data.util';

export class StorageSet<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  get = (fallbackValue?: any): T | null => {
    const storedValue = localStorage.getItem(this.key);
    if (storedValue) {
      try {
        return DataHelper.isJson(storedValue)
          ? (JSON.parse(storedValue) as T)
          : (storedValue as T);
      } catch (error) {
        console.error(
          `Error parsing stored data for key '${this.key}':`,
          error
        );
        return fallbackValue;
      }
    }
    return fallbackValue;
  };

  set = (data: T): void => {
    try {
      let dataToWrite: string;
      if (typeof data === 'object') {
        dataToWrite = JSON.stringify(data);
      } else {
        dataToWrite = data as string;
      }
      localStorage.setItem(this.key, dataToWrite);
    } catch (error) {
      console.error(`Error storing data for key '${this.key}':`, error);
    }
  };

  clear = (): void => {
    localStorage.removeItem(this.key);
  };
}
