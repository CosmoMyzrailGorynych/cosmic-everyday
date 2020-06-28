kanban-homepage
    h1.inlineblock {voc.boards}
    .clear
    .boards(ref="boards")
        kanban-board(each="{i in opts.boards}" data="{i}")
        .aGridFiller(each="{[1,2,3,4,5,6,7,8,9,10]}")
    script.
        var generateUUID = window.generateUUID;
        this.voc = window.vocabulary.kanbans;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
        });

        var sortableOption = {
            onUpdate: evt => {
                this.opts.boards.splice(evt.newIndex, 0, this.opts.boards.splice(evt.oldIndex, 1)[0]);
                window.Sortable.create(this.refs.boards, sortableOption);
                localStorage.dbs = JSON.stringify(this.opts.boards.map(board => board.id));
                window.signals.trigger('boardsChanged');
            },
            fallbackTolerance: 15,
            filter: '.aGridFiller'
        };
        this.on('mount', () => {
            setTimeout(() => {
                window.Sortable.create(this.refs.boards, sortableOption);
            }, 0);
        });
