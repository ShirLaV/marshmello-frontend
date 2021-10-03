import React from 'react'
import { Switch, Route, withRouter } from 'react-router'
import routes from './routes'
import { AppHeader } from './cmps/app-header'
import { connect } from 'react-redux'
import { socketService } from './services/socket.service'
import { userService } from './services/user.service'

class _RootCmp extends React.Component {

    get isHeaderShown() {
        const { pathname } = this.props.location
        return (pathname.includes('board') || pathname.includes('boards'))
    }

    render() {
        return (
            <div className="app flex column">
                {this.isHeaderShown &&
                    <AppHeader />
                }
                <main className="main-app">
                    <Switch>
                        {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard
    }
}

const _RootCmpWithRouter = withRouter(_RootCmp)
export const RootCmp = connect(mapStateToProps)(_RootCmpWithRouter)


