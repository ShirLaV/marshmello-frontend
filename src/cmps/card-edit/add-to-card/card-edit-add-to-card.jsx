import React from 'react'
import { MemberList } from '../../shared/popover-children/member-list'
import { CardEditDate } from '../../shared/popover-children/card-edit-date'
import { LabelList } from '../../shared/popover-children/label-list'
import { BsClock, BsCardChecklist } from 'react-icons/bs'
import { MdLabelOutline } from 'react-icons/md'
import { FiPaperclip } from 'react-icons/fi'
import { BiUser } from 'react-icons/bi'
import { PopoverChecklist } from '../../shared/popover-children/popover-checklist'
import { PopoverAttachFile } from '../../shared/popover-children/popover-attach-file'
import { CardEditAddToCardItem } from './card-edit-add-to-card-item'
import { PopperCoverEdit } from '../../shared/popover-children/popper-cover-edit'
import { CgCreditCard } from 'react-icons/cg'

export const CardEditAddToCard = () => (
    <div style={{ position: 'relative' }}>
        <div className="add-to-card">
            <h3 className="sidebar-title">Add to card</h3>
            <div className="add-to-card-container">
            {addToCardItems.map((item, idx) => (
                <CardEditAddToCardItem key={item.title + idx} item={item} />
            ))}
            </div>
        </div>
    </div>
)

const addToCardItems = [{ icon: BiUser, title: 'Members', component: MemberList }, { icon: MdLabelOutline, title: 'Labels', component: LabelList }, { icon: BsCardChecklist, title: 'Checklist', component: PopoverChecklist }, { icon: BsClock, title: 'Dates', component: CardEditDate }, { icon: FiPaperclip, title: 'Attachment', component: PopoverAttachFile }, { icon: CgCreditCard, title: 'Cover', component: PopperCoverEdit }]
