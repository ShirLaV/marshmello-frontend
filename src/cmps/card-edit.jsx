import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CardEditSidebar } from './card-edit/card-edit-sidebar'
import { LabelsMembers } from './card-edit/labels-members'
import { ChecklistEdit } from './card-edit/checklist-edit'
import { onUpdateCard, onSetCardId } from '../store/board.actions'
import { IoMdClose } from 'react-icons/io'
import { TiCreditCard } from 'react-icons/ti'
import { CgCreditCard } from 'react-icons/cg'
import { CardEditDescription } from './card-edit/card-edit-description'
import { CardEditActivities } from './card-edit/card-edit-activities'
import { CardEditAttachment } from './card-edit/card-edit-attachment'
import { DynamicPopover } from './shared/dynamic-popover'
import { PopperCoverEdit } from './shared/popover-children/popper-cover-edit'
import { BsArchive } from 'react-icons/bs'
import { Loader } from './shared/loader'

class _CardEdit extends Component {
  state = {
    currCard: null,
    currGroup: null,
    isOpen: false,
  }

  modalRef = React.createRef()
  coverRef = React.createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
    this.handleLoad()
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.board !== this.props.board) this.handleLoad()
  }

  handleLoad = () => {
    let currCard
    let currGroup
    const { cardId, groupId } = this.props.match.params
    this.props.onSetCardId(cardId)
    if (this.props.board.groups) {
      currCard = this.getDataById(cardId, groupId).currentCard
      currGroup = this.getDataById(cardId, groupId).currentGroup
    }
    this.setState({ currCard, currGroup })
  }

  handleClick = e => {
    const { board } = this.props
    if (!this.modalRef?.current?.contains(e.target)) {
      this.props.history.push(`/board/${board._id}`)
    }
  }

  getDataById = (cardId, groupId) => {
    const board = this.props.board
    const currentGroup = board.groups.find((group) => group.id === groupId)
    let currentCard = currentGroup.cards.find((card) => card.id === cardId)
    if (!currentCard) currentCard = this.props.board.archivedCards.find(card => card.id === cardId)
    return { currentGroup, currentCard }
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ currCard: { ...this.state.currCard, [name]: value } })
  }

  handlePropertyChange = (card = this.state.currCard) => {
    const { board } = this.props
    const { groupId } = this.props.match.params
    this.props.onUpdateCard(card, groupId, board)
  }

  checkCardBackground = () => {
    const { currCard } = this.state
    if (!currCard.style) return
    if (currCard.style.bgColor)
      return {
        backgroundColor: currCard.style.bgColor,
        minHeight: 116,
        height: 116,
      }
    if (currCard.style.imgUrl)
      return {
        background: `center / contain no-repeat url(${currCard.style.imgUrl})`,
        objectFit: 'cover',
        minHeight: 160,
        height: 160,
      }
  }

  goBack = () => {
    const { board } = this.props
    this.props.history.push(`/board/${board._id}`)
  }

  render() {
    const { currCard, currGroup } = this.state
    const { board } = this.props
    if (!currCard) return <Loader />
    const bg = this.checkCardBackground()
    return (
      <div className='edit-modal-container'>

        <section className='card-edit' ref={this.modalRef}>
          {currCard.style && <div className='card-edit-bg' style={bg}></div>}
          <Link to={`/board/${board._id}`}>
            <button className='close-modal-btn'>
              <IoMdClose />
            </button>
          </Link>

          {currCard.style && (
            <div ref={this.coverRef} className='btn-wrapper pos-relative'>
              <button
                className='change-cover-btn'
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              >
                <span className='cover-icon'>
                  <TiCreditCard />
                </span>
                <span>Cover</span>
              </button>
              {this.state.isOpen && (
                <DynamicPopover
                  onClose={() => this.setState({ isOpen: false })}
                  title='Cover'
                  ref={this.coverRef}
                >
                  <PopperCoverEdit
                    onClose={() => this.setState({ isOpen: false })}
                  />
                </DynamicPopover>
              )}
            </div>
          )}

          {currCard.isArchive && (
            <div className='archive-msg'>
              <span>
                <BsArchive />
              </span>
              <p>This card is archived</p>
            </div>
          )}

          <div className='card-edit-header card-title-container'>
            <span>
              <CgCreditCard />
            </span>
            <input
              className='title-input'
              type='text'
              value={currCard.title}
              name='title'
              onChange={this.handleInputChange}
              onBlur={() => this.handlePropertyChange()}
            />
          </div>

          <div className='list-name-container'>
            <p>
              in list <span className='list-name'>{currGroup.title}</span>
            </p>
          </div>

          <div className='card-edit-main-container flex'>
            <div className='card-edit-main'>
              <LabelsMembers />

              <CardEditDescription />

              {currCard.attachments && currCard.attachments.length > 0 && (
                <CardEditAttachment />
              )}

              {currCard.checklists?.map((checklist) => (
                <div
                  key={checklist.id}
                  className='checklists-container flex column'
                >
                  <ChecklistEdit
                    checklist={checklist}
                    currCard={currCard}
                    handlePropertyChange={this.handlePropertyChange}
                  />
                </div>
              ))}

              <CardEditActivities member={this.props.user} />
            </div>

            <CardEditSidebar goBack={this.goBack} />
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.boardModule.currBoard,
    user: state.userModule.user
  }
}

const mapDispatchToProps = {
  onUpdateCard,
  onSetCardId,
}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit)
