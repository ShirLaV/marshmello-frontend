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
    }
}

