import { IApiClient } from '../core/ApiClient';

import { IUser } from '../../../models/User';

export interface IUserApiClient {
  getAllUser(): Promise<IUser[] | undefined>;
  saveUser(user: IUser): Promise<IUser | undefined>;
}

export class UserApiClient implements IUserApiClient {
  UserApiClient: IApiClient;

  constructor(UserApiClient: IApiClient) {
    this.UserApiClient = UserApiClient;
  }

  async getAllUser(): Promise<IUser[] | undefined> {
    try {
      const response = await this.UserApiClient.get<IUser[]>(`/Users`);
      return response.length > 0 ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async saveUser(user: IUser): Promise<IUser | undefined> {
    try {
      const response = await this.UserApiClient.post<IUser, IUser>(`/Users`, user);
      return response.data ? response.data : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }
}
export default class UserService {
  UserApiClient: IUserApiClient;

  constructor(UserApiClient: IUserApiClient) {
    this.UserApiClient = UserApiClient;
  }

  async getAllUser(): Promise<IUser[] | undefined> {
    return this.UserApiClient.getAllUser();
  }

  async saveUser(user: IUser): Promise<IUser | undefined> {
    const response = await this.UserApiClient.saveUser(user);
    return response;
  }
}
