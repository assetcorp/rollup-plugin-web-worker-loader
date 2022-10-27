import {createURLSharedWorkerFactory as browserCreateURLSharedWorkerFactory} from '\0rollup-plugin-web-worker-loader::helper::browser::createURLSharedWorkerFactory';
import {isNodeJS} from '\0rollup-plugin-web-worker-loader::helper::auto::isNodeJS';

export function createURLSharedWorkerFactory(url) {
    if (isNodeJS()) {
        // throw new Error('rollup-plugin-web-worker-loader does not support Shared Worker in Node.JS');
        // Fail silently
        // This ensures that systems (like NextJS) who support SSR would silently execute SharedWorker
        // without failing
        return function WorkerFactory(options) {
            let SharedWorker = {
                port: {
                    start: () => {},
                    onmessage: () => {},
                    onmessageerror: () => {},
                },
            };
            return SharedWorker;
        };
    }
    return browserCreateURLSharedWorkerFactory(url);
}
