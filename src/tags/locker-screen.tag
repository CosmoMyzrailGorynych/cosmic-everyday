locker-screen
    .dimmer.flexcol(if="{active}")
        .grow
        form(method="post" onsubmit="{checkPasscode}").nogrow
            h1 {voc.inputLocalPasscode}
            input.aPassInput(type="password" ref="passcode")
            .magenta(if="{error}") {voc.incorrectPasscode}
            button.wide(type="submit")
                i.icon-check
                span {voc.check}
        .grow

    script.
        this.voc = window.vocabulary.locker;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.locker;
        });

        this.active = 'entryHash' in localStorage;
        this.checkPasscode = e => {
            e.preventDefault();
            const crypto = require('crypto');
            const hash = crypto.createHash('sha256');
            hash.update(this.refs.passcode.value + 'console.table');
            if (hash.digest('hex') === localStorage.entryHash) {
                this.active = false;
                this.error = false;
            } else {
                this.error = true;
            }
        };

        window.signals.on('lockScreen', () => {
            this.active = true;
            this.update();
        });
