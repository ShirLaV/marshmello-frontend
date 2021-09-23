import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onEditBoard } from '../store/board.actions'
import { CgCreditCard } from 'react-icons/cg'
import { IoMdList } from 'react-icons/io'
import {MdFormatListBulleted} from 'react-icons/md'

class _CardEdit extends Component {
    state = {
        isDescriptionOpen: false,
        // currCard: ''
        currCard: {
            "id": "c104",
            "title": "Help me",
            "description": "description",
            "comments": [{
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436.0,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            }],
            "checklists": [{
                "id": "YEhmF",
                "title": "Checklist",
                "todos": [{
                    "id": "212jX",
                    "title": "To Do 1",
                    "isDone": false
                }]
            }],
            "members": [{
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            }],
            "labelIds": ["l101", "l102"],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
                "bgColor": "#26de81"
            }
        }
    }

    // componentDidMount() {
    //     let currCard
    //     if (this.props.card) currCard = this.props.card
    //     else {
    //         const { cardId } = this.props.match.params.cardId
    //         currCard = this.getCardById(cardId)
    //     }
    //     this.setState({ currCard })
    // }

    // getCardById = (cardId) => {
    //     const cards = this.props.board.cards
    //     return card = cards.find(card => card.id === cardId)
    // }

    setDescriptionTextarea = () => {
        this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen })
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ currCard: { ...this.state.currCard, [name]: value } })
    }

    render() {
        const { currCard, isDescriptionOpen } = this.state
        if (!currCard) return <></>
        return (
            <div className="card-edit">
                {currCard.style.bgColor && <div className="card-edit-bg" style={{ backgroundColor: currCard.style.bgColor }}></div>}
                <div className="card-edit-header card-edit-title">
                    <span><CgCreditCard /></span>
                    <input className="clean-input" type="text" value={currCard.title} name="title" onChange={this.handleChange} />
                </div>
                    <div><p>in list <span className="list-name">{"kjdfjk"}</span></p></div>
                <div className="card-edit-title">
                    <span><IoMdList /></span>
                    <h3>Description</h3>
                </div>
                <div className="card-description">
                    <textarea
                        className={`description-textarea ${isDescriptionOpen ? 'open' : ''}`}
                        rows={isDescriptionOpen ? "6" : "3"}
                        onFocus={this.setDescriptionTextarea}
                        onBlur={this.setDescriptionTextarea}
                        name="description"
                        value={currCard.description}
                        onChange={this.handleChange}
                        placeholder="Add a more detailed description..." />
                        {isDescriptionOpen && <div className="description-btns">
                            <button>Save</button>
                            <button onClick={this.setDescriptionTextarea}>X</button>
                        </div>}
                </div>
                <div className="card-edit-title">
                    <span><MdFormatListBulleted /></span>
                    <h3>Activity</h3>
                </div>
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
