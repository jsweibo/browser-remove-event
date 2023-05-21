function start() {
  chrome.storage.local.get('config', function (res) {
    if (!('config' in res)) {
      // writing settings will invoke chrome.storage.onChanged
      chrome.storage.local.set({
        config: DEFAULT_SETTINGS,
      });
    }
  });
}

chrome.browserAction.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});

chrome.storage.onChanged.addListener(function () {
  // restart
  start();
});

// start
start();
