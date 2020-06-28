/* eslint-disable no-underscore-dangle */
(function (window) {

    window.localStorage.readSpeedTitles = window.localStorage.readSpeedTitles || 1.25;
    window.localStorage.readSpeedContent = window.localStorage.readSpeedContent || 1.75;
    window.localStorage.activeComponents = window.localStorage.activeComponents || JSON.stringify([
        'jumble-switcher',
        'time-tracker',
        'calendar-panel',
        'painter-panel'
    ]);
    window.localStorage.homepageWidgets = window.localStorage.homepageWidgets || JSON.stringify([
        'calendar-homepage',
        'tasks-mini-homepage',
        'tasks-homepage',
        'kanban-homepage'
    ]);

    window.___extend = function(destination, source) {
        for (var property in source) {
            if (destination[property] &&
                typeof destination[property] === 'object' &&
                destination[property].toString() === '[object Object]' &&
                source[property]
            ) {
                window.___extend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    };

    window.getWeek = date => {
        var onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    /* global SoundBox moment */

    window.delphiCase = function (strings) {
        if (!Array.isArray(strings)) {
            strings = [strings];
        }
        return strings.map(string => {
            if (!string.length) {return '';}
            return string[0].toUpperCase() + string.slice(1);
        }).join('');
    };
    const moment = require('moment');
    window.getDateColor = date => {
        if (moment(date).isBefore(moment())) { return window.colorPalette.grey;}
        if (moment(date).isBefore(moment().add(1,'day'))) { return window.colorPalette.red;}
        if (moment(date).isBefore(moment().add(2,'day'))) { return window.colorPalette.orange;}
        if (moment(date).isBefore(moment().add(3,'day'))) { return window.colorPalette.yellow;}
        return window.colorPalette.green;
    };
    window.generateUUID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // eslint-disable-next-line no-bitwise
            var r = Math.random()*16|0,
                // eslint-disable-next-line 
                v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
    (function() {
        if (!('deviceId' in localStorage)) {
            localStorage.deviceId = window.generateUUID();
        }
    })();
    window.urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    window.resizeImage = (src, opts, cb) => {
        const orig = document.createElement('canvas'),
            img = document.createElement('img');
        img.onload = () => {
            let width, height;
            if (opts.width && opts.height) {
                [width, height] = [opts.width, opts.height];
            } else if (opts.width) {
                ({width} = opts);
                height = img.height / img.width * opts.width;
            } else if (opts.height) {
                ({height} = opts);
                width = img.width / img.height * opts.height;
            }
            orig.width = Math.ceil(width);
            orig.height = Math.ceil(height);
            orig.getContext('2d').drawImage(img, 0, 0, width, height);
            const data = orig.toDataURL().replace(/^data:image\/\w+;base64,/, '');
            cb(new Buffer(data, 'base64'));
        };
        img.src = src;
    };

    window.sounds = new SoundBox();
    window.sounds.load('error', 'data/sounds/Error.wav');
    window.sounds.load('notify', 'data/sounds/Notify.wav');
    window.sounds.load('remove', 'data/sounds/Remove.wav');
    window.sounds.load('warning', 'data/sounds/Warning.wav');

    const formatIcons = [
        {
            icon: 'file-text',
            formats: ['doc', 'txt', 'rtf', 'docx', 'md', 'markdown', 'mdown', 'pdf']
        }, {
            icon: 'image',
            formats: ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'tiff', 'psd', 'webp', 'ai']
        }, {
            icon: 'volume-2',
            formats: ['wav', 'mp3', 'ogg', 'flac', 'pcm', 'aiff', 'aac', 'wma', 'alac']
        }, {
            icon: 'code',
            formats: ['html', 'css', 'styl', 'sass', 'scss', 'js', 'cs', 'c', 'cpp', 'h', 'htm', 'pug', 'json', 'ini', 'bat', 'sh', 'ini']
        }, {
            icon: 'film',
            formats: ['avi', 'mp4', 'mkv', '3gp', 'webm', 'flv', 'mov', 'wmv', 'mpg', 'mpeg', 'm4v']
        }
    ];
    window.getFileIcon = ext => {
        ext = ext.toLowerCase().slice(1);
        for (let i = 0, l = formatIcons.length; i<l; i++) {
            if (formatIcons[i].formats.indexOf(ext) !== -1) {
                return formatIcons[i].icon;
            }
        }
        return 'file';
    };

    window.getTimeString = seconds => {
        var str = '';
        if (seconds > 60 * 60 * 24) {
            str += `${Math.floor(seconds / (60 * 60 * 24))}d `;
        }
        if (seconds > 60 * 60) {
            str += `${Math.floor((seconds / (60 * 60) % 24))}h `;
        }
        if (seconds > 60) {
            str += `${Math.floor((seconds / 60) % 60)}m `;
        }
        str += `${seconds % 60}s `;
        return str;
    };

    var emojis = ['📕', '📗', '📘', '📙', '📓', '📔', '📒'];
    window.getRandomBoardEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
})(this);
