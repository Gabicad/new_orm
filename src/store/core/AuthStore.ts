import { createStoreon, StoreonModule } from 'storeon';
import { IUser } from '../../models/User';
import { userService } from '../../services/api';
export interface IAuthUser {
  user: IUser;
  accessToken: string;
  loggedIn: boolean;
}
// Events declaration: map of event names to type of event data
export interface AuthEvents {
  // `inc` event which do not goes with any data

  setAccessToken: string;
  // `set` event which goes with number as data
  setAuthUser: IAuthUser;
  Login: { username: string; password: string };
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

  store.on('Login', async (state, payload) => {
    try {
      const data = await userService.login({
        username: payload.username,
        password: payload.password
      });
      if (data !== undefined) {
        console.log(data);
        localStorage.setItem('token', data.accessToken);
        store.dispatch('setAccessToken', data.accessToken);
      }
    } catch (e) {
      console.error('Product Module Store InitProductsEvent');
    }
  });
  store.on('setAccessToken', (state, token: string) => ({ accessToken: token, loggedIn: true }));
  store.on('setAuthUser', (state, User) => User);
};

export const authUserStore = createStoreon<IAuthUser, AuthEvents>([AuthUserModule]);
