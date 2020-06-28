settings-panel
    h1 {voc.title}
    h2
        i.icon-translate
        span   {voc.language}
    .LanguageCards
        .aLanguageCard(each="{language in languages}" onclick="{switchLanguage(language.fname, language.code)}")
            b {language.code}
            span {language.native} ({language.eng})
        .spacer
            
    .clear

    h2
        i.icon-droplet
        span   {voc.theme}
    p
        label
            input(type="radio" name="UITheme" checked="{localStorage.UITheme === 'Cosmic'}" onchange="{applyTheme('Cosmic')}")
            span {voc.themeCosmic}
        label
            input(type="radio" name="UITheme" checked="{localStorage.UITheme === 'Dark'}" onchange="{applyTheme('Dark')}")
            span {voc.themeDark}
        label
            input(type="radio" name="UITheme" checked="{localStorage.UITheme === 'Light'}" onchange="{applyTheme('Light')}")
            span {voc.themeLight}

    h2
        i.icon-type
        span   {voc.font}
    p
        label
            input(type="radio" name="UIFont" checked="{localStorage.UIFont === 'lato'}" onchange="{applyFont('lato')}")
            span(style="font-family: Lato;") {voc.latoFont}
        label
            input(type="radio" name="UIFont" checked="{localStorage.UIFont === 'merriweather'}" onchange="{applyFont('merriweather')}")
            span(style="font-family: Merriweather;") {voc.merriweatherFont}
        label
            input(type="radio" name="UIFont" checked="{localStorage.UIFont === 'opendyslexic'}" onchange="{applyFont('opendyslexic')}")
            span(style="font-family: OpenDyslexic;") {voc.opendyslexicFont}
    

    h2 
        i.icon-volume-2
        span   {voc.readSpeed}
    span {voc.readSpeedTitles}
    div(ref="sliderReadSpeedTitles")
    span {voc.readSpeedContent}
    div(ref="sliderReadSpeedContent")
    
    h2 
        i.icon-monitor
        span   {voc.autoLaunch}
    p.npt {voc.autoLaunchInfo}
    p.npt {voc.autoLaunchStatus}: {autoLaunchTextStatus}.
    button(onclick="{toggleAutolaunch}") 
        span {autoLaunchEnabled? voc.disableAutoLaunch : voc.enableAutoLaunch}
    p
        label
            input(type="checkbox" ref="isLaunchMinimised" checked="{localStorage.ifLaunchMinimised}" onchange="{changeLaunchMinimised}")
            span {voc.ifLaunchMinimised}

    h2 
        i.icon-shield
        span   {voc.security}
    p {voc.passcode.passcodeInfo}
    p
        button(if="{!('entryHash' in localStorage)}" onclick="{beginSettingPasscode}")
            i.icon-lock
            span {voc.passcode.enablePasscode}
        button(if="{'entryHash' in localStorage}" onclick="{beginResettingPasscode}")
            i.icon-unlock
            span {voc.passcode.disablePasscode}
    modal-input(
        if="{isSettingPasscode}" 
        width="400" header="{voc.passcode.inputPasscode}"
        onapply="{doApplyLocalPasscode}" type="password" repeat="true"
    )
    modal-input(
        if="{isCheckingPasscode}"
        width="400" header="{voc.passcode.inputPasscode}"
        onapply="{doResetPasscode}" type="password"
    )
    
    h2 
        i.icon-clock
        span   {voc.timerSettings}
    label.npt
        p {voc.timerWorkTime}
        input.aTimeTrackerField(type="number" min="1" max="120" value="{localStorage.timerWorkTime}" onchange="{wire('timerWorkTime')}")
    label.npt
        p {voc.timerBreakTime}
        input.aTimeTrackerField(type="number" min="1" max="120" value="{localStorage.timerBreakTime}" onchange="{wire('timerBreakTime')}")
    label.npt
        p {voc.timerLongBreakTime}
        input.aTimeTrackerField(type="number" min="1" max="120" value="{localStorage.timerLongBreakTime}" onchange="{wire('timerLongBreakTime')}")

    h2
        i.icon-more-horizontal
        span   {voc.misc}
    p
        button(onclick="{rediscoverLostNotebooks}")
            i.icon-life-buoy
            span   {voc.rediscoverLostNotebooks}
    hr
    p
        button.magenta(onclick="{closeCE}")
            i.icon-log-out
            span   {voc.closeCE}

    script.
        const fs = require('fs-extra');
        this.voc = window.vocabulary.settings;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.settings;
            this.vocGlob = window.vocabulary.global;
        });

        const encode = function(string) {
            const crypto = require('crypto');
            const hash = crypto.createHash('sha256');
            hash.update(string + 'console.table');
            return hash.digest('hex');
        };
        this.doApplyLocalPasscode = code => {
            this.isSettingPasscode = false;
            if (code) {
                localStorage.entryHash = encode(code);
                window.signals.trigger('updateSwitcher'); // so that the lock button appears
            }
            this.update();
        };
        this.doResetPasscode = code => {
            this.isCheckingPasscode = false;
            if (!code) {
                this.update();
                return;
            }
            var candidate = encode(code);
            if (localStorage.entryHash === candidate) {
                delete localStorage.entryHash;
                window.signals.trigger('updateSwitcher'); // so that the lock button disappears
            } else {
                window.GenericError(new Error(this.voc.passcode.incorrectPasscode), this.voc.passcode.wrongPasscode);
                window.signals.trigger("lockScreen");
            }
            this.update();
        };
        this.beginSettingPasscode = () => {
            this.isSettingPasscode = true;
        };
        this.beginResettingPasscode = () => {
            this.isCheckingPasscode = true;
        };

        const nameMatcher = /(\S+)\s-\s([\s\S]+?)\s\(([\s\S]+)\)/;
        // Pt-BR - Portugues Brasileiro (Brasilian Portuguese).json
        // Full match   Pt-BR - Portugues Brasileiro (Brasilian Portuguese)
        // Group 1.     Pt-BR
        // Group 2.     Portugues Brasileiro
        // Group 3.     Brasilian Portuguese
        
        this.languages = [];
        fs.readdir('./data/i18n/')
        .then(files => {
            files.forEach(filename => {
                var data = nameMatcher.exec(filename);
                this.languages.push({
                    fname: filename,
                    code: data[1],
                    native: data[2],
                    eng: data[3]
                });
            });
        })
        .catch(e => {
            alert('Could not get i18n files: ' + e);
        });

        this.switchLanguage = (fname, code) => e => {
            try {
                const vocDefault = fs.readJSONSync('./data/i18n/En - English (English).json');
                const voc = fs.readJSONSync(`./data/i18n/${fname}`);
                window.vocabulary = window.___extend(vocDefault, voc);
                localStorage.appLanguage = fname;
                localStorage.appLanguageCode = code;
                setTimeout(() => {
                    const moment = require('moment');
                    moment.locale(localStorage.appLanguageCode.toLowerCase());
                }, 0);
                window.signals.trigger('updateLocales');
                window.riot.update();
            } catch(e) {
                alert('Could not open a language file: ' + e);
            }
        };
        
        /* Скорость ридера */
        this.on('mount', () => {
            setTimeout(() => {
                this.sliderReadSpeedTitles = window.noUiSlider.create(this.refs.sliderReadSpeedTitles, {
                    start: Number(localStorage.readSpeedTitles || 1.25),
                    connect: [true, false],
                    range: {
                        min: 0.5,
                        max: 5
                    }
                });
                this.refs.sliderReadSpeedTitles.noUiSlider.on('end', e => {
                    localStorage.readSpeedTitles = Number(e[0]);
                    chrome.tts.stop();
                    chrome.tts.speak(this.voc.readSpeedSample, {rate: Number(localStorage.readSpeedTitles)});
                });
                
                this.sliderReadSpeedContent = window.noUiSlider.create(this.refs.sliderReadSpeedContent, {
                    start: Number(localStorage.readSpeedContent || 1.75),
                    connect: [true, false],
                    range: {
                        min: 0.5,
                        max: 5
                    }
                });
                this.refs.sliderReadSpeedContent.noUiSlider.on('end', e => {
                    localStorage.readSpeedContent = Number(e[0]);
                    chrome.tts.stop();
                    chrome.tts.speak(this.voc.readSpeedSample, {rate: Number(localStorage.readSpeedContent)});
                });
            });
        });

        /* Theming */
        this.applyTheme = theme => e => {
            localStorage.UITheme = theme;
            document.getElementById('themeCSS').href = `./data/theme${theme}.css`;
        };
        this.applyFont = font => e => {
            localStorage.UIFont = font;
            document.body.classList.remove('lato');
            document.body.classList.remove('merriweather');
            document.body.classList.remove('opendyslexic');
            document.body.classList.add(font);
        };

        /* Autolaunch settings */

        this.autoLaunchStatus = '…';
        var AutoLaunch = require('auto-launch');
        var CEAutoLauncher = new AutoLaunch({
            name: 'CosmicEveryday'
        });
        setTimeout(() => {
            CEAutoLauncher.isEnabled()
            .then(isEnabled => {
                this.autoLaunchEnabled = isEnabled;
                this.autoLaunchTextStatus = isEnabled? this.voc.autoLaunchEnabled : this.voc.autoLaunchDisabled;
                this.update();
                if (!isEnabled && 
                    !('autolaunchProposed' in window.localStorage) && 
                    process.argv.indexOf('--no-naughty-popups') === -1 &&
                    nw.App.fullArgv.indexOf('--no-naughty-popups') === -1) 
                {
                    if (confirm(this.voc.autoLaunchProposal)) {
                        CEAutoLauncher.enable()
                        .then(() => {
                            this.autoLaunchEnabled = !this.autoLaunchEnabled;
                            this.autoLaunchTextStatus = this.autoLaunchEnabled? this.voc.autoLaunchEnabled : this.voc.autoLaunchDisabled;
                            this.update();
                        })
                        .catch(window.GenericError);
                    }
                    window.localStorage.autolaunchProposed = true;
                }
            })
            .catch(window.GenericError);
        }, 1000);
        
        this.toggleAutolaunch = e => {
            var execSync = require('child_process').execSync;
            console.log(execSync('chcp').toString());
            console.log(execSync('chcp 65001').toString());
            if (this.autoLaunchEnabled) {
                CEAutoLauncher.disable()
                .then(() => {
                    this.autoLaunchEnabled = !this.autoLaunchEnabled;
                    this.autoLaunchTextStatus = this.autoLaunchEnabled? this.voc.autoLaunchEnabled : this.voc.autoLaunchDisabled;
                    this.update();
                })
                .catch(window.GenericError);
            } else {
                CEAutoLauncher.enable()
                .then(() => {
                    this.autoLaunchEnabled = !this.autoLaunchEnabled;
                    this.autoLaunchTextStatus = this.autoLaunchEnabled? this.voc.autoLaunchEnabled : this.voc.autoLaunchDisabled;
                    this.update();
                })
                .catch(window.GenericError);
            }
        };
        this.changeLaunchMinimised = e => {
            if ('ifLaunchMinimised' in localStorage) {
                delete localStorage.ifLaunchMinimised;
            } else {
                localStorage.ifLaunchMinimised = 'yeah';
            }
        };

        /**
         * Time tracker settings
         */
        localStorage.timerWorkTime = localStorage.timerWorkTime || 25;
        localStorage.timerBreakTime = localStorage.timerBreakTime || 5;
        localStorage.timerLongBreakTime = localStorage.timerLongBreakTime || 15;
        this.wire = key => e => {
            localStorage[key] = e.target.value;
        };

        /**
         * Rediscover lost notebooks by searching them in indexedDB
         * and filtering them by name length
         * (UUID + pouchDb prefix = 43)
         */
        this.rediscoverLostNotebooks = e => {
            const notebooks = [];
            indexedDB.databases()
            .then(dbs => {
                for (const db of dbs) {
                    if (db.name.length === 43) {
                        notebooks.push(db.name.slice(7));
                    }
                }
                localStorage.dbs = JSON.stringify(notebooks);
            })
            .then(() => {
                window.signals.trigger('boardsChanged');
                window.GenericSuccess(this.voc.rediscoveryComplete);
            });
        };

        /**
         * Close Cosmic Everyday completely. Made for GNOME users and other cases when tray icon is unreachable
         */
        this.closeCE = e => {
            var win = nw.Window.get();
            win.close(true);
        };