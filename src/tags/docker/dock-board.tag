dock-board(
    ref="root" 
    onclick="{openDock}"
    class="{image: (board.cover || '').indexOf('url(' !== -1)}"
    title="{board.title}"
)
    .bg(style="background: {tryReplaceUserBG(board.cover)};")
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
        this.openDock = event => {
            window.switcher.current = 'dock';
            window.switcher.currentDock = this.board;
            window.switcher.update();
        };
