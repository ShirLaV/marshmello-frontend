import { userService } from "./user.service"

export const activityTxtMap = {
    addGroup: (listName) => {
        const loggedinUser = userService.getLoggedinUser()
        return `${loggedinUser.fullname} Added list: ${listName}`
    }
}

