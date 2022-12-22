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

// import Dashboard from "./components/Dashboard";
// import DoctorProfile from "./components/DoctorProfile/Profile";
// import FinanceIssues from "./components/FinanceIssues";
// import ChangePassword from "./components/ChangePassword";

export default function DoctorPanel() {
  const { path } = useRouteMatch();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // useEffect(() => {
  //   function handleAuthentication() {
  //     if (!user) {
  //       console.log("not logged in");
  //       // return <Redirect to="/login" />;
  //       return <NavLink to="/login" state={{ prev: location.pathname }} />;
  //     }
  //   }
  //   handleAuthentication();
  // }, [user, location.pathname]);

  return (
    <div>
      {/* <Route
        exact
        path="/"
        render={() =>
          loggedIn ? (
            <Redirect to="/searchDashboard" />
          ) : (
            <Redirect to="/login" />
          )
        }
      /> */}
      {/* <Route
        path={`${path}/doctor-profile`}
        // path={`${path}/`}
        render={() =>
          // <Redirect to={`${path}/doctor-profile`} />}
          RequireAuthentication() ? (
            <Redirect to={`${path}/doctor-profile`} />
          ) : (
            (console.log("not logged in"), (<Redirect to="/login" />))
          )
        }
      /> */}
      {/* <Route
        path={`${path}/`}
        onEnter={requireAuth}
        component={DoctorProfileLayout}
      /> */}
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
          {/* <Route path={`${path}/dashboard`} component={Dashboard} /> */}
          {/* <Route path={`${path}/finance-issues`} component={FinanceIssues} /> */}
          {/* <Route path={`${path}/change-password`} component={ChangePassword} /> */}
        </Switch>
      </PanelLayout>
    </div>
  );
}
