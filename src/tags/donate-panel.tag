donate-panel
    h1 {voc.header}

    .fourty.npl
        img.wide(src="data/CosmicEveryday.png")
    .sixty.npr
        p.big {voc.introParagraph}
    .clear
    p.center
        span.big {voc.severalWays}

    .center
        button(onclick="{openLink('https://patreon.com/comigo')}")
            i.icon-heart
            span   {voc.supportOnPatreon}
        button(onclick="{openLink('http://comigo.itch.io/cosmic-everyday/')}")
            i.icon-dollar-sign
            span   {voc.buyOnItch}
    p
    p.center
        i.icon-heart.big
    p.center 
        span.big {voc.allHailSupporters}
    .aPatronList(if="{patrons && patrons.length && !errorLoadingPatrons}")
        .aPatron(each="{patron in patrons}")
            .anAvatar(style="background-image: url({patron.avatar})")
            span.aPatronName(title="{patron.about}" style="font-weight: {patron.tier !== 'An Aspiring Astronaut'? 700 : 400}" class="{cyan: patron.tier === 'A Space Pirate' || patron.tier === 'A Business Shuttle'}") 
                | {patron.name}
                //twemoji-icon(each="{Array(patron.hearts)}" emoji="{chooseHeart()}")
    div.center(if="{(!patrons || !patrons.length) && !errorLoadingPatrons}") {voc.loadingPatrons}
    div.center(if="{errorLoadingPatrons}") {voc.errorLoadingPatrons}
    script.
        this.voc = window.vocabulary.donations;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.donations;
            this.vocGlob = window.vocabulary.global;
        });
        
        this.openLink = link => e => {
            nw.Shell.openExternal(link);
        };

        /*const hearts = [
            '❤️',
            '💛',
            '💚',
            '💙',
            '💜'
        ];
        this.chooseHeart = () => hearts[Math.floor(Math.random() * hearts.length)];*/
        
        this.patrons = [];
        window.fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTUMd6nvY0if8MuVDm5-zMfAxWCSWpUzOc81SehmBVZ6mytFkoB3y9i9WlUufhIMteMDc00O9EqifI3/pub?output=csv')
        .then(data => data.text())
        .then(text => {
            var table = text.split('\r\n').map(row => row.split(','));
            for (let i = 1, l = table.length; i < l; i++) {
                const obj = {},
                      row = table[i];
                for (let j = 0; j < row.length; j++) {
                    obj[table[0][j]] = row[j];
                }
                this.patrons.push(obj);
            }
            this.patrons.filter(patron => patron.tier);
            this.patrons.map(patron => {
                patron.hearts = 0;
                if (patron.tier === 'An Aspiring Astronaut') {
                    patron.hearts = 1;
                } else if (patron.tier === 'A Space Programmer') {
                    patron.hearts = 2;
                } else if (patron.tier === 'A Space Pirate' || patron.tier === 'A Business Shuttle') {
                    patron.hearts = 3;
                }
            })
            console.log(this.patrons);
            this.update();
        })
        .catch(e => {
            this.errorLoadingPatrons = true;
        });