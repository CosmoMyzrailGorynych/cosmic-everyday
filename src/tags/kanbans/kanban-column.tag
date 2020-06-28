kanban-column(class="{'aKanban' + delphiCase(column.type)}")
    .anExpandColumnButton(if="{column.type === 'collapsed'}" title="{voc.expandColumn.replace('!0!', column.title)}")
        i.icon-maximize-2(style="color: {color};" onclick="{expandColumn}")
    .aColumnHeader(if="{column.type === 'list'}")
        .aColumnMenu
            button(style="color: {column.color}" onclick="{toggleMenu}")
                i.icon-menu.rem
            .options(show="{showMenu}")
                div {voc.listColor}
                .aSwatch(each="{value, key in window.colorPalette.listColors}" style="background: {window.colorPalette[value]};" onclick="{setColumnColor(window.colorPalette[value])}")
                //-
                    label.p
                        input(type="checkbox" checked="{column.dealsList}" onchange="{toggleDealList}")
                        | {voc.makeDealList}
                        |
                        i.aHelper.icon-info(title="{voc.dealListExplanation}")
                | {voc.moveList}
                .aButtonGroup
                    button(onclick="{moveLeft}" if="{board.columns.indexOf(column) > 0}")
                        i.icon-arrow-left
                        span  {voc.moveHere}
                    button(onclick="{moveRight}" if="{board.columns.indexOf(column) < board.columns.length-1}")
                        span {voc.moveThere}
                        |
                        i.icon-arrow-right
                button(onclick="{collapseColumn}")
                    i.icon-minimize-2
                    span  {voc.collapseColumn}
                br
                button.magenta(onclick="{deleteColumn}")
                    i.icon-trash-2
                    span  {voc.deleteColumn}

        input.aListName.ghost.h3(value="{column.title}" type="text" ref="listName"
            style="color: {column.color}"
            onfocus="{rememberListName}" onblur="{tryChangeListName}"
        )
        .clear
    .aKanbanScroll(if="{column.type === 'list'}")
        .aKanbanCardCreator
            textarea.stretchy(placeholder="{voc.newCardPlaceholder}" ref="cardText" oninput="{onAddText}" onkeyup="{checkIfFinishCard}" class="{hover: isCreatingACard, filled: isCreatingACard}")
            .flexrow(if="{isCreatingACard}")
                button(refs="addCardButton"  onclick="{addCard}")
                    i.icon-tick
                    span  {vocGlob.add}
                label-selector(labels="{parent.board.labels}" ref="labelSelector")
        .cards(ref="cards")
            kanban-card(
                each="{cardId in opts.column.cards}"
                card="{cardMap[cardId]}"
                board="{parent.board}"
                no-reorder
                show="{!filter.length || checkFilter(cardMap[cardId])}")
    script.
        var self = this;
        this.filter = [];
        this.column = this.opts.column;
        this.column.type = this.column.type || 'list';

        this.cardMap = this.opts.cardmap || {};
        this.on('update', () => {
            this.cardMap = this.opts.cardmap || {};
        });

        this.voc = window.vocabulary.kanbans;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans;
            this.vocGlob = window.vocabulary.global;
        });

        this.isCreatingACard = false;
        this.showMenu = false;
        this.board = this.parent.board;
        var beforeEditValue,
            key = window.keymage;
        this.rememberListName = e => {
            var beforeEditValue = this.refs.listName.value;
        };
        this.tryChangeListName = e => {
            if (beforeEditValue === this.refs.listName.value) {
                return;
            }
            this.column.title = this.refs.listName.value;
            this.updateBoardColumns(err => {
                if (!err) {
                    this.update();
                }
            });
        };
        this.collapseColumn = e => {
            this.column.type = 'collapsed';
            this.showMenu = false;
            this.updateBoardColumns(err => {this.update();});
        };
        this.expandColumn = e => {
            this.column.type = 'list';
            this.updateBoardColumns(err => {this.update();});
            setTimeout(() => {
                window.Sortable.create(this.refs.cards, sortableOption);
            }, 0);
        };
        this.moveLeft = e => {
            var board = this.parent.board,
                ind = board.columns.indexOf(this.column);
            if (ind > 0) {
                [board.columns[ind], board.columns[ind-1]] = [board.columns[ind-1], board.columns[ind]];
                this.updateBoardColumns(err => {
                    this.parent.update();
                    setTimeout(() => {
                        window.Sortable.create(this.refs.cards, sortableOption);
                    }, 0);
                });
            }
        };
        this.moveRight = e => {
            var board = this.parent.board,
                ind = board.columns.indexOf(this.column);
            if (ind < board.columns.length-1) {
                [board.columns[ind], board.columns[ind+1]] = [board.columns[ind+1], board.columns[ind]];
                this.updateBoardColumns(err => {
                    this.parent.update();
                    setTimeout(() => {
                        window.Sortable.create(this.refs.cards, sortableOption);
                    }, 0);
                });
            }
        };
        this.deleteColumn = e => {
            if (!confirm(this.voc.confirmationDeleteColumn)) {
                return false;
            }
            var board = this.parent.board,
                ind = board.columns.indexOf(this.column);
            if (ind !== -1) {
                board.columns.splice(ind, 1);
                this.updateBoardColumns(() => {
                    this.parent.update();
                });
            }
        };
        this.onAddText = e => {
            this.isCreatingACard = this.refs.cardText.value.length > 0;
        };
        this.addCard = e => {
            var labels = this.refs.labelSelector.selected.map(elt => {return elt._id;});
            var card = {
                title: this.refs.cardText.value,
                labels: labels
            };
            db.createCard(this.parent.board, this.column, card)
            .then(info => {
                card._id = info.id;
                card._rev = info.rev;
                this.parent.cardMap[info.id] = card;
                this.refs.cardText.value = '';
                this.refs.labelSelector.selected = [];
                this.isCreatingACard = false;
                this.update();
            });
        };
        this.checkIfFinishCard = (e) => {
            if (key.stringifyEvent(e) === 'ctrl-return' ||
                key.stringifyEvent(e) === 'return') {
                if (this.refs.cardText.value.trim().length) {
                    this.addCard(e);
                }
            }
        };
        var sortableOption = {
            group: 'kanbanCards',
            onUpdate: evt => {
                let a = [];
                this.column.cards.splice(evt.newIndex, 0, this.column.cards.splice(evt.oldIndex, 1)[0]);
                [this.column.cards, a] = [a, this.column.cards];
                this.update();
                [this.column.cards, a] = [a, this.column.cards];
                this.update();
                window.Sortable.create(this.refs.cards, sortableOption);
                this.updateBoardColumns();
            },
            onAdd: evt => {
                let from = evt.from.prntTag.column,
                    to = evt.to.prntTag.column;
                to.cards.splice(evt.newIndex, 0, from.cards.splice(evt.oldIndex,1)[0]);
                this.updateBoardColumns(() => {
                    let a, b;
                    [a, b] = [from.cards, to.cards];
                    [from.cards, to.cards] = [[],[]];
                    evt.from.prntTag.update();
                    evt.to.prntTag.update();
                    [from.cards, to.cards] = [a,b];
                    evt.from.prntTag.update();
                    evt.to.prntTag.update();
                    window.Sortable.create(evt.from.prntTag.refs.cards, sortableOption);
                    window.Sortable.create(evt.to.prntTag.refs.cards, sortableOption);
                });
            },
            fallbackTolerance: 5
        };
        if (this.column.type === 'list') {
            this.on('mount', function () {
                this.refs.cards.prntTag = this;
                window.Sortable.create(this.refs.cards, sortableOption);
            });
        }
        this.updateBoardColumns = function (cb) {
            db.modifyProject(this.board)
            .then(cb);
        };
        this.toggleMenu = e => {
            this.showMenu = !this.showMenu;
        };
        this.setColumnColor = color => e => {
            this.column.color = color;
            this.updateBoardColumns(err => {});
        };
        /*
        this.toggleDealList = e => {
            this.column.dealsList = !column.dealsList;
            this.updateBoardColumns(err => {});
        };
        */

        // Фильтрация
        window.signals.on('kanbanFilter', keys => {
            this.filter = keys;
            this.update();
        });
        this.checkFilter = card => {
            for (let i = 0, l = this.filter.length; i < l; i++) {
                if (card.labels.indexOf(this.filter[i]._id) !== -1) {
                    return true;
                }
            }
            return false;
        };
