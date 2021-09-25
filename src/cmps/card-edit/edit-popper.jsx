// import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PopperLabelPreview } from './popper-label-preview';
import { PopperUserPreview } from './popper-user-preview';
// import { loadUsers } from '../../store/user.actions'

const _EditPopper = ({ title, popoverBody: PopoverBody /* cmp */, showInput = true }) => {
    return (
        <div style={{ border: '1px solid black', width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
                {title.charAt(0).toUpperCase() + title.slice(1)}
                <div>X</div>
            </div>
            {showInput && <input placeholder={`Search ${title}`} />}
            <h3>{(title === 'members' ? 'BOARD MEMBERS' : 'LABELS')}</h3>
            {
                (title === 'members') 
            ? board.members.map(member => <PopperUserPreview key={member._id} user={member} />) 
            : board.labels.map(label => <PopperLabelPreview key={label.id} label={label} />) 
            }
        {/*     <PopoverBody /> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        // users: state.userModule.users,
        // board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    // onUpdateCard1,
    // loadBoard
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

export const EditPopper = connect(mapStateToProps, mapDispatchToProps)(_EditPopper);
