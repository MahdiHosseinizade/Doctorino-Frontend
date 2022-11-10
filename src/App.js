import './App.css';
import routes from './routes';
import { Switch,Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
        <ToastContainer />
        <BrowserRouter>
        <Switch>
          {routes.map((route ) => (
              <Route {...route} />
          ))}
        </Switch>
        </BrowserRouter>
    </div>
  );
}
 
export default App;