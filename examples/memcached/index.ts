import { Underflag, JsonDataProvider } from 'underflag';
import { MemcachedCacheProvider } from '../../src/providers/MemcachedCacheProvider';
import memjs from 'memjs';
import config from './config.json';
import objData from './object.json';

const print = async (feature: Underflag, key: string) => {
    const data = await feature.getFeature(key);
    return {
        key,
        status: data?.isOn() ? 'on' : 'off',
        value: data?.value,
        origin: data?.origin
    };
};

(async () => {
    // config data provider
    const client = memjs.Client.create(config.memcachedUrl);

    // use data and cache provider
    const dataProvider = new JsonDataProvider({ data: objData });
    const cacheProvider = new MemcachedCacheProvider({ client, lifetime: 60 });
    const underflag = new Underflag({ dataProvider, cacheProvider });

    // check flags
    const list: any[] = [];
    for (const key of config.features) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);

    client.close();
})();