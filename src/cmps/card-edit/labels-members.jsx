import { CardEditLabels } from './labels-members/card-edit-labels'
import { CardEditMembers } from './labels-members/card-edit-members'

export const LabelsMembers = ({
    members, currCard, labelIds, board, handlePropertyChange
}) => (
    <div className="members-labels-container">
        <CardEditMembers
            members={members}
            currCard={currCard}
            handlePropertyChange={handlePropertyChange}
        />
        <CardEditLabels
            labelIds={labelIds}
            board={board}
        />
    </div>
)
