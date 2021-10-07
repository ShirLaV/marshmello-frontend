import { store } from '../store/store'
import { utilService } from './util.service'

const handleChecklistChange = (type, checklistId, value, newVal) => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    const card = getCardById(cardId, groupId)
    if (checklistId) {
        const checklist = card.checklists.find(checklist => checklist.id === checklistId)
        if (type === 'addTodo') {
            checklist.todos.push(value)

        } else if (type === 'markTodo') {
            const todo = checklist.todos.find(todo => todo.id === value)
            todo.isDone = !todo.isDone

        } else if (type === 'removeTodo') {
            const idx = checklist.todos.findIndex(todo => todo.id === value)
            checklist.todos.splice(idx, 1)

        } else if (type === 'changeTitle') {
            const todo = checklist.todos.find(todo => todo.id === value)
            todo.title = newVal

        } else if (type === 'removeChecklist') {
            const idx = card.checklists.findIndex(checklist => checklist.id === checklistId)
            card.checklists.splice(idx, 1)

        }
    } else {
        if (type === 'addChecklist') {
            if (!card.checklists) card.checklists = []
            card.checklists.push({ id: utilService.makeId(), title: value, todos: [] })
        }
    }

    return [card, groupId, board]
}

const handleMemberChange = (memberId) => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    let card = getCardById(cardId, groupId)

    if (!card.members) card.members = []
    const isMemberExist = card?.members?.some(member => member._id === memberId)
    if (isMemberExist) card = { ...card, members: card?.members.filter(member => member._id !== memberId) }
    else {
        const memberToAdd = board.members.find(member => member._id === memberId)
        card.members.push(memberToAdd)
    }

    return [card, groupId, board]
}

const handleLabelChange = (labelId) => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    let card = getCardById(cardId, groupId)
    if (!card.labelIds) card.labelIds = []
    const isLabelExist = card?.labelIds.some(id => id === labelId)
    if (isLabelExist) card = { ...card, labelIds: card?.labelIds.filter(id => id !== labelId) }
    else {
        const labelToAdd = board.labels.find(label => label.id === labelId)
        card.labelIds.push(labelToAdd.id)
    }

    return [card, groupId, board]
}

const handleDueDateChange = (timestamp) => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    let card = getCardById(cardId, groupId)
    card.dueDate = timestamp
    return [card, groupId, board]
}

const getCardById = (cardId, groupId) => {
    const board = store.getState().boardModule.currBoard
    const group = board.groups.find(group => group.id === groupId)
    return group.cards.find(card => card.id === cardId)
}

const getGroupById = (cardId) => {
    const board = store.getState().boardModule.currBoard
    return board.groups.find(group => group.cards.find(card => card.id === cardId))
}

const getGroupId = (cardId) => {
    const board = store.getState().boardModule.currBoard
    return board.groups.find(group => group.cards.some(card => card.id === cardId))?.id
}

const getFormattedTime = (timestamp) => {
    if (!timestamp) return ''
    const timeLeft = timestamp - Date.now()
    if (timeLeft < 0) {
        const date = new Date(timestamp)
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const idx = date.getMonth()
        const month = monthNames[idx]
        const day = date.getDate()
        return `${month} ${day} at 12:00 AM`
    }
    if (timeLeft <= (1000 * 60 * 60 * 24)) return 'tomorrow at 12:00 AM'
    const date = new Date(timestamp)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const idx = date.getMonth()
    const month = monthNames[idx]
    const day = date.getDate()
    return `${month} ${day} at 12:00 AM`
}

const getUploadTime = (timestamp) => {
    const timePassed = Date.now() - timestamp
    if (timePassed < (1000 * 60)) return 'Added a few seconds ago'
    else if (timePassed < (1000 * 60 * 2)) return 'Added 1 minute ago'
    else if (timePassed < 1000 * 60 * 60) {
        const minutes = Math.floor(timePassed / 1000 / 60)
        return `Added ${minutes} minutes ago`
    }
    else if (timePassed < 1000 * 60 * 60 * 13) {
        const hours = Math.floor(timePassed / 1000 / 60 / 60)
        return `Added ${hours} hours ago`
    } else {
        const date = new Date(timestamp)
        const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
        if (timePassed < 1000 * 60 * 60 * 24) {
            return `Added today at ${date.getHours()}:${minutes} `
        } else if (timePassed < 1000 * 60 * 60 * 48) {
            return `Added yesterday at ${date.getHours()}:${minutes}`
        } else {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const idx = date.getMonth()
            const month = monthNames[idx]
            const day = date.getDate()
            return `Added ${month} ${day} at ${date.getHours()}:${minutes}`
        }
    }
}

const handleFileAdd = (url, title = 'Attachment') => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    const card = getCardById(cardId, groupId)
    if (!card.attachments) card.attachments = []
    card.attachments.push({ id: utilService.makeId(), url, title, addedAt: Date.now() })
    return [card, groupId, board]
}

const handleFileRemove = (fileId) => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    const card = getCardById(cardId, groupId)
    const idx = card.attachments.findIndex(file => file.id === fileId)
    card.attachments.splice(idx, 1)
    return [card, groupId, board]
}

const handleMoveCard = (cardId, groupId, idx) => {
    const initialBoard = store.getState().boardModule.currBoard
    const initialGroup = initialBoard.groups.find(group => group.cards.some(card => card.id === cardId))
    const card = getCardById(cardId, initialGroup.id)
    const initialCardIdx = initialGroup.cards.findIndex(card => card.id === cardId)
    initialGroup.cards.splice(initialCardIdx, 1)
    let newGroup = initialBoard.groups.find(group => group.id === groupId)
    newGroup.cards.splice(idx, 0, card)
    return initialBoard
}

const handleCopyCard = (cardId, groupId, idx, title) => {
    const initialBoard = store.getState().boardModule.currBoard
    const initialGroup = initialBoard.groups.find(group => group.cards.some(card => card.id === cardId))
    const card = getCardById(cardId, initialGroup.id)
    let newGroup = initialBoard.groups.find(group => group.id === groupId)
    newGroup.cards.splice(idx, 0, { ...card, id: utilService.makeId(), title })
    return initialBoard
}

const handleToggleArchive = (cardId) => {
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    const card = getCardById(cardId, groupId)
    card.isArchive = !card.isArchive
    return [card, groupId, board]
}

const handleRemoveCard = (cardId) => {
    const board = { ...store.getState().boardModule.currBoard }
    const group = board.groups.find(group => group.cards.some(card => card.id === cardId))
    group.cards = group.cards.filter(card => card.id !== cardId)
    // return board
}

const onAddComment = (txt) => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const user = store.getState().userModule.user
    const groupId = getGroupId(cardId)
    const card = getCardById(cardId, groupId)
    if (!card.comments) card.comments = []
    card.comments.unshift({ id: utilService.makeId(), author: user, txt, addedAt: Date.now() })
    return [card, groupId, board]
}

const handleCommentRemove = (commentId) => {
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    const card = getCardById(cardId, groupId)
    const idx = card.comments.findIndex(comment => comment.id === commentId)
    card.comments.splice(idx, 1)
    return [card, groupId, board]
}

const getCommentTime = (timestamp) => {
    const timePassed = Date.now() - timestamp
    if (timePassed < (1000 * 60)) return 'a few seconds ago'
    else if (timePassed < (1000 * 60 * 2)) return '1 minute ago'
    else if (timePassed < 1000 * 60 * 60) {
        const minutes = Math.floor(timePassed / 1000 / 60)
        return `${minutes} minutes ago`
    }
    else if (timePassed < 1000 * 60 * 60 * 13) {
        const hours = Math.floor(timePassed / 1000 / 60 / 60)
        return `${hours} hours ago`
    } else {
        const date = new Date(timestamp)
        const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
        if (timePassed < 1000 * 60 * 60 * 24) {
            return `today at ${date.getHours()}:${minutes} `
        } else if (timePassed < 1000 * 60 * 60 * 48) {
            return `yesterday at ${date.getHours()}:${minutes}`
        } else {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const idx = date.getMonth()
            const month = monthNames[idx]
            const day = date.getDate()
            return `${month} ${day} at ${date.getHours()}:${minutes}`
        }
    }
}

const handleAttachmentEdit = (attachmentId, title) => {
    if (!attachmentId) return
    const cardId = store.getState().boardModule.currCardId
    const board = store.getState().boardModule.currBoard
    const groupId = getGroupId(cardId)
    const card = getCardById(cardId, groupId)
    const attachment = card.attachments.find(attachment => attachment.id === attachmentId)
    attachment.title = title
    return [card, groupId, board]
}


export const cardEditService = {
    handleChecklistChange,
    handleMemberChange,
    getGroupId,
    getCardById,
    handleLabelChange,
    handleDueDateChange,
    getFormattedTime,
    getUploadTime,
    handleFileAdd,
    handleFileRemove,
    getGroupById,
    handleMoveCard,
    handleCopyCard,
    handleToggleArchive,
    handleRemoveCard,
    onAddComment,
    handleCommentRemove,
    getCommentTime,
    handleAttachmentEdit
}