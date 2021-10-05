import React from 'react'
import { MemberAvatar } from '../member-avatar'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../../store/board.actions'
import { onLogout } from '../../../store/user.actions'
import { cardEditService } from '../../../services/card-edit.service'
import { withRouter } from 'react-router'

class _LoggedinUser extends React.Component {
    onLogoutUser = () => {
        this.props.history.push('/login')
        this.props.onLogout()
    }

    render() {

        return (
            <div className="mini-user flex column">

                <div className="main flex">
                    <MemberAvatar size="lg" member={this.props.user} />
                    <div>
                        <h3 className="mini-user-fullname">{this.props.user.fullname}</h3>
                        <p>{this.props.user.username}</p>
                    </div>
                </div>

                <p className="remove-member" onClick={() => this.onLogoutUser()}>Log Out</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onLogout
}
const _LoggedinUserWithRouter = withRouter(_LoggedinUser)
export const LoggedinUser = connect(mapStateToProps, mapDispatchToProps)(_LoggedinUserWithRouter);