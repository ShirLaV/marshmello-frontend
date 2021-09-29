import React, { Component } from 'react'
import { MdFormatListBulleted } from 'react-icons/md'

export class CardEditActivities extends Component {
    render() {
        return (
            <section className="flex space-between">
                <div className="card-edit-title">
                    <span><MdFormatListBulleted /></span>
                    <h3>Activity</h3>
                </div>
                <button className="card-edit-btn">Show details</button>
            </section>
        )
    }
}
