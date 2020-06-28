background-picker
    h4.npt {voc.uploadedBackgrounds}
    p(if="{uploaded.length === 0}") {voc.noUploadedBackgrounds}
    .backgroundSwatches
        .aBackgroundSwatch(
            each="{background in uploaded}"
            style="background:{background.style};"
            class=`{active: opts.background === 'url("file:///$userWallpapers$/'+background.filename + '")'}`
            onclick="{selectUserBackground}")
    .aFileDrop
        .center
            i.big.icon-image
        | {voc.dropFilesHere}
        input(type="file" refs="imageUploader" accept="image/*" onchange="{uploadImage}")
    h4 {voc.standardBackgrounds}
    .backgroundSwatches
        .aBackgroundSwatch(
            each="{background in standard}"
            style="background: {background.style};"
            class=`{active: opts.background === 'url("/data/wallpapers/'+background.filename + '")'}`
            title="{background.filename}"
            onclick="{selectBackground}")
    script.
        const fs = require('fs-extra');
        const path = require('path');
        const wpPath = path.join(nw.App.dataPath, '/user/wallpapers/');
        const wpPathThumb = path.join(nw.App.dataPath, '/user/wallpaperThumbnails/');
        fs.ensureDir(wpPath);
        fs.ensureDir(wpPathThumb);

        this.voc = window.vocabulary.backgroundPicker;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.backgroundPicker;
            this.vocGlob = window.vocabulary.global;
        });

        this.on('before-mount', () => {
            this.standard = [];
            this.uploaded = [];
            this.updateLocalWP(() => {
                this.updateStandardWP(() => {
                    this.update();
                });
            })
        });

        this.selectBackground = e => {
            this.opts.onupdate && this.opts.onupdate(`url("/data/wallpapers/${e.item.background.filename}")`);
        };
        this.selectUserBackground = e => {
            this.opts.onupdate && this.opts.onupdate('url("file:///$userWallpapers$/' + e.item.background.filename + '")');
        };

        
        this.uploadImage = e => {
            var val = e.target.value,
                guid = window.generateUUID();
            copied = path.join(wpPath, guid + path.extname(val));
            fs.copy(val, copied, err => {
                if (err) {
                    window.GenericError(err);
                    return;
                }
                window.resizeImage(path.join('file://', copied), {
                    width: 256
                }, (buff) => {
                    fs.writeFileSync(path.join(wpPathThumb, path.basename(copied)), buff);
                    this.updateLocalWP( () => {
                        this.update();
                    });
                });
            });
            e.target.value = '';
        };
        this.updateLocalWP = cb => {
            fs.readdir(wpPath, (err, files) => {
                if (err) { cb(err); throw err; }
                this.uploaded = files.map(file => {
                    return {
                        style: `url("${path.normalize(path.join('file://', wpPathThumb, file)).replace(/\\/g,'/')}")`,
                        filename: file
                    }
                });
                cb();
            });
        };
        this.updateStandardWP = cb => {
            fs.readdir('./data/wallpapers/', (err, files) => {
                if (err) { cb(err); throw err; }
                this.standard = files.map(file => {
                    return {
                        style: `url("/data/wallpaperThumbnails/${file}")`,
                        filename: file
                    }
                });
                cb();
            });
        };