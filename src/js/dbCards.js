(function () {
    /* eslint {'no-underscore-dangle': 'off', 'camelcase': 'off'} */
    const db = window.db || {};
    window.db = db;

    /** 
     * @param {Object|String} board A board to add a card to or its ID.
     * @param {Array<String>} column A column inside of `board`.
     * @param {Object} object The card object
     * @returns {Promise<Object>} Resolves into a PouchDB response with `rev` and `id`
     * @see https://pouchdb.com/api.html#create_document
     */
    db.createCard = (board, column, object) => new Promise(resolve => {
        const id = typeof board === 'string'? board : board.id;
        const bdb = db[id];
        bdb.post(object)
        .then(doc => {
            column.cards.unshift(doc.id);
            db.modifyProject(board)
            .then(() => resolve(doc));
        })
        .catch(window.DBError);
    });

    /**
     * @param {Object|String} board A board object, or its `id`
     * @param {Object} card A card object with new data
     * @returns {Promise<Object>} Resolves into a PouchDB meta info of a modified project
     */
    db.modifyCard = (board, card) => new Promise(resolve => {
        const bdb = (typeof board === 'string')? db[board] : db[board.id];
        bdb.get(card._id)
        .then(doc => {
            card._rev = doc._rev;
            return bdb.put(card);
        })
        .then(resolve)
        .catch(window.DBError);
    });

    /**
     * Deletes a card from a board. A programmer must post 
     * a modified version of the board by themself.
     * @param {Object} board A board object from which to delete a card
     * @param {Object} card A full card object
     * @returns {Promise} A PouchDB delete response
     */
    db.deleteCard = (board, card) => new Promise(resolve => {
        for (const column of board.columns) {
            var ind = column.cards.indexOf(card._id);
            if (ind !== -1) {
                column.cards.splice(ind, 1);
                break;
            }
        }
        db[board.id].remove(card)
        .then(resolve);
    });
})();
