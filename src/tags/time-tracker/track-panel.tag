track-panel(class="{zoomInUp: this.active}" show="{this.active}")
    .track-panel-aStopButton(onclick="{stopAndClose}" title="{voc.stop}")
        i.icon-square
    .track-panel-aPlayButton(onclick="{toggleRunning}" title="{this.running? voc.pause : voc.resume}")
        i(class="icon-{this.running? 'pause' : 'play'}")
    .track-panel-aCardButton
        i.icon-external-link(onclick="{openCard}" title="{voc.openCard}")
    svg(width="64" height="64" viewPort="0 0 64 64")
        circle(r="30" cx="32" cy="32" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0")
        circle.progress(r="30" cx="32" cy="32" fill="transparent" stroke-dasharray="{Math.round(Math.PI*2*30 * seconds / activityTime / 60)} 100500" stroke-dashoffset="0")
    h1 {timeString}
    script.
        const moment = require('moment'),
              momentFormat = require('moment-duration-format');
        momentFormat(moment);
        this.voc = window.vocabulary.timeTracker;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.timeTracker;
        });

        this.running = false;
        this.active = true;
        this.timeString = '00\n00';
        this.activityTime = Number(localStorage.timerWorkTime) || 25;
        this.resting = false;
        this.seconds = 0;
        this.series = 0;
        this.activities = [];
        this.editingActivities = false;
        let toClearNotifications = [];
        var fs = require('fs-extra');
        var tickInd, self = this;
        
        let tick = () => {
            this.seconds--;
            if (this.seconds < 0) {
                this.stopTimer();

                let breakMessage;
                this.resting = !this.resting;
                if (this.resting) {
                    this.series++;
                    if (this.series === 4) {
                        this.activityTime = Number(localStorage.timerLongBreakTime) || 15; 
                        this.series = 0;
                        breakMessage = this.voc.itIsTimeForLong;
                    } else {
                        this.activityTime = Number(localStorage.timerBreakTime) || 5;
                        breakMessage = this.voc.itIsTimeForShort;
                    }
                } else {
                    this.activityTime = Number(localStorage.timerWorkTime) || 25;
                    breakMessage = this.voc.timeForWork;
                }
                window.sounds.play('warning', () => {
                    chrome.tts.speak(breakMessage, {rate: Number(localStorage.readSpeedTitles) || 1});
                });
                let message;
                chrome.notifications.create({
                    type: 'basic',
                    title: this.resting? this.voc.pomodoroDone : this.voc.breakDone,
                    requireInteraction: true, 
                    message: breakMessage,
                    buttons: [{title: this.resting? this.voc.launchBreak : this.voc.startWorking}],
                    iconUrl: 'data/icons/Bell.png'
                }, function (id) {
                    message = id;
                    toClearNotifications.push(id);
                });
                chrome.notifications.onClicked.addListener(messageID => {
                    if (messageID == message) {
                        nw.Window.get().show();
                        chrome.notifications.clear(messageID);
                        toClearNotifications.splice(toClearNotifications.indexOf(messageID),1);
                    }
                });
                chrome.notifications.onButtonClicked.addListener((messageID, buttonIndex) => {
                    if (messageID == message) {
                        chrome.notifications.clear(messageID);
                        this.start();
                        this.update();
                    }
                });
            } else {
                this.timeString = moment.duration(this.seconds, 'seconds').format({
                    template: 'mm:ss',
                    trim: false
                }).replace(':', '\n');
            }
            this.update();
        };
        this.start = () => {
            this.seconds = this.activityTime * 60;
            this.running = this.active = true;
            tickInd = setInterval(tick, 1000);
            while (toClearNotifications.length) {
                chrome.notifications.clear(toClearNotifications.pop());
            }
        };
        this.toggleRunning = e => {
            this.running = !this.running;
            if (!this.running) {
                clearInterval(tickInd);
            } else {
                tickInd = setInterval(tick, 1000);
                while (toClearNotifications.length) {
                    chrome.notifications.clear(toClearNotifications.pop());
                }
            }
        };
        this.stopTimer = e => {
            if (this.running) {
                if (!this.resting) {
                    this.addTime(this.activityTime * 60 - this.seconds);
                }
                this.seconds = this.activityTime * 60;
                this.running = false;
                clearInterval(tickInd);
            }
        };
        this.stopAndClose = e => {
            this.stopTimer(e);
            this.active = false;
            window.switcher.trackedBoard = false;
            window.switcher.trackedCard = false;
            window.switcher.update();
            if (!e) {
                this.update();
            }
        };

        if (this.opts.card) {
            this.start();
        }

        this.addTime = time => {
            if (this.resting) {
                return;
            }
            if (this.opts.card) {
                if (!this.opts.card.timeTracked) {
                    this.opts.card.timeTracked = 0;
                }
                this.opts.card.timeTracked += time;
                db.modifyCard(this.opts.board, this.opts.card)
                .then(() => window.signals.trigger('updateCardViewer'));
            }
        };
        this.openCard = e => {
            window.openCard(this.opts.board, this.opts.card);
        };

        this.on('mount', () => {
            window.signals.on('forceCloseTracker', this.stopAndClose);
        });
        this.on('unmount', () => {
            window.signals.off('forceCloseTracker', this.stopAndClose);
        });