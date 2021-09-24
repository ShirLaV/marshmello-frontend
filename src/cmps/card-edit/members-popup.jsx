import  React, { Component } from 'react'
import { connect } from 'react-redux'
// import { loadUsers } from '../../store/user.actions'

export default class _MembersPopup extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userModule.users
    }
}

const mapDispatchToProps = {
    // onUpdateCard1,
    // loadBoard
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

export const MembersPopup = connect(mapStateToProps, mapDispatchToProps)(_MembersPopup);
