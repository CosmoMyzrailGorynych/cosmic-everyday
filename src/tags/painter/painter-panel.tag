painter-panel(ref="root")
    canvas#thePainterCanvas(ref="canvas" width="500", height="500")
    .painter-Utils
        button(onclick="{copyCanvas}" title="{voc.copy}") 
            i.icon-arrow-forward-outline
            span   {voc.copy}
        button(onclick="{exportCanvas}" title="{voc.exportCanvas}") 
            i.icon-download-outline.icon-download-outline2
            span   {voc.exportCanvas}
        button(onclick="{tryClearCanvas}" title="{voc.clearCanvas}") 
            i.icon-eraser
            span   {voc.clearCanvas}
        button.yellow(if="{!saved}" onclick="{save}" title="{voc.save}") 
            i.icon-warning-outline
            span   {voc.save}
        button(if="{saved}" title="{voc.saved}") 
            i.icon-thumbs-up
            span   {voc.saved}
    .painter-Tools
        .aButtonGroup
            button(title="{voc.pencilDescription}" onclick="{selectPencil}" class="{active: tool === 'pencil'}")
                i.icon-pencil
            button(title="{voc.penDescription}" onclick="{selectPen}" class="{active: tool === 'pen'}")
                i.icon-pen
            button(title="{voc.brushDescription}" onclick="{selectBrush}" class="{active: tool === 'brush'}")
                i.icon-brush
            button(title="{voc.paintbucketDescription}" onclick="{selectBucket}" class="{active: tool === 'paintbucket'}")
                i.icon-paintbucket
            button(title="{voc.eraserDescription}" onclick="{selectEraser}" class="{active: tool === 'eraser'}")
                i.icon-eraser
            //button(title="{voc.pipetteDescription}" onclick="{selectPipette}" class="{active: tool === 'pipette'}")
                i.icon-pipette
        span#thePainterWidthLabel {voc.lineWeight}
        .inlineblock(ref="weightSlider")
    .painter-Backgrounds
    .painter-aBrushPreview(style="width: {canvas.weight}px; height: {canvas.weight}px;" if="{showBrushPreview}")
    .painter-aPalette
        .aSwatch.big(style="background-color: {currentColor};" onclick="{togglePicker}")
        .painter-aPickerContainter.cp-default(ref="pickerContainter" show="{showPicker}")
        .aSwatch(each="{color in window.colorPalette.painterColors}" onclick="{pickColor(color)}" style="background-color: {window.colorPalette[color]};")
    input(type="file" style="display: none;" ref="fileSaver" onchange="{finishExport}" nwsaveas="{voc.sketchFileName} {(new Date()).toLocaleDateString()}.png")
    script.
        const fs = require('fs-extra'),
              path = require('path'),
              nwGUI = require('nw.gui');
        var clipboard = nw.Clipboard.get(),
            savePath = path.join(nwGUI.App.dataPath, '/user/atrament.png');
        fs.ensureDir(path.dirname(savePath));
        this.tool = 'brush';
        this.saved = true;
        this.currentColor = window.colorPalette.cyan;
        this.showPicker = false;
        this.showBrushPreview = false;
        this.background = 'transparent';
        this.voc = window.vocabulary.painter;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.painter;
            this.vocGlob = window.vocabulary.global;
        });
        this.weight = 4;
        this.on('mount', () => {
            setTimeout(() => {
                var root = this.refs.root;
                this.slider = this.refs.weightSlider;
                this.canvas = atrament('#thePainterCanvas', window.innerWidth - 56, window.innerHeight, window.colorPalette.cyan);
                this.refs.canvas.addEventListener('mouseup', () => {
                    this.saved = false;
                    this.saveDelayed();
                    this.update();
                });
                fs.access(savePath, fs.constants.F_OK | fs.constants.R_OK, err => {
                    if (!err) {
                        var img = document.createElement('img');
                        img.onload = () => {
                            var c = this.refs.canvas,
                                ctx = c.getContext('2d'),
                                a = ctx.globalAlpha;
                            ctx.globalAlpha = 1;
                            if (c.width >= img.width && c.height >= img.height) {
                                ctx.drawImage(img, 0, 0);
                            } else {
                                var kw = img.width / c.width,
                                    kh = img.height / c.height,
                                    k = Math.max(kw, kh)
                                ctx.drawImage(img, 0, 0, img.width / k, img.height / k);
                            }
                            ctx.globalAlpha = a;
                            img = void 0;
                        };
                        img.src = path.join('file://', savePath);
                    }
                });
                this.selectBrush(null);
                this.picker = ColorPicker(this.refs.pickerContainter, hex => {
                    this.currentColor = hex;
                    this.canvas.color = this.currentColor;
                    if (this.tool === 'brush') {
                        this.canvas.opacity = 0.95; 
                    }
                    this.update();
                });
                noUiSlider.create(this.slider, {
                    start: 4,
                    connect: [true, false],
                    range: {
                        min: 1,
                        '20%': 10,
                        '50%': 50,
                        max: 250
                    }
                });
                this.slider.noUiSlider.on('start', () => {
                    this.showBrushPreview = true;
                    this.update();
                });
                this.slider.noUiSlider.on('end', () => {
                    this.showBrushPreview = false;
                    this.update();
                });
                this.slider.noUiSlider.on('slide', vals => {
                    this.weight = Number(vals[0]);
                    if (this.tool !== 'brush') {
                        this.canvas.weight = this.weight;
                    } else {
                        this.canvas.weight = this.weight * 2;
                    }
                    this.update();
                })
            }, 1000);
        });
        this.togglePicker = e => {
            this.showPicker = !this.showPicker;
            if (this.showPicker) {
                setTimeout(() => this.picker.setHex(this.currentColor), 0);
            }
        };
        this.pickColor = color => e => {
            this.currentColor = window.colorPalette[color];
            this.canvas.color = this.currentColor;
            this.picker.setHex(this.currentColor);
        };
        this.selectPencil = e => {
            this.tool = 'pencil';
            this.canvas.mode = 'draw';
            this.canvas.smoothing = false;
            this.canvas.adaptiveStroke = false;
            this.canvas.opacity = 1; 
            this.canvas.weight = this.weight;
        };
        this.selectPen = e => {
            this.tool = 'pen';
            this.canvas.mode = 'draw';
            this.canvas.smoothing = true;
            this.canvas.adaptiveStroke = false;
            this.canvas.opacity = 1; 
            this.canvas.weight = this.weight;
        };
        this.selectBrush = e => {
            this.tool = 'brush';
            this.canvas.mode = 'draw';
            this.canvas.smoothing = true;
            this.canvas.adaptiveStroke = true;
            this.canvas.weight = this.weight * 2;
            this.canvas.opacity = 0.975; 
        };
        this.selectBucket = e => {
            this.tool = 'bucket';
            this.canvas.mode = 'fill';
            this.canvas.opacity = 1; 
        };
        this.selectEraser = e => {
            this.tool = 'eraser';
            this.canvas.mode = 'erase';
            this.canvas.smoothing = false;
            this.canvas.adaptiveStroke = false;
            this.canvas.opacity = 1; 
            this.canvas.weight = this.weight;
        };
        this.selectPipette = e => {
            this.tool = 'pipette';
        };
        this.save = () => {
            var base64Data = this.canvas.toImage().replace(/^data:image\/png;base64,/, '');
            fs.writeFile(savePath, base64Data, 'base64', err => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.saved = true;
                this.update();
            });
        };
        this.tryClearCanvas = e => {
            if (confirm(this.voc.clearCanvasConfirm)) {
                var c = this.refs.canvas,
                    ctx = c.getContext('2d');
                ctx.clearRect(0,0,c.width, c.height);
            }
        };
        this.saveDelayed = window.debounce(this.save, 1000 * 30);
        this.copyCanvas = e => {
            clipboard.set(this.canvas.toImage(), 'png');
        };
        this.exportCanvas = e => {
            this.refs.fileSaver.click();
        };
        this.finishExport = e => {
            var i = this.refs.fileSaver,
                v = i.value;
            var base64Data = this.canvas.toImage().replace(/^data:image\/png;base64,/, '');
            if (v.substr(-4) !== '.png') {
                v = v + '.png';
            }
            fs.writeFile(v, base64Data, 'base64', err => {
                if (err) {
                    console.error(err);
                }
            });
            i.value = '';
        };
        this.onResizeDelayed = window.debounce(() => {
            var c = document.createElement('canvas'),
                c2 = this.refs.canvas;
            c.width = c2.width;
            c.height = c2.height;
            var ctx = c.getContext('2d'),
                ctx2 = c2.getContext('2d');
            ctx2.save();
            ctx.drawImage(c2, 0, 0);
            c2.width = window.innerWidth - 56;
            c2.height = window.innerHeight;
            ctx2.restore();
            this.canvas.mode = this.canvas.mode;
            this.canvas.color = this.currentColor;
            ctx2.lineCap = 'round';
            ctx2.lineJoin = 'round';
            if (c2.width >= c.width && c2.height >= c.height) {
                ctx2.drawImage(c, 0, 0);
            } else {
                var kw = c.width / c2.width,
                    kh = c.height / c2.height,
                    k = Math.max(kw, kh)
                ctx2.drawImage(c, 0, 0, c.width / k, c.height / k);
            }
            if (this.tool === 'brush') {
                this.canvas.opacity = 0.975; 
            }
        }, 300);
        window.addEventListener('resize', this.onResizeDelayed);
