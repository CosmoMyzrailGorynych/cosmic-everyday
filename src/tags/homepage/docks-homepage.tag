docks-homepage
    h1(if="{opts.docks.length}").inlineblock {voc.thirdPartyNotebooks}
    .clear
    .boards(ref="docks")
        dock-board(each="{i in opts.docks}" data="{i}")
        .aGridFiller(each="{[1,2,3,4,5,6,7,8,9,10]}")
    script.
        this.voc = window.vocabulary.docker;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.docker;
        });

        var sortableOption = {
            onUpdate: evt => {
                this.opts.docks.splice(evt.newIndex, 0, this.opts.docks.splice(evt.oldIndex, 1)[0]);
                window.Sortable.create(this.refs.docks, sortableOption);
                window.signals.trigger('containersChanged');
            },
            fallbackTolerance: 15,
            filter: '.aGridFiller'
        };
        this.on('mount', () => {
            setTimeout(() => {
                window.Sortable.create(this.refs.docks, sortableOption);
            }, 0);
        });

        window.signals.on('containersChanged', this.update);