kanban-board(ref="root" 
             onclick="{openBoard}"
             class="{image: board.background.indexOf('url(' !== -1)}"
             title="{board.title}"
    )
    .bg(style="background: {tryReplaceUserBG(board.background)};")
    .spacer
    h3(ref="title") {board.title}
    .aBoardPin
        twemoji-icon(emoji="{board.emoji || '✨'}")
    script.
        this.voc = window.vocabulary.kanbans;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
            this.vocGlob = window.vocabulary.global;
        });
        this.board = this.opts.data;
        this.deleting = false;
        const path = require('path');
        const nwGUI = require('nw.gui');
        this.tryReplaceUserBG = url => url
            .replace('/$userWallpapers$', 
                path.join(nwGUI.App.dataPath, '/user/wallpapers'))
            .replace(/\\/g, '/');
        this.openBoard = event => {
            window.switcher.current = 'kanbans';
            window.switcher.board = this.board;
            window.switcher.update();
            setTimeout(() => {
                window.signals.trigger('forceKanbanWorkspaceRefresh');
            },0);
        };
        this.deleteBoard = e => {
            e.stopPropagation();
            if (!window.confirm(this.voc.deleteBoardConfirmation)) {
                return;
            }
            this.deleting = true;
            let deletePromises = [];
            this.board.columns.forEach(column => {
                column.cards.forEach(card =>
                    window.db.kanbanCards.get(card._id)
                    .then(card => {
                        card._deleted = true;
                        return window.db.kanbanCards.put(card);
                    }));
            });
            deletePromises.push(new Promise((resolve, reject) => {
                window.db.kanbanBoards.get(this.board._id)
                .then(doc => {
                    window.db.kanbanBoards.remove(doc, {}, err => {
                        if (err) {
                            return window.DBError(err);
                        }
                        setTimeout(() => {
                            this.parent.boards.splice(this.parent.boards.indexOf(this.board), 1);
                            resolve();
                            this.parent.update();
                        }, 500);
                    });
                })
                .catch(err => window.DBError(err));
            }));
            Promise.all(deletePromises).then(() => {
                window.signals.trigger('forceRefreshHomepage');
            });
            e.preventDefault();
        };
