import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { PopperLabelPreview } from "../card-edit/popper-label-preview";
import { MemberAvatar } from "../shared/member-avatar";

import { onUpdateFilter } from "../../store/board.actions"

class _SearchCards extends React.Component {
    state = {
        filterBy: {
            txt: '',
            members: [],
            labels: []
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, [field]: value } }), () => this.props.onUpdateFilter(this.state.filterBy))
    }

    handleUserClick = (user) => {
        if (this.state.filterBy.members.includes(user)) return
        this.setState((prevState) => ({ ...prevState, filterBy: { ...this.state.filterBy, members: [...this.state.filterBy.members, user] } }), () => this.props.onUpdateFilter(this.state.filterBy))
    }

    handleLabelClick = (label) => {
        if (this.state.filterBy.labels.includes(label)) return
        this.setState((prevState) => ({ ...prevState, filterBy: { ...this.state.filterBy, labels: [...this.state.filterBy.labels, label] } }), () => this.props.onUpdateFilter(this.state.filterBy))
    }

    render() {
        const { board } = this.props
        const { filterBy } = this.state
        return (
            <div className="search-cards">
                <input className="search-input" type="text" onChange={this.handleChange} name="txt" value={filterBy.txt} autoFocus placeholder="Search..." />
                <p className="search-desc">Search by term, label, member, or due time</p>

                <hr />

                <ul className="label-list clean-list">
                    {board.labels.map(label =>
                        <li className="label-preview" key={label.id} onClick={() => this.handleLabelClick(label)}>
                            <div className="label-details">
                                <div className="label-color" style={{ backgroundColor: label.color }} ></div>
                                <p>{label.title}</p>
                            </div>
                            <span>{(filterBy.labels.includes(label)) ? <IoCheckmarkSharp /> : ''}</span>
                        </li>
                    )}
                </ul>

                <hr />

                <ul className="member-list clean-list">
                    {board.members.map(member =>
                        <li className="user-preview" key={member._id} onClick={() => this.handleUserClick(member)} >
                            <div className="user-details">
                                <MemberAvatar member={member} />
                                <span className="user-name">{member.fullname}</span>
                            </div>
                            <span>{(filterBy.members.includes(member)) ? <IoCheckmarkSharp /> : ''}</span>
                        </li>
                    )}
                </ul>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy
    }
}

const mapDispatchToProps = {
    onUpdateFilter
}

export const SearchCards = connect(mapStateToProps, mapDispatchToProps)(_SearchCards);