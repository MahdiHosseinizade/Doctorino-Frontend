import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PanelLayout from './PanelLayout';

export default function SickPanel() {

    const { path } = useRouteMatch();

    return (
        <PanelLayout>
            <Switch>
                <Route path={`${path}/dashboard`} component={Dashboard} />
                <Route path={`${path}/profile`} component={Profile} />
            </Switch>
        </PanelLayout>
    );
}