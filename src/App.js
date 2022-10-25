import './App.css';
import routes from './routes';
import { Switch,Route, BrowserRouter } from 'react-router-dom';


const App = () => {
  return (
    <div className='App'>
        <BrowserRouter>
        <Switch>
          {routes.map((route) => (
              <Route {...route} />
          ))}
        </Switch>
        </BrowserRouter>
    </div>
  );
}
 
export default App;