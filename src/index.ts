import fetch from 'node-fetch';

export type SFWCategories<T extends 'img' | 'gif'> = {
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
}[T];

export type NSFWCategories<T extends 'img' | 'gif'> = {
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
}[T];

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

function list<T extends 'gif' | 'img', N extends true>(
 imgType: T,
 nsfw: N,
 category: NSFWCategories<T>,
): Promise<string[]>;
function list<T extends 'gif' | 'img', N extends false>(
 imgType: T,
 nsfw: N,
 category: SFWCategories<T>,
): Promise<string[]>;
async function list<T extends 'gif' | 'img', N extends boolean>(
 imgType: T,
 nsfw: N,
 category: NSFWCategories<T> | SFWCategories<T>,
): Promise<string[]> {
 const res = (await fetch(`${baseURL}/list/${nsfw ? 'nsfw' : 'sfw'}/${category}${imgType}`).then(
  (r) => r.json(),
 )) as ListAPIResponse;

 if (res.error) throw new Error(res.message);
 return res.links;
}

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

function get<T extends 'gif' | 'img', N extends true>(
 imgType: T,
 nsfw: N,
 category: NSFWCategories<T>,
): Promise<string>;
function get<T extends 'gif' | 'img', N extends false>(
 imgType: T,
 nsfw: N,
 category: SFWCategories<T>,
): Promise<string>;
async function get<T extends 'gif' | 'img', N extends boolean>(
 imgType: T,
 nsfw: N,
 category: NSFWCategories<T> | SFWCategories<T>,
): Promise<string> {
 const res = (await fetch(`${baseURL}/img/${nsfw ? 'nsfw' : 'sfw'}/${category}/${imgType}`).then(
  (r) => r.json(),
 )) as GetAPIResponse;

 if (res.error) throw new Error(res.message);
 return res.link;
}

export default { list, get };
