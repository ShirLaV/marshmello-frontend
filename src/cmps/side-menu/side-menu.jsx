import React from 'react';
import { IoIosArrowBack, IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { ChangeBG } from './change-bg';
import { BsArchiveFill } from 'react-icons/bs';
import { BoardIcon } from './board-icon';
import { Archive } from './archive';
import { ActivityList } from './activity-list';
import { withRouter } from 'react-router'
import { RemoveBoard } from './remove-board';
import { HiOutlineTrash } from 'react-icons/hi';


class _SideMenu extends React.Component {
    state = {
        currViewIdx: -1
    }

    _cmpsToRender = [{ id: 'c101', title: 'Change Background', icon: <BoardIcon />, component: ChangeBG },
    { id: 'c103', title: 'Archive', icon: <BsArchiveFill />, component: Archive },
    { id: 'c104', title: 'Remove Board', icon: <HiOutlineTrash />, component: RemoveBoard }]

    componentDidMount() {
        if (this.props.location.search) this.setState((prevState) => ({ ...prevState, currViewIdx: 1 }))
    }

    componentWillUnmount() {
        this.setState((prevState) => ({ ...prevState, currViewIdx: -1 }))
    }

    onSelectView = (viewId) => {
        this.setState((prevState) => ({ ...prevState, currViewIdx: viewId }))
    }

    getViewById = () => {
        const { currViewIdx } = this.state
        const currView = this._cmpsToRender[currViewIdx]
        return currView.component
    }

    onBack = () => {
        this.setState((prevState) => ({ ...prevState, currViewIdx: -1 }))
    }

    /* priavte cmps */
    _CurrView = () => {
        const props= this.props
        const { component: Component } = this._cmpsToRender[this.state.currViewIdx]
        return <Component {...props} />
    }

    _DefaultView = () => {
        return <div>
            <ul className="default-menu clean-list">
                {this._cmpsToRender.map((cmp, idx) =>
                    <li onClick={() => this.onSelectView(idx)} key={cmp.id}>
                        <div className="icon">{cmp.icon}</div>
                        <p>{cmp.title}</p>
                    </li>
                )}
            </ul>
            <hr />
            <ActivityList />
        </div>
    }

    render() {
        const { onClose } = this.props
        const { currViewIdx } = this.state
        return (
            <div className={`side-menu ${(this.props.isMenuOpen) ? 'menu-open' : ''}`}>
                <div className="title">
                    <span className={`back-btn ${(currViewIdx !== -1) ? 'show-btn' : ''} `} onClick={() => this.onBack()}><IoIosArrowBack /></span>
                    <p className="menu-title" >{currViewIdx === -1 ? 'Menu' : this._cmpsToRender[currViewIdx].title}</p>
                    <span className="close-btn" onClick={onClose}><IoMdClose /></span>
                </div>
                <hr />
                <div className="rendered-cmp">
                    {currViewIdx === -1 ? <this._DefaultView /> : <this._CurrView />}
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
    }
}
const mapDispatchToProps = {
}

export const SideMenu = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SideMenu));