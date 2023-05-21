function start() {
  chrome.storage.local.get('config', function (res) {
    if ('config' in res) {
      if (res.config.status) {
        // on

        let matched = false;
        for (let item of res.config.rules) {
          const patterns = item.patterns.map(function (item) {
            return new RegExp(item);
          });
          for (let pattern of patterns) {
            if (pattern.test(location.href)) {
              matched = true;
              executeScript({
                code: `
                (function () {
                  function clear() {
                    const elements = document.getElementsByTagName('*');
                    Array.prototype.forEach.call(elements, function (item) {
                      ${item.events
                        .map(function (item) {
                          return `item.on${item}=null;\n`;
                        })
                        .join('')}
                    });
                  }
                  window.addEventListener('load', function () {
                    clear();
                    setTimeout(clear, 5e3);
                    setInterval(clear, 15e3);
                  });

                  const _addEventListener = EventTarget.prototype.addEventListener;
                  EventTarget.prototype.addEventListener = function (type) {
                    switch (type) {
                        ${item.events
                          .map(function (item) {
                            return `case '${item}':\n`;
                          })
                          .join('')}
                        break;
                      default:
                        _addEventListener.apply(this, arguments);
                        break;
                    }
                  };
                })();
                `,
              });
              break;
            }
          }
          if (matched) {
            break;
          }
        }
      }
    }
  });
}

function executeScript(details) {
  const temp = document.createElement('script');
  temp.textContent = details.code;
  document.documentElement.insertBefore(
    temp,
    document.documentElement.firstChild
  );
  temp.remove();
}

// start
start();
