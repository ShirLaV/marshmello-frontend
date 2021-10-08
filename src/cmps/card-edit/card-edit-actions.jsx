import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { GoArchive } from 'react-icons/go'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import { MoveCard } from '../shared/popover-children/move-card'
import { CopyCard } from '../shared/popover-children/copy-card'
import { CardEditActionsItem } from './card-edit-actions-item'
import { EditSidebarLabel } from './edit-sidebar-label'
import { connect } from 'react-redux'
import { cardEditService } from '../../services/card-edit.service'
import { onArchiveCard, onUnArchiveCard, onRemoveCard } from '../../store/board.actions'


const _CardEditActions = ({ currCardId, board, onArchiveCard, onUnArchiveCard, onRemoveCard, goBack }) => {
    const [isArchive, setIsArchive] = useState(false)
    const [groupId, setGroupId] = useState(null)
    const [currCard, setCurrCard] = useState(null)

    useEffect(() => {
        const groupId = cardEditService.getGroupId(currCardId)
        const card = cardEditService.getCardById(currCardId, groupId)
        setIsArchive(card.isArchive || false)
        setGroupId(groupId)
        setCurrCard(card)
    }, [])

    const handleArchiveCard = () => {
        onArchiveCard(currCard, groupId, board)
        setIsArchive(true)
        goBack()
    }

    const handleUnArchiveCard = () => {
        onUnArchiveCard(currCard, board)
        setIsArchive(false)
    }

    const handleRemoveCard = () => {
        onRemoveCard(currCard, board)
    }

    return (
        <div style={{ position: 'relative' }}>
            <div className="card-edit-actions">
                <h3 className="sidebar-title">Actions</h3>
                <div className="actions-container">
                    {actions.map((item, idx) => (
                        <CardEditActionsItem key={item.title + idx} item={item} />
                    ))}
                    {!isArchive ?
                        <div className="label-wrapper" onClick={handleArchiveCard}>
                            <EditSidebarLabel Icon={GoArchive} title='Archive' />
                        </div>
                        : <>
                            <div className="label-wrapper" onClick={handleUnArchiveCard}>
                                <EditSidebarLabel Icon={BsArrowCounterclockwise} title='Send to board' />
                            </div>
                            <div className="label-wrapper" onClick={handleRemoveCard}>
                                <EditSidebarLabel Icon={AiOutlineMinus} title='Delete' />
                            </div>
                        </>}
                </div>
            </div>
        </div>
    )
}

const actions = [{ icon: BsArrowRight, title: 'Move', component: MoveCard }, { icon: MdContentCopy, title: 'Copy', component: CopyCard }]

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onArchiveCard,
    onUnArchiveCard,
    onRemoveCard
}

export const CardEditActions = connect(mapStateToProps, mapDispatchToProps)(_CardEditActions);
