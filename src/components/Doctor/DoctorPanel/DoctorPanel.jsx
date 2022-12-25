import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import DoctorProfileCompletion from "./components/DoctorProfileCompletion";
import Dashboard from "./components/Dashboard";
// import DoctorProfile from "./components/DoctorProfile/Profile";
import DoctorProfileLayout from "./components/DoctorProfile/DoctorProfileLayout";
import AppointmentReports from "./components/AppointmentsManagements";
import FinanceIssues from "./components/FinanceIssues";
import ChangePassword from "./components/ChangePassword";
import PanelLayout from "./PanelLayout";

export default function DoctorPanel() {
  const { path } = useRouteMatch();

  return (
    <PanelLayout>
      <Switch>
        <Route path={`${path}/dashboard`} component={Dashboard} />
        {/* <Route path={`${path}/doctor-profile`} component={DoctorProfile} /> */}
        <Route path={`${path}/doctor-profile`} component={DoctorProfileLayout} />
        <Route
          path={`${path}/doctor-profile-completion`}
          component={DoctorProfileCompletion}
        />
        <Route
          path={`${path}/appointments-management`}
          component={AppointmentReports}
        />
        <Route path={`${path}/finance-issues`} component={FinanceIssues} />
        <Route path={`${path}/change-password`} component={ChangePassword} />
      </Switch>
    </PanelLayout>
  );
}
