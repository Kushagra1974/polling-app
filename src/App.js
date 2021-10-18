import './App.css';

import Login from './components/Login/Login';
import Home from "./components/Home/Home"
import Appbar from "./components/Appbar/Appbar"
import Poll from './components/Poll/Poll';

import { createTheme, ThemeProvider } from '@mui/material';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { StatesProvider } from './components/StatesProvider/StatesProvider';

const theme = createTheme({
  palette: {
    secondary: {
      main: "#fefefe"
    }
  }
})


function App() {

  return (
    <Router>
      <StatesProvider>
        <ThemeProvider theme={theme}>
          <Appbar></Appbar>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/poll" component={Poll} />
          </Switch>
        </ThemeProvider>
      </StatesProvider>
    </Router>
  );
}

export default App;
