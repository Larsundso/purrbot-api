import { OwoifyAPIResponse } from './types.js';
import { baseURL } from './util.js';

/**
 * @param text {string} text to owoify
 * @returns {Promise<string>}
 * @example
 * import PurrBot from 'purrbot-api';
 * PurrBot.owoify('Hello World!').then(console.log);
 * // => 'Hewwo Wowwd!'
 * PurrBot.owoify('Hello World!', { emoticons: true }).then(console.log);
 * // => 'Hewwo Wowwd x3'
 * PurrBot.owoify('I love you!', { replaceWords: true }).then(console.log);
 * // => 'I wuv you!'
 * PurrBot.owoify('Hello World!', { stutter: true }).then(console.log);
 * // => 'Hewwo W-Wowwd!'
 */
export default async (
 text: string,
 options?: { emoticons?: boolean; replaceWords?: boolean; stutter?: boolean },
) => {
 const res = (await fetch(`${baseURL}/owoify`, {
  method: 'POST',
  body: JSON.stringify({
   text,
   ...(options
    ? 'replaceWords' in options
      ? { ...options, 'replace-words': options.replaceWords }
      : options
    : {}),
  }),
  headers: { 'Content-Type': 'application/json' },
 }).then((r) => r.json())) as OwoifyAPIResponse;

 if (res.error) throw new Error(res.message);
 return res.text;
};
