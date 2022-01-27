import { createStoreon, StoreonModule } from 'storeon';
import { userService } from '../../services/api';
import { UserEventKeys, UserEvents } from './user.events';
import { UserState } from './user.state';
import { IUser } from '../../models/User';

export const UserModule: StoreonModule<UserState, UserEvents> = (store) => {
  store.on('@init', () => ({ isLoading: false, users: [] }));
  store.on(UserEventKeys.InitUsersEvent, async (state) => {
    try {
      const data = await userService.getAllUser();
      if (data !== undefined) {
        store.dispatch(UserEventKeys.LoadUsersEvent, data);
      }
    } catch (e) {
      console.error('User Module Store InitUsersEvent');
    }
  });
  store.on(UserEventKeys.LoadUsersEvent, (state, Users: IUser[]) => ({
    users: Users
  }));
  store.on(UserEventKeys.SaveUserEvent, (state, User: IUser) => ({
    users: [...state.users, User]
  }));
};

export const UserStore = createStoreon<UserState, UserEvents>([UserModule]);
