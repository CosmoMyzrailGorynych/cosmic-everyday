kanban-creation-dialogue
    .dimmer
        .flexrow
            label
                i.icon-download.huge
                br
                span {voc.importFromFile}
                input.hidden(type="file" accept="*.ceproj, *.cedb" onchange="{importFile}")
            label(onclick="{createNew}")
                i.icon-monitor.huge
                br
                span {voc.createNew}
            label(onclick="{import3rdParty}")
                i.icon-link.huge
                br
                span {voc.link3rdParty}
        button.kanban-creation-dialogue-aCancelButton(onclick="{cancel}") {vocGlob.cancel}
        script.
            const fs = require('fs-extra'),
                  path = require('path');
            this.voc = window.vocabulary.kanbanCreation;
            this.vocGlob = window.vocabulary.global;
            window.signals.on('updateLocales', () => {
                this.voc = window.vocabulary.switcher;
                this.vocGlob = window.vocabulary.global;
            });
            this.createNew = e => {
                this.parent.creationMode = 'createNew';
                this.parent.creatingBoard = false;
                this.parent.update();
            };
            this.importFile = e => {
                this.parent.creatingBoard = false;
                const file = e.target.value;
                e.target.value = '';

                var newDB, id;

                const split = require('split'),
                      stream = require('stream');
                const streamify = text => {
                    var s = new stream.Readable;
                    s._read = function sosiska() {};
                    s.push(text);
                    s.push(null);
                    return s;
                };
                let i = -1, continueImport = false;
                const 
                rstream = fs.createReadStream(file)
                          .pipe(split(/\n\n/));

                rstream.on('data', chunk => {
                    i++;
                    if (i === 0) {
                        id = chunk;
                        continueImport = JSON.parse(localStorage.dbs || '[]').indexOf(id) === -1;
                        if (!continueImport) {
                            window.sounds.play('error');
                            setTimeout(() => {
                                chrome.tts.speak(this.voc.importFailed, {rate: Number(localStorage.readSpeedTitles)});
                            }, 1000);
                            chrome.notifications.create({
                                type: 'basic',
                                title: this.voc.importFailed,
                                message: this.voc.notebookAlreadyExists,
                                iconUrl: 'data/icons/Warning.png'
                            });
                        }
                        return;
                    }
                    if (!continueImport) {
                        return;
                    }
                    if (i === 1) {
                        console.log('created db');
                        newDb = new window.PouchDB(id);
                    }
                    newDb.load(streamify(chunk), {
                        since: 0
                    })
                    .then(res => {
                        console.log(res);
                        if (res.ok) {
                            window.sounds.play('notify');
                            setTimeout(() => {
                                chrome.tts.speak(this.voc.importFinished, {rate: Number(localStorage.readSpeedTitles)});
                            }, 1000);
                            chrome.notifications.create({
                                type: 'basic',
                                title: this.voc.importFinished,
                                message: this.voc.importFinishedInfo,
                                iconUrl: 'data/icons/ThumbsUp.png'
                            });

                            var dbs = JSON.parse(localStorage.dbs || '[]');
                            dbs.push(id);
                            localStorage.dbs = JSON.stringify(dbs);
                            
                            window.signals.trigger('forceKanbanWorkspaceRefresh');
                        } else {
                            window.DBError(res);
                        }
                    })
                    .catch(window.DBError);
                });
                e.target.value = '';

                this.cancel(e);
            };
            this.import3rdParty = e => {
                this.parent.creationMode = '3rdParty';
                this.parent.creatingBoard = false;
                this.parent.update();
            };
            this.cancel = e => {
                this.parent.creationMode = false;
                this.parent.creatingBoard = false;
                this.parent.update();
            };
