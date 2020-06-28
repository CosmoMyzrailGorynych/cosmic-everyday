help-homepage
    h1 {voc.header}
    .cards
        .aCard(if="{tabIndex === 1}")
            p {voc.createCards}
            .center
                img(src="/tutorialGifs/{lang}/createCards.gif")
        .aCard(if="{tabIndex === 2}")
            p {voc.createLists}
            .center
                img(src="/tutorialGifs/{lang}/createLists.gif")
        .aCard(if="{tabIndex === 3}")
            p {voc.cardAdvanced}
            .center
                img(src="/tutorialGifs/{lang}/cardAdvanced.gif")
        .aCard(if="{tabIndex === 4}")
            p {voc.customizeBoards}
            .center
                img(src="/tutorialGifs/{lang}/customizeBoards.gif")
        .aCard.wide(if="{tabIndex === 5}")
            p
                em {voc.afterword}
            .center
                button.big(onclick="{startWorking}")
                    i.icon-thumbs-up
                    span  {voc.startWorking}
        .center
            span.aNavDot(each="{ind in [1,2,3,4,5]}" onclick="{navigate}" class="{active: tabIndex === ind}")
    script.
        this.lang = localStorage.appLanguage;
        this.voc = window.vocabulary.homepage.help;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.homepage.help;
        });
        this.tabIndex = 1;
        this.navigate = e => {
            this.tabIndex = e.item.ind;
        };
        this.startWorking = e => {
            localStorage.dontShowHomepageInstruction = 'yes';
            this.parent.showHelp = false;
            this.parent.update();
        };
