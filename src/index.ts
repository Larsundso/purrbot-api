import fetch from 'node-fetch';

export type SFWCategories = {
 img: 'background' | 'eevee' | 'holo' | 'icon' | 'kitsune' | 'neko' | 'okami' | 'senko' | 'shiro';
 gif:
  | 'bite'
  | 'blush'
  | 'comfy'
  | 'cry'
  | 'cuddle'
  | 'dance'
  | 'eevee'
  | 'fluff'
  | 'hug'
  | 'kiss'
  | 'lick'
  | 'neko'
  | 'pat'
  | 'poke'
  | 'slap'
  | 'smile'
  | 'tail'
  | 'kitsune'
  | 'tickle';
};

export type NSFWCategories = {
 img: 'neko';
 gif:
  | 'anal'
  | 'blowjob'
  | 'cum'
  | 'fuck'
  | 'neko'
  | 'pussylick'
  | 'solo'
  | 'threesome_fff'
  | 'threesome_ffm'
  | 'threesome_mmf'
  | 'yaoi'
  | 'yuri';
};

export const baseURL = 'https://purrbot.site/api';

type InvalidListResponse = {
 details: {
  path: string;
  'content-type': string;
  'user-agent': string;
 };
 error: true;
 message: string;
 time: number;
};

type ValidListResponse = {
 links: string[];
 error: false;
 time: number;
};

type ListAPIResponse = InvalidListResponse | ValidListResponse;

export type Categories<N extends boolean> = {
 false: SFWCategories;
 true: NSFWCategories;
}[`${N}`];

/**
 * @param imgType {string} `gif` or `img`
 * @param nsfw {boolean}
 * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
 * @returns {Promise<string[]>}
 * @example
 * import PurrBot from 'purrbot-api';
 * PurrBot.list('img', true, 'neko').then(console.log);
 * // => ['https://purrbot.site/img/xxx.jpg', 'https://purrbot.site/img/xxx.jpg', ...]
 */
const list = async <T extends keyof Categories<N>, N extends boolean>(
 imgType: T,
 nsfw: N,
 category: Categories<N>[T],
): Promise<string[]> => {
 const res = (await fetch(
  `${baseURL}/list/${nsfw ? 'nsfw' : 'sfw'}/${category}/${String(imgType)}`,
 ).then((r) => r.json())) as ListAPIResponse;

 if (res.error) throw new Error(res.message);
 return res.links;
};

type InvalidGetResponse = {
 details: {
  path: string;
  'content-type': string;
  'user-agent': string;
 };
 error: true;
 message: string;
 time: number;
};

type ValidGetResponse = {
 link: string;
 error: false;
 time: number;
};

type GetAPIResponse = InvalidGetResponse | ValidGetResponse;

/**
 * @param imgType {string} `gif` or `img`
 * @param nsfw {boolean}
 * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
 * @returns {Promise<string>}
 * @example
 * import PurrBot from 'purrbot-api';
 * PurrBot.get('img', true, 'neko').then(console.log);
 * // => https://purrbot.site/img/xxx.jpg
 */
const get = async <T extends keyof Categories<N>, N extends boolean>(
 imgType: T,
 nsfw: N,
 category: Categories<N>[T],
): Promise<string> => {
 const res = (await fetch(
  `${baseURL}/img/${nsfw ? 'nsfw' : 'sfw'}/${category}/${String(imgType)}`,
 ).then((r) => r.json())) as GetAPIResponse;

 if (res.error) throw new Error(res.message);
 return res.link;
};

const sfw = {
 /**
  * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
  * @param imgType {string} `gif` or `img`
  * @returns {Promise<string[]>}
  * @example
  * import PurrBot from 'purrbot-api';
  * PurrBot.sfw.list('img', 'neko').then(console.log);
  * // => ['https://purrbot.site/img/xxx.jpg', 'https://purrbot.site/img/xxx.jpg', ...]
  */
 list: <T extends keyof SFWCategories>(imgType: T, category: SFWCategories[T]): Promise<string[]> =>
  list(imgType, false, category),
 /**
  * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
  * @param imgType {string} `gif` or `img`
  * @returns {Promise<string>}
  * @example
  * import PurrBot from 'purrbot-api';
  * PurrBot.sfw.get('img', 'neko').then(console.log);
  * // => https://purrbot.site/img/xxx.jpg
  */
 get: <T extends keyof SFWCategories>(imgType: T, category: SFWCategories[T]): Promise<string> =>
  get(imgType, false, category),
 gif: {
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string[]>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.gif.list('neko').then(console.log);
   * // => ['https://purrbot.site/img/xxx.jpg', 'https://purrbot.site/img/xxx.jpg', ...]
   */
  list: (category: SFWCategories['gif']): Promise<string[]> => list('gif', false, category),
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.nsfw.gif.get('neko').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  get: (category: SFWCategories['gif']): Promise<string> => get('gif', false, category),
 },
 img: {
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string[]>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.img.list('neko').then(console.log);
   * // => ['https://purrbot.site/img/xxx.jpg', 'https://purrbot.site/img/xxx.jpg', ...]
   */
  list: (category: SFWCategories['img']): Promise<string[]> => list('img', false, category),
  /**
   * @param category {string} one of SFWCategories<T> or NSFWCategories<T> - see https://docs.purrbot.site/api/
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.img.get('neko').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  get: (category: SFWCategories['img']): Promise<string> => get('img', false, category),
 },
 categories: {
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.background().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  background: (): Promise<string> => get('img', false, 'background'),
  /**
   * @returns {Promise<string>}
   * @param imgType {string} `gif` or `img`
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.eevee('img').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  eevee: <T extends keyof SFWCategories>(imgType: T): Promise<string> =>
   get(imgType, false, 'eevee'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.holo().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  holo: (): Promise<string> => get('img', false, 'holo'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.icon().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  icon: (): Promise<string> => get('img', false, 'icon'),
  /**
   * @returns {Promise<string>}
   * @param imgType {string} `gif` or `img`
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.kitsune('img').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  kitsune: <T extends keyof SFWCategories>(imgType: T): Promise<string> =>
   get(imgType, false, 'kitsune'),
  /**
   * @returns {Promise<string>}
   * @param imgType {string} `gif` or `img`
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.neko('img').then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  neko: <T extends keyof SFWCategories>(imgType: T): Promise<string> => get(imgType, false, 'neko'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.okami().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  okami: (): Promise<string> => get('img', false, 'okami'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.senko().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  senko: (): Promise<string> => get('img', false, 'senko'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.shiro().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  shiro: (): Promise<string> => get('img', false, 'shiro'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.bite().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  bite: (): Promise<string> => get('gif', false, 'bite'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.blush().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  blush: (): Promise<string> => get('gif', false, 'blush'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.comfy().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  comfy: (): Promise<string> => get('gif', false, 'comfy'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.cry().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  cry: (): Promise<string> => get('gif', false, 'cry'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.cuddle().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  cuddle: (): Promise<string> => get('gif', false, 'cuddle'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.dance().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  dance: (): Promise<string> => get('gif', false, 'dance'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.fluff().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  fluff: (): Promise<string> => get('gif', false, 'fluff'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.hug().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  hug: (): Promise<string> => get('gif', false, 'hug'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.kiss().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  kiss: (): Promise<string> => get('gif', false, 'kiss'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.lick().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  lick: (): Promise<string> => get('gif', false, 'lick'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.pat().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  pat: (): Promise<string> => get('gif', false, 'pat'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.poke().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  poke: (): Promise<string> => get('gif', false, 'poke'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.slap().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  slap: (): Promise<string> => get('gif', false, 'slap'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.smile().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  smile: (): Promise<string> => get('gif', false, 'smile'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.tail().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  tail: (): Promise<string> => get('gif', false, 'tail'),
  /**
   * @returns {Promise<string>}
   * @example
   * import PurrBot from 'purrbot-api';
   * PurrBot.sfw.categories.tickle().then(console.log);
   * // => https://purrbot.site/img/xxx.jpg
   */
  tickle: (): Promise<string> => get('gif', false, 'tickle'),
 },
};

const nsfw = {
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
 },
};

export default { list, get, nsfw, sfw };
