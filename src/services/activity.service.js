import { userService } from "./user.service"

export const activityTxtMap = {
    addGroup: (listName) => {
        return `Added list: ${listName}`
    },
    addCard: (cardName) => {
        return `Added card: ${cardName}`
    }
}

