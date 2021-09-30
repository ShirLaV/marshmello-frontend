import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CgCreditCard } from 'react-icons/cg';
import { MdLabelOutline } from 'react-icons/md'
import { BiUser } from 'react-icons/bi'
import { BsClock } from 'react-icons/bs'

import { CardEditDate } from '../cmps/shared/popover-children/card-edit-date'
import { PopperCoverEdit } from '../cmps/shared/popover-children/popper-cover-edit.jsx'
import { CardHeader } from '../cmps/card-preview/card-header.jsx';
import { CardLabelBarList } from '../cmps/card-preview/card-label-bar-list.jsx';
import { CardFooter } from '../cmps/card-preview/card-footer.jsx';
import { cardEditService } from '../services/card-edit.service.js';
import { Loader } from './shared/loader.jsx';
import { onUpdateCard , onSetCardId} from '../store/board.actions';
import {CardEditAddToCardItem} from '../cmps/card-edit/add-to-card/card-edit-add-to-card-item.jsx'
import {LabelList} from '../cmps/shared/popover-children/label-list.jsx'
import {MemberList} from '../cmps/shared/popover-children/member-list.jsx'
import { activityTxtMap } from '../services/activity.service.js';

class _QuickCardEditor extends Component {
  state = {
    card: null,
    cardTitle: '',
  };
  componentDidMount() {
    const { cardId, groupId } = this.props;
    this.props.onSetCardId(cardId)
    this.uploadCard(cardId, groupId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.board !== this.props.board) {
      const { cardId, groupId } = this.props;
      this.uploadCard(cardId, groupId);
    }
  }

  uploadCard = (cardId, groupId) => {
    const card = cardEditService.getCardById(cardId, groupId);
    this.setState({ card, cardTitle: card.title });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };
  handleFocus = (event) => {
    event.target.select();
  };
  onSave = (event) => {
    const cardToSave = { ...this.state.card };
    cardToSave.title = this.state.cardTitle;
    const activity = {txt: activityTxtMap.editCard(), card: cardToSave, groupId: this.props.groupId}
    this.props.onUpdateCard(cardToSave, this.props.groupId, this.props.board, activity);
    this.props.onToggleQuickCardEditor(event, null, '');
  };
  openCard = (event) => {
    this.props.onToggleQuickCardEditor(event, null, '');
    this.props.openCardEdit(this.props.groupId, this.props.cardId);
  };

  render() {
    const { card, cardTitle } = this.state;
    const {
      groupId,
      getLabel,
      isCardLabelListOpen,
      toggleCardComplete,
      position,
    } = this.props;
    if (!card) return <Loader />;
    return (
      <div
        className='quick-card-editor flex'
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
        }}
      >
        <div>
          <div className='card-preview' style={{ width: position.width }}>
            {card.style && <CardHeader cardStyle={card.style} />}

            <div className='card-details'>
              {card.labelIds && (
                <div>
                  <CardLabelBarList
                    labelIds={card.labelIds}
                    getLabel={getLabel}
                    isCardLabelListOpen={isCardLabelListOpen}
                  />
                </div>
              )}

              <textarea
                className='clean-input'
                type='text'
                value={cardTitle}
                name='cardTitle'
                onChange={this.handleChange}
                autoFocus
                onFocus={this.handleFocus}
              />

              <CardFooter
                card={card}
                groupId={groupId}
                toggleCardComplete={toggleCardComplete}
              />
            </div>
          </div>
          <button onClick={this.onSave} className='card-edit-btn secondary'>
            Save
          </button>
        </div>
        <div className='quick-editor-sidebar flex column'>
          <button
            onClick={this.openCard}
            className='quick-editor-btn flex align-center'
          >
            <span className="quick-editor-btn-icon flex align-center">
              <CgCreditCard />
            </span>
            <span>Open card</span>
          </button>
          <div
            className='quick-editor-btn flex align-center'
          >
            <CardEditAddToCardItem item={{ icon: MdLabelOutline, title: 'Edit labels', component: LabelList }}/>
          </div>
          <div
            className='quick-editor-btn flex align-center'
          >
            <CardEditAddToCardItem item={{ icon: BiUser, title: 'Change members', component: MemberList }}/>
          </div>
          <div
            className='quick-editor-btn flex align-center'
          >
            <CardEditAddToCardItem item={{ icon: CgCreditCard, title: 'Change cover', component: PopperCoverEdit  }}/>
          </div>
          <div
            className='quick-editor-btn flex align-center datepicker'
          >
            <CardEditAddToCardItem item={{ icon: BsClock, title: 'Edit dates', component:  CardEditDate }}/>
          </div>
     
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.currBoard,
  };
}

const mapDispatchToProps = {
  onUpdateCard,
  onSetCardId
};

export const QuickCardEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(_QuickCardEditor);
