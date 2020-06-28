modal-input
    .dimmer(onclick="{tryClose}" ref="dimmer")
        .aModal.flexfix(style="{width? 'width:'+width+'px;' : ''}")
            .aModal-aCloseButton(title="{vocGlob.close}" onclick="{close}")
                i.icon-times
            h2.npt {title}
            form(method="post" onsubmit="{applyForm}" )
                p
                    input(name="input" required type="{opts.type || 'text'}" ref="input" oninvalid="{invalid}")
                    br
                    b(if="{validationMessage}") {validationMessage}
                p(if="{opts.repeat}")
                    span {voc.inputAgain}
                    br
                    input(name="input2" required type="{opts.type || 'text'}" ref="input2" oninvalid="{invalid}")
                    br
                button.magenta(onclick="{close}" type="button")
                    i.icon-times-outline
                    span  {this.vocGlob.cancel}
                button.green(type="submit" onclick="{applyForm}")
                    i.icon-tick-outline
                    span  {mode === 'create'? vocGlob.create : vocGlob.apply}
    script.
        this.voc = window.vocabulary.global.modals;
        this.vocGlob = window.vocabulary.global;

        const register = () => {
            this.voc = window.vocabulary.global.modals;
            this.vocGlob = window.vocabulary.global;
        };
        window.signals.on('updateLocales', register);
        this.on('unmount', () => window.signals.off('updateLocales', register));
    
        this.width = this.opts.width;
        this.title = this.opts.title || this.opts.header || {
            url: this.voc.inputURL,
            email: this.voc.inputEmail,
            password: this.voc.inputPassword
        }[this.opts.type] || '';

        this.tryClose = e => {
            if (e.target == this.refs.dimmer) {
                this.close();
            }
        };
        this.invalid = e => {
            if (typeof e === 'string') {
                this.validationMessage = e;
                return;
            }
            let i = this.refs.input;
            if (i.validationMessage) {
                this.validationMessage = i.validationMessage;
            } else {
                this.validationMessage = void 0;
            }
        };
        this.applyForm = e => {
            e.preventDefault();
            let i = this.refs.input;
            if (this.opts.repeat) {
                let j = this.refs.input2;
                if (i.value !== j.value) {
                    this.invalid(this.vocGlob.passwordsDontMatch);
                    return false;
                } else {
                    this.invalid('');
                }
            }
            this.opts.onapply(i.value);
        };
        this.close = e => {
            this.opts.onapply(null);
        };
