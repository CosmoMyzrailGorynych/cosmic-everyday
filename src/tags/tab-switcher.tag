tab-switcher
    frame-bar
    ul.navTabs(ref="tabs")
        li(title="{voc.home}" onclick="{openHome}" class="{active: current === 'home'}")
            i.icon-home
            span {voc.home}
        li(each="{i in boards}" class="{active: i === board && current === 'kanbans'}" onclick="{switchBoard}")
            twemoji-icon(emoji="{i.emoji || '✨'}")
            span {i.title}
        li(each="{i in docks}" class="{active: i === currentDock && current === 'dock'}" onclick="{switchDock}")
            twemoji-icon(emoji="{i.emoji || '✨'}")
            span {i.title}
        li(title="{voc.addBoard}" onclick="{createNewBoard}")
            i.icon-plus
            span {voc.addBoard}

        .filler
        li(title="{voc.donate}" onclick="{openDonations}" class="{active: current === 'donate'}")
            i.icon-heart
            span {voc.donate}
        li(title="{voc.help}" onclick="{openHelp}" class="{active: current === 'help'}")
            i.icon-life-buoy
            span {voc.help}
        li(title="{voc.settings}" onclick="{openSettings}" class="{active: current === 'settings'}")
            i.icon-settings
            span {voc.settings}
        li(title="{voc.lockCosmicEveryday}" if="{'entryHash' in localStorage}" onclick="{lockCosmicEveryday}")
            i.icon-lock
            span {voc.lockCosmicEveryday}

    .aView
        .aHomePanel(show="{current === 'home'}")
            kanban-homepage(boards="{boards}")
            docks-homepage(docks="{docks}")
            calendar-homepage(boards="{boards}")
            lifehack-line
        kanban-workspace(board="{board}" if="{current === 'kanbans' && board}" data-hotkey-scope="kanban")

        docker-dock(each="{d in docks}" dock="{d}" if="{d.alwaysLive}" show="{d === currentDock && current === 'dock'}")
        docker-dock(dock="{currentDock}" if="{current === 'dock' && currentDock && !currentDock.alwaysLive}")

        donate-panel(if="{current === 'donate'}" data-hotkey-scope="donate")
        help-panel(if="{current === 'help'}")
        settings-panel(show="{current === 'settings'}" data-hotkey-scope="settings")
    kanban-config(if="{creationMode === 'createNew'}" creating="true" data-hotkey-scope="kanban-config")
    kanban-card-viewer(if="{editingCard}" card="{editingCard}" board="{cardBoard}")
    track-panel(card="{trackedCard}" board="{trackedBoard}" if="{trackedBoard}")
    kanban-creation-dialogue(if="{creatingBoard}")
    dock-config(if="{creationMode === '3rdParty'}" creating="true" data-hotkey-scope="docker-config")
    locker-screen
    script.
        window.switcher = this;
        this.voc = window.vocabulary.switcher;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.switcher;
            this.vocGlob = window.vocabulary.global;
        });
        this.creatingBoard = false;
        this.creationMode = false;
        this.boards = [];
        this.tabs = [];
        this.current = 'home';

        const key = window.keymage;

        window.openCard = (board, card) => {
            if (this.editingCard) {
                window.signals.one('cardViewerClosed', window.doOpenCard.bind(this, board, card));
                window.signals.trigger('forceCardViewerClose');
            } else {
                window.doOpenCard(board, card);
            }
        };
        window.doOpenCard = (board, card) => {
            this.editingCard = card;
            this.cardBoard = board;
            this.update();
        };

        this.updateBoards = () => {
            db.getProjects()
            .then(boards => {
                this.boards = boards;
                if (this.boards.length) {
                    if (!this.board || !this.boards.some(board => {
                        return board.id == this.board.id;
                    })) {
                        this.current = 'home';
                        this.board = void 0;
                    }
                    this.update();
                    window.signals.trigger('forceKanbanWorkspaceRefresh');
                } else {
                    db.setupFirstProject()
                    .then(this.updateBoards);
                }
            })
            .catch(err => window.DBError(err));
        };
        window.signals.on('boardsChanged', () => {
            this.updateBoards();
        });
        window.signals.on('boardsUpdate', () => {
            this.update();
        });
        window.signals.on('updateSwitcher', () => {
            this.update();
        });
        this.on('before-mount', event => {
            this.updateBoards();
        });
        this.switchBoard = event => {
            this.board = false;
            this.currentDock = false;
            this.current = 'kanbans';
            this.update();

            this.board = event.item.i;
            document.title = this.board.title + ' · Cosmic Everyday';
            window.hotkeys.scope = 'kanban';
            setTimeout(() => {
                window.kanbanWorkspace.refresh(event);
                window.kanbanWorkspace.update();
            }, 0);
        };
        this.switchDock = e => {
            this.board = false;
            this.currentDock = false;
            this.update();

            this.current = 'dock';
            this.currentDock = event.item.i;
            document.title = this.currentDock.title + ' · Cosmic Everyday';
            window.hotkeys.scope = 'docker';
        };
        this.createNewBoard = e => {
            this.creatingBoard = true;
        };

        // Misc

        this.openHome = e => {
            document.title = 'Cosmic Everyday';
            this.current = 'home';
            window.hotkeys.scope = 'home';
            window.signals.trigger('homeOpened');
        };
        window.signals.on('openHomepage', this.openHome);
        this.openHelp = e => {
            document.title = this.voc.help + ' · Cosmic Everyday';
            this.current = 'help';
            window.hotkeys.scope = 'help';
        };
        this.openDonations = e => {
            document.title = this.voc.donate + ' · Cosmic Everyday';
            this.current = 'donate';
            window.hotkeys.scope = 'donate';
        };
        this.openSettings = e => {
            document.title = this.voc.settings + ' · Cosmic Everyday';
            this.current = 'settings';
            window.hotkeys.scope = 'settings';
        };
        this.lockCosmicEveryday = e => {
            window.signals.trigger('lockScreen');
        };


        // Docks

        this.currentDock = null;
        this.docks = [];
        const fs = require('fs-extra'),
              path = require('path');
        const dockerFile = path.join(nw.App.dataPath, 'dockerContainers.json');
        window.signals.on('containersChanged', container => {
            fs.outputJSON(dockerFile, this.docks, err => {
                if (err) {
                    window.GenericError(err);
                }
            });
            if (container) {
                this.currentDock = container;
                this.current = 'dock';
            }
            this.update();
        });
        this.switchContainer = e => {
            if (this.currentDock && this.currentDock.VIPPage && !window.confirm(this.voc.confirmSwitch)) {
                return;
            }
            this.currentDock = e.item.docky;
        };
        this.createNewContainer = e => {
            this.creatingContainer = true;
        };
        fs.access(dockerFile, (err) => {
            if (err) {
                this.docks = [];
                fs.outputJSON(dockerFile, this.docks, err => {
                    if (err) {
                        window.GenericError(err);
                    }
                });
            } else {
                fs.readJson(dockerFile, (err, json) => {
                    if (!err) {
                        this.docks = json;
                        this.update();
                    } else {
                        window.GenericError(err);
                    }
                });
            }
        });
