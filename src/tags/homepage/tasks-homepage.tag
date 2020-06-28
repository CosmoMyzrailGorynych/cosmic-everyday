tasks-homepage
    h1 {voc.tasks}
    .center(if="{state === 'loading'}")
        i.icon-refresh-outline.rotate
    .aTaskList(if="{state === 'ready'}")
        kanban-card(each="{card in tasks}" card="{card}" noedit="true")
    span(if="{tasks.length === 0 && state === 'ready'}") {voc.noTasksFiller}
    script.
        this.state = 'loading';
        this.tasks = [];
        this.voc = window.vocabulary.homepage;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.homepage;
        });
        this.refresh = () => {
            
        };
        this.refresh();
        window.signals.on('homeOpened', this.refresh);
        window.signals.on('forceRefreshHomepage', this.refresh);
