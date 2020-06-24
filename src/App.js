import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import logo from './logo.svg';
import { ThemeProvider } from 'pcln-design-system';
import FormikLoginForm from './components/auth/login.js';
import Display from './components/Display/display.js';
import FormikRegForm from "./components/auth/register.js";

export const theme = {
  primary: {
    lightGray: '#F9FBFC',
    darkGray: '#EEEEEF',
    gray: '#dadada'
  },
  secondary: {
    darkBlue: '#282E74',
    lightBlue: '#c3ccfa',
    blue: '#F9FBFC',
    darkTeal: '#3D689E',
    lightTeal: '#6B95BD'
  },
  navbar: {
    linkColor: 'yellow'
  },
  palette: {
    red: '#F22222',
    blue: '#1337F1',
    yellow: '#FFF500',
    lightPink: '#FFCCCC',
    orange: '#FFAA00',
    deepPink: '#FF0099',
    green: '#00AA00',
    black: '#001833',
    plum: '#EECCFF',
    rebeccaPurple: '#7700BB',
    gray: '#C4C4C4'
  },
  darkPalette: {
    red: '#970c0c',
    blue: '#102074',
    yellow: '#ff9a00',
    lightPink: '#f37f83',
    orange: '#c47019',
    deepPink: '#a70065',
    green: '#006400',
    black: '#0454a7',
    plum: '#cb6ae7',
    rebeccaPurple: '#3a0057',
    gray: '#656565'
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={FormikLoginForm} />
        <Route path="/display/" component={Display} />
        <Route path="/register/" component={FormikRegForm}/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
