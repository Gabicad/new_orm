import { IApiClient } from '../core/ApiClient';
import { IAuthUser } from '../../../store/core/AuthStore';
import { IUser } from '../../../models/User';

export interface IUserApiClient {
  getAllUser(): Promise<IUser[] | undefined>;
  getLastId(): Promise<number | undefined>;
  saveUser(user: IUser): Promise<IUser | undefined>;
  updateUser(user: IUser): Promise<boolean | undefined>;
  login({
    username,
    password
  }: {
    username: string;
    password: string;
  }): Promise<IAuthUser | undefined>;
  logout(): Promise<boolean | undefined>;
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

  async getLastId(): Promise<number | undefined> {
    try {
      const response = await this.UserApiClient.get<number>(`/Users/getLastId`);
      return response ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async updateUser(user: IUser): Promise<boolean | undefined> {
    try {
      const response = await this.UserApiClient.put<IUser, number>(`/Users/${user.id}`, user);
      return response === 1;
    } catch (exception) {
      console.error(exception);
    }
  }
  async login({
    username,
    password
  }: {
    username: string;
    password: string;
  }): Promise<IAuthUser | undefined> {
    try {
      const response = await this.UserApiClient.post<
        { username: string; password: string },
        IAuthUser
      >(`/Auth/Login`, {
        username: username,
        password: password
      });
      return response.data ? response.data : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }
  async logout(): Promise<boolean | undefined> {
    try {
      const response = await this.UserApiClient.post<{ logout: boolean }, boolean>(`/Auth/Logout`, {
        logout: true
      });
      return !!response;
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
  async getLastId(): Promise<number | undefined> {
    return this.UserApiClient.getLastId();
  }
  async updateUser(user: IUser): Promise<boolean | undefined> {
    const response = await this.UserApiClient.updateUser(user);
    return response;
  }
  async saveUser(user: IUser): Promise<IUser | undefined> {
    const response = await this.UserApiClient.saveUser(user);
    return response;
  }
  async logout(): Promise<boolean | undefined> {
    const response = await this.UserApiClient.logout();
    return response;
  }
  async login({
    username,
    password
  }: {
    username: string;
    password: string;
  }): Promise<IAuthUser | undefined> {
    const response = await this.UserApiClient.login({ username: username, password: password });
    return response;
  }
}
