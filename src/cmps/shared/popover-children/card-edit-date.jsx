import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'
import { onUpdateCard } from '../../../store/board.actions'



const _CardEditDate = ({ onUpdateCard, onClose }) => {
    const [startDate] = useState(new Date())
    const [endDate] = useState(null)
    const [dueDate, setDueDate] = useState(null)

    const onChange = (date) => {
        setDueDate(date.getTime())
    }

    const onReset = () => {
        setDueDate(null)
        handleSubmit()
    }

    const handleSubmit = () => {
        const res = cardEditService.handleDueDateChange(dueDate)
        onUpdateCard(...res)
        onClose()
    }

    return (
        <div className="date-picker">
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                // selectsRange
                inline
                formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
            />
            <div className="picker-btns flex column">
                <button className="card-edit-btn secondary long" onClick={handleSubmit}>Save</button>
                <button className="card-edit-btn long" onClick={onReset}>Remove</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    onUpdateCard
}

export const CardEditDate = connect(null, mapDispatchToProps)(_CardEditDate);
