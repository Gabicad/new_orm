import { IUser } from '../../models/User';
export const InitUsersEvent = Symbol(`InitUsersEvent`);
export const SaveUserEvent = Symbol(`SaveUserEvent`);
export const LoadUsersEvent = Symbol(`LoadUsersEvent`);

export const UserEventKeys = {
  InitUsersEvent,
  SaveUserEvent,
  LoadUsersEvent
} as const;

export interface UserEvents {
  [InitUsersEvent]: void;
  [SaveUserEvent]: IUser;
  [LoadUsersEvent]: IUser[];
}
