import { userService } from "./user.service"

export const activityTxtMap = {
    addGroup: (listName) => {
        return `Added list: ${listName}`
    },
    addCard: () => {
        return `Added card:`
    },
    renameBoard: (boardName) => {
        return `Renamed this board to: ${boardName}`
    },
    inviteMember: (memberName) => {
        return `Invited ${memberName} to this board`
    },
    changeBackground: () => {
        return `Changed the background of this board`
    },
    editCard: () => {
        return `Edited card title: `
    },
    archiveList: (listName) => {
        return `Archived the list: ${listName}`
    },
    completeCard: () => {
        return `Marked the following card as complete: `
    },
    unCompleteCard: () => {
        return `Marked the following card as incomplete: `
    },
    changeDescription: () => {
        return `Changed the description in card: `
    }
}

