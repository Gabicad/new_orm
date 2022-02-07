import { createStoreon, StoreonModule } from 'storeon';
import { IUser } from '../../models/User';
import { userService } from '../../services/api';
export interface IAuthUser {
  user?: IUser;
  accessToken: string;
  loggedIn: boolean;
}
// Events declaration: map of event names to type of event data
export interface AuthEvents {
  // `inc` event which do not goes with any data
  Logout: void;
  setAccessToken: IAuthUser;
  // `set` event which goes with number as data
  setAuthUser: IAuthUser;
  Login: IAuthUser;
}

export const AuthUserModule: StoreonModule<IAuthUser, AuthEvents> = (store) => {
  store.on('@init', () => {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        loggedIn: true,
        accessToken: token
      };
    }
    return { loggedIn: false };
  });
  store.on('Logout', (state) => {
    localStorage.removeItem('token');
    store.dispatch('setAccessToken', { accessToken: '', loggedIn: false });
  });
  store.on('Login', async (state, payload) => {
    localStorage.setItem('token', payload.accessToken);
    payload.loggedIn = true;
    store.dispatch('setAccessToken', payload);
  });
  store.on('setAccessToken', (state, payload: IAuthUser) => ({
    accessToken: payload.accessToken,
    loggedIn: payload.loggedIn
  }));
  store.on('setAuthUser', (state, User) => User);
};

export const authUserStore = createStoreon<IAuthUser, AuthEvents>([AuthUserModule]);
