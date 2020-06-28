(function () {
    /* global PouchDB */
    /* eslint {'no-underscore-dangle': 'off', 'camelcase': 'off'} */
    const db = window.db || {};
    window.db = db;

    /**
     * @param {Object} object A raw project object to upload
     * @returns {Promise<Object>} Resolves into a PouchDB response with `rev` and `id`
     * @see https://pouchdb.com/api.html#create_document
     */
    db.createProject = object => new Promise(approve => {
        const id = window.generateUUID();
        
        const projectDB = new window.PouchDB(id);
        db[id] = projectDB;

        object._id = 'meta';
        object.id = id;
        var voc = window.vocabulary.kanbans;
        object.emoji = object.emoji || window.getRandomBoardEmoji();
        object.labels = (object.labels && object.labels.length)? object.labels : [{
            _id: '8e8cea36-29e2-4100-80cf-1764c30e235f',
            emoji: '✅',
            color: '#5BD660',
            title: voc.labelDone
        }, {
            _id: '09b451f2-6c92-42d0-bb65-2f8524d1896f',
            emoji: '💡',
            color: '#D5C856',
            title: voc.labelIdea
        }, {
            _id: '10fbe50e-be73-497f-a1b1-b6c6155e2179',
            emoji: '⚠️',
            color: '#D69458',
            title: voc.labelImportant
        }, {
            _id: 'fd6ac322-c1d0-4ce1-a6d8-0bdf1176fc72',
            emoji: '❗️',
            color: '#EB5542',
            title: voc.labelCritical
        }, {
            _id: 'ecd62199-4d38-408c-87b6-dbd3ed699428',
            emoji: '❤️',
            color: '#D6448D',
            title: voc.labelFavourite
        }];

        projectDB.put(object)
        .then(data => {
            var dbs = JSON.parse(localStorage.dbs || '[]');
            dbs.push(id);
            localStorage.dbs = JSON.stringify(dbs);
            return data;
        })
        .then(approve)
        .catch(window.DBError);
    });

    /**
     * @param {Object} object A project's object with new data
     * @returns {Promise<Object>} Resolves into a PouchDB meta info of a modified project inside db.projects
     */
    db.modifyProject = object => new Promise(resolve => {
        const id = object._id === 'meta'? object.id : object._id;
        db[id].get('meta')
        .then(doc => {
            object._rev = doc._rev;
            return db[id].put(object);
        })
        .then(resolve)
        .catch(window.DBError);
    });

    /**
     * @param {Object} board An object of a board (source is arbitrary) 
     * @returns {Promise} An array with useless PouchDB responses on two delete operations
     */
    db.removeProject = board => new Promise(resolve => {
        var {id} = board;

        var dbs = JSON.parse(localStorage.dbs || '[]');
        dbs.splice(dbs.indexOf(id), 1);
        localStorage.dbs = JSON.stringify(dbs);

        db[id].destroy()
        .then(meta => {
            delete db[id];
            return meta;
        })
        .then(resolve)
        .catch(window.DBError);
    });

    /**
     * @returns {Promise<Array<Object>>} Loads projects. Resolves into an array of all the projects.
     */
    db.getProjects = () => new Promise(resolve => {
        var dbs = JSON.parse(localStorage.dbs || '[]');
        const promises = [];
        let failure = false;
        const fallbackDbs = [];
        for (const dbid of dbs) {
            // eslint-disable-next-line no-loop-func
            promises.push(new Promise(resolve => {
                db[dbid] = new PouchDB(dbid);
                db[dbid].get('meta')
                .then(db => {
                    fallbackDbs.push(db);
                    return db;
                })
                .then(resolve)
                .catch(e => {
                    failure = true;
                    dbs.splice(dbs.indexOf(dbid), 1);
                    localStorage.dbs = JSON.stringify(dbs);
                    window.GenericError(e, `Discarding broken notebook with id ${dbid}. A restart is recommended.`);
                });
            }));
        }
        Promise.all(promises)
        .then(dbs => {
            return dbs;
        })
        .then(resolve)
        .finally(() => {
            if (failure) {
                resolve(fallbackDbs);
            }
        });
    });

    db.setupFirstProject = () => new Promise(resolve => {
        var board = {
            title: 'Your first project',
            toneOpacity: 0.65,
            emoji: '✨',
            background: 'url("/data/wallpapers/dmitry-kotov.jpg")',
            columns: [{
                title: window.vocabulary.startingNotebook.todo || 'To Do',
                color: window.colorPalette.magenta,
                type: 'list',
                cards: []
            }, {
                title: window.vocabulary.startingNotebook.inProgress || 'In Progress',
                color: window.colorPalette.yellow,
                type: 'list',
                cards: []
            }, {
                title: window.vocabulary.startingNotebook.complete || 'Complete',
                color: window.colorPalette.cyan,
                type: 'list',
                cards: []
            }]
        };
        db.createProject(board)
        .then(resolve)
        .catch(window.DBError);
    });

    /**
     * Finds cards that are present in the project's DB but not listed in columns.
     * Aimed on finding lost cards due to replication and/or manual syncing.
     * 
     * @param {Object} docs The list of all documents in the project DB
     * @returns {Promise} A promise that resolves into the source doc collection
     */
    const findLostCards = docs => {
        const meta = docs.find(doc => doc._id === 'meta'),
              cards = [...docs];
        cards.splice(cards.indexOf(meta), 1);
        for (const list of meta.columns) {
            for (const cardId of list.cards) {
                const pos = cards.findIndex(card => card._id === cardId);
                if (pos !== -1) {
                    cards.splice(pos, 1);
                }
            }
        }
        if (cards.length) {
            var lostColumn = {
                title: 'Lost & Found ' + (new Date()).toLocaleDateString(),
                type: 'list',
                color: '#EB5542',
                cards: cards.map(card => card._id)
            };
            meta.columns.push(lostColumn);
            return db.saveProject(meta).then(() => Promise.resolve(docs));
        }
        return Promise.resolve(docs);
    };
    db.loadProject = id => new Promise(resolve => {
        if (!(id in db)) {
            db[id] = new PouchDB(id);
        }
        var projectDb = db[id];
        projectDb.allDocs({
            include_docs: true
        })
        .then(docs => docs.rows.map(row => row.doc))
        .then(findLostCards)
        .then(resolve)
        .catch(window.DBError);
    });
})();
