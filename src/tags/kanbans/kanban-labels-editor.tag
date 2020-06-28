kanban-labels-editor
    h2 {voc.labelsEditorTitle}

    div.aLabelRow(each="{label, ind in labels}")
        color-selector(onchange="{setColor(label)}" val="{label.color}")
        input(type="text" maxlength="32" placeholder="{voc.labelTextPlaceholder}" onchange="{setTitle(label)}" value="{label.title}")
        twemoji-picker(onselect="{setIcon(label)}" emoji="{label.emoji}")
        div
            .aLabel(style="background: {label.color}66; border-color: {label.color}" title="{label.title}")
                twemoji-icon(emoji="{label.emoji}")
            .aLabel(style="background: {label.color}66; border-color: {label.color}" title="{label.title}")
                twemoji-icon(emoji="{label.emoji}")
                span  {label.title}
        button.nm(onclick="{deleteLabelPos(ind)}")
            i.icon-trash-2(title="{voc.deleteLabel}")
    
    button.green(onclick="{addNewLabel}")
        i.icon-plus
        span   {voc.addNewLabel}
    script.
        this.voc = window.vocabulary.kanbans.labelsEditor;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.voc = window.vocabulary.kanbans.labelsEditor;
        });
        var generateUUID = window.generateUUID;

        this.labels = this.opts.labels;

        this.setColor = label => (e, color) => {
            label.color = color;
        };
        this.setIcon = label => val => {
            label.emoji = val;
        };
        this.setTitle = label => e => {
            label.title = e.target.value;
        };
        this.deleteLabelPos = pos => e => {
            this.labels.splice(pos, 1);
        };
        this.addNewLabel = e => {
            this.labels.push({
                _id: generateUUID(),
                emoji: '❔',
                color: window.colorPalette.light,
                title: this.voc.newLabel
            });
        };
        this.setTitle = label => e => {
            label.title = e.target.value;
        };