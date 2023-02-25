(function() {
    'use strict';

    console.log('enabled.')

    const open_old = window.open
    window.open = function open() {
        return new Proxy(
            open_old.apply(this, arguments), {
                get(target, prop, _receiver) {
                    if (prop === "location") {
                        return new Proxy(target[prop], {
                            set(target, prop, value) {
                                console.log(target, prop, value, window.location.href)
                                if(prop === 'href' && value === 'https://clips.twitch.tv/clips/500' && window.location.href === "https://www.twitch.tv/nokduro")
                                    value = 'https://minbird.kr/clipmaker/nokduro';
                                return target[prop] = value
                            }
                        })
                    }
                    return target[prop];
                },
            }
        );
    }
})();
