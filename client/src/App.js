import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage  from "./components/LandingPage/LandingPage";
import Home  from "./components/Home/Home";
import DogDetails from "./components/DogDetails/DogDetails";
import DogCreate from "./components/DogCreate/DogCreate";
import About from './components/About/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component = {LandingPage}/>
          <Route exact path='/home' component = {Home}/>
          <Route exact path={"/home/:id"} component={DogDetails}/>
          <Route exact path={"/createDog"} component={DogCreate}/>
          <Route exact path='/about' component={About}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
