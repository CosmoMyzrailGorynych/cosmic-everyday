kanban-card(onclick="{openCard}" oncontextmenu="{openContextMenu}")
    .anAttachedImage(if="{attachedImage}" class="{gif: attachedImage.gif}" onclick="{openImage}")
        img.gif(if="{attachedImage.gifSrc}" src="{attachedImage.gifSrc}")
        img(src="{attachedImage.src}")
    p
        | {opts.card.title}
    div.aCardExtras
        .aCalendarDate.inlineblock(if="{opts.card.dueTo}" style="color: {window.getDateColor(opts.card.dueTo)}")
            i.icon-calendar
            span.small {moment(opts.card.dueTo).calendar()}
        i.icon-file-text(if="{opts.card.quill || opts.card.content}" title="{voc.hasContent}")
        span.inlineblock(if="{opts.card.timeTracked}")
            i.icon-clock
            em.small {window.getTimeString(opts.card.timeTracked)}
        span.inlineblock(if="{opts.card.attachments}" onclick="{openAttachments}")
            i.icon-paperclip(title="{voc.attachments}")
            em.small {opts.card.attachments.length}
        .aLabel(each="{label in opts.card.labels}" if="{findLabel(label)}"
            style="background: {parent.findLabel(label).color}66; border-color: {parent.findLabel(label).color};"
            title="{parent.findLabel(label).title}"
        )
            twemoji-icon(emoji="{parent.findLabel(label).emoji}")
    .aCardProgress(if="{opts.card.progress && opts.card.progress.total > 0}")
        i.icon-check-square(class="{green: opts.card.progress.done === opts.card.progress.total}")
        .aProgressBar.tiny
            div(style="width: {Math.floor(opts.card.progress.done / opts.card.progress.total * 100)}%;")
        em.small {opts.card.progress.done} / {opts.card.progress.total}

    script.
        this.moment = require('moment');

        this.noedit = this.opts.noedit || false;
        this.voc = window.vocabulary.kanbans;
        this.vocGlob = window.vocabulary.global;
        this.oldCard = this.opts.card;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
            this.vocGlob = window.vocabulary.global;
        });

        if (!this.noedit) {
            this.findLabel = toFind => {
                return this.allLabels.find(label => {
                    return label._id === toFind;
                }) || false;
            };
            this.allLabels = this.opts.board.labels;
            this.opts.card.labels = this.opts.card.labels || [];
        } else {
            this.opts.card.labels = [];
        }
        this.openCard = e => {
            if (this.noedit) {
                return;
            }
            window.openCard(this.opts.board, this.opts.card);
        };
        this.openContextMenu = e => {
            if (this.noedit) {
                return;
            }
            let menu = new nw.Menu({
                type: 'contextmenu'
            });
            menu.append(new nw.MenuItem({
                label: this.voc.copyTitle,
                click: () => {
                    var clipboard = nw.Clipboard.get();
                    clipboard.set(this.opts.card.title, 'text');
                }
            }));
            menu.append(new nw.MenuItem({
                label: this.voc.editTitle,
                click: () => {
                    let value = prompt(this.voc.editTitle, this.opts.card.title);
                    if (value && value !== this.opts.card.title) {
                        this.opts.card.title = value;
                        db.modifyCard(this.opts.board, this.opts.card);
                        this.update();
                    }
                }
            }));

            menu.append(new nw.MenuItem({
                type: 'separator'
            }));
            for (const label of this.opts.board.labels) {
                menu.append(new nw.MenuItem({
                    type: 'checkbox',
                    label: `${label.emoji} ${label.title}`,
                    checked: this.opts.card.labels.indexOf(label._id) !== -1,
                    click: () => {
                        let ind = this.opts.card.labels.indexOf(label._id);
                        if (ind !== -1) {
                            this.opts.card.labels.splice(ind, 1);
                        } else {
                            this.opts.card.labels.push(label._id);
                        }
                        db.modifyCard(this.opts.board, this.opts.card);
                        this.update();
                    }
                }));
            }
            menu.append(new nw.MenuItem({
                type: 'separator'
            }));

            menu.append(new nw.MenuItem({
                label: this.vocGlob.delete,
                click: () => {
                    if (window.confirm(this.voc.deleteCardConfirmation)) {
                        db.deleteCard(this.opts.board, this.opts.card)
                        .then(() => db.modifyProject(this.opts.board))
                        .then(() => {
                            this.parent.update();
                        })
                        .catch(window.GenericError);
                    }
                }
            }));
            e.preventDefault();
            menu.popup(e.clientX + 10, e.clientY + 10);
        };
        var freezeGif = () => {
            const img = document.createElement('img'),
                  c = document.createElement('canvas');
            img.onload = () => {
                c.width = img.width;
                c.height = img.height;
                c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
                this.attachedImage.gifSrc = c.toDataURL("image/gif"); // if possible, retain all css aspects
                this.update();
            };
            img.src = this.attachedImage.src;
        };
        this.on('update', () => {
            this.getAttachedImage();
        });
        this.getAttachedImage = () => {
            this.oldAttachedImage = this.attachedImage;
            if (!('attachments' in this.opts.card)) {
                this.attachedImage = false;
                return false;
            }
            for (const attachment of this.opts.card.attachments) {
                if (/(png|gif|jpe?g|webp)/i.test(attachment.format)) {
                    this.attachedImage = {
                        src: 'file://' + attachment.path,
                        file: attachment.path,
                        gif: /gif/i.test(attachment.format)
                    }
                    break;
                }
            }
            if (this.attachedImage && this.attachedImage.gif) {
                if (!this.oldAttachedImage || this.oldAttachedImage.src !== this.attachedImage.src) {
                    freezeGif();
                }
            }
        };
        this.getAttachedImage();
        this.openImage = e => {
            nw.Shell.openItem(this.attachedImage.file);
            e.stopPropagation();
        };
        this.openAttachments = e => {
            if (this.opts.card.attachments.length === 1) {
                let att = this.opts.card.attachments[0];
                if (att.type === 'file' || att.type === 'folder') {
                    nw.Shell.openItem(att.path);
                    e.stopPropagation();
                } else if (att.type === 'url') {
                    nw.Shell.openExternal(att.path);
                    e.stopPropagation();
                } else if (att.type === 'email') {
                    nw.Shell.openExternal('mailto:' + att.name);
                    e.stopPropagation();
                }
            } else {
                window.openCard(this.opts.board, this.opts.card, 'attachments');
                e.stopPropagation();
            }
        };