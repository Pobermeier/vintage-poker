import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import theme from './styles/theme';
import Normalize from './styles/Normalize';
import GlobalStyles from './styles/Global';
import logoWithText from './assets/img/logo-text@2x.png';

const rootElement = document.getElementById('root');
const loadingScreen = document.getElementById('loading-screen');

if (
  process &&
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_MAINTENANCE_MODE === 'true'
) {
  const template = `
    <div style="width: 100%; padding: 0 1.5rem; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; background-color: hsl(43, 40%, 86%);">
      <img style="width: 100%; max-width: 320px;" src=${logoWithText} alt="Vintage Poker">
      <p style="font-size: 1.5rem; font-family: 'Roboto', sans-serif; color: hsl(36, 71%, 3%); text-align: center; margin-top: 3rem; padding: 1rem 2rem; background-color: hsl(49, 63%, 92%); border-radius: 2rem;">The website is currently in maintenance mode.</p>
    </div>
  `;
  loadingScreen.style.display = 'none';
  rootElement.innerHTML = template;
  rootElement.style.display = 'block';
} else {
  ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Normalize />
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </BrowserRouter>,
    rootElement,
  );

  window.onload = () => {
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      rootElement.style.display = 'block';
    }, 1000);
  };
}
