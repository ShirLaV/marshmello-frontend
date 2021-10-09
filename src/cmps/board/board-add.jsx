import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { onAddBoard, setAddingBoard } from '../../store/board.actions.js'


class _BoardAdd extends React.Component {
    state = {
        title: '',
        style: {
            imgUrl: 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        },
        chosenImgIdx: 5
    }

    targetRef = React.createRef()

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
        this.props.setAddingBoard(false)
    }

    handleClick = (ev) => {
        if (this.targetRef.current.contains(ev.target)) {
            // || element?.contains(ev.target)
            // inside click
            return
        }
        // outside click 
        this.props.onClose()
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ ...this.state, [field]: value });
    }

    handleImage = (ev, idx) => {
        ev.preventDefault()
        const imgSrc = ev.target.getAttribute('src')
        this.setState({ ...this.state, style: { imgUrl: imgSrc }, chosenImgIdx: idx })
    }

    addBoard = async (ev) => {
        ev.preventDefault()
        if (!this.state.title) return
        const addedBoard = await this.props.onAddBoard(this.state)
        this.props.history.push(`/board/${addedBoard._id}`)
        this.props.setAddingBoard(false)
    }

    render() {
        const images = ['https://images.pexels.com/photos/1914982/pexels-photo-1914982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/3274903/pexels-photo-3274903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/1982485/pexels-photo-1982485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940']
        const { title, chosenImgIdx } = this.state
        return (
            <div className="board-add" ref={this.targetRef}>
                <form className="board-add-form" onSubmit={this.addBoard} style={{background: '#000000', backgroundImage: `url(${images[chosenImgIdx]})` }} >
                    <input autoFocus className={`board-title-input ${(title) ? 'editing' : ''}`} autoComplete="off" type="text" placeholder="Add board title" name="title" value={title} onChange={this.handleChange} />
                    <button className={`create-btn ${(title) ? 'clickable' : ''}`} type="submit">Create Board</button>
                </form>
                <div className="images-container">
                    {images.map((image, idx) =>
                        <button className={`img-btn ${(idx === chosenImgIdx) ? 'chosen' : ''}`} key={idx} onClick={(ev) => this.handleImage(ev, idx)}>
                            <img className="add-board-img" src={image} alt={image} />
                        </button>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAddingBoard: state.boardModule.isAddingBoard
    }
}
const mapDispatchToProps = {
    onAddBoard,
    setAddingBoard
}
const _BoardAddWithRouter = withRouter(_BoardAdd)
export const BoardAdd = connect(mapStateToProps, mapDispatchToProps)(_BoardAddWithRouter)