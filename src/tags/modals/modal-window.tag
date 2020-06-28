modal-window
    .dimmer(class="{active: opts.active}")
        .aModal.flexfix
            h2.flexfix-header(if="{opts.heading}") {heading}
            .flexfix-body
                yield
            .flexfix-footer(if="{opts.buttons}")
                button(each="{opts.buttons}" class="{this.class || ''}" onclick="{this.onClick}")
                    i(if="{this.icon}" class="icon-{this.icon}")
                    span(if="{this.text}") {this.text}
    script.
