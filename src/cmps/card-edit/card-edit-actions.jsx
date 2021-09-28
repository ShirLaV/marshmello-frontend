import React, { Component } from 'react'
import { DynamicPopover } from '../shared/dynamic-popover'
import { EditSidebarLabel } from './edit-sidebar-label'
import {BsArrowRight} from 'react-icons/bs'
import {MdContentCopy} from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import { GoArchive } from 'react-icons/go'


export class CardEditActions extends Component {
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
        const InnerPopperCmp = actions[this.state?.idx]?.component
        return (
            <>
                <div className="actions">
                    <h3 className="sidebar-title">Actions</h3>
                    {actions.map((item, idx) => <div key={item.title + idx} onClick={(ev) => this.handlePopoverChange(ev, idx)}><EditSidebarLabel Icon={item.icon} title={item.title} /></div>)}
                </div>

                {
                    this.state.isOpen && <DynamicPopover isModal onClose={() => this.setState({ isOpen: false })} title={actions[idx].title} rect={this.state.rect} element={this.state.element}>
                        <InnerPopperCmp />
                    </DynamicPopover>
                }
            </>
        )

    }
}

const actions = [{ icon: BsArrowRight, title: 'Move' }, { icon: MdContentCopy, title: 'Copy' }, { icon: AiOutlineEye, title: 'Watch' }, { icon: GoArchive, title: 'Archive' }]
