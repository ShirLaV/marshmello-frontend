import { AiOutlinePlus } from 'react-icons/ai'

export function LabelsMembers({ members, labelIds, board }) {

    const  getUserInitials = (fullname) => {
        const names = fullname.split(' ')
        return names.map(name => name.charAt(0).toUpperCase()).join('')
    }
    const getCardLabels = (labelIds) => labelIds.map(id => board.labels.find(label => label.id === id))

    return (
        <div className="members-labels-container">
            {members?.length && <div className="members-container">
                <h3>MEMBERS</h3>
                <div className="members">
                    {members.map(member => <div className="card-member">
                        {member.imgUrl ? <img src={member.imgUrl} alt="user" /> : getUserInitials(member.fullname)}
                    </div>)}
                    <div className="card-member add-member"><AiOutlinePlus /></div>
                </div>
            </div>}

            {labelIds?.length && <div className="labels-container">
                <h3>LABELS</h3>
                <div className="labels">
                    {getCardLabels(labelIds).map(label => <div className="card-label" style={{ backgroundColor: label.color }}>
                        {label.title || ''}
                    </div>)}
                    <div className="card-label add-label" ><AiOutlinePlus /></div>
                </div>
            </div>}
        </div>
    )
}
