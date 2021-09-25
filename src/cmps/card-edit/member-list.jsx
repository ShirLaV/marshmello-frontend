import React from 'react'
import { PopperUserPreview } from './popper-user-preview'

export function MemberList() {
    return (
        <div className="member-list">
            <input className="search-input" type="text" autoFocus placeholder="Search..." />
            <h4>Board Members</h4>
            <div className="flex column">
                {users.map(user => <PopperUserPreview user={user} />)}
            </div>
        </div>
    )
}

const users = [
    {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "username": "abi@ababmi.com",
        "password": "aBambi123",
        "imgUrl": "https://robohash.org/abi.png?set=set2",
        "mentions": [{
            "id": "m101",
            "boardId": "b101",
            "taskId": "t101"
        }]
    },
    {
        "_id": "u102",
        "fullname": "Rick Sanchez",
        "username": "rick@sanchez.com",
        "password": "rick123",
        "imgUrl": "https://robohash.org/rick.png?set=set2",
        "mentions": [{
            "id": "m102",
            "boardId": "b102",
            "taskId": "t102"
        }]
    },
    {
        "_id": "u103",
        "fullname": "Morty Smith",
        "username": "morty@smith.com",
        "password": "morty123",
        "imgUrl": "https://robohash.org/morty.png?set=set2",
        "mentions": [{
            "id": "m103",
            "boardId": "b103",
            "taskId": "t103"
        }]
    }
]