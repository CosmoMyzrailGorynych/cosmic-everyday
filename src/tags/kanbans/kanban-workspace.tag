kanban-workspace(id="{board.id}" style="background: {tryReplaceUserBG(board.background)}")
    .kanban-tone(
        if="{board}"
        style="opacity: {'toneOpacity' in board ? board.toneOpacity : 0.65};")
    .kanban-workspace-aHeader
        h1.inlineblock(if="{board}")  {board.title}
        span.nogrow {voc.cardFilter}
        label-selector.nogrow(ref="cardFilter" labels="{board.labels}" onchange="{onFilterChange}")
        button.nogrow.nmt(onclick="{showConfigs}")
            i.icon-settings
            |  {voc.boardSettings}
    .aHorisontalWrap(if="{state === 'ready' && board}" )
        .kanban-columns(ref="columns")
            kanban-column(
                each="{column in opts.board.columns}"
                column="{column}"
                cardmap="{cardMap}"
            )
            .inlineblock(style="margin-top: 3rem;")
                button(onclick="{createList}")
                    i.icon-plus
                    span  {voc.addList}
                br
    kanban-config(if="{configuringBoard}" board="{board}" mode="config")
    .dimmer.loading(if="{state === 'loading'}")
        .middleinner
            i.icon-star.wiggle
            br
            | {vocGlob.loading}
    script.
        this.state = 'loading';
        this.voc = window.vocabulary.kanbans;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
            this.vocGlob = window.vocabulary.global;
        });
        window.kanbanWorkspace = this;
        this.editingCard = null;
        this.configuringBoard = false;
        this.cardMap = {};
        const path = require('path');
        const nwGUI = require('nw.gui');
        this.on('before-mount', event => {
            this.state = 'loading';
            this.board = this.opts.board;
        });
        this.tryReplaceUserBG = url => url
            .replace('/$userWallpapers$', 
                path.join(nwGUI.App.dataPath, '/user/wallpapers/'))
            .replace(/\\/g, '/');
        var sortableOption = {
            onEnd: evt => {
                this.board.columns.splice(evt.newIndex, 0, this.board.columns.splice(evt.oldIndex, 1)[0]);
                this.update();
                window.Sortable.create(this.refs.board.columns, sortableOption);
                this.updateBoardColumns();
            }
        };
        this.showConfigs = e => {
            this.configuringBoard = true;
        };
        this.refresh = e => {
            this.state = 'loading';
            this.board = this.opts.board;
            if (!this.board) {
                return;
            }
            db.loadProject(this.opts.board.id)
            .then(cards => {
                this.cards = cards;
                for (const card of cards) {
                    this.cardMap[card._id] = card;
                }
                this.state = 'ready';
                if (this.refs.cardFilter) {
                    this.refs.cardFilter.selected = [];
                }
                this.update();
            })
            .catch(window.GenericError);
        };
        window.signals.on('forceKanbanWorkspaceRefresh', () => {
            this.refresh(null);
        });
        this.on('mount', this.refresh); 
        this.createList = e => {
            var list = {
                type: 'list',
                title: this.voc.newList,
                cards: [],
                color: window.colorPalette.cyan
            };
            this.board.columns.push(list);
            window.db.modifyProject(this.board)
            .then(() => this.update());
        };
        this.createSeparator = e => {
            var list = {
                type: 'separator',
                title: this.voc.newSeparator,
                cards: [],
                color: window.colorPalette.cyan
            };
            this.board.columns.push(list);
            window.db.modifyProject(this.board)
            .then(() => this.update());
        };
        var sortableOption = {
            //group: 'kanbanColumns',
            onEnd: function (evt) {
                self.columns.splice(evt.newIndex, 0, self.columns.splice(evt.oldIndex, 1)[0]);
                var temp = self.columns;
                self.columns = [];
                self.update();
                self.columns = temp;
                self.update();
                window.Sortable.create(this.refs.columns, sortableOption);
            },
            fallbackTolerance: 5
        };
        
        // фильтры
        this.onFilterChange = (e, keys) => {
            window.signals.trigger('kanbanFilter', keys);
        };
