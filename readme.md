# Purrbot.site API Wrapper

The [official](https://discord.com/channels/423771795523371019/544511526908854272/1322284870889635892)™️ Wrapper for the [purrbot.site](https://purrbot.site/) API
<br /><br />
100% API Coverage<br />
100% TypeScript Coverage<br />
100% JSDoc Coverage<br />

## Getting started

```js
import PurrBot from 'purrbot-api';

PurrBot.get('img', false, 'neko'); // returns Promise<string>
PurrBot.list('gif', false, 'neko'); // returns Promise<string[]>

PurrBot.sfw.get('gif', 'neko'); // returns Promise<string>
PurrBot.sfw.list('gif', 'neko'); // returns Promise<string[]>
PurrBot.sfw.gif.get('neko'); // returns Promise<string>
PurrBot.sfw.gif.list('neko'); // returns Promise<string[]>
PurrBot.sfw.img.get('neko'); // returns Promise<string>
PurrBot.sfw.img.list('neko'); // returns Promise<string[]>
PurrBot.sfw.categories.neko('gif'); // returns Promise<string>
PurrBot.sfw.categories.senko(); // returns Promise<string>

// NSFW Categories have the same Syntax

PurrBot.owoify("Hello World!"); // returns Promise<string>
```

#### Options

NSFW / SFW Categories:
```
imgType: either `img` or `gif`
nsfw: boolean
category: string
```

Owoify:
```
text: string
```

<br>

## Support

If you need Help, please contact me at [Discord](https://discord.gg/euTdctganf) or open an Issue on [GitHub](https://github.com/Larsundso/purrbot-api/issues)

<br>

## Contributing

I will happily accept your Pull-Request if it:

- looks reasonable
- does not break backwards compatibility
