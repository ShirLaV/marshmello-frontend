import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SiTrello } from 'react-icons/si';

import {
  onLogin,
  onLogout,
  onSignup,
  loadUsers,
  removeUser,
  onReceiveMention,
  onUpdateUser
} from '../store/user.actions.js';
import { setAddingBoard } from '../store/board.actions';
import { BoardAdd } from './board/board-add.jsx';
import { MemberAvatar } from './shared/member-avatar.jsx';
import { OverlayScreen } from '../cmps/overlay-screen';
import { DynamicPopover } from './shared/dynamic-popover.jsx';
import { LoggedinUser } from './shared/popover-children/loggedin-user.jsx';
import { Loader } from './shared/loader';
import { socketService } from '../services/socket.service.js';
import { Notifications } from './shared/popover-children/notifications.jsx';
import { FaRegBell } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { VscHome } from 'react-icons/vsc';

class _AppHeader extends React.Component {
  state = {
    isUserPopoverOpen: false,
    isNotificationPopoverOpen: false
  };

  userMenuRef = React.createRef();
  notificationsRef = React.createRef();

  componentDidMount() {
    socketService.on('received-mention', this.props.onReceiveMention)
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      const { user } = this.props
      socketService.emit('set-user-socket', user._id)
    }
  }

  componentWillUnmount() {
    socketService.off('received-mention', this.props.onReceiveMention)
  }

  onLogout = () => {
    this.props.onLogout();
  };

  setAddBoard = (value) => {
    this.props.setAddingBoard(value);
  };

  setFavicon = () => {
    const favicon = document.getElementById('favicon');
    favicon.href = '../../public/favicon.ico';
  };

  getUnreadMentions = (mentions) => {
    let count = 0;
    if (mentions) {
      mentions.forEach((mention) => {
        if (!mention.isRead) count++;
      });
    }
    return count;
  };

  markAllMentionsAsRead = () => {
    const { user } = this.props;
    const { mentions } = user;
    mentions.forEach((mention) => {
      mention.isRead = true;
    });
    this.props.onUpdateUser(user);
    this.setState({ isNotificationPopoverOpen: !this.state.isNotificationPopoverOpen })
  };

  render() {
    const { user, isAddingBoard } = this.props;
    const { isUserPopoverOpen, isNotificationPopoverOpen } = this.state;
    if (!user) return <Loader />;
    return (
      <header className='app-header'>
        <nav className='nav-links'>
          <div className='left-links'>
            <NavLink to='/'>
              <button
                onClick={() => this.setFavicon()}
                className='home-btn nav-button'
              >
                <VscHome />
              </button>
            </NavLink>
            <NavLink to='/board'>
              <button
                onClick={() => this.setFavicon()}
                className='boards-btn flex nav-button'
              >
                <SiTrello /> <span>Boards</span>
              </button>
            </NavLink>
          </div>
          <NavLink className='logo' to='/'>
            <SiTrello /> <span> Marshmello </span>
          </NavLink>
          <div className='right-links'>
            <button
              className='nav-button'
              onClick={() => this.setAddBoard(true)}
            >
              <GoPlus />
            </button>
            <div className='pos-relative' ref={this.notificationsRef}>
              <button
                onClick={this.markAllMentionsAsRead}
                className='nav-button'
                style={{
                  backgroundColor: this.getUnreadMentions(user.mentions)
                    ? '#EF7564'
                    : '',
                }}
              >
                <FaRegBell />
              </button>
              {isNotificationPopoverOpen && (
                <DynamicPopover
                  onClose={() => this.setState({ isNotificationPopoverOpen: false })}
                  title='Notifications'
                  ref={this.notificationsRef}
                >
                  <Notifications />
                </DynamicPopover>
              )}
            </div>
            <div className='pos-relative' ref={this.userMenuRef}>
              <button className='user-btn'
                onClick={() => this.setState({ isUserPopoverOpen: !isUserPopoverOpen })}
              >
                <MemberAvatar key={user._id} member={user} />
              </button>
              {isUserPopoverOpen && (
                <DynamicPopover
                  onClose={() => this.setState({ isUserPopoverOpen: false })}
                  title='User Details'
                  ref={this.userMenuRef}
                >
                  <LoggedinUser member={user} onLogout={this.onLogout} />
                </DynamicPopover>
              )}
            </div>
          </div>
        </nav>
        {isAddingBoard && <BoardAdd onClose={() => this.setAddBoard(false)} />}
        {isAddingBoard && <OverlayScreen />}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.currBoard,
    user: state.userModule.user,
    isAddingBoard: state.boardModule.isAddingBoard,
  };
}
const mapDispatchToProps = {
  onLogin,
  onSignup,
  onLogout,
  loadUsers,
  removeUser,
  setAddingBoard,
  onReceiveMention,
  onUpdateUser
};

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader);
