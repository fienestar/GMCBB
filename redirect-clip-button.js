(function() {
    'use strict';

    function isClipPage(uri) {
        return uri.startsWith('https://clips.twitch.tv/') && (
            uri.endsWith('/edit') ||
            uri.endsWith('/create') ||
            uri === 'https://clips.twitch.tv/clips/500' ||
            uri === 'https://clips.twitch.tv/clips/user_restricted'
        )
    }

    const open_old = window.open
    window.open = function open() {
        return new Proxy(
            open_old.apply(this, arguments), {
                get(target, prop, _receiver) {
                    if (prop === "location") {
                        return new Proxy(target[prop], {
                            set(target, prop, value) {
                                console.log(target, prop, value, window.location.href)
                                if(prop === 'href' && isClipPage(value) && window.location.href === "https://www.twitch.tv/nokduro")
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
