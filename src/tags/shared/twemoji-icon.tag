twemoji-icon(ref="yielder")
    script.
        this.emoji = this.opts.emoji || '⛔️';
        this.on('update', () => {
            if (this.emoji !== this.opts.emoji) {
                this.emoji = this.opts.emoji || '⛔️';
                if (!this.refs.yielder) {
                    return;
                }
                this.refs.yielder.innerHTML = twemoji.parse(this.emoji, twemojiSettings);
            }
        });
        this.on('mount', () => {
            if (!this.refs.yielder) {
                return;
            }
            this.refs.yielder.innerHTML = twemoji.parse(this.emoji, twemojiSettings);
        });