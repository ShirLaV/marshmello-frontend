import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import { GoArchive } from 'react-icons/go'
import { MoveCard } from '../shared/popover-children/move-card'
import { CardEditActionsItem } from './card-edit-actions-item'


export const CardEditActions = () => {
    return (
        <div style={{ position: 'relative' }}>
            <div className="card-edit-actions">
                <h3 className="sidebar-title">Actions</h3>
                {actions.map((item, idx) => (
                    <CardEditActionsItem key={item.title + idx} item={item} />
                ))}
            </div>
        </div>
    )
}

const actions = [{ icon: BsArrowRight, title: 'Move', component: MoveCard }, { icon: MdContentCopy, title: 'Copy' }, { icon: AiOutlineEye, title: 'Watch' }, { icon: GoArchive, title: 'Archive' }]
