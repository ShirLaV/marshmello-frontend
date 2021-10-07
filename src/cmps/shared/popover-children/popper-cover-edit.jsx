import React, { Component } from 'react'
import { cardEditService } from '../../../services/card-edit.service'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../../store/board.actions'

class _PopperCoverEdit extends Component {
    state = {
        currCard: null,
        groupId: null,
        selectedEl: null,
        initialStyle: null,
        currStyle: null,
        selectedSize: 'half'
    }

    componentDidMount() {
        const { currCardId } = this.props
        const groupId = cardEditService.getGroupId(currCardId)
        const currCard = cardEditService.getCardById(currCardId, groupId)
        if (currCard.style) {
            if (currCard.style.isFull) {
                this.setState({ selectedSize: (currCard.style.isFull) ? 'full' : 'half' })
            }
            if (currCard.style.bgColor) this.setState({ currStyle: { backgroundColor: currCard.style.bgColor } })
            else if (currCard.style.imgUrl) this.setState({ currStyle: { backgroundImage: `url(${currCard.style.imgUrl})` } })
        }
        this.setState({ currCard, groupId })
    }

    handleClick = (ev, value, type) => {
        ev.target.classList.add('selected')
        this.state.selectedEl?.classList.remove('selected')
        this.setState({ selectedEl: ev.target })
        const { board, onUpdateCard } = this.props
        const { currCard, groupId } = this.state
        this.setState({ currStyle: type === 'color' ? { backgroundColor: value } : { backgroundImage: `url(${value})` } })
        currCard.style = type === 'color' ? { bgColor: value } : { imgUrl: value }
        onUpdateCard(currCard, groupId, board)
    }

    handleCoverRemove = () => {
        const { board, onUpdateCard } = this.props
        const { currCard, groupId } = this.state
        currCard.style = null
        onUpdateCard(currCard, groupId, board)
    }

    handleSizeChange = (size) => {
        const { board, onUpdateCard } = this.props
        const { currCard, groupId } = this.state
        currCard.style.isFull = (size === 'full') ? true : false
        this.setState({ selectedSize: size })
        onUpdateCard(currCard, groupId, board)
    }

    render() {
        const { currCard, currStyle, selectedSize } = this.state
        if (!currCard) return ''
        const colors = ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#517dab', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d']
        console.log(currStyle);
        return (
            <section className="modal-cover-edit flex column">

                <div className="size-container flex column">
                    <h4>Size</h4>
                    <div className="size-options flex">

                        <div className={`size-option half ${selectedSize === 'half' ? 'selected' : ''}`} onClick={() => this.handleSizeChange('half')}>
                            <div className="colored-half" style={currStyle}></div>
                            <div className="line-wrapper-half">
                                <div className="first-line"></div>
                                <div className="second-line"></div>
                                <div className="third-line flex">
                                    <div className="first-fragment"></div>
                                    <div className="second-fragment"></div>
                                </div>
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className={`size-option full ${selectedSize === 'full' ? 'selected' : ''}`} data-size="full" onClick={() => this.handleSizeChange('full')} style={currStyle}>
                            <div className="line-wrapper-full">
                                <div className="first-line"></div>
                                <div className="second-line"></div>
                            </div>
                        </div>
                    </div>
                    <button className="card-edit-btn" onClick={this.handleCoverRemove}>Remove cover</button>
                </div>

                <div className="flex column">
                    <h4>Colors</h4>
                    <div className="color-container flex">{colors.map((color, i) => <div key={i} className="cover-color-option" style={{ backgroundColor: color }} onClick={ev => this.handleClick(ev, color, 'color')}></div>)}</div>
                </div>

                {currCard.attachments && Boolean(currCard.attachments.length) && <div className="flex column">
                    <h4>Attachments</h4>
                    <div className="attachments-container flex">{currCard.attachments.map(a => <div key={a.id} className="cover-image-option" style={{ backgroundImage: `url(${a.url})` }} onClick={ev => this.handleClick(ev, a.url, 'img')}></div>)}</div>
                </div>}

            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const PopperCoverEdit = connect(mapStateToProps, mapDispatchToProps)(_PopperCoverEdit);
