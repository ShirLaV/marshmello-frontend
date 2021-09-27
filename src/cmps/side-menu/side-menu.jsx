import React from 'react';
import { IoIosArrowBack, IoMdClose } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';
import { connect } from 'react-redux';
import { ChangeBG } from './change-bg';
import { BsArchiveFill } from 'react-icons/bs';

class _SideMenu extends React.Component {
    state = {
        currViewIdx: -1
    }

    _cmpsToRender = [{ id: 'c101', title: 'Change Background', icon: this._ImgIcon, component: ChangeBG },
    { id: 'c102', title: 'Search Cards', icon: <BiSearch />, component: ChangeBG },
    { id: 'c103', title: 'Archive', icon: <BsArchiveFill />, component: ChangeBG }]

    onSelectView = (viewId) => {
        this.setState((prevState) => ({ ...prevState, currViewIdx: viewId }))
    }

    getViewById = () => {
        const { currViewIdx } = this.state
        const currView = this._cmpsToRender[currViewIdx]
        console.log('selected view: ', currView)
        return currView.component
    }

    onBack = () => {
        this.setState((prevState) => ({ ...prevState, currViewIdx: -1 }))
    }

    /* priavte cmps */
    _CurrView = (props) => {
        const { component: Component } = this._cmpsToRender[this.state.currViewIdx]
        return <Component {...props} />
    }

    _DefaultView = () => {
        return <ul className="default-menu clean-list">
            {this._cmpsToRender.map((cmp, idx) =>
                <li key={cmp.id}>
                    <div className="icon">{cmp.icon}</div>
                    <p onClick={() => this.onSelectView(idx)}>{cmp.title}</p>
                </li>
            )}
        </ul>
    }

    _ImgIcon = () => {
        const { style } = this.props.board
        return <button className="img-btn" style={(style.imgUrl) ? { backgroundImage: '' } : { backgroundColor: style.bgColor }}></button>
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

export const SideMenu = connect(mapStateToProps, mapDispatchToProps)(_SideMenu);