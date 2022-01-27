import { createStoreon } from 'storeon';
import { FormikModule, FormikEvents, FormikState } from './formik';
import { UserModule, UserState, UserEvents } from './user';

import { storeonDevtools } from 'storeon/devtools';
//States import
import type { IAuthUser } from './core/AuthStore';

export interface AppState extends IAuthUser, UserState {}

//Events import
import type { AuthEvents } from './core/AuthStore';

export interface AppEvents extends AuthEvents, UserEvents {}

//Modules import

import { AuthUserModule } from './core/AuthStore';

export const AppStore = createStoreon<AppState, AppEvents>([
  UserModule,
  AuthUserModule,
  //FormikModule,
  //ApplicationModule,
  ...[storeonDevtools]
]);
