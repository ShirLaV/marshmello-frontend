import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CgHome } from 'react-icons/cg';
import { AiOutlinePlus, AiOutlineBell } from 'react-icons/ai';
import { SiTrello } from 'react-icons/si';

// import routes from '../routes'
import {
  onLogin,
  onLogout,
  onSignup,
  loadUsers,
  removeUser,
  loadAndWatchUser,
  onUpdateUser,
} from '../store/user.actions.js';
import { userService } from '../services/user.service.js';
import { setAddingBoard } from '../store/board.actions';
import { BoardAdd } from './board/board-add.jsx';
import { MemberAvatar } from './shared/member-avatar.jsx';
import { OverlayScreen } from '../cmps/overlay-screen';
import { DynamicPopover } from './shared/dynamic-popover.jsx';
import { LoggedinUser } from './shared/popover-children/loggedin-user.jsx';
import { Loader } from './shared/loader';
import { socketService } from '../services/socket.service.js';

class _AppHeader extends React.Component {
  state = {
    // user: null,
    isPopoverOpen: false,
  };

  userMenuRef = React.createRef();
  componentDidMount(){
      //SOCKET ON
    //   this.props.loadAndWatchUser(this.props.user._id)
  };
  //   componentDidUpdate(prevProps) {
  //     // console.log('prevProps', prevProps.user);
  //     // console.log('this.props', this.props.user);
  //     if (this.props.user !== prevProps.user) {
  //       console.log('updated');
  //       this.loadUser();
  //     }
  //   }

  //   loadUser = () => {
  //     const user = this.props.user;
  //     this.setState({ user });
  //   };
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
    // const user = {...this.props.user};
    const { user } = this.props;
    const { mentions } = user;
    mentions.forEach((mention) => {
      mention.isRead = true;
    });
    this.props.onUpdateUser(user);
  };

  render() {
    const { user, isAddingBoard } = this.props;
    const { isPopoverOpen } = this.state;
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
                <CgHome />
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
              <AiOutlinePlus />
            </button>
            <button
              onClick={this.markAllMentionsAsRead}
              className='nav-button'
              style={{
                backgroundColor: this.getUnreadMentions(user.mentions)
                  ? 'red'
                  : '',
              }}
            >
              <AiOutlineBell />
            </button>
            <div className='relative' ref={this.userMenuRef}>
              <button
                onClick={() => this.setState({ isPopoverOpen: !isPopoverOpen })}
              >
                <MemberAvatar key={user._id} member={user} />
              </button>
              {isPopoverOpen && (
                <DynamicPopover
                  onClose={() => this.setState({ isPopoverOpen: false })}
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
  onUpdateUser,
};

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader);
