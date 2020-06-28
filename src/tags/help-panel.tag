help-panel
    h1 {voc.header}
    
    h2 {voc.feedback.header}
    p {voc.feedback.ifYouFaceIssuesContact}
    ul
        li
            a(href="https://discord.gg/CggbPkb") {voc.feedback.discordServer}
        li
            a(href="https://comigo.itch.io/cosmic-everyday/community") {voc.feedback.itchioComunity}
        li
            a(href="http://t.me/CosmicEverydayBot") {voc.feedback.telegramBot}
        li  
            a(href="mailto:admin@nersta.ru") {voc.feedback.mailMe}
    
    h2 {voc.shortcuts.header}

    h3 {voc.shortcuts.global.header}
    dl
        dt Ctrl+Shift+E
        dd {voc.shortcuts.global.openCosmic}

    h3 {voc.shortcuts.cardViewer.header}
    dl
        dt Ctrl+S
        dd {voc.shortcuts.cardViewer.saveCard}
    dl
        dt Ctrl+Enter
        dd {voc.shortcuts.cardViewer.applyTextOrTitle}
    dl
        dt Ctrl+1
        dd {voc.shortcuts.cardViewer.addTodo}
    dl
        dt Ctrl+D
        dd {voc.shortcuts.cardViewer.editDate}
    dl
        dt Ctrl+R
        dd {voc.shortcuts.cardViewer.speakOutLoud}
    dl
        dt Ctrl+T
        dd {voc.shortcuts.cardViewer.editLabels}
    dl
        dt Ctrl+G
        dd {voc.shortcuts.cardViewer.editTitle}
    dl
        dt Ctrl+E
        dd {voc.shortcuts.cardViewer.exportToPDF}
    dl
        dt Ctrl+H
        dd {voc.shortcuts.cardViewer.copyHTMLCode}
    dl
        dt Ctrl+M
        dd {voc.shortcuts.cardViewer.copyMarkdownCode}
    dl
        dt Ctrl+P
        dd {voc.shortcuts.cardViewer.printCard}
    dl
        dt Ctrl+Shift+D
        dd {voc.shortcuts.cardViewer.deleteCardImmediately}
    .spacer
    hr
    .spacer
    .center Cosmic Everyday v{appVersion}
    .spacer
    script.
        this.voc = window.vocabulary.help;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.help;
        });
        this.appVersion = nw.App.manifest.version;
