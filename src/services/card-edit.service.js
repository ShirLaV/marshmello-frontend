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

    const isMemberExist = card?.members.some(member => member._id === memberId)
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

const getGroupId = (cardId) => {
    const board = store.getState().boardModule.currBoard
    return board.groups.find(group => group.cards.find(card => card.id === cardId))?.id
}

const getFormattedTime = (timestamp) => {
    if (!timestamp) return ''
    const timeLeft = timestamp - Date.now()
    if (timeLeft <= (1000 * 60 * 60 * 24)) return 'today at 12:00 AM'
    else if (timeLeft <= (1000 * 60 * 60 * 48)) return 'tomorrow at 12:00 AM'
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
    else if (timePassed < 1000 * 60 * 60) {
        const minutes = Math.floor(timePassed / 1000 / 60)
        return `Added ${minutes} minutes ago`
    }
}


export const cardEditService = {
    handleChecklistChange,
    handleMemberChange,
    getGroupId,
    getCardById,
    handleLabelChange,
    handleDueDateChange,
    getFormattedTime
}