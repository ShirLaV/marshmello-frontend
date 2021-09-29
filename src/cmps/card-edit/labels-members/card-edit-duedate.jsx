import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { cardEditService } from '../../../services/card-edit.service'
import { BsChevronDown } from 'react-icons/bs'
import { CardEditDate } from '../../shared/popover-children/card-edit-date'
import { onUpdateCard } from '../../../store/board.actions'

const _CardEditDueDate = ({ currCardId, onUpdateCard, board }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dueDateRef = useRef()

    const groupId = cardEditService.getGroupId(currCardId)
    const currCard = cardEditService.getCardById(currCardId, groupId)
    const dueDate = currCard?.dueDate
    const time = cardEditService.getFormattedTime(dueDate)

    const getDueDateLabel = () => {
        if((dueDate - Date.now()) < 0) return { title: 'Overdue', bgColor: '#eb5a46' }
        if (currCard.isComplete) return { title: 'Complete', bgColor: '#61bd4f' }
        if ((dueDate - Date.now()) <= (1000 * 60 * 60 * 24)) return { title: 'Due soon', bgColor: '#f2d600' }
        else return { title: '', bgColor: '' }
    }

    const onToggleComplete = () => {
        currCard.isComplete = !currCard.isComplete
        onUpdateCard(currCard, groupId, board)
    }

    return (
        <>
            {dueDate && <div className="due-date-container">
                <h3>DUE DATE</h3>
                <div className="due-date" >
                    <input type="checkbox" className="main-checkbox" checked={currCard.isComplete} onChange={onToggleComplete} />
                    <div className="card-edit-btn" ref={dueDateRef}>
                        <span className="due-date-time">{time}</span>
                        <span style={{ backgroundColor: getDueDateLabel().bgColor, textTransform: 'uppercase', fontSize: 12, padding: '0 3px', borderRadius: 2 }}>{getDueDateLabel().title}</span>
                        <span className="due-date-icon"><BsChevronDown /></span>
                        <div className="list-item-layover" onClick={() => setIsOpen(!isOpen)}></div>
                        {isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={'Dates'} ref={dueDateRef}>
                            <CardEditDate onClose={() => setIsOpen(false)} />
                        </DynamicPopover>}
                    </div>
                </div>
            </div>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const CardEditDueDate = connect(mapStateToProps, mapDispatchToProps)(_CardEditDueDate);

