import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';
const API = axios.create({
  baseURL: 'http://192.168.1.5:3000/',
});

export default {
  checkToken: async token => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });
    const json = await req.json();
    return json;
  },
  singnIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const json = await req.json();
    return json;
  },
  signUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await req.json();
    return json;
  },
  getBarbers: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/barbers?token=${token}`);
    const json = await req.json();
    return json;
  },

  getAnimals: async () => {
    const response = await API.get('animals');
    const json = await response.data;
    return json;
  },
};
  