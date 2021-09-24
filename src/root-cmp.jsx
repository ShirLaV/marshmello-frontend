import React from 'react'

import { Switch, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { CardEdit } from './cmps/card-edit'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    <Switch>
                        <Route path="/board/:boardId/:groupId/:cardId" component={CardEdit} />
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        )
    }
}


