import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HotelProfileCompletion from './components/HotelProfileCompletion/HotelProfileCompletion';
import Dashboard from './components/Dashboard';
import ManagerProfile from './components/ManagerProfile';
import BookingReport from './components/BookingReport';
import Finances from './components/Finances';
import ChangePass from './components/ChangePass';
import AddHotel from './components/AddHotel';
import PanelLayout from './PanelLayout';

export default function HotelPanel() {

    const { path } = useRouteMatch();

    return (
        <PanelLayout>
            <Switch>
                <Route path={`${path}/add-hotel`} component={AddHotel} />
                <Route path={`${path}/profile-completion`} component={ManagerProfile} />
                <Route path={`${path}/dashboard`} component={Dashboard} />
                <Route path={`${path}/hotel-info`} component={HotelProfileCompletion} />
                <Route path={`${path}/booking-reports`} component={BookingReport} />
                <Route path={`${path}/finances`} component={Finances} />
                <Route path={`${path}/change-password`} component={ChangePass} />
            </Switch>
        </PanelLayout>
    );
}