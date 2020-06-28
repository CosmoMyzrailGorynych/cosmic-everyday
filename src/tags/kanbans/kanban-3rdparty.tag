kanban-3rdparty
    .flexfix
        .flexrow.kanban-3rdparty-aNavigator.flexfix-header
            button.nogrow(onclick="{refresh}" title="{voc.refreshPage}")
                i.icon-refresh-outline
            input(
                type="url" placeholder="{voc.urlInputPlaceholder}" ref="urlInput" 
                onkeyup="{tryUpdateLocation}" value="{currentUrl}"
            )
            button.nogrow(onclick="{openSettings}" title="{voc.containerSettings}")
                i.icon-cog-outline
            button.nogrow(onclick="{resetSrc}" title="{voc.jumpToStartLocation}")
                i.icon-home-outline
        iframe.flexfix-body(
            src="{currentUrl || opts.dock.url}" ref="webview"
            style="height: 100%;"
            nwUserAgent="{navigator.userAgent} CosmicEveryday/{nw.App.manifest.version}"
            nwdisable nwfaketop
            onload="{onUriChange}" onhashchange="{onUriChange}" onpageshow="{onUriChange}"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation"
        )
    dock-config(if="{configuringContainer}" container="{opts.dock}" mode="config")
    script.
        this.voc = window.vocabulary.docker;
        this.configuringContainer = false;
        const every = require('schedule').every;
        var key = window.keymage;
        this.on('mount', () => {
            this.dock = this.opts.dock;
            this.currentUrl = this.dock.url;
            if (this.dock.updateInterval && this.dock.alwaysLive) {
                this.updateInterval = every(this.dock.updateInterval).do(this.refreshOnInterval);
            }
        });
        window.signals.on('updateCurrentDockerContainer', container => {
            if (container === this.dock) {
                try {
                    this.refresh(null);
                } catch (e) {}
                if (this.dock.alwaysLive && this.dock.updateInterval) {
                    if (this.updateInterval) {
                        this.updateInterval.stop();
                    }
                    this.updateInterval = every(this.dock.updateInterval).do(this.refreshOnInterval);
                } else if (this.wasUpdateActive && !(this.dock.updateInterval !== '' && this.alwaysLive)) {
                    this.updateInterval.stop();
                }
            }
        });
        this.refresh = e => {
            this.refs.webview.contentWindow.location.reload();
        };
        this.refreshOnInterval = () => {
            if (this.parent.dock !== this.dock) {
                this.refs.webview.contentWindow.location.reload();
            }
        };
        this.resetSrc = e => {
            this.refs.webview.contentWindow.location = this.dock.url;
        };
        this.tryUpdateLocation = e => {
            var url = this.refs.urlInput.value;
            if (key.stringifyEvent(e) === 'ctrl-return' ||
                key.stringifyEvent(e) === 'return') {
                if (this.refs.urlInput.checkValidity())  {
                    this.currentUrl = url;
                } else {
                    this.currentUrl = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`
                }
                this.refs.webview.contentWindow.location = this.currentUrl;
            }
        };
        this.onUriChange = e => {
            this.currentUrl = this.refs.webview.contentWindow.location.toString();
        };
        this.openSettings = e => {
            this.configuringContainer = true;
            this.wasUpdateActive = this.dock.updateInterval !== '' && this.alwaysLive;
        };
