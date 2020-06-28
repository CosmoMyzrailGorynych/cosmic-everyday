lifehack-line
    em#theLifehack 
        i.icon-star
        |  {lifehack}
    script.
        // Remove empty lines
        window.vocabulary.lifehacks = window.vocabulary.lifehacks.filter(line => line);
        this.getLifehack = () => {
            this.lifehack = window.vocabulary.lifehacks[~~(window.vocabulary.lifehacks.length*Math.random())];
        };
        window.signals.on('updateLocales', () => {
            window.vocabulary.lifehacks = window.vocabulary.lifehacks.filter(line => line);
            this.getLifehack();
        });
        this.getLifehack();
        setInterval(() => {
            this.getLifehack();
            this.update();
        }, 1000 * 60 * 60 * 3);
