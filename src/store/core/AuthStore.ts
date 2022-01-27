import { createStoreon, StoreonModule } from 'storeon';
import { IUser } from '../../models/User';

export interface IAuthUser extends IUser {
  accessToken: string;
}
// Events declaration: map of event names to type of event data
export interface AuthEvents {
  // `inc` event which do not goes with any data

  setAccessToken: string;
  // `set` event which goes with number as data
  setAuthUser: IAuthUser;
}

export const AuthUserModule: StoreonModule<IAuthUser, AuthEvents> = (store) => {
  store.on('@init', () => ({}));
  store.on('setAccessToken', (state, token: string) => ({ accessToken: token }));
  store.on('setAuthUser', (state, User) => User);
};

export const authUserStore = createStoreon<IAuthUser, AuthEvents>([AuthUserModule]);
