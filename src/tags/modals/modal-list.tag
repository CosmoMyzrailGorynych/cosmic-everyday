modal-list
    .dimmer(onclick="{tryClose}" ref="dimmer")
        .aModal.flexfix(ref="modal" style="{width? 'width:'+width+'px;' : ''}")
            .aModal-aCloseButton(title="{vocGlob.close}" onclick="{close}")
                i.icon-times
            h2.npt {title}
            .aListRow(each="{item, i in list}")
                input.ghost(type="text" value="{item}" onchange="{saveItem}" onkeyup="{tryCreateNextItem}")
                i.magenta.icon-backspace-outline(title="{vocGlob.delete}" onclick="{deleteItem}")
            p
                button(onclick="{addItem}" type="button")
                    i.icon-plus-outline
                    span {vocGlob.add}
            button.magenta(onclick="{close}" type="button")
                i.icon-times-outline
                span  {this.vocGlob.cancel}
            button.green(onclick="{applyForm}")
                i.icon-tick-outline
                span {vocGlob.apply}
    script.
        this.voc = window.vocabulary.global.modals;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.global.modals;
            this.vocGlob = window.vocabulary.global;
        });
        var key = window.keymage;
        this.on('before-mount', () => {
            this.type = this.opts.type || 'text';
            this.width = this.opts.width;
            this.list = this.opts.list.slice(0) || [];
            this.title = this.opts.title || '';
        });
        this.tryClose = e => {
            if (e.target == this.refs.dimmer) {
                this.close();
            }
        };
        this.deleteItem = e => {
            this.list.splice(e.item.i, 1);
        };
        this.tryCreateNextItem = e => {
            if (key.stringifyEvent(e) === 'ctrl-return' ||
                key.stringifyEvent(e) === 'return') {
                if (this.list.indexOf(e.item.item) === this.list.length-1) {
                    if (e.target.value.length) {
                        this.list.push('');
                        setTimeout(() => {
                            let inputs = this.refs.modal.querySelectorAll('input[type="text"]');
                            inputs[inputs.length-1].focus();
                        }, 0);
                    } else {
                        this.list.pop();
                    }
                }
            }
        };
        this.addItem = e => {
            this.list.push('');
            setTimeout(() => {
                let inputs = this.refs.modal.querySelectorAll('input[type="text"]');
                inputs[inputs.length-1].focus();
            }, 0);
        };
        this.saveItem = e => {
            this.list[e.item.i] = e.target.value;
        };
        this.applyForm = e => {
            e.preventDefault();
            this.opts.onapply(this.list);
        };
        this.close = e => {
            this.opts.onapply(null);
        };
