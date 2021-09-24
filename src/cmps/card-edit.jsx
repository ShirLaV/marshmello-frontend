import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onUpdateCard1, loadBoard } from '../store/board.actions'
import { CgCreditCard } from 'react-icons/cg'
import { IoMdList } from 'react-icons/io'
import { MdFormatListBulleted } from 'react-icons/md'
import { LabelsMembers } from './card-edit/labels-members'
// import { AiOutlinePlus } from 'react-icons/ai'
import { BsCardChecklist } from 'react-icons/bs'

class _CardEdit extends Component {
    state = {
        isDescriptionOpen: false,
        currCard: null,
        currGroup: null
    }

    componentDidMount() {
        let currCard
        let currGroup
        if (this.props.card) currCard = this.props.card
        else {
            const { cardId, groupId } = this.props.match.params
            currCard = this.getCardById(cardId, groupId).currentCard
            currGroup = this.getCardById(cardId, groupId).currentGroup
        }
        this.setState({ currCard, currGroup })
    }

    getCardById = (cardId, groupId) => {
        const currentGroup = board.groups.find(group => group.id === groupId)
        const currentCard = currentGroup.cards.find(card => card.id === cardId)
        return { currentGroup, currentCard }
    }

    setDescriptionTextarea = () => {
        this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen })
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ currCard: { ...this.state.currCard, [name]: value } })
    }

    handlePropertyChange = ({ target: { name, value } }) => {
        let dataParams = this.props.match.params
        const action = { ...dataParams, [name]: value }
        this.props.onUpdateCard1(action, name, board)
    }

    render() {
        const { currCard, isDescriptionOpen, currGroup } = this.state
        if (!currCard) return <div>Loading...</div>
        console.log(this.props.board);
        return (
            <div className="card-edit">
                {currCard.style.bgColor && <div className="card-edit-bg" style={{ backgroundColor: currCard.style.bgColor }}></div>}
                <div className="card-edit-header card-edit-title">
                    <span><CgCreditCard /></span>
                    <input className="clean-input" type="text" value={currCard.title} name="title" onChange={this.handleChange} onBlur={this.handlePropertyChange} />
                </div>
                <div className="list-name-container"><p>in list <span className="list-name">{currGroup.title}</span></p></div>
                <LabelsMembers members={currCard.members} labelIds={currCard.labelIds} board={board} />
                <div className="description-container card-edit-title">
                    <span><IoMdList /></span>
                    <h3>Description</h3>
                </div>
                <div className="card-description">
                    <textarea
                        className={`description-textarea ${isDescriptionOpen ? 'open' : ''}`}
                        rows={isDescriptionOpen ? "6" : "3"}
                        onFocus={this.setDescriptionTextarea}
                        onBlur={(ev) => {
                            this.setDescriptionTextarea()
                            this.handlePropertyChange(ev)
                        }}
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

                {/* {currCard.checklists?.length && currCard.checklists.map(checklist => (<div className="card-edit-title">
                    <span><BsCardChecklist /></span>
                    <h3>{checklist.title}</h3>
                    <
                </div>))
                } */}
            </div>
        )
    }
}


const board = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "Important",
            "color": "#eb5a46"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [
        {
            "id": "g102",
            "title": "Group 1",
            "cards": [
                {
                    "id": "c103",
                    "title": "Do that"
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": [
                        "l101",
                        "l102"
                    ],
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
            ],
            "style": {}
        }
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "card": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ]
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    onUpdateCard1,
    loadBoard
}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit);
