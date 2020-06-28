var isWin = (/^win/).test(process.platform),
    splash,
    launchMinimised = Boolean(localStorage.ifLaunchMinimised);

// open a hidden main window
// and in index.html, it's responsible to show the window when it's fully loaded

if (isWin && !launchMinimised) {
    // open a frameless splash window
    nw.Window.open('splash.html', {
        frame: false,
        width: 450,
        height: 300,
        resizable: false
    }, function (newWin) {
        splash = newWin;
    });
}

nw.Window.open('index.html', {
    show: !isWin && !launchMinimised,
    width: 1024,
    height: 600,
    frame: false,
    'min_width': 480,
    icon: './data/CosmicEveryday.png'
}, (newWin) => {
    if (isWin) {
        newWin.on('loaded', () => {
            if (!launchMinimised && splash) {
                splash.close(true);
                splash = null;
            }
        });
    }
});

