import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { MemberAvatar } from "../shared/member-avatar";

import { onUpdateFilter, loadBoard } from "../../store/board.actions"
import { withRouter } from "react-router";
import { utilService } from "../../services/util.service";

class _SearchCards extends React.Component {
    state = {
        filterBy: {
            txt: '',
            members: [],
            labels: []
        }
    }

    componentDidMount() {
        const { location, filterBy } = this.props
        const { search } = location
        const params = new URLSearchParams(search)
        const searchHasFilter = Object.keys(filterBy).some(filterKey => params.get(filterKey))
        if (search && searchHasFilter) {
            const txt = params.get('txt') || ''
            const members = params.get('members')?.split(',') || []
            const labels = params.get('labels')?.split(',') || []
            this.props.onUpdateFilter({ txt, members, labels })
            this.updateUrlSearchParams(this.props.filterBy)

        } else {
            this.props.onUpdateFilter({ txt: '', members: [], labels: [] })
            this.updateUrlSearchParams(this.props.filterBy)
        }
    }

    componentDidUpdate({ filterBy: prevFilterBy }) {
        const { filterBy: currFilterBy } = this.props
        if (prevFilterBy !== currFilterBy) {
            this.updateUrlSearchParams(currFilterBy)
            this.getFilteredBoard.bind(this)()
        }
    }

    componentWillUnmount() {
        this.props.onUpdateFilter({ txt: '', members: [], labels: [] })
        this.updateUrlSearchParams(this.props.filterBy)
        this.getFilteredBoard.bind(this)()
    }

    updateUrlSearchParams = (filterBy) => {
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

    getFilteredBoard = utilService.debounce(() => {
        const newFilterBy = { ...this.props.filterBy }
        for (const key in newFilterBy) {
            const currVal = newFilterBy[key]
            if (!currVal || (Array.isArray(currVal) && !currVal.length)) delete newFilterBy[key]
        }
        this.props.loadBoard(this.props.match.params.boardId, newFilterBy)
    }, 100)

    handleUserClick = (user) => {
        if (this.props.filterBy.members.includes(user._id)) {
            const clickedIdx = this.props.filterBy.members.findIndex(member => member === user._id)
            this.props.filterBy.members.splice(clickedIdx, 1)
            const filterBy = { ...this.props.filterBy, members: [...this.props.filterBy.members] }
            this.props.onUpdateFilter(filterBy)
        } else {
            const filterBy = { ...this.props.filterBy, members: [...this.props.filterBy.members, user._id] }
            this.props.onUpdateFilter(filterBy)
        }
    }

    handleLabelClick = (label) => {
        if (this.props.filterBy.labels.includes(label.id)) {
            const clickedIdx = this.props.filterBy.labels.findIndex(label => label === label)
            this.props.filterBy.labels.splice(clickedIdx, 1)
            const filterBy = { ...this.props.filterBy, labels: [...this.props.filterBy.labels] }
            this.props.onUpdateFilter(filterBy)
        } else {
            const filterBy = { ...this.props.filterBy, labels: [...this.props.filterBy.labels, label.id] }
            this.props.onUpdateFilter(filterBy)
        }
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