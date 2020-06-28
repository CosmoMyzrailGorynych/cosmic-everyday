todo-list.aToDoList
    .aToDo(each="{task in (todo || [])}")
        i.icon-move
        label
            input(type="checkbox" checked="{task.done}" onclick="{toggleTodo}")
        textarea.stretchy.ghost(
            type="text" ref="todo" class="{done: task.done, bold: task.title.indexOf('#') === 0}" 
            value="{task.title}" onchange="{saveTodoText}" onkeydown="{tryCreateNextTodo}"
        )
        i.magenta.icon-delete(title="{vocGlob.delete}" onclick="{deleteToDo}")
    script.
        var sortableOption = {
            onUpdate: evt => {
                this.todo.splice(evt.newIndex, 0, this.todo.splice(evt.oldIndex, 1)[0]);
                window.Sortable.create(this.root, sortableOption);
            },
            handle: '.icon-move',
            fallbackTolerance: 5
        };
        var key = window.keymage;
        this.vocGlob = window.vocabulary.global;
        window.signals.on('updateLocales', () => {
            this.vocGlob = window.vocabulary.global;
        });
        this.todo = this.opts.todos || [];
        this.on('mount', () => {
            setTimeout(() => {
                window.Sortable.create(this.root, sortableOption);
            }, 0);
        });
        this.on('update', () => {
            this.todo = this.opts.todos || [];
        });
        this.tryCreateNextTodo = e => {
            if (key.stringifyEvent(e) === 'ctrl-return' ||
                key.stringifyEvent(e) === 'return') {
                if (this.todo.indexOf(e.item.task) === this.todo.length-1) {
                    if (e.target.value.length) {
                        this.addTask(e);
                        e.preventDefault();
                    } else {
                        this.todo.pop();
                    }
                }
            }
        };
        this.toggleTodo = e => {
            e.item.task.done = !e.item.task.done;
            if (this.opts.onupdate) this.opts.onupdate(e);
        };
        this.deleteToDo = e => {
            this.todo.splice(this.todo.indexOf(e.item.task), 1);
            if (this.opts.onupdate) this.opts.onupdate(e);
        };
        this.saveTodoText = e => {
            e.item.task.title = e.target.value;
            if (this.opts.onupdate) this.opts.onupdate(e);
        };
        this.addTask = e => {
            this.todo.push({
                title: "",
                done: false
            });
            this.update();
            setTimeout(() => {
                let inputs = this.root.querySelectorAll('textarea');
                inputs[inputs.length-1].focus();
            }, 0);
        };
