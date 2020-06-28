(function () {

    /* From @github/hotkey
       see https://github.com/github/hotkey/ */
    const isFormField = function(element) {
        if (!(element instanceof HTMLElement)) {
          return false;
        }
        var name = element.nodeName.toLowerCase();
        var type = (element.getAttribute('type') || '').toLowerCase();
        /* eslint no-mixed-operators: off*/
        return name === 'select' ||
               name === 'textarea' ||
               name === 'input' &&
               type !== 'submit' &&
               type !== 'reset' &&
               type !== 'checkbox' &&
               type !== 'radio' ||
               element.isContentEditable;
    };

    const hotkeys = {
        scopeStack: [],
        get scope() {
            return hotkeys.scopeStack[hotkeys.scopeStack.length - 1];
        },
        set scope(val) {
            if (Array.isArray(val)) {
                hotkeys.scopeStack = val;
            } else {
                hotkeys.scopeStack = val.split(' ');
            }
        },
        push(val) {
            hotkeys.scopeStack.push(val);
        },
        pop() {
            return hotkeys.scopeStack.pop();
        },
        remove(val) {
            const ind = hotkeys.scopeStack.indexOf(val);
            if (val !== -1) {
                hotkeys.scopeStack.splice(ind, 1);
            }
            return ind !== -1;
        },
        getCode: e => ''.concat(e.ctrlKey? 'Control+' : '')
            .concat(e.altKey? 'Alt+' : '')
            .concat(e.metaKey ? 'Meta+' : '')
            .concat(e.key)
    };
    document.body.addEventListener('keydown', e => {
        const code = hotkeys.getCode(e);
        const elts = document.querySelectorAll(`[data-hotkey="${code}"]`);
        for (const elt of elts) {
            if (elt) {
                if (hotkeys.scope) {
                    if (!elt.closest(`[data-hotkey-scope="${hotkeys.scope}"]`)) {
                        continue;
                    }
                }
                if (isFormField(elt)) {
                    elt.focus();
                } else {
                    elt.click();
                }
                break;
            }
        }
    });

    window.hotkeys = hotkeys;
})();
