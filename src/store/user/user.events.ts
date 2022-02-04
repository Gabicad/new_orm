import { IUser } from '../../models/User';
export const InitUsersEvent = Symbol(`InitUsersEvent`);
export const SaveUserEvent = Symbol(`SaveUserEvent`);
export const LoadUsersEvent = Symbol(`LoadUsersEvent`);
export const UpdateUserEvent = Symbol(`UpdateUserEvent`);

export const UserEventKeys = {
  InitUsersEvent,
  SaveUserEvent,
  UpdateUserEvent,
  LoadUsersEvent
} as const;

export interface UserEvents {
  [InitUsersEvent]: void;
  [SaveUserEvent]: IUser;
  [LoadUsersEvent]: IUser[];
  [UpdateUserEvent]: IUser;
}
