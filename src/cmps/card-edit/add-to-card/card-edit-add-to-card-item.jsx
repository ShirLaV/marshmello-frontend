import React, { useMemo, useRef, useState } from 'react'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { EditSidebarLabel } from '../edit-sidebar-label'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'


function _CardEditAddToCardItem({ item, currCardId }) {
    const [isOpen, setIsOpen] = useState(false)
    const itemRef = useRef()
    const InnerPopperCmp = useMemo(() => item.component, [item])

    const groupId = cardEditService.getGroupId(currCardId)
    const currCard = cardEditService.getCardById(currCardId, groupId)

    const checkIfCover = () => {
        return (item.title !== 'Cover') || (!currCard?.style?.bgColor && !currCard?.style?.imgUrl)
    }

    return (
        <div>
            {checkIfCover() && <div ref={itemRef} className={`relative ${isOpen ? 'popover-open' : ''}`}>
                <span onClick={() => setIsOpen(!isOpen)}>
                    <EditSidebarLabel Icon={item.icon} title={item.title} />
                </span>
                {
                    isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={item.title} ref={itemRef}>
                        <InnerPopperCmp onClose={() => setIsOpen(false)} />
                    </DynamicPopover>
                }
            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

export const CardEditAddToCardItem = connect(mapStateToProps, null)(_CardEditAddToCardItem);
