import React, { Component } from 'react'
import { CardEditActions } from './card-edit-actions'
import { CardEditAddToCard } from './add-to-card/card-edit-add-to-card'

export class CardEditSidebar extends Component {

    render() {
        return (
            <div className="sidebar">
                <CardEditAddToCard />
                <CardEditActions />
            </div>
        )
    }
}



