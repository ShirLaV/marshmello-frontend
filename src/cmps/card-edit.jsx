import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onEditBoard } from '../store/board.actions'

class _CardEdit extends Component {
    state = {
        currCard: ''
    }

    getCardById = (cardId) => {
        const cards = this.props.board.cards
        return card = cards.find(card => card.id === cardId)
    }

    componentDidMount() {
        let currCard
        if (this.props.card) currCard = this.props.card
        else {
            const { cardId } = this.props.match.params.cardId
            currCard = this.getCardById(cardId)
        }
        this.setState({ currCard })
    }

    render() {
        const { currCard } = this.state
        if (!currCard) return <></>
        return (
            <div className="card-edit">
                {currCard.style.bgColor && <div className="card-bg" style={{backgroundColor=currCard.style.bgColor}}></div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    onEditBoard
}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit);
