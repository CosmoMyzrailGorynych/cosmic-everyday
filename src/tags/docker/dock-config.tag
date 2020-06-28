dock-config
    .dimmer(onclick="{tryClose}" ref="dimmer")
        .aModal.flexfix
            .aModal-aCloseButton(title="{vocGlob.close}" onclick="{close}")
                i.icon-times
            h1.np {mode === 'create'? voc.creatingNewContainer : voc.containerSettings}
            fieldset
                .flexrow
                    label
                        | {voc.containerName}
                        input(type="text" ref="title" value="{container.title}" onchange="{updateTitle}")
                    .spacer.nogrow
                    label.nogrow
                        | {voc.containerIcon}
                        br
                        twemoji-picker(onselect="{onEmojiSelect}" emoji="{container.emoji}")
                label
                    | {voc.pageAddress}
                    input(type="url" ref="url" value="{container.url}" onchange="{updateUrl}")

                hr

                h2 {voc.dockCover}
                background-picker(onupdate="{selectBackground}" background="{container.cover}")
                
                hr

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
                        option(value="* /5 * * * *" selected="{'5m' === container.updateInterval}") {voc.updateIntervals['5m']}
                        option(value="* /15 * * * *" selected="{'15m' === container.updateInterval}") {voc.updateIntervals['15m']}
                        option(value="* /30 * * * *" selected="{'30m' === container.updateInterval}") {voc.updateIntervals['30m']}
                        option(value="0 0 * * * *" selected="{'1h' === container.updateInterval}") {voc.updateIntervals['1h']}
                        option(value="* * /3 * * *" selected="{'3h' === container.updateInterval}") {voc.updateIntervals['3h']}
                        option(value="* * /12 * * *" selected="{'12h' === container.updateInterval}") {voc.updateIntervals['12h']}
                        option(value="0 0 0 * * *" selected="{'1d' === container.updateInterval}") {voc.updateIntervals['1d']}
                hr
                div(if="{mode === 'config'}")
                    p
                        button.magenta(onclick="{deleteContainer}")
                            i.icon-trash
                            span  {this.voc.deleteContainer}
                    hr
            button.magenta(onclick="{close}" if="{mode === 'create'}")
                i.icon-x
                span  {this.vocGlob.cancel}
            button.green(onclick="{applyForm}")
                i.icon-check
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
            emoji: window.getRandomBoardEmoji(),
            url: 'https://duckduckgo.com/',
            alwaysLive: false,
            updateInterval: '',
            background: 'url("/data/wallpapers/dmitry-kotov.jpg")'
        };
        this.tryClose = e => {
            if (e.target == this.refs.dimmer) {
                this.close();
            }
        };
        this.close = e => {
            this.parent.creatingBoard = false;
            this.parent.creationMode = false;
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
                this.parent.docks.push(this.container);
                this.parent.creationMode = false;
            } else {
                this.parent.configuringContainer = false;
            }
            this.parent.update();
            window.signals.trigger('containersChanged', this.container);
            window.signals.trigger('updateCurrentDockerContainer', this.container);
        };
        this.updateTitle = e => {
            this.container.title = this.refs.title.value;
        };
        this.onEmojiSelect = e => {
            this.container.emoji = e;
            if (this.mode === 'config') {
                this.parent.update();
            } else {
                this.update();
            }
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
        this.selectBackground = bg => {
            this.container.cover = bg;
            if (this.mode === 'config') {
                this.parent.update();
            }
        };
        this.deleteContainer = e => {
            var ind = this.parent.parent.docks.indexOf(this.container);
            this.parent.parent.docks.splice(ind, 1);
            this.parent.parent.dock = null;
            this.parent.parent.current = 'home';
            window.signals.trigger('containersChanged', null);
        };