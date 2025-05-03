import { OwoifyAPIResponse } from './types.js';
import { baseURL } from './util.js';

/**
 * @param text {string} text to owoify
 * @returns {Promise<string>}
 * @example
 * import PurrBot from 'purrbot-api';
 * PurrBot.owoify('Hello, world!').then(console.log);
 * // => 'Hewwo, wowwd!'
 */
export default async (text: string) => {
 const res = (await fetch(`${baseURL}/owoify`, {
  method: 'POST',
  body: JSON.stringify({ text }),
  headers: { 'Content-Type': 'application/json' },
 }).then((r) => r.json())) as OwoifyAPIResponse;

 if (res.error) throw new Error(res.message);
 return res.text;
};
