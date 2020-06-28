module.exports = {
    'Kanban cards'(client) {
        client
        .waitForElementVisible('body', 5000)
        .waitForElementVisible('kanban-board', 2500)
        .click('kanban-board')
        .waitForElementVisible('kanban-workspace', 500)
        .assert.visible('kanban-workspace', 'Kanban workspace opened')
        .waitForElementVisible('kanban-workspace .kanban-workspace-aHeader', 500)

        // create a card
        .assert.visible('kanban-column', 'Kanban column is visible')
        .setValue('kanban-column textarea', 'TESTING')
        .pause(50)
        .assert.visible('.aKanbanCardCreator button')
        .click('.aKanbanCardCreator button')
        .pause(50)
        .assert.visible('kanban-workspace kanban-card')

        // test menu
        .click('kanban-column .aColumnMenu button')
        .assert.visible('kanban-column .options')

        // test column color
        .assert.cssProperty('kanban-column .aListName', 'color', 'rgba(82, 186, 213, 1)', 'Column\'s title is initially cyan')
        .click('kanban-column .options .aSwatch')
        .pause(500)
        .assert.cssProperty('kanban-column .aListName', 'color', 'rgba(235, 85, 66, 1)', 'Column changes its color')

        // test collapcible
        .click('kanban-column .options .icon-arrow-minimise-outline')
        .assert.elementNotPresent('kanban-column .options', 'Kanban column is collapcible (menu)')
        .assert.elementNotPresent('kanban-column kanban-card', 'Kanban column is collapcible (cards)')
        .assert.elementPresent('kanban-column .icon-arrow-maximise', 'Kanban column has uncollapse button')
        .click('kanban-column .icon-arrow-maximise')
        //.pause(5000)
        .assert.visible('kanban-column kanban-card', 'Kanban column is uncollapcible')

        // test creation
        .click('kanban-workspace .kanban-columns > div > button')
        .assert.elementPresent('kanban-column + kanban-column', 'Columns may be created')

        // test movement
        .click('kanban-column .aColumnMenu button')
        .click('kanban-column .options .icon-arrow-right-outline')
        .pause(50)
        .assert.cssProperty('kanban-column .aListName', 'color', 'rgba(82, 186, 213, 1)', 'Columns move to right')
        .click('kanban-column + kanban-column .options .icon-arrow-left-outline')
        .pause(50)
        .assert.cssProperty('kanban-column .aListName', 'color', 'rgba(235, 85, 66, 1)', 'Columns move to left')

        .end();
    }
};
