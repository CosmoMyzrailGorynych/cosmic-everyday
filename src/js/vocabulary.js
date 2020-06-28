/* eslint-disable no-underscore-dangle */
(function (window) {
    'use strict';

    var lang;
    if ('appLanguage' in localStorage) {
        lang = localStorage.appLanguage;
    } else {
        localStorage.appLanguage = lang = 'En - English (English).json';
        localStorage.appLanguageCode = 'En';
    }
    setTimeout(() => {
        const moment = require('moment');
        moment.locale(localStorage.appLanguageCode.toLowerCase());
    }, 0);

    const fs = require('fs-extra');
    const vocDefault = fs.readJSONSync('./data/i18n/En - English (English).json');
    var voc;
    try {
        voc = fs.readJSONSync(`./data/i18n/${lang}`);
    } catch (e) {
        voc = vocDefault;
        localStorage.appLanguage = lang = 'En - English (English).json';
        localStorage.appLanguageCode = 'En';
    }
    window.vocabulary = window.___extend(vocDefault, voc);

    voc.global.swearings = window.vocabulary.global.swearings.split(',');
    window.protectSwearing = string => {
        for (let i = 0, l = voc.global.swearings.length; i < l; i++) {
            string.replace(new RegExp(`\\b${voc.global.swearings}\\b`,'gi'), voc.global.swearingReplacement);
        }
        return string;
    };
})(this);
