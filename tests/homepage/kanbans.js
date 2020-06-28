module.exports = {
    'Homepage kanban boards'(client) {
        client
        .waitForElementVisible('body', 5000)
        .assert.visible('[data-is="kanban-homepage"] h1')
        .assert.containsText('[data-is="kanban-homepage"] h1', ' ')
        .assert.visible('[data-is="kanban-homepage"] > button')
        .click('[data-is="kanban-homepage"] > button')
        .pause(100)
        .assert.visible('kanban-config[creating="true"]')
        .execute(function () {
            document.querySelector('kanban-config input[ref="boardName"]').value = 'TESTING BOARD TITLE';
        }, [])
        .assert.visible('.backgroundSwatches .aBackgroundSwatch[style=\'background: url("/wallpaperThumbnails/dmitry-kotov.jpg");\']')
        .click('.backgroundSwatches .aBackgroundSwatch[style=\'background: url("/wallpaperThumbnails/dmitry-kotov.jpg");\']')
        .click('kanban-config button.green')
        .pause(250)
        .assert.visible('kanban-board[style*=\'/wallpapers/dmitry-kotov.jpg\']')
        .execute(function () {
            var q = document.querySelector('kanban-board[style=\'background: url("/wallpapers/dmitry-kotov.jpg");\']');
            return q.querySelector('h3').innerHTML;
        }, [], (result) => {
            client.assert.equal(result.value, 'TESTING BOARD TITLE');
        })
        .assert.visible('kanban-board[style=\'background: url("/wallpapers/dmitry-kotov.jpg");\'] button')
        .click('kanban-board[style=\'background: url("/wallpapers/dmitry-kotov.jpg");\'] button')
        .acceptAlert()
        .pause(750)
        .assert.elementNotPresent('kanban-board[style=\'background: url("/wallpapers/dmitry-kotov.jpg");\']')
        .end();
    }
};
