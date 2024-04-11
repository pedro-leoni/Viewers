self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

const enableNavigatorSharedArrayBuffer = async () => {
  if (!navigator.userAgentData) {
    return;
  }

  const uaData = await navigator.userAgentData.getHighEntropyValues([
    'platform',
    'platformVersion',
    'architecture',
    'model',
    'uaFullVersion',
  ]);

  const navigatorUABrand = uaData.brands.find(brand => brand.brand === 'Google Chrome');

  if (navigatorUABrand) {
    const regExpResult = /^\d+\.\d+\.\d+\.\d+$/.exec(navigatorUABrand.version);
    const isVersionHigherThan99 = regExpResult
      ? regExpResult[0].split('.').slice(0, 2).join('') > '99'
      : false;

    if (isVersionHigherThan99) {
      const permissions = await navigator.permissions.query({
        name: 'cross-origin-isolated',
      });

      if (permissions.state === 'prompt') {
        await permissions.request();
      }
      if (permissions.state === 'granted') {
        self.crossOriginIsolated = true;
      }
    }
  }
};

enableNavigatorSharedArrayBuffer();
