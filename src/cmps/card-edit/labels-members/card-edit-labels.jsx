import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { DynamicPopover } from '../../shared/dynamic-popover'
import LabelList from '../../shared/popover-children/label-list'

export function CardEditLabels({ labelIds, board }) {
    const [isOpen, setIsOpen] = useState(false)
    const addButtonRef = useRef()

    const getCardLabels = (labelIds) => (
        labelIds.map(id => board.labels.find(label => label.id === id))
    )
    
    return (
        <>
            {labelIds?.length && <div className="labels-container">
                <h3>LABELS</h3>
                <div className="labels">
                    {getCardLabels(labelIds).map(label => <div key={label.id} className="card-label" style={{ backgroundColor: label.color }}>
                        {label.title || ''}
                    </div>)}
                    <div
                        ref={addButtonRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="card-label add-label relative"
                    >
                        <div className="list-item-layover"></div>
                        <AiOutlinePlus />
                        {isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={'Labels'} ref={addButtonRef}>
                            <LabelList />
                        </DynamicPopover>}
                    </div>
                </div>
            </div>}
        </>
    )
}
