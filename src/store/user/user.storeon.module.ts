import { createStoreon, StoreonModule } from 'storeon';
import { userService } from '../../services/api';
import { UserEventKeys, UserEvents } from './user.events';
import { UserState } from './user.state';
import { IUser } from '../../models/User';

export const UserModule: StoreonModule<UserState, UserEvents> = (store) => {
  store.on('@init', () => ({ isLoading: false, users: [] }));

  store.on(UserEventKeys.InitUsersEvent, async (state) => {
    try {
      let data = undefined;
      if (state.users.length > 0) {
        const maxValueOfY = Math.max(...state.users.map((o: IUser) => (o.id ? o.id : 0)));
        const lastId = await userService.getLastId();
        if (maxValueOfY !== lastId) {
          data = await userService.getAllUser();
        }
      } else {
        data = await userService.getAllUser();
      }

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
  store.on(UserEventKeys.UpdateUserEvent, (state, User: IUser) => {
    const foundIndex = state.users.findIndex((x: IUser) => x.id == User.id);
    state.users[foundIndex] = User;
    return {
      users: [...state.users]
    };
  });
};

export const UserStore = createStoreon<UserState, UserEvents>([UserModule]);
