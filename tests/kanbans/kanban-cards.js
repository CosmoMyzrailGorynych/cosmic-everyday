module.exports = {
    'Kanban cards'(client) {
        client
        .waitForElementVisible('body', 5000)
        .waitForElementVisible('kanban-board', 2500)
        .click('kanban-board')
        .waitForElementVisible('kanban-workspace', 500)
        .assert.visible('kanban-workspace', 'Kanban workspace opened')
        .waitForElementVisible('kanban-workspace .kanban-workspace-aHeader', 500)
        .assert.visible('kanban-column', 'Kanban column is visible')
        .setValue('kanban-column textarea', 'TESTING')
        .pause(50)
        .assert.visible('.aKanbanCardCreator button')
        .click('.aKanbanCardCreator button')
        .pause(50)
        .assert.visible('kanban-workspace kanban-card')
        .click('kanban-workspace kanban-card')
        .assert.visible('kanban-card-viewer')
        .waitForElementVisible('kanban-card-viewer h1', 500)
        .click('kanban-card-viewer aside button[ref="deleteButton"]')
        .acceptAlert()
        .pause(50)
        .assert.elementNotPresent('kanban-workspace kanban-card', 'Cards are deletable')
        .end();
    }
};
