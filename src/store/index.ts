import { createStoreon } from 'storeon';

import { UserModule, UserState, UserEvents } from './user';
import { ProductModule, ProductState, ProductEvents } from './product';

import { storeonDevtools } from 'storeon/devtools';
//States import
import type { IAuthUser } from './core/AuthStore';

export interface AppState extends IAuthUser, UserState, ProductState {}

//Events import
import type { AuthEvents } from './core/AuthStore';

export interface AppEvents extends AuthEvents, UserEvents, ProductEvents {}

//Modules import

import { AuthUserModule } from './core/AuthStore';

export const AppStore = createStoreon<AppState, AppEvents>([
  UserModule,
  AuthUserModule,
  ProductModule,
  //ApplicationModule,
  ...[storeonDevtools]
]);
