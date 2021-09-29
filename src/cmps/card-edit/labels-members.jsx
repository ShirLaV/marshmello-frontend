import { CardEditDueDate } from './labels-members/card-edit-duedate'
import { CardEditLabels } from './labels-members/card-edit-labels'
import { CardEditMembers } from './labels-members/card-edit-members'

export const LabelsMembers = () => (
    <div className="members-labels-container">
        <CardEditMembers />
        <CardEditLabels/>
        <CardEditDueDate />
    </div>
)