import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  NavLink,
  useLocation,
} from "react-router-dom";
import DoctorProfileCompletion from "./components/DoctorProfileCompletion";
import DoctorProfileLayout from "./components/DoctorProfile/DoctorProfileLayout";
import AppointmentReports from "./components/AppointmentsManagements";
import PanelLayout from "./PanelLayout";

export default function DoctorPanel() {
  const { path } = useRouteMatch();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div>
      <PanelLayout>
        <Switch>
          <Route
            path={`${path}/doctor-profile`}
            component={DoctorProfileLayout}
          />
          <Route
            path={`${path}/doctor-profile-completion`}
            component={DoctorProfileCompletion}
          />
          <Route
            path={`${path}/appointments-management`}
            component={AppointmentReports}
          />
        </Switch>
      </PanelLayout>
    </div>
  );
}
