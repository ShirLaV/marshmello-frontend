import React, { Component } from 'react'

export class CardEdit extends Component {
    state = {
        currCard: ''
    }

    componentDidMount() {
        const cardId = this.props.match.params.cardId
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
