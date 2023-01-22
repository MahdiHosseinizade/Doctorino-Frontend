import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import DoctorReservations from './pages/DoctorReservations';
import Profile from './pages/Profile';
import HotelReservations from './pages/HotelReservations';
import PanelLayout from './PanelLayout';
import VerifyEmail from './pages/VerifyEmail';
import ChangePass from "./pages/ChangePassword";

export default function SickPanel() {

    const { path } = useRouteMatch();

    return (
        <PanelLayout>
            <Switch>
                <Route path={`${path}/doctor-reservations`} component={DoctorReservations} />
                <Route path={`${path}/hotel-reservations`} component={HotelReservations} />
                <Route path={`${path}/profile`} component={Profile} />
                <Route path={`${path}/verify-email`} component={VerifyEmail} />
                <Route path={`${path}/change-password`} component={ChangePass} />
            </Switch>
        </PanelLayout>
    );
}