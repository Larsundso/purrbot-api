import { Categories, GetAPIResponse, ListAPIResponse } from 'types';

export const baseURL = 'https://purrbot.site/api';

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
export const get = async <T extends keyof Categories<N>, N extends boolean>(
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
export const list = async <T extends keyof Categories<N>, N extends boolean>(
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
