import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { UserModule, UserState, UserEvents } from './user';
import { ProductModule, ProductState, ProductEvents } from './product';
import { AuthUserModule, IAuthUser, AuthEvents } from './core/AuthStore';

export interface AppState extends IAuthUser, UserState, ProductState {}

export interface AppEvents extends AuthEvents, UserEvents, ProductEvents {}

export const AppStore = createStoreon<AppState, AppEvents>([
  UserModule,
  AuthUserModule,
  ProductModule,
  //ApplicationModule,
  ...[storeonDevtools]
]);
