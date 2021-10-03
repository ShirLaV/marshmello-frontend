import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { PopperLabelPreview } from "../card-edit/popper-label-preview";
import { MemberAvatar } from "../shared/member-avatar";

import { onUpdateFilter, loadBoard } from "../../store/board.actions"
import { withRouter } from "react-router";

class _SearchCards extends React.Component {
    state = {
        filterBy: {
            txt: '',
            members: [],
            labels: []
        }
    }

    componentDidUpdate({ filterBy: prevFilterBy }) {
        const { filterBy: currFilterBy } = this.props
        if (prevFilterBy !== currFilterBy) {
            this.updateUrlSearchParams(currFilterBy)
        }
    }

    componentWillUnmount() {
        this.props.onUpdateFilter({ txt: '', members: [], labels: [] })
    }

    updateUrlSearchParams = (filterBy) => {
        console.log('filterBy: ', filterBy)
        const { history, location } = this.props
        const urlSearchFilterBy = { ...filterBy }
        for (const key in urlSearchFilterBy) {
            const currVal = urlSearchFilterBy[key]
            if (!currVal || (Array.isArray(currVal) && !currVal.length)) delete urlSearchFilterBy[key]
        }
        const search = new URLSearchParams(urlSearchFilterBy)
        history.replace(`${location.pathname}?${search.toString()}`)
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        const filterBy = { ...this.props.filterBy, [field]: value }
        this.props.onUpdateFilter(filterBy)
    }

    handleUserClick = (user) => {
        if (this.props.filterBy.members.includes(user._id)) return
        // const filterBy = { ...this.props.filterBy, members: [...this.state.filterBy.members, user] }

        const filterBy = { ...this.props.filterBy, members: [...this.props.filterBy.members, user._id] }
        this.props.onUpdateFilter(filterBy)
    }

    handleLabelClick = (label) => {
        if (this.props.filterBy.labels.includes(label.id)) return
        const filterBy = { ...this.props.filterBy, labels: [...this.props.filterBy.labels, label.id] }
        this.props.onUpdateFilter(filterBy)
    }

    render() {
        const { board } = this.props
        const { filterBy } = this.props
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
                            <span>{(filterBy.labels.includes(label.id)) ? <IoCheckmarkSharp /> : ''}</span>
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
                            <span>{(filterBy.members.includes(member._id)) ? <IoCheckmarkSharp /> : ''}</span>
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
    onUpdateFilter,
    loadBoard
}

export const SearchCards = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchCards));