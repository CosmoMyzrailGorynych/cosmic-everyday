(function () {
    /* global chrome */

    var pipeToStderr = err => {
        if (err instanceof Error) {
            process.stderr.write(`\n[!!! Cosmic Everyday runtime error] ${err.message}\n${err.stack}\n`);
        } else {
            process.stderr.write(`\n[!!! Cosmic Everyday runtime error] ${err.toString()}\nCall stack info not available.\n`);
        }
    };

    window.DBError = err => {
        window.sounds.play('error', () => {
            chrome.tts.speak('Database error', {rate: Number(localStorage.readSpeedTitles)});
        });
        console.error(err);
        pipeToStderr(err);
        return chrome.notifications.create({
            type: 'basic',
            title: 'Database error',
            message: err.toString(),
            iconUrl: 'data/icons/Warning.png'
        });
    };
    window.GenericError = (err, title) => {
        window.sounds.play('error', () => {
            chrome.tts.speak(title? title : 'Generic error', {rate: Number(localStorage.readSpeedTitles)});
        });
        console.error(err);
        pipeToStderr(err);
        return chrome.notifications.create({
            type: 'basic',
            title: title? title : 'Generic error',
            message: err.toString(),
            iconUrl: 'data/icons/Warning.png'
        });
    };
    window.GenericSuccess = (text, title) => {
        window.sounds.play('notify', () => {
            chrome.tts.speak(title? title : 'Success', {rate: Number(localStorage.readSpeedTitles)});
        });
        return chrome.notifications.create({
            type: 'basic',
            title: title? title : 'Success',
            message: text.toString(),
            iconUrl: 'data/icons/ThumbsUp.png'
        });
    };
})();
