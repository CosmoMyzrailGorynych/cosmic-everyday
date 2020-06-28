twemoji-picker
    .select(onclick="{toggleOpened}" class="{active: opened}")
        twemoji-icon(emoji="{opts.emoji}")
    .options(if="{opened}")
        input(type="text" oninput="{filterEmojis}")
        ul
            li(each="{cat in DB}" onclick="{showCategory}" class="{active: cat === category}")
                twemoji-icon(emoji="{cat.icon}")
        .twemoji-picker-aScroller
            twemoji-icon(
                each="{icon in category.emojis}"
                if="{!filter || icon.name.indexOf(filter) !== -1}"
                emoji="{icon.value}"
                onclick="{selectEmoji}"
                title="{icon.name}"
            )
    script.
        this.DB = window.emojiDB;
        this.category = this.DB[0];
        this.filter = false;
        this.opened = false;
        this.toggleOpened = e => {
            this.opened = !this.opened;
        };
        this.selectEmoji = e => {
            if (this.opts.onselect) {
                this.opts.onselect(e.item.icon.value);
            }
        };
        this.showCategory = e => {
            this.category = e.item.cat;
        };
        this.filterEmojis = e => {
            this.filter = e.target.value.trim();
        };