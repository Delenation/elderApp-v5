import { Preferences } from '@capacitor/preferences';

class PreferencesService {
  static async set(key: string, value: any): Promise<void> {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  };

  static async get<T>(key: string): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    if (value) {
      try {
        return JSON.parse(value) as T;
      }
      catch (error) {
        console.error('[error]Failed in Analyzing Data:', error);
      }
    }
    return null;
  };

  static async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  };

  static async clear(): Promise<void> {
    await Preferences.clear();
  };
}

export default PreferencesService;
