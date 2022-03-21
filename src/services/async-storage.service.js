export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    dashboardQuery
}


const gBoards = require('../data/board.json');
const gUsers = require('../data/user.json');

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType))
    if (!entities) {
        entities = (entityType === 'board') ? gBoards : gUsers;
        _save(entityType, entities)
    }
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(entities)
            }, delay)
        })
}

async function dashboardQuery(entityType, entityId, delay = 500) {
    const boards = await query(entityType)
    const board = boards.find(board => board._id === entityId)
    const chartsData = {
        groupsCount: 0,
        cardsCount: 0,
        tasksPerMemberMap: {},
        tasksPerLabelMap: {}
    };
    if (board.members) {
        board.members.forEach(member => {
            chartsData.tasksPerMemberMap[member.fullname] = 0
        })
    }
    if (board.labels) {
        board.labels.forEach(label => {
            chartsData.tasksPerLabelMap[label.title] = 0
        })
    }

    if (board.groups) {
        board.groups.forEach(group => {
            if (!group.isArchive) {
                chartsData.groupsCount = chartsData.groupsCount + 1
                group.cards.forEach(card => {
                    if (!card.isArchive) chartsData.cardsCount = chartsData.cardsCount + 1
                    if (card.members) {
                        card.members.forEach(member => {
                            chartsData.tasksPerMemberMap[member.fullname]++;
                        })
                    }
                    if (card.labelIds) {
                        card.labelIds.forEach(labelId => {
                            const label = _getLabel(board.labels, labelId);
                            chartsData.tasksPerLabelMap[label.title]++
                        })
                    }
                })
            }
        })
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(chartsData)
        }, delay)
    })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}

function _getLabel(labels, labelId) {
    const label = labels.find((label) => label.id === labelId);
    return label;
};