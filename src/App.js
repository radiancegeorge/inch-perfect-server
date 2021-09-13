import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from './pages/registration/Registration';


function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/auth">
            <Registration />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
