import React, { Component } from 'react'
import { DynamicPopover } from '../shared/dynamic-popover'
import { EditSidebarLabel } from './edit-sidebar-label'
import { MemberList } from '../shared/popover-children/member-list'
import CardEditDate from '../shared/popover-children/card-edit-date'
import LabelList from '../shared/popover-children/label-list'
import { BsClock, BsCardChecklist } from 'react-icons/bs'
import { MdLabelOutline } from 'react-icons/md'
import { FiPaperclip } from 'react-icons/fi'
import { BiUser } from 'react-icons/bi'
import { PopoverChecklist } from '../shared/popover-children/popover-checklist'
import { PopoverAttachFile } from '../shared/popover-children/popover-attach-file'


export class CardEditAddToCard extends Component {
    state = {
        isOpen: false,
        rect: '',
        idx: null,
        title: '',
        element: null
    }

    handlePopoverChange = (ev, idx) => {
        const rect = ev.target.getBoundingClientRect()
        this.setState({ rect, isOpen: !this.state.isOpen, idx, element: ev.target })
    }

    render() {
        const { idx } = this.state
        const InnerPopperCmp = addToCardItems[this.state?.idx]?.component
        return (
            <>
                <div className="add-to-card">
                    <h3 className="sidebar-title">Add to card</h3>
                    {addToCardItems.map((item, idx) => <div key={item.title + idx} onClick={(ev) => this.handlePopoverChange(ev, idx)}><EditSidebarLabel Icon={item.icon} title={item.title} /></div>)}
                </div>

                {
                    this.state.isOpen && <DynamicPopover onClose={() => this.setState({ isOpen: false })} title={addToCardItems[idx].title} rect={this.state.rect} element={this.state.element}>
                        <InnerPopperCmp />
                    </DynamicPopover>
                }
            </>
        )

    }
}

const addToCardItems = [{ icon: BiUser, title: 'Members', component: MemberList }, { icon: MdLabelOutline, title: 'Labels', component: LabelList }, { icon: BsCardChecklist, title: 'Checklist', component: PopoverChecklist }, { icon: BsClock, title: 'Dates', component: CardEditDate }, { icon: FiPaperclip, title: 'Attachment', component: PopoverAttachFile }]
