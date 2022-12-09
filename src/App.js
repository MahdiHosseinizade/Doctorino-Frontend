import './App.css';
import routes from './routes';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateSwitch from './utils/PrivateSwitch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/theme/defaultTheme';
import { AuthProvider } from './context/AuthContext';
import DoctorProfileLayout from "./components/Doctor/DoctorProfile/DoctorProfileLayout";


<<<<<<< HEAD
=======
import Doctors from './components/Doctor/DoctorProfile/Doctors';
import Profile from './components/Doctor/DoctorProfile/Profile';

>>>>>>> 0a6b197821002573a23f63dacc443c6e98893e34
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

const App = () => {

  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', 'rtl');
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <ToastContainer rtl className='toastStyle' />
        <BrowserRouter>
          <AuthProvider>
            <Switch>
<<<<<<< HEAD
              {routes.map((route, index) => (
                route.private ? <PrivateSwitch key={index} {...route} /> : <Route key={index} {...route} />
              ))}
=======
              <Route path={`/doctor/:id`} component={Profile} />

              {routes.map((route, index) => (
                route.private ? <Route key={index} {...route} /> : <Route key={index} {...route} />
              ))}


>>>>>>> 0a6b197821002573a23f63dacc443c6e98893e34
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;