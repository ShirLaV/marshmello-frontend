import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CardEditDate() {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const onChange = (ev) => {
        // const [start, end] = dates
        // setStartDate(start)
        // setEndDate(end)
        console.log(ev);
        console.log(ev.getTime());
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
                <button className="card-edit-btn secondary long">Save</button>
                <button className="card-edit-btn long">Remove</button>
            </div>
        </div>
        // <DatePicker
        //     selected={startDate}
        //     onChange={(date) => setStartDate(date)}
        //     popperClassName="some-custom-class"
        //     popperPlacement="top-end"
        //     popperModifiers={[
        //         {
        //             name: "offset",
        //             options: {
        //                 offset: [5, 10],
        //             },
        //         },
        //         {
        //             name: "preventOverflow",
        //             options: {
        //                 rootBoundary: "viewport",
        //                 tether: false,
        //                 altAxis: true,
        //             },
        //         },
        //     ]}
        // />
    )
}
