calendar-panel
    input(type="text" style="display: none;" ref="date")
    script.
        const flatpickr = require('flatpickr');
        this.events = {};
        window.signals.on('openCalendar', () => {
            this.updateDates(null);
        });
        this.getToDosClass = (card) => {
            if (card.todo && card.todo.length) {
                if (card.todo.filter(todo => {
                    return todo.done;
                }).length < card.todo.length) {
                    return 'undone';
                }
                return 'done';
            }
            return '';
        }
        this.on('mount', (e) => {
            setTimeout(() => {
                this.updateDates(e);
            }, 0);
        });
        this.updateDates = (e) => {
            window.db.kanbanCards.find({
                selector: {
                    dueTo: {
                        $exists: true,
                        $gt: new Date(new Date() - 1000*60*60*24*30)
                    }
                }
            }).then(cards => {
                this.events = {};
                cards = cards.docs;
                cards.forEach((card) => {
                    let beginning = (moment(card.dueTo).startOf('day').valueOf())+'';
                    if (!this.events[beginning]) { 
                        this.events[beginning] = [];
                    }
                    this.events[beginning].push(card);
                });
                if (this.calendar) {
                    this.calendar.destroy();
                }
                try {
                    this.calendar = flatpickr(this.refs.date, {
                        weekNumbers: true,
                        inline: true,
                        onDayCreate: (dObj, dStr, fp, dayElem) => {
                            let day = (+dayElem.dateObj)+'';
                            if (this.events[day]) {
                                dayElem.innerHTML += '<div class="calendarCards">' + this.events[day].map(card => `
                                    <div title="${card.title}, ${moment(card.dueTo).format('HH:mm')}" class="aCalendarCard ${(+dayElem.dateObj)<+(new Date())? 'outdated' : ''} ${this.getToDosClass(card)}">
                                        ${card.title}
                                    </div>`
                                ).join('') + '</div>';
                            }
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            })
            .catch(err => window.DBError(err));
        };
