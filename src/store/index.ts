import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { UserModule, UserState, UserEvents } from './user';
import { ProductModule, ProductState, ProductEvents } from './product';
import { CustomerModule, CustomerState, CustomerEvents } from './customer';
import { AuthUserModule, IAuthUser, AuthEvents } from './core/AuthStore';

export interface AppState extends IAuthUser, UserState, ProductState, CustomerState {}

export interface AppEvents extends AuthEvents, UserEvents, ProductEvents, CustomerEvents {}

export const AppStore = createStoreon<AppState, AppEvents>([
  UserModule,
  AuthUserModule,
  ProductModule,
  CustomerModule,
  //ApplicationModule,
  ...[storeonDevtools]
]);
