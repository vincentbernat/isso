define(["app/config", "app/i18n/en", "app/i18n/fr"],
       function(config, en, fr) {

    "use strict";

    var pluralforms = function(lang) {
        switch (lang) {
        case "en":
            return function(msgs, n) {
                return msgs[n === 1 ? 0 : 1];
            };
        case "fr":
            return function(msgs, n) {
                return msgs[n > 1 ? 1 : 0];
            };
        default:
            return null;
        }
    };

    // useragent's prefered language (or manually overridden)
    var lang = config.lang;

    // fall back to English
    if (! pluralforms(lang)) {
        lang = "en";
    }

    var catalogue = {
        en: en,
        fr: fr
    };

    var plural = pluralforms(lang);

    var translate = function(msgid) {
        return config[msgid + '-text-' + lang] ||
          catalogue[lang][msgid] ||
          en[msgid] ||
          "???";
    };

    var pluralize = function(msgid, n) {
        var msg;

        msg = translate(msgid);
        if (msg.indexOf("\n") > -1) {
            msg = plural(msg.split("\n"), (+ n));
        }

        return msg ? msg.replace("{{ n }}", (+ n)) : msg;
    };

    return {
        lang: lang,
        translate: translate,
        pluralize: pluralize
    };
});
