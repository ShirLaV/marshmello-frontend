import React from 'react'

import { Switch, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { CardEdit } from './cmps/card-edit'

export class RootCmp extends React.Component {

    render() {
        return (
            <div className="app flex column">
                <AppHeader />
                <main className="main-app">
                    <Switch>
                        {routes.map(route => <Route key={route.path}  component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        )
    }
}


