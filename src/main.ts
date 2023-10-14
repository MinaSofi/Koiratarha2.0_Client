import {map, latLng, tileLayer, MapOptions} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import LoginMessageResponse from './interfaces/LoginMessageResponse';
import {User} from './interfaces/User';
import {Point} from 'geojson';
//import {io, Socket} from 'socket.io-client';

// Global variables
//const apiURL = import.meta.env.VITE_API_URL;
//const uploadURL = import.meta.env.VITE_UPLOAD_URL;
//const socketURL = import.meta.env.VITE_SOCKET_URL;

//const user: User = {};

const map = L.map('map');

// Use the leaflet.js library to show the location on the map (https://leafletjs.com/)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.setView([0, 0], 1);

/*
// check token
(async () => {
  const token = localStorage.getItem('token');

  if (token !== null) {
    try {
      const isTokenValid = await doGraphQLFetch(apiURL, checkToken, {}, token);
      if (isTokenValid.checkToken?.message === 'Token is valid') {
        console.log('token valid');
        loginButton.parentElement!.classList.add('d-none');
        logoutButton.parentElement!.classList.remove('d-none');
        forms.classList.remove('d-none');
        user.user_name = isTokenValid.checkToken.user.user_name;
        updateUserPanel(user);
      }
    } catch (error) {
      console.log(error);
    }
  }
})();

// login handling
loginButton.addEventListener('click', async () => {
  targetModal.innerHTML = createLoginModal();
  myModal.show();
  const loginForm = document.querySelector('#login-form') as HTMLFormElement;
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('#username') as HTMLInputElement;
    const password = loginForm.querySelector('#password') as HTMLInputElement;

    const credentials: Credentials = {
      username: username.value,
      password: password.value,
    };

    try {
      const loginData = (await doGraphQLFetch(apiURL, login, {
        credentials,
      })) as LoginMessageResponse;
      console.log(loginData);
      targetModal.innerHTML = createMessageModal(loginData.login.message);
      setTimeout(() => {
        myModal.hide();
      }, 2000);
      loginButton.parentElement!.classList.add('d-none');
      logoutButton.parentElement!.classList.remove('d-none');
      forms.classList.remove('d-none');
      localStorage.setItem('token', loginData.login.token!);
      user.user_name = loginData.login.user.user_name!;
      updateUserPanel(user);
    } catch (error) {
      console.log(error);
    }
  });
});

// logout handling
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  loginButton.parentElement!.classList.remove('d-none');
  logoutButton.parentElement!.classList.add('d-none');
  user.user_name = '';
  updateUserPanel(user);
});

// form handling
// get the active form based on the accordion
const getActiveForm = () => {
  const activeFormId = document
    .querySelector('.accordion-button[aria-expanded="true"]')
    ?.getAttribute('data-bs-target');
  if (activeFormId) {
    activeForm = document.querySelector(`${activeFormId} form`);
  }
};

// socket.io client
const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(socketURL);

// when message-button is clicked send update message to server
const messageButton = document.querySelector('#message-button');
messageButton?.addEventListener('click', () => {
  socket.emit('update', 'species');
});

socket.on('addAnimal', (data) => {
  console.log(data);
  updateAnimals();
  // open modal
  targetModal.innerHTML = createMessageModal(data);
  myModal.show();
  setTimeout(() => {
    myModal.hide();
  }, 2000);
});

socket.on('addSpecies', (data) => {
  console.log(data);
  updateSpecies();
  // open modal
  targetModal.innerHTML = createMessageModal(data);
  myModal.show();
  setTimeout(() => {
    myModal.hide();
  }, 2000);
});
*/
