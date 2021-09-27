import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { onUpdateCard } from '../store/board.actions'

import { PopperUserPreview } from '../../card-edit/popper-user-preview'

class _MemberList extends Component {
    state = {
        currCard: ''
    }

    componentDidMount() {
        console.log(this.props);
        // console.log(this.props.handlePropertyChange);
        // this.setState({ currCard: this.props.currCard })
    }
    
    checkIsMember = (memberId) => {
        return this.state.currCard?.members?.find(member => member._id === memberId)
    }
    
    handleMemberClick = (memberId) => {
        const card = { ...this.state.currCard }
        const memberIdx = card.members?.findIndex(member => member._id === memberId)
        // const member = card.members.find(member => member._id === memberId)
        if (memberIdx < 0) {
            const memberToAdd = this.props.board.members.find(member => member._id === memberId)
            card?.members.push(memberToAdd)
        } else {
            card?.members?.splice(memberIdx, 1)
        }
        this.setState({ currCard: card })
        this.props.handlePropertyChange(this.state.currCard)
    }
    
    render() {
        
        return (
            <div className="member-list">
                <input className="search-input" type="text" autoFocus placeholder="Search..." />
                <h4>Board Members</h4>
                <div className="flex column">
                    {users.map(user => {
                        let isMember = this.checkIsMember(user._id)
                        return (<div key={user._id} onClick={() => this.handleMemberClick(user._id)}>
                            <PopperUserPreview  user={user} isMember={isMember} />
                        </div>)
                    })}
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
    // onUpdateCard,
}

export const MemberList = connect(mapStateToProps, mapDispatchToProps)(_MemberList);

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