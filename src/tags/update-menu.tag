update-menu
    .dimmer(onclick="{checkIfClose}" ref="dimmer" if="{showUpdate}")
        .aModal
            .aModal-aCloseButton(title="{vocGlob.close}" onclick="{close}")
                i.icon-x
            h1.npt {voc.updateAvailable}
            .center
                button.big.green(onclick="{startDownload}")
                    i.icon-download
                    span   {voc.downloadUpdate}
                    div
                        small ({downloadSize})
            p(if="{loadingChangelog}") {voc.loadingChangelog} 
            p(if="{!loadingChangelog}" ref="changelog") {changelog} 
    script.
        this.loadingChangelog = true; 
        const formatBytes = (bytes, decimals) => {
            if (bytes === 0) {return '0 Bytes';}
            var k = 1000,
                dm = decimals + 1 || 2,
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };
        const self = this; 
        const manifest = require('./package.json');
        const path = require('path'),
              fs = require('fs-extra');
        this.voc = window.vocabulary.updater;
        this.vocGlob = window.vocabulary.global;
        const voc = this.voc;
        const checkUpdate = () => {
            fetch(new Request(manifest.manifestUrl + '?cache=' + Math.random()))
            .then(response => response.json())
            .then(json => {
                console.log(json);
                let platform = process.platform;
                if (platform === 'win32' && (
                    process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')
                )) {
                    platform = 'win64';
                }
                if (nw.App.manifest.version !== json.version) {
                    this.showUpdate = true;
                    this.downloadData = json.packages[platform];
                    this.downloadSize = formatBytes(this.downloadData.size, 1);
                    this.downloadUrl = this.downloadData.url;
                    console.log(this.downloadUrl);
                    window.sounds.play('notify');
                    nw.Window.get().show();
                    
                    fetch(manifest.changelogUrl + '?cache=' + Math.random()) 
                    .then(response => { 
                        if (response.ok) { 
                            return response.text(); 
                        } 
                    }) 
                    .then(text => {
                        if (text) { 
                            const md = require('markdown-it')(); 
                            self.loadingChangelog = false; 
                            self.update(); 
                            self.refs.changelog.innerHTML = md.render(text); 
                        } 
                    }); 
                    this.update();
                }
            })
            .catch(error => {
                window.GenericError(error, this.voc.fetchingManifestFailed);
            });
        };
        this.checkIfClose = e => {
            if (e.target === this.refs.dimmer) {
                this.close();
            }
        };
        this.close = e => {
            this.showUpdate = false;
        };
        this.startDownload = e => {
            nw.Shell.openExternal(this.downloadUrl);
        };
        /**
         * itch.io creates an .itch folder to store its metadata if the app was downloaded via itch.io desktop client.
         * In that situation, the responsibility to update CosmicEveryday lies on itch.io's butler 
         * and self-made updates must be skipped.
         */
        fs.stat(path.join(process.execPath, '.itch'), err => {
            if (err) {
                setTimeout(checkUpdate, 1000 * 30);
                setInterval(checkUpdate, 1000 * 60 * 60 * 24);
            }
        });
