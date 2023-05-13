# Purrbot.site API Wrapper

An up-to-date unofficial Wrapper for the [purrbot.site](https://purrbot.site/) API
100% API Coverage
100% TypeScript Coverage
100% JSDoc Coverage

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
```

#### Options

```
imgType: either `img` or `gif`
nsfw: boolean
category: string
```

<br>

## Support

If you need Help, please contact me at [Discord](https://discord.gg/euTdctganf) or open an Issue on [GitHub](https://github.com/Larsundso/purrbot-api/issues)

<br>

## Contributing

I will happily accept your Pull-Request if it:

- looks reasonable
- does not break backwards compatibility
