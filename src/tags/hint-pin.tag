hint-pin(onclick="{tryOpen}" if="{this.show}")
    .aHintPin-aContent
        i.icon-cross.red(onclick="{close}")
        yield
    script.
        this.opened = false;
        this.key = this.opts.key;
        this.show = true;
        if (this.key in localStorage.hintPins) {
            this.show = false;
        }
        this.close = e => {
            localStorage.hintPins[this.key] = 'closed';
        };
        this.tryOpen = e => {
            this.opened = true;
        };
