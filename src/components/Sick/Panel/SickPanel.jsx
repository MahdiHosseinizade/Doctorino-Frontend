import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import DoctorReservations from './pages/DoctorReservations';
import Profile from './pages/Profile';
import HotelReservations from './pages/HotelReservations';
import PanelLayout from './PanelLayout';

export default function SickPanel() {

    const { path } = useRouteMatch();

    return (
        <PanelLayout>
            <Switch>
                <Route path={`${path}/doctor-reservations`} component={DoctorReservations} />
                <Route path={`${path}/hotel-reservations`} component={HotelReservations} />
                <Route path={`${path}/profile`} component={Profile} />
            </Switch>
        </PanelLayout>
    );
}