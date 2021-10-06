import React, { useMemo, useRef, useState } from 'react'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { EditSidebarLabel } from '../edit-sidebar-label'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'


function _CardEditAddToCardItem({ item, currCardId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [color, setColor] = useState('')
    const itemRef = useRef()
    const InnerPopperCmp = useMemo(() => item.component, [item])
    const EditComponent = useMemo(() => item.editComponent, [item])

    const groupId = cardEditService.getGroupId(currCardId)
    const currCard = cardEditService.getCardById(currCardId, groupId)

    const checkIfCover = () => {
        return (item.title !== 'Cover') || (!currCard?.style?.bgColor && !currCard?.style?.imgUrl)
    }

    const handleEdit = (color) => {
        if (isEdit) setIsEdit(false)
        else {
            setColor(color)
            setIsEdit(true)
        }
    }

    return (
        <div className="label-wrapper">
            {checkIfCover() && <div ref={itemRef} className={`relative ${isOpen ? 'popover-open' : ''}`}>
                <span onClick={() => setIsOpen(!isOpen)}>
                    <EditSidebarLabel Icon={item.icon} title={item.title} />
                </span>
                {
                    isOpen && Boolean(item.editComponent) && <DynamicPopover handleEdit={handleEdit} onClose={() => setIsOpen(false)} title={item.title} ref={itemRef} isLabel={isEdit}>
                        {isEdit ? <EditComponent color={color} handleEdit={handleEdit} onClose={() => setIsOpen(false)} /> : <InnerPopperCmp handleEdit={handleEdit} onClose={() => setIsOpen(false)} />}
                    </DynamicPopover>
                }
                {
                    isOpen && !Boolean(item.editComponent) && <DynamicPopover onClose={() => setIsOpen(false)} title={item.title} ref={itemRef}>
                        <InnerPopperCmp onClose={() => setIsOpen(false)} />
                    </DynamicPopover>
                }
            </div>}
        </div >
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

export const CardEditAddToCardItem = connect(mapStateToProps, null)(_CardEditAddToCardItem);
