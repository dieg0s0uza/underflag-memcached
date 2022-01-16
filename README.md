
# Memcached Provider

This is a Memcached provider for underflag (feature flag/feature toggle)

## Install

Using npm:

```bash
npm install underflag-memcached
```

Using yarn:

```bash
yarn add underflag-memcached
```

## How to use

Import the underflag and prepare to load data provider

```js
import { Underflag, JsonDataProvider } from "underflag";
import { MemcachedDataProvider } from "underflag-memcached";
import memjs from 'memjs';

// memcached cache provider
const client = memjs.Client.create();
const cacheProvider = new MemcachedCacheProvider({ client, lifetime: 60 });

const dataProvider = new JsonDataProvider({ data: { feature: true }});
const underflag = new Underflag({ dataProvider, cacheProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

_Attention: Do not forget of create the features collection in memcached with the key and value fields._

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)