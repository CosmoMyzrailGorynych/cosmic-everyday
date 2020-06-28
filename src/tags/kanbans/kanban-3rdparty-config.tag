kanban-3rdparty-config
    .dimmer(onclick="{tryClose}" ref="dimmer")
        .aModal.flexfix
            .aModal-aCloseButton(title="{vocGlob.close}" onclick="{close}")
                i.icon-times
            h1.np {mode === 'create'? voc.creatingNewContainer : voc.containerSettings}
            fieldset
                label
                    | {voc.containerName}
                    input(type="text" ref="containerName" value="{container.title}" onchange="{updateTitle}")
                label
                    | {voc.pageAddress}
                    input(type="url" ref="url" value="{container.url}" onchange="{updateUrl}")
                label
                    input(type="checkbox" checked="{container.alwaysLive}" onchange="{toggleAlwaysLive}")
                    |   {voc.keepAlive}
                    br
                    i.dim {voc.keepAliveDescription}
                label(if="{!container.alwaysLive}")
                    input(type="checkbox" checked="{container.VIPPage}" onchange="{toggleVIPPage}")
                    |   {voc.askConfirmationOnSwitch}
                    br
                    i.dim {voc.askConfirmationOnSwitchDescription}
                label(if="{container.alwaysLive}")
                    | {voc.updatePeriod}
                    select(ref="updateInterval" onchange="{updateUpdateInterval}")
                        option(value="" selected="{'' === container.updateInterval}") {voc.updateIntervals.notNeeded}
                        option(value="5m" selected="{'5m' === container.updateInterval}") {voc.updateIntervals['5m']}
                        option(value="15m" selected="{'15m' === container.updateInterval}") {voc.updateIntervals['15m']}
                        option(value="30m" selected="{'30m' === container.updateInterval}") {voc.updateIntervals['30m']}
                        option(value="1h" selected="{'1h' === container.updateInterval}") {voc.updateIntervals['1h']}
                        option(value="3h" selected="{'3h' === container.updateInterval}") {voc.updateIntervals['3h']}
                        option(value="12h" selected="{'12h' === container.updateInterval}") {voc.updateIntervals['12h']}
                        option(value="1d" selected="{'1d' === container.updateInterval}") {voc.updateIntervals['1d']}
                p
                    button(onclick="{refreshFavico}" if="{mode === 'config'}")
                        i.icon-refresh-outline.inlineblock(class="{rotate: refreshingFavico}")
                        span  {this.voc.refreshFavico}
                p
                    button.magenta(onclick="{deleteContainer}" if="{mode === 'config'}")
                        i.icon-trash
                        span  {this.voc.deleteContainer}
            button.magenta(onclick="{close}" if="{mode === 'create'}")
                i.icon-times-outline
                span  {this.vocGlob.cancel}
            button.green(onclick="{applyForm}")
                i.icon-tick-outline
                span  {mode === 'create'? vocGlob.create : vocGlob.apply}
    script.
        this.voc = window.vocabulary.docker;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.docker;
            this.vocGlob = window.vocabulary.global;
        });
        this.mode = this.opts.mode || 'create'; // 'create' | 'config'
        this.container = this.opts.container || {
            title: this.voc.newDock,
            url: 'https://duckduckgo.com/',
            alwaysLive: false,
            updateInterval: '30m'
        };
        this.tryClose = e => {
            if (e.target == this.refs.dimmer) {
                this.close();
            }
        };
        this.close = e => {
            this.parent.creatingContainer = false;
            this.parent.configuringContainer = false;
            if (this.mode === 'config') {
                this.applyForm(e);
            }
            this.parent.update();
        };
        this.applyForm = e => {
            if (!this.refs.url.checkValidity()) {
                window.alert(this.voc.errorUrlIsNotValid);
                return;
            }
            if (this.mode === 'create') {
                this.parent.containers.push(this.container);
                this.parent.creatingContainer = false;
                setTimeout(this.refreshFavico, 0);
            }
            this.parent.configuringContainer = false;
            window.signals.trigger('containersChanged', this.container);
            window.signals.trigger('updateCurrentDockerContainer', this.container);
        };
        this.updateTitle = e => {
            this.container.title = this.refs.containerName.value;
        };
        this.updateUrl = e => {
            if (this.refs.url.checkValidity()) {
                this.container.url = this.refs.url.value;
            }
        };
        this.toggleAlwaysLive = e => {
            this.container.alwaysLive = !this.container.alwaysLive;
        };
        this.toggleVIPPage = e => {
            this.container.VIPPage = !this.container.VIPPage;
        };
        this.updateUpdateInterval = e => {
            this.container.updateInterval = this.refs.updateInterval.value;
        };
        this.deleteContainer = e => {
            var ind = this.parent.parent.containers.indexOf(this.container);
            this.parent.parent.containers.splice(ind, 1);
            this.parent.parent.dock = null;
            window.signals.trigger('containersChanged', null);
        };
        this.refreshFavico = e => {
            this.refreshingFavico = true;
            let domain = this.container.url.split('//')[1].split('/')[0],
                img = document.createElement('img'),
                canv = document.createElement('canvas');
            canv.width = canv.height = 16;
            canv.x = canv.getContext('2d');
            img.onload = () => {
                canv.x.drawImage(img, 0, 0, img.width, img.height, 0, 0, canv.width, canv.height);
                this.container.favico = canv.toDataURL();
                this.refreshingFavico = false;
                window.signals.trigger('containersChanged', this.container);
            }
            img.src = `http://www.google.com/s2/favicons?domain=${domain}&random=${Math.random()}`;
        };
