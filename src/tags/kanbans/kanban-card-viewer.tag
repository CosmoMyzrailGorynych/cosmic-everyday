kanban-card-viewer
    .dimmer(onclick="{checkIfClose}" ref="dimmer")
        .aModal(ref="cardroot" data-hotkey-scope="kanban-card-editor")
            .aModal-aCloseButton(title="{vocGlob.close}" onclick="{close}")
                i.icon-x
            .aModal-aPresentButton(title="{voc.openPresentation}" onclick="{openPresentation}")
                i(class="icon-monitor")
            .flexrow
                div
                    .cm19
                        h1(if="{!editingTitle}")
                            span.a.toright(title="{voc.editTitle} (Ctrl+G)" onclick="{editTitle}")
                                i.icon-edit-3
                            | {card.title}
                        input.h1(type="text" style="z-index: 10;" show="{editingTitle}" value="{card.title}"
                            onkeyup="{checkIfFinishTitle}" onblur="{checkIfFinishTitle}"
                            ref="title"
                        )
                    .aCardContent(ref="cardcontent")
                        div(show="{specialsVisible}" class="aToolbox Specials")
                            span(each="{special in specials}" onclick="{insertSpecial}") {special}
                        .aCardContentEditor(ref="editor")
                    .cm19
                        hr
                        h2
                            i.icon-check-square
                            |  {voc.toDos}
                        todo-list(ref="todos" todos="{card.todo}" onupdate="{updateProgress}")
                        button.green.nmt(onclick="{addTodo}" data-hotkey="Control+g")
                            i.icon-plus
                            span  {voc.addTodo}

                        h2
                            i.icon-paperclip
                            |  {voc.attachments}
                        .Attachments(if="{card.attachments && card.attachments.length}")
                            .anAttachment(each="{attachment in card.attachments || []}" class="{attachment.type}" onclick="{openAttachment}")
                                i.magenta.icon-x(onclick="{detach}")
                                i.icon-folder.big(if="{attachment.type === 'folder'}")
                                i.icon-mail.big(if="{attachment.type === 'email'}")
                                i.big(if="{attachment.type === 'file'}" class="icon-{window.getFileIcon(attachment.format)}")
                                i.icon-link.big(if="{attachment.type == 'url'}")
                                h4 {attachment.name}
                                span.dim(if="{attachment.type !== 'email' && attachment.type !== 'url'}") {attachment.path || ''}
                                a.dim(if="{attachment.type === 'url'}" href="{attachment.path || ''}") {attachment.path || ''}
                                span.dim(if="{attachment.type === 'email'}") {voc.composeLetter}
                                i.icon-code.anAttachment-aCopyButton(if="{attachment.type === 'file'}" onclick="{copyFileCode(attachment)}" title="{voc.copyEditorCode}")
                        div.anAttacher
                            .aButtonGroup.inlineblock
                                button(onclick="{attachFile}")
                                    i.icon-file-plus
                                    span   {voc.attachFile}
                                button(onclick="{attachFolder}")
                                    i.icon-folder-plus
                                    span   {voc.attachFolder}
                                button(onclick="{attachLink}")
                                    i.icon-link-2
                                    span   {voc.attachLink}
                                button(onclick="{attachEmail}")
                                    i.icon-mail
                                    span   {voc.attachEmail}
                        .labels.nmb
                            .aLabel(if="{!editingLabels}" each="{val in card.labels}"
                                style="background: {parent.findLabel(val).color}66; border-color: {parent.findLabel(val).color};"
                                title="{parent.findLabel(val).title}"
                            )
                                twemoji-icon(emoji="{parent.findLabel(val).emoji}")
                                span  {parent.findLabel(val).title}
                            button(onclick="{editLabels}" if="{!editingLabels}")
                                i.icon-tag
                                span  {voc.editLabels}
                            .flexrow(show="{editingLabels}")
                                label-selector.nogrow(ref="labelSelector" labels="{this.opts.board.labels}")
                                button.nogrow(onclick="{editLabels}")
                                    i.icon-check
                                    span  {vocGlob.apply}
                        input(ref="openFile" type="file" style="display: none;" onchange="{fileAttached}")
                        input(ref="openFolder" nwdirectory type="file" style="display: none;" onchange="{folderAttached}")
                aside
                    .sticky
                        h2
                            span.a.toright(if="{!editingTitle}" title="{voc.editTitle}" data-hotkey="Control+g" onclick="{editTitle}")
                                i.icon-edit-3
                            | {card.title}
                        .clear
                        p.npt.aCalendarDate(if="{card.dueTo}" style="color: {window.getDateColor(card.dueTo)}")
                            span.a.toright(if="{!editingDate}"  data-hotkey="Control+d" title="{voc.setDate}" onclick="{editDate}")
                                i.icon-edit-3
                            i.icon-calendar
                            span  {moment(card.dueTo).calendar()}
                        p.npt(if="{card.timeTracked}")
                            i.cyan.icon-clock
                            span   {window.getTimeString(card.timeTracked)}
                        p.npt(if="{card.attachments && card.attachments.length}")
                            span.a.toright(onclick="{attachFile}" title="{voc.attachFile}")
                                i.icon-plus
                            i.icon-paperclip.cyan
                            |   {card.attachments.length} {voc.attachments}
                        .clear
                        p.npt(if="{card.todo && card.todo.length}")
                            span.a.toright(onclick="{addTodo}" data-hotkey="Control+1" title="{voc.addTodo}")
                                i.icon-plus
                            i.icon-check-square.cyan
                            |   {getCompleteTodo()} / {card.todo.length} {voc.toDos}
                        .clear
                        .aVerticalButtonGroup(style="padding-top: 0.5rem;")
                            button.wide(onclick="{editDate}" if="{!editingDate}" data-hotkey="Control+d")
                                i.icon-calendar
                                span  {voc.setDate}
                            div(show="{editingDate}")
                                input(type="text" ref="date" value="{new Date(this.card.dueTo) || ''}")
                                button.wide.green(if="{editingDate}" onclick="{editDate}")
                                    i.icon-check
                                    span  {vocGlob.apply}
                                button.magenta.wide(onclick="{clearDate}")
                                    i.icon-x
                                    span  {voc.clearDate}

                            button.wide(onclick="{addTodo}" data-hotkey="Control+1" if="{!card.todo || !card.todo.length}")
                                i.icon-check-square
                                span  {voc.addTodo}
                            button.wide(onclick="{togglePomodoro}")
                                i(class="icon-{runningPomodoro? 'x' : 'clock'}")
                                span  {runningPomodoro? voc.stopPomodoro : voc.runPomodoro}
                            button.wide(onclick="{readBySpeech}" data-hotkey="Control+r")
                                i(class="icon-volume-{isSpeaking? 'x' : '2'}")
                                span  {isSpeaking? voc.stopReading : voc.readBySpeech}

                        .aVerticalButtonGroup
                            button.wide(onclick="{copyHTMLCode}" data-hotkey="Control+h")
                                i.icon-code
                                span  {voc.copyHTMLCode}
                            button.wide(onclick="{copyJSONCode}" data-hotkey="Control+j")
                                i.icon-code
                                span  {voc.copyJSONCode}
                            button.wide(onclick="{exportToPDF}" data-hotkey="Control+e")
                                i.icon-file-text
                                span  {voc.exportToPDF}
                            button.wide(onclick="{printCard}" data-hotkey="Control+p")
                                i.icon-printer
                                span  {voc.printCard}

                        .aVerticalButtonGroup
                            button.magenta.wide(onclick="{tryDelete}" data-hotkey="Control+D" ref="deleteButton")
                                i.icon-x.red
                                span  {vocGlob.delete}
                        input(ref="pdfFile" nwsaveas="{card.title}.pdf" type="file" style="display: none;" onchange="{doPDFExport}")
    .aFileDrop.wholescreen(if="{draggingFiles}")
        .center
            i.big.icon-download
        | {voc.attachFilesTocard}
        input(type="file" ref="fileUploader" multiple onchange="{attachDropFiles}")
    .aShowcaser(if="{showcasing}")
        span.aModal-aCloseButton(onclick="{closeShowcase}" title="{voc.closePresentation}")
            i.icon-x.red
        .aShowcaser-Contents
            raw(content="{showcaseCode}")
    modal-input(if="{isAttachingLink}" width="500" onapply="{doAttachLink}" type="url")
    modal-input(if="{isAttachingEmail}" width="500" onapply="{doAttachEmail}" type="email")
    div(style="display: none;" ref="contentRendered")
    script.
        const path = require('path');
        this.moment = require('moment');
        this.vocGlob = window.vocabulary.global;
        this.voc = window.vocabulary.kanbans;
        this.headings = [];
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
            this.vocGlob = window.vocabulary.global;
        });
        window.signals.on('updateCardViewer', this.update);
        this.on('mount', () => {
            window.hotkeys.push('kanban-card-editor');
        })
        this.on('unmount', () => {
            window.signals.off('updateCardViewer', this.update);
        });
        this.card = this.opts.card;
        this.editingTitle = this.editingContent = this.editingLabels = this.editingDate = false;
        this.isSpeaking = false;

        var ImageBlot = Quill.import('formats/image');
        ImageBlot.sanitize = function(url) {
            return url;  // No sanitization
        };
        this.quillImageHandler = () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('multiple', true);
            input.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            input.click();
            input.onchange = () => {
                for (const file of input.files) {
                    if (/^image\//.test(file.type)) {
                        this.addImageHook(file, url => {
                            const range = this.editor.getSelection();
                            this.editor.insertEmbed(range.index, 'image', url);
                        });
                    }
                }
                this.update();
            };
        };
        this.quillHrHandler = () => {
            const range = this.editor.getSelection();
            this.editor.insertEmbed(range.index, 'hr', '');
        };
        this.addImageHook = (file, callback) => {
            if (!this.card.attachments) {
                this.card.attachments = [];
            }
            if (!this.card.attachments.find(attachment => attachment.path === file.path)) {
                this.card.attachments.push({
                    type: 'file',
                    path: file.path,
                    name: path.basename(file.path, path.extname(file.path)),
                    format: path.extname(file.path)
                });
            }
            callback('file://' + encodeURI(file.path.replace(/\\/g, '/')), 'image'); /* Replace Windows slashes with UNIX ones */
            return false;
        };

        // Для горизонтальных линий
        let BlockEmbed = Quill.import('blots/block/embed');
        class DividerBlot extends BlockEmbed { }
        DividerBlot.blotName = 'hr';
        DividerBlot.tagName = 'hr';
        Quill.register(DividerBlot);

        this.on('mount', () => {
            this.editor = new Quill(this.refs.editor, {
                bounds: this.refs.cardroot,
                formats: [
                    'bold',
                    'code',
                    'italic',
                    'link',
                    'strike',
                    'script',
                    'underline',

                    'blockquote',
                    'header',
                    'list',
                    'align',
                    'indent',
                    'hr',
                    'code-block',

                    'formula',
                    'image',
                    'video'/*,
                    'table'*/
                ],
                scrollingContainer: this.refs.dimmer,
                placeholder: this.voc.contentPlaceholder,
                modules: {
                    syntax: true,
                    toolbar: {
                        container: [
                            [{ 'header': [2, 3, 4, false] }],
                            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                            [{ 'align': [] }, 'blockquote', { 'list': 'ordered'}, { 'list': 'bullet' }],
                            [ 'link', 'image', 'video', 'hr' ],
                            ['formula', { 'script': 'sub'}, { 'script': 'super' }, 'code-block'],  // superscript/subscript

                            ['clean'] // remove formatting button
                        ],
                        handlers: {
                            image: this.quillImageHandler,
                            hr: this.quillHrHandler
                        }
                    },
                    // table: true,
                    // markdownShortcuts: {}
                },
                theme: 'snow'
            });

            // Конвертация маркдауна в HTML и Quill
            if (this.card.content) {
                const md = require('markdown-it')({
                    html: true
                });
                this.editor.clipboard.dangerouslyPasteHTML(md.render(this.card.content));
                delete this.card.content;
            } else if (this.card.quill) {
                this.editor.setContents(this.card.quill);
            }

            this.editor.on('text-change', this.saveDelayed);
            window.EDITOR = this.editor;
        });

        this.cleanUpUnusedLabels = () => {
            if (!('labels' in this.card)) return;
            var allLabels = this.opts.board.labels;
            this.card.labels = this.card.labels.filter(toFind => {
                return allLabels.find(label => {
                    return label._id === toFind;
                }) || false;
            });
        };
        this.cleanUpUnusedLabels();

        /*
         * Настройка вставки вложений перетаскиванием
         */
        this.draggingFiles = false;
        var dragTimer;
        this.onDragOver = e => {
            var dt = e.dataTransfer;
            if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
                this.draggingFiles = true;
                this.update();
                window.clearTimeout(dragTimer);
            }
        };
        this.onDragLeave = e => {
            dragTimer = window.setTimeout(() => {
                this.draggingFiles = false;
                this.update()
            }, 25);
        };
        document.addEventListener('dragover', this.onDragOver);
        document.addEventListener('dragleave', this.onDragLeave);
        this.on('unmount', e => {
            document.removeEventListener('dragover', this.onDragOver);
            document.removeEventListener('dragleave', this.onDragLeave);
        });
        this.attachDropFiles = e => {
            this.draggingFiles = false;

            var files = this.refs.fileUploader.value.split(';');
            files.forEach(this.attachFileDirect);
        };

        const {getCode} = window.hotkeys;
        var saveCardHotkey = (evt) => {
            if (getCode(evt) === 'Control+s') {
                this.saveToDB()
                .then(() => {
                    window.sounds.play('notify');
                    chrome.notifications.create({
                        type: 'basic',
                        title: this.voc.cardSaved,
                        message: this.voc.cardSavedAllIsGood,
                        iconUrl: 'data/icons/ThumbsUp.png'
                    });
                });
            }
        };
        document.addEventListener('keydown', saveCardHotkey);
        this.on('unmount', () => document.removeEventListener('keydown', saveCardHotkey));

        /********************/
        const flatpickr = require('flatpickr');
        if (localStorage.appLanguage === 'Ru') {
            const Russian = require("flatpickr/dist/l10n/ru.js").ru;
            flatpickr.localize(Russian);
        }
        this.allLabels = this.opts.board.labels;
        this.findLabel = toFind => {
            return this.allLabels.find(label => {
                return label._id === toFind;
            });
        };
        this.cardContent = '';
        this.on('beforeMount', () => {
            this.card = this.opts.card;
            this.cleanUpUnusedLabels();
            this.editingTitle = this.editingContent = this.editingLabels = this.editingDate = false;
        });
        this.on('mount', () => {
            setTimeout(() => {
                window.Stretchy.resizeAll(this.refs.todo);
            }, 0);
            new flatpickr(this.refs.date, {
                enableTime: true,
                time_24hr: true,
                static: true,
                onChange: selDates => {
                    this.card.dueTo = +(selDates[0]);
                },
            });
        });
        this.checkIfFinishTitle = e => {
            if (e.type !== 'blur') {
                if (key.stringifyEvent(e) === 'ctrl-return' ||
                key.stringifyEvent(e) === 'return') {
                    this.editTitle();
                }
            } else if (this.editingTitle) {
                this.editTitle();
            }
        };
        this.checkIfClose = e => {
            if (e.target === this.refs.dimmer) {
                this.close();
            }
        };
        this.saveToDB = autosave => {
            if (this.editingTitle && autosave) {
                return;
            }
            if (this.editingTitle) {
                this.editTitle();
            }
            if (this.editingLabels) {
                this.editLabels();
            }
            if (this.isSpeaking) {
                chrome.tts.stop();
            }
            if (this.editingDate) {
                this.editDate();
            }
            this.card.quill = this.editor.getContents();
            if (this.card.quill.ops.length === 1 && this.card.quill.ops[0].insert === '\n') {
                delete this.card.quill;
            }
            if (this.card.attachments && !this.card.attachments.length) {
                delete this.card.attachments;
            }
            return db.modifyCard(this.opts.board, this.card)
                   .then(meta => {
                       this.card._rev = meta.rev;
                   });
        };
        /*
         * Сохранение по дебаунсу
         */
        this.saveDelayed = window.debounce(() => this.saveToDB(true), 1000 * 10);

        this.close = e => {
            if (this.exportWindow) {
                this.exportWindow.close();
            }
            window.signals.off('forceCardViewerClose', this.close);
            return this.saveToDB()
            .then(() => {
                this.parent.editingCard = null;
                this.parent.update();
                window.signals.trigger('cardViewerClosed');
            });
        };
        window.signals.on('forceCardViewerClose', this.close);

        this.addTodo = (e) => {
            if (!this.card.todo) {
                this.card.todo = [];
                this.update();
            }
            this.refs.todos.addTask();
            this.saveDelayed();
        };
        this.getCompleteTodo = e => this.card.todo.filter(task => task.done).length;


        /* Pomodoro Timer */
        this.togglePomodoro = e => {
            window.signals.trigger('forceCloseTracker');
            this.runningPomodoro = !this.runningPomodoro;
            if (window.switcher.trackedBoard) {
                window.switcher.trackedBoard = false;
                window.switcher.trackedCard = false;
                window.switcher.update();
            }
            if (this.runningPomodoro) {
                window.switcher.trackedBoard = this.opts.board;
                window.switcher.trackedCard = this.opts.card;
                window.switcher.update();
            }
        };

        /* Печать и экспорт */
        this.exportToPDF = e => {
            this.refs.pdfFile.click();
        };
        this.makeHTMLPage = (noStyles) => {
            var html = `<h1>${this.card.title}</h1>`;
            if (this.card.labels && this.card.labels.length) {
                html += `${this.voc.labels}: ` + this.card.labels.map(label => this.findLabel(label).title).join(', ') + '.';
            }
            var val = window.EDITOR.root.innerHTML || window.EDITOR.getSemanticHTML();
            if (val.trim() !== '') {
                html += val;
            }
            if (this.card.todo && this.card.todo.length) {
                html += `<h2>${this.voc.toDos}</h2>`;
                this.card.todo.forEach(todo => {
                    html += `<p>${todo.done? '✔' : '❑'} ${todo.title}</p>`;
                });
            }
            html += '<br/><br/><p style="font-size: 0.75em; opacity: 0.65; margin-bottom: 0; padding-bottom: 0;">Created with CosmicEveryday</p>';
            if (!noStyles) {
            html = `<style>
                body {
                    font: 16px/24px Georgia, serif;
                    line-height: 1.5em;
                    margin: 2rem 3rem 2rem 4rem;
                }
                h1, h2, h3, h4, h5, h6 {
                    line-height: 1.5em;
                }
                blockquote {
                    padding-left: 1.5rem;
                    border-left: 2px solid #ccc;
                    font-style: italic;
                }
                pre, code {
                    font-family: Consolas, "Fira Mono", monospace;
                }
                img {
                    max-width: 100%;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                }
                td, th {
                    padding: 0.25rem 0.5rem;
                }
            </style>` + html;
            }
            return html;
        };
        this.doPDFExport = e => {
            if (this.exportWindow) {
                this.exportWindow.close();
            }
            var file = this.refs.pdfFile.value;
            this.refs.pdfFile.value = '';
            var html = this.makeHTMLPage();
            nw.Window.open('splash.html', {
                focus: false,
                show: false,
                new_instance: false
            }, newWin => {
                var wind = newWin.window;
                this.exportWindow = wind;
                newWin.once('loaded', e => {
                    newWin.window.document.body.innerHTML = html;
                    newWin.print({
                        autoprint: true,
                        pdf_path: file,
                        headerFooterEnabled: false,
                        marginsType: 0
                    });
                    var mediaQueryList = newWin.window.matchMedia('print');
                    mediaQueryList.addListener(function(mql) {
                        if (!mql.matches) {
                            newWin.close();
                        }
                    });
                });
            });
        };
        this.copyHTMLCode = e => {
            var html = `<h1>${this.card.title}</h1>`;
            if (this.editor.getHtml().trim() !== '') {
                html += this.editor.getHtml();
            }
            var clipboard = nw.Clipboard.get();
            clipboard.set(html, 'text');
        };
        this.copyJSONCode = e => {
            this.card.quill = this.editor.getContents();
            var json = JSON.stringify(this.card, null, '    ');
            var clipboard = nw.Clipboard.get();
            clipboard.set(json, 'text');
        };
        this.printCard = e => {
            nw.Window.open('about:blank', {
                focus: true,
                show: true,
                width: 800,
                height: 600
            }, newWin => {
                newWin.window.document.body.innerHTML = this.makeHTMLPage();
                newWin.print({
                    autoprint: false,
                    headerFooterEnabled: false,
                    marginsType: 0
                });
                var mediaQueryList = newWin.window.matchMedia('print');
                mediaQueryList.addListener(function(mql) {
                    if (!mql.matches) {
                        newWin.close();
                    }
                });
            });
        };

        /* Вложения */
        this.isAttachingLink = false;
        this.isAttachingEmail = false;
        this.attachFile = e => {
            this.refs.openFile.click();
        };
        this.attachFolder = e => {
            this.refs.openFolder.click();
        };
        this.attachLink = e => {
            this.isAttachingLink = true;
        };
        this.attachEmail = e => {
            this.isAttachingEmail = true;
        };
        this.doAttachLink = url => {
            if (url) {
                let link = {
                    type: 'url',
                    path: url,
                    name: this.vocGlob.loading
                };
                if (!('attachments' in this.card)) {this.card.attachments = [];}
                this.card.attachments.push(link);
                fetch(new Request(url))
                .then(response => {
                    return response.text();
                }).then(text => {
                    link.name = /<title>(.*?)<\/title>/i.exec(text)[1] ||
                                url.replace(/^http(s)?\:\/\//,'') ||
                                this.voc.link;
                    this.update();
                });
            }
            this.isAttachingLink = false;
            this.update();
            this.saveDelayed();
        };
        this.doAttachEmail = email => {
            if (email) {
                if (!('attachments' in this.card)) {this.card.attachments = [];}
                this.card.attachments.push({
                    type: 'email',
                    name: email
                });
            }
            this.isAttachingEmail = false;
            this.update();
            this.saveDelayed();
        }
        this.attachFileDirect = file => {
            if (!('attachments' in this.card)) {
                this.card.attachments = [];
            }
            this.card.attachments.push({
                type: 'file',
                path: file,
                name: path.basename(file, path.extname(file)),
                format: path.extname(file)
            });
            this.saveDelayed();
        }
        this.fileAttached = e => {
            let file = this.refs.openFile.value;
            this.attachFileDirect(file);
        };
        this.folderAttached = e => {
            if (!('attachments' in this.card)) {
                this.card.attachments = [];
            }
            let val = this.refs.openFolder.value,
                segments = val.split(path.sep);
            this.card.attachments.push({
                type: 'folder',
                path: val,
                name: segments[segments.length-1]
            });
            this.refs.openFolder.value = '';
            this.saveDelayed();
        };
        this.detach = e => {
            e.stopPropagation();
            this.card.attachments.splice(this.card.attachments.indexOf(e.item.attachment), 1);
            this.saveDelayed();
        };
        this.openAttachment = e => {
            let i = e.item.attachment;
            if (i.type === 'file') {
                nw.Shell.openItem(i.path);
            } else if (i.type === 'folder') {
                nw.Shell.openItem(i.path);
            } else if (i.type === 'url') {
                nw.Shell.openExternal(i.path);
            } else if (i.type === 'email') {
                nw.Shell.openExternal('mailto:' + i.name);
            }
        };
        this.copyFileCode = attachment => e => {
            const range = this.editor.getSelection(true);
            this.editor.insertEmbed(range.index, 'image', `file://${encodeURI(attachment.path.replace(/\\/g, '/'))}`);
            e.stopPropagation();
        };

        /* Туду-листы */
        this.addTask = e => {
            this.refs.todos.addTask(e);
            this.saveDelayed();
        };
        this.updateProgress = e => {
            this.card.progress = {
                done: this.card.todo.filter(todo => {return todo.done;}).length,
                total: this.card.todo.length
            };
            this.saveDelayed();
        };

        /* Содержимое */
        this.editTitle = e => {
            if (!this.editingTitle) {
                this.editingTitle = true;
                setTimeout(() => {
                    this.refs.title.focus();
                }, 0);
            } else {
                this.editingTitle = false;
                this.card.title = this.refs.title.value;
                this.saveDelayed();
            }
        };
        this.editDate = e => {
            this.editingDate = !this.editingDate;
            if (this.editingDate) {
                this.refs.date.focus();
            }
        };
        this.clearDate = e => {
            this.editingDate = false;
            delete this.card.dueTo;
            this.saveDelayed();
        };
        this.editLabels = e => {
            if (!this.editingLabels) {
                this.editingLabels = true;
                this.refs.labelSelector.selected = this.card.labels.map(elt => {
                    return this.findLabel(elt);
                });
            } else {
                this.editingLabels = false;
                this.card.labels = this.refs.labelSelector.selected.map(elt => {return elt._id;});
            }
        };
        this.delete = e => {
            db.deleteCard(this.opts.board, this.opts.card)
            .then(() => db.modifyProject(this.opts.board))
            .then(() => {
                this.parent.editingCard = void 0;
                this.parent.update();
            });
        };
        this.tryDelete = e => {
            if (window.confirm(this.voc.deleteCardConfirmation)) {
                this.delete();
            }
        }
        this.readBySpeech = e => {
            if (!this.isSpeaking) {
                this.isSpeaking = true;
                chrome.tts.speak(this.card.title, {rate: Number(localStorage.readSpeedTitles)});
                chrome.tts.speak(this.refs.editor.innerText, {
                    enqueue: true,
                    rate: Number(localStorage.readSpeedContent)
                });
                if (this.card.todo && this.card.todo.length) {
                    chrome.tts.speak(this.voc.toDos, {
                        enqueue: true,
                        rate: Number(localStorage.readSpeedTitles)
                    });
                    this.card.todo.forEach(todo => {
                        chrome.tts.speak(todo.title, {
                            enqueue: true,
                            rate: Number(localStorage.readSpeedContent)
                        });
                        if (todo.done) {
                            chrome.tts.speak(this.vocGlob.done, {
                                enqueue: true,
                                rate: Number(localStorage.readSpeedTitles)
                            });
                        }
                    });
                }
                chrome.tts.speak(this.voc.speechFinished, {
                    enqueue: true,
                    rate: Number(localStorage.readSpeedTitles),
                    onEvent: event => {
                        if (event.type === 'end' ||
                            event.type === 'interrupted' ||
                            event.type === 'cancelled' ||
                            event.type === 'error') {
                            this.isSpeaking = false;
                            this.update();
                        }
                    }
                });
            } else {
                chrome.tts.stop();
            }
        };
        this.updateBoardColumns = function (cb) {
            var board = this.opts.board;
            window.db.kanbanBoards.get(board._id)
            .then(doc => {
                doc.columns = board.columns;
                window.db.kanbanBoards.put(doc, err => {
                    if (err) {
                        window.DBError(err);
                        if (cb) {
                            cb(err);
                        }
                        return;
                    }
                    if (cb) {
                        cb(null);
                    }
                });
            })
            .catch(err => window.DBError(err));
        };


        /* Presentation mode*/
        this.showcasing = false;
        this.openPresentation = e => {
            this.showcasing = true;
            this.showcaseCode = this.makeHTMLPage(true);
        };
        this.closeShowcase = e => {
            this.showcasing = false;
        }