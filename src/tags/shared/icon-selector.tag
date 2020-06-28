icon-selector(class="{this.setName}")
    .select(onclick="{toggleOpened}")
        i(class="icon-{val}")
    .options(show="{opened}")
        .option(each="{class in iconSet}" class="{active: val === class}" onclick="{selectIcon(class)}")
            i(class="icon-{class}")
    script.
        this.opened = false;

        var sets = {
            'labels': [
                'label-book', 'label-mail', 'label-file', 'label-hyperlink', 'label-search',  'label-calendar', 
                'label-idea', 'label-chat', 'label-food', 'label-globe', 'label-phone', 'label-screen',
                'label-triangle', 'label-circle', 'label-rectangle', 'label-zap', 'label-star', 'label-heart', 
                'label-exclamation', 'label-close', 'label-question', 'label-add', 'label-apply', 'label-clock'
            ],
            'icons': [
                'erase-checkbox', 'eraser', 'paintbucket', 'kanban',
                'times', 'tick', 'plus', 'minus',
                'equals', 'divide', 'chevron-right', 'chevron-left',
                'arrow-right-thick', 'arrow-left-thick', 'th-small', 'th-menu',
                'th-list', 'th-large', 'rss', 'star',
                'delete', 'delete-outline', 'backspace', 'attachment',
                'warning', 'info', 'info-large', 'download',
                'zoom', 'zoom-out', 'zoom-in', 'sort-numerically',
                'sort-alphabetically', 'input-checked', 'calender', 'arrow-sync',
                'arrow-maximise', 'media-stop', 'media-record', 'times-outline',
                'plus-outline', 'minus-outline', 'tick-outline', 'th-large-outline',
                'equals-outline', 'divide-outline', 'chevron-right-outline', 'chevron-left-outline',
                'arrow-right-outline', 'arrow-left-outline', 'th-small-outline', 'th-menu-outline',
                'th-list-outline', 'home-outline', 'arrow-up-outline', 'arrow-forward-outline',
                'arrow-down-outline', 'arrow-back-outline', 'trash', 'message',
                'location-outline', 'link-outline', 'image-outline', 'mail',
                'heart-outline', 'flash-outline', 'cancel-outline', 'beaker',
                'arrow-move-outline', 'warning-outline', 'time', 'info-outline',
                'backspace-outline', 'attachment-outline', 'cog-outline', 'camera-outline',
                'upload-outline', 'support', 'refresh-outline', 'info-large-outline',
                'download-outline', 'zoom-outline', 'tag', 'pin-outline',
                'message-typing', 'directions', 'pencil', 'folder',
                'folder-delete', 'folder-add', 'edit', 'document',
                'document-delete', 'document-add', 'brush', 'thumbs-up',
                'thumbs-down', 'pen', 'sort-numerically-outline', 'sort-alphabetically-outline',
                'bookmark', 'input-checked-outline', 'code-outline', 'move-vertical',
                'calender-outline', 'business-card', 'arrow-sync-outline', 'document-text',
                'calculator', 'arrow-minimise-outline', 'arrow-maximise-outline', 'world-outline',
                'printer', 'pi-outline', 'lightbulb', 'contacts',
                'media-stop-outline', 'media-play-outline', 'tags', 'volume',
                'volume-mute', 'volume-down'
            ]
        };


        this.setName = this.opts.set || 'icons';
        if (!(this.setName in sets)) {
            this.setName = 'icons';
        }
        this.iconSet = sets[this.setName];
        this.val = this.opts.val || this.iconSet[0];

        this.toggleOpened = e => {
            this.opened = !this.opened;
        };

        this.selectIcon = iconClass => e => {
            this.val = iconClass;
            if (this.opts.onchange) {
                this.opts.onchange(e, iconClass);
            }
            this.opened = false;
        };