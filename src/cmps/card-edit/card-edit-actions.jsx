import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import { GoArchive } from 'react-icons/go'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import { MoveCard } from '../shared/popover-children/move-card'
import { CopyCard } from '../shared/popover-children/copy-card'
import { CardEditActionsItem } from './card-edit-actions-item'
import { EditSidebarLabel } from './edit-sidebar-label'
import { connect } from 'react-redux'
import { cardEditService } from '../../services/card-edit.service'
import { onUpdateBoard, onUpdateCard } from '../../store/board.actions'


const _CardEditActions = ({ currCardId, board, onUpdateCard, goBack, onUpdateBoard }) => {
    const [isArchive, setIsArchive] = useState(false)

    useEffect(() => {
        const groupId = cardEditService.getGroupId(currCardId)
        const card = cardEditService.getCardById(currCardId, groupId)
        setIsArchive(card.isArchive || false)

    }, [])

    const toggleArchive = () => {
        setIsArchive(!isArchive)
        const res = cardEditService.handleToggleArchive(currCardId)
        onUpdateCard(...res)
    }

    // const removeCard = () => {
    //     const boardToSave = cardEditService.handleRemoveCard(currCardId)
    //     onUpdateBoard({ type: '' }, boardToSave)
    //     goBack()
    // }

    return (
        <div style={{ position: 'relative' }}>
            <div className="card-edit-actions">
                <h3 className="sidebar-title">Actions</h3>
                <div className="actions-container">
                    {actions.map((item, idx) => (
                        <CardEditActionsItem key={item.title + idx} item={item} />
                    ))}
                    {!isArchive && <div className="label-wrapper" onClick={toggleArchive}>
                        <EditSidebarLabel Icon={GoArchive} title='Archive' />
                    </div>}
                    {isArchive && <>
                        <div className="label-wrapper" onClick={toggleArchive}>
                            <EditSidebarLabel Icon={BsArrowCounterclockwise} title='Send to board' />
                        </div>
                        <div className="label-wrapper">
                            <EditSidebarLabel Icon={AiOutlineMinus} title='Delete' />
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}

const actions = [{ icon: BsArrowRight, title: 'Move', component: MoveCard }, { icon: MdContentCopy, title: 'Copy', component: CopyCard }, { icon: AiOutlineEye, title: 'Watch' }]

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard,
    onUpdateBoard
}

export const CardEditActions = connect(mapStateToProps, mapDispatchToProps)(_CardEditActions);
