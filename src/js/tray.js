(function (window) {// Create a tray icon

    /* global chrome nw */

    setTimeout(() => {
        var win = nw.Window.get();
        var voc = window.vocabulary.tray;
        nw.App.on('open', () => {
            win.show();
            win.restore();
            win.focus();
        });
        nw.App.on('reopen', () => {
            win.show();
            win.restore();
            win.focus();
        });
        var tray = new nw.Tray({
            title: 'Cosmic Everyday',
            icon: './data/CosmicEveryday.png',
            iconsAreTemplates: false
        });
        var menu = new nw.Menu();
        menu.append(new nw.MenuItem({
            type: 'normal',
            label: voc.openCosmic,
            key: 'c',
            click: () => {
                win.show();
                win.restore();
                win.focus();
            }
        }));
        menu.append(new nw.MenuItem({
            type: 'separator'
        }));
        menu.append(new nw.MenuItem({
            type: 'normal',
            label: voc.quit,
            key: 'q',
            click: () => {
                win.close(true);
            }
        }));
        tray.on('click', () => {
            win.show();
            win.restore();
            win.focus();
        });
        tray.menu = menu;
        var trayRemoved = false;
        var shortcut = new nw.Shortcut({
            key: 'Ctrl+Shift+E',
            failed: (msg) => {
                if (!trayRemoved) {
                    window.sounds.play('error', () => {
                        chrome.tts.speak(voc.couldNotActivateShortcut, {rate: Number(localStorage.readSpeedTitles)});
                    });
                    chrome.notifications.create({
                        type: 'basic',
                        title: voc.couldNotActivateShortcut,
                        message: voc.howToActivateShortcut,
                        iconUrl: './data/icons/Warning.png'
                    });
                    console.error(msg);
                }
            }
        });
        nw.App.registerGlobalHotKey(shortcut);
        shortcut.on('active', () => {
            win.show();
            win.focus();
        });
        win.on('close', () => {
            win.hide();
            setTimeout(() => {
                if (!('closedOnce' in sessionStorage)) {
                    window.sounds.play('notify');
                    chrome.notifications.create({
                        type: 'basic',
                        title: voc.stillHere,
                        message: voc.howToClose,
                        iconUrl: './data/icons/Idea.png'
                    });
                    sessionStorage.closedOnce = true;
                }
            },200);
        });
        window.detachTrayAndHotkeys = () => {
            trayRemoved = true;
            tray.remove();
            tray = null;
            nw.App.unregisterGlobalHotKey(shortcut);
        };
    }, 0);
})(this);
