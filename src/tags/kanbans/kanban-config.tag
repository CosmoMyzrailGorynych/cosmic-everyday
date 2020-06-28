kanban-config
    .dimmer(onclick="{tryClose}" ref="dimmer")
        .aModal.flexfix
            .aModal-aCloseButton(title="{vocGlob.close}" onclick="{close}")
                i.icon-x
            h1.np {mode === 'create'? voc.creatingNewBoard : voc.boardSettings}
            fieldset
                .flexrow
                    label
                        | {voc.boardName}
                        input(type="text" ref="boardName" value="{board.title}")
                    .spacer.nogrow
                    label.nogrow
                        | {voc.boardIcon}
                        br
                        twemoji-picker(onselect="{onEmojiSelect}" emoji="{board.emoji}")
                h2 {voc.boardBackground}
                background-picker(onupdate="{selectBackground}" background="{board.background}")

                div(if="{mode !== 'create'}")
                    h4 {voc.backgroundTransparency}
                    div(ref="sliderTone")
                hr
                div(if="{mode !== 'create'}")
                    kanban-labels-editor(labels="{board.labels}")
                    hr
                    h2 {voc.exportUpdateTitle}
                    p {voc.exportUpdateInfo}
                    button(onclick="{exportDB}")
                        i.icon-upload
                        span   {voc.exportDB}
                    button(onclick="{importDB}")
                        i.icon-download
                        span   {voc.importDB}
                    input(type="file" style="display: none;" ref="dbExporter" onchange="{finishDBExport}" nwsaveas="{board.title} at {(new Date()).toDateString()}.ceproj")
                    input(type="file" style="display: none;" ref="dbImporter" onchange="{finishDBImport}" accept=".ceproj")

                    hr
                    
                    h2.magenta(if="{mode !== 'create'}") {voc.dangerZone}
                    button.red(if="{mode !== 'create'}" onclick="{tryDeleteBoard}")
                        i.icon-trash-2
                        span {voc.deleteBoard}
                    hr
            button.magenta(onclick="{close}")
                i.icon-x
                span  {this.vocGlob.cancel}
            button.green(onclick="{applyForm}")
                i.icon-check
                span  {mode === 'create'? vocGlob.create : vocGlob.apply}
    script.
        this.voc = window.vocabulary.kanbans;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
            this.vocGlob = window.vocabulary.global;
        });
        this.standard = [];
        this.uploaded = [];
        this.solids = window.colorPalette;
        this.mode = this.opts.mode || 'create'; // 'create' | 'config'
        this.board = this.opts.board || {
            title: this.voc.newBoard,
            background: 'url("/data/wallpapers/dmitry-kotov.jpg")',
            emoji: window.getRandomBoardEmoji(),
            columns: [{
                type: 'list',
                title: this.voc.newList,
                color: window.colorPalette.cyan,
                cards: []
            }],
            labels: []
        };
        this.selectedSwatch = this.board.color;
        const fs = require('fs-extra');
        
        this.tryClose = e => {
            if (e.target == this.refs.dimmer) {
                this.close();
            }
        };
        this.close = e => {
            this.parent.creatingBoard = false;
            this.parent.creationMode = false;
            this.parent.configuringBoard = false;
            if (this.mode === 'config') {
                this.applyForm(e);
            }
            this.parent.update();
        }
        this.applyForm = e => {
            this.board.title = this.refs.boardName.value;
            if (this.mode === 'create') {
                window.db.createProject(this.board)
                .then(meta => {
                    this.board._id = meta.id;
                    this.board._rev = meta.rev;
                    this.parent.creatingBoard = false;
                    this.parent.creationMode = false;
                    this.parent.update();
                    window.signals.trigger('boardsChanged');
                });
            } else {
                window.db.modifyProject(this.board)
                .then(meta => {
                    window.signals.trigger('boardsUpdate');
                    this.opts.board._rev = meta.rev;
                    this.parent.configuringBoard = false;
                    this.parent.update();
                });
            }
        };
        this.selectBackground = bg => {
            this.board.background = bg;
            if (this.mode === 'config') {
                this.parent.update();
            }
        };
        this.onEmojiSelect = e => {
            this.board.emoji = e;
            if (this.mode === 'config') {
                this.parent.update();
            } else {
                this.update();
            }
        };
        this.tryDeleteBoard = e => {
            if (!confirm(this.voc.deleteBoardConfirmation)) {
                return;
            }
            db.removeProject(this.board)
            .then(() => {
                this.parent.configuringBoard = false;
                window.switcher.board = void 0;
                window.switcher.current = 'home';
                window.signals.trigger('openHomepage');
                window.signals.trigger('boardsChanged');
            });
            e.preventDefault();
        };
        
        /* Theming */
        this.on('mount', () => {
            setTimeout(() => {
                if (this.mode === 'create') return;
                this.board.toneOpacity = 'toneOpacity' in this.board ? this.board.toneOpacity : 0.65; 
                this.toneSlider = window.noUiSlider.create(this.refs.sliderTone, {
                    start: this.board.toneOpacity,
                    connect: [true, false],
                    range: {
                        min: 0,
                        max: 1
                    }
                });
                this.refs.sliderTone.noUiSlider.on('change', e => {
                    this.board.toneOpacity = Number(e[0]);
                    if (this.mode === 'config') {
                        this.parent.update();
                    }
                });
            }, 0);
        });
        
        /* Export / Import */
        this.exportDB = e => {
             this.refs.dbExporter.click();
        };
        var showExportFailure = err => {
            window.sounds.play('error');
            chrome.notifications.create({
                type: 'basic',
                title: this.voc.exportFailed,
                message: '' + err,
                iconUrl: 'data/icons/Warning.png'
            });
            console.error(err);
        };
        var showImportFailure = err => {
            window.sounds.play('error');
            chrome.notifications.create({
                type: 'basic',
                title: this.voc.importFailed,
                message: '' + err,
                iconUrl: 'data/icons/Warning.png'
            });
            console.error(err);
        };
        this.finishDBExport = e => {
            var way = this.refs.dbExporter.value,
                ws = fs.createWriteStream(way);
            let i = 0;
            ws.write(this.opts.board.id + '\n\n', 'utf-8');
            var dumpDb = () => {
                db[this.opts.board.id].dump(ws)
                .then(res => {
                    ws.close();
                    window.sounds.play('notify', () => {
                        chrome.tts.speak(this.voc.exportFinished, {rate: Number(localStorage.readSpeedTitles)});
                    });
                    chrome.notifications.create({
                        type: 'basic',
                        title: this.voc.exportFinished,
                        message: this.voc.exportFinishedInfo,
                        iconUrl: 'data/icons/ThumbsUp.png'
                    });
                })
                .catch(err => {
                    showExportFailure(err);
                });
            };
            dumpDb();
            this.refs.dbExporter.value = '';
        };

        const stream = require('stream');
        const streamify = text => {
            var s = new stream.Readable;
            s._read = function sosiska() {};
            s.push(text);
            s.push(null);
            return s;
        };
        this.importDB = e => {
             this.refs.dbImporter.click();
        };
        this.finishDBImport = e => {
            const split = require('split');
            var way = this.refs.dbImporter.value;
            let i = 0, continueImport = true;
            fs.createReadStream(way)
            .pipe(split(/\n\n/))
            .on('data', chunk => {
                if (i === 0) {
                    i++;
                    let id = chunk;
                    if (id !== this.opts.board.id) {
                        showImportFailure(new Error(this.voc.errorCannotMerge));
                        continueImport = false;
                    }
                    return;
                }
                if (!continueImport) {
                    return;
                }
                db[this.opts.board.id].load(streamify(chunk), {
                    since: 0
                })
                .then(res => {
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
                    } else {
                        showImportFailure(res);
                    }
                })
                .catch(err => showImportFailure(err));
            })
            .on('end', () => {
                window.signals.trigger('openHomepage');
                window.signals.trigger('boardsChanged');
            });
            this.refs.dbImporter.value = '';
        };
