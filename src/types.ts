export type InvalidGetResponse = {
 details: { path: string; 'content-type': string; 'user-agent': string };
 error: true;
 message: string;
 time: number;
};

export type ValidGetResponse = { link: string; error: false; time: number };

export type GetAPIResponse = InvalidGetResponse | ValidGetResponse;

export type InvalidListResponse = {
 details: {
  path: string;
  'content-type': string;
  'user-agent': string;
 };
 error: true;
 message: string;
 time: number;
};

export type ValidListResponse = {
 links: string[];
 error: false;
 time: number;
};

export type ListAPIResponse = InvalidListResponse | ValidListResponse;

export type Categories<N extends boolean> = {
 false: SFWCategories;
 true: NSFWCategories;
}[`${N}`];

export type ValidOwoifyResponse = { text: string; error: false };

export type InvalidOwoifyResponse = {
 details: {
  path: string;
  'content-type': string;
  'user-agent': string;
 };
 message: string;
 error: true;
};

export type OwoifyAPIResponse = InvalidOwoifyResponse | ValidOwoifyResponse;

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
  | 'tickle'
  | 'lay';
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
  | 'yuri'
  | 'solo_male';
};
