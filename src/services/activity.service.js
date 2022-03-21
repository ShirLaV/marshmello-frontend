
export const activityTxtMap = {
    addGroup: (listName) => {
        return `Added list: ${listName}`
    },
    addCard: () => {
        return `Added card:`
    },
    socketUpdate: ()=>{
        return 'UPDATE_BY_SOCKET'
    },
    renameBoard: (boardName) => {
        return `Renamed this board to: ${boardName}`
    },
    inviteMember: (memberName) => {
        return `Invited ${memberName} to this board`
    },
    removeMember: (memberName) => {
        return `Removed ${memberName} from this board`
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
    },
    changeGroupTitle: (groupName) => {
        return `Changed the title in list: ${groupName}`
    },
    addMemberToCard: (memberName) => {
        return `Added ${memberName} to a card`
    },
    removeMemberFromCard: (memberName) => {
        return `Removed ${memberName} from a card`
    },
    addLabel: (labelName) => {
        return `Added the label ${labelName} to a card`
    },
    removeLabel: (labelName) => {
        return `Removed the label ${labelName} from a card`
    },
    addChecklist: (checklistName) => {
        return `Added checklist ${checklistName} to a card`
    }
}

