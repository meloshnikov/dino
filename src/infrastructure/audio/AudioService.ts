/**
 * @class AudioService
 * @description Управляет загрузкой и воспроизведением звуковых эффектов.
 */
export class AudioService {
  private sounds: Map<string, HTMLAudioElement> = new Map();

  /**
   * @method loadSound
   * @description Загружает звуковой файл и сохраняет его для последующего использования.
   * @param {string} name - Имя-ключ для звука.
   * @param {string} url - Путь к звуковому файлу.
   */
  loadSound(name: string, url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.oncanplaythrough = () => {
        this.sounds.set(name, audio);
        resolve();
      };
      audio.onerror = (err) => {
        console.error(`Failed to load sound: ${name} at ${url}`);
        reject(err);
      };
    });
  }

  /**
   * @method playSound
   * @description Воспроизводит загруженный звук.
   * @param {string} name - Имя звука для воспроизведения.
   */
  playSound(name: string) {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.error(`Error playing sound: ${name}`, err));
    } else {
      console.warn(`Sound not found: ${name}`);
    }
  }
}
