calendar-homepage
    h1 {voc.events}
    .center(if="{state === 'loading'}")
        i.icon-refresh-outline.rotate
    .aCalendarList(if="{state === 'ready'}")
        kanban-card(each="{card in cards}" card="{card}" board="{cardProjectMap[card._id]}")
    span(if="{cards.length === 0}") {voc.noEventsFiller}
    script.
        this.state = 'loading';
        this.cards = [];
        this.voc = window.vocabulary.homepage;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.homepage;
        });
        this.refresh = () => {
            this.cardProjectMap = {};
            this.state = 'loading';
            db.getProjects()
            .then(projects => {
                Promise.all(projects.map(project => {
                    const pdb = db[project.id];
                    return pdb.find({
                        selector: {
                            dueTo: {
                                $gt: +(new Date())
                            }
                        }
                    })
                    .then(projResults => {
                        for (const card of projResults.docs) {
                            this.cardProjectMap[card._id] = project;
                        }
                        return projResults.docs;
                    });
                }))
                .then(combined => {
                    this.cards = combined
                        .reduce((prev, next) => prev.concat(next), [])
                        .sort((a, b) => a.dueTo - b.dueTo);
                    this.state = 'ready';
                    this.update();
                });
            })
        };
        this.refresh();
        window.signals.on('homeOpened', this.refresh);
        window.signals.on('forceRefreshHomepage', this.refresh);
