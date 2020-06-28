label-selector
    .select(onclick="{toggleOpened}" class="{active: opened}")
        span(if="{selected.length === 0}") {voc.labels}
        .aLabel(each="{selected}" style="background: {color}66; border-color: {color}" title="{this.title}")
            twemoji-icon(emoji="{emoji}")
    .options(show="{opened}")
        .option(each="{opts.labels}" onclick="{toggleSelected}" class="{active: parent.opts.labels.indexOf(this._id) !== -1}")
            .aLabel.wide(style="background: {color}66; border-color: {color}" title="{title}")
                twemoji-icon(emoji="{emoji}")
                span  {title}
    script.
        this.selected = [];
        this.opened = false;
        this.voc = window.vocabulary.kanbans;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
        });
        this.toggleOpened = e => {
            this.opened = !this.opened;
        };
        this.toggleSelected = e => {
            var ind = this.selected.indexOf(e.item);
            if (ind === -1) {
                this.selected.push(e.item);
            } else {
                this.selected.splice(ind,1);
            }
            if (this.opts.onchange) {
                this.opts.onchange(e, this.selected);
            }
        };
