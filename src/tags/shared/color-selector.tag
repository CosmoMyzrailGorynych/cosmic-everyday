color-selector
    .aSwatch.big(style="background-color: {val};" onclick="{togglePicker}")
    .options(show="{opened}")
        .option.aSwatch(each="{color in window.colorPalette.tagColors}" class="{active: window.colorPalette[color] === val}" onclick="{pickColor(color)}" style="background-color: {window.colorPalette[color]};")
    script.
        this.opened = false;
        this.val = this.opts.val || window.colorPalette[window.colorPalette.tagColors[0]];

        this.togglePicker = e => {
            this.opened = !this.opened;
        };
        this.pickColor = color => e => {
            this.val = window.colorPalette[color];
            this.opened = false;
            if (this.opts.onchange) {
                this.opts.onchange(e, this.val);
            }
        };