import { NSFWCategories } from 'types.js';
import { get, list } from 'util.js';

export default {
 /**
  * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
  * @param imgType {string} `gif` or `img`
  * @returns {Promise<string[]>}
  * @example
  * import PurrBot from 'purrbot-api';
  * PurrBot.nsfw.list('img', 'neko').then(console.log);
  * // => ['https://purrbot.site/img/xxx.jpg', 'https://purrbot.site/img/xxx.jpg', ...]
  */
 list: <T extends keyof NSFWCategories>(
  imgType: T,
  category: NSFWCategories[T],
 ): Promise<string[]> => list(imgType, true, category),
 /**
  * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
  * @param imgType {string} `gif` or `img`
  * @returns {Promise<string>}
  * @example
  * import PurrBot from 'purrbot-api';
  * PurrBot.nsfw.get('img', 'neko').then(console.log);
  * // => https://purrbot.site/img/xxx.jpg
  */
 get: <T extends keyof NSFWCategories>(imgType: T, category: NSFWCategories[T]): Promise<string> =>
  get(imgType, true, category),
 gif: {
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string[]>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.gif.list('neko').then(console.log);
   * // => ['https://purrbot.site/img/xxx.jpg', 'https://purrbot.site/img/xxx.jpg', ...]
   */
  list: (category: NSFWCategories['gif']): Promise<string[]> => list('gif', true, category),
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.gif.get('neko').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  get: (category: NSFWCategories['gif']): Promise<string> => get('gif', true, category),
 },
 img: {
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string[]>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.img.list('neko').then(console.log);
   * // => ['https://purrbot.site/img/xxx.jpg', 'https://purrbot.site/img/xxx.jpg', ...]
   */
  list: (category: NSFWCategories['img']): Promise<string[]> => list('img', true, category),
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.img.get('neko').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  get: (category: NSFWCategories['img']): Promise<string> => get('img', true, category),
 },
 categories: {
  /**
   * @param imgType {string} `gif` or `img`
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.neko('img').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  neko: <T extends keyof NSFWCategories>(imgType: T): Promise<string> => get(imgType, true, 'neko'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.anal().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  anal: (): Promise<string> => get('gif', true, 'anal'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.blowjob().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  blowjob: (): Promise<string> => get('gif', true, 'blowjob'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.cum().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  cum: (): Promise<string> => get('gif', true, 'cum'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.fuck().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  fuck: (): Promise<string> => get('gif', true, 'fuck'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.pussylick().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  pussylick: (): Promise<string> => get('gif', true, 'pussylick'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.solo().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  solo: (): Promise<string> => get('gif', true, 'solo'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.threesome_fff().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  threesome_fff: (): Promise<string> => get('gif', true, 'threesome_fff'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.threesome_ffm().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  threesome_ffm: (): Promise<string> => get('gif', true, 'threesome_ffm'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.threesome_mmf().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  threesome_mmf: (): Promise<string> => get('gif', true, 'threesome_mmf'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.yaoi().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  yaoi: (): Promise<string> => get('gif', true, 'yaoi'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.yuri().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  yuri: (): Promise<string> => get('gif', true, 'yuri'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.categories.solo_male().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  solo_male: (): Promise<string> => get('gif', true, 'solo_male'),
 },
};
