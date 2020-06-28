frame-bar
    .flexrow
        .filler.aDragRegion.center.tiny
            span {document.title}
        button(title="{minimize}" onclick="{minimize}")
            i.icon-minimise-14
        button(title="{toggleMaximize}" onclick="{toggleMaximize}")
            i(class="icon-{restored? 'maximise' : 'restore'}-14")
        button.magenta(title="{vocGlob.close}" onclick="{close}")
            i.icon-close-14
    script.
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.vocGlob = window.vocabulary.global;
        });

        this.restored = true;

        this.close = e => {
            window.close();
        };
        this.minimize = e => {
            nw.Window.get().minimize();
        };
        nw.Window.get().on('restore', () => {
            this.restored = true;
            this.update();
        });
        nw.Window.get().on('maximize', () => {
            this.restored = false;
            this.update();
        });
        this.toggleMaximize = e => {
            if (this.restored) {
                nw.Window.get().maximize();
            } else {
                nw.Window.get().restore();
            }
            this.restored = !this.restored;
        };