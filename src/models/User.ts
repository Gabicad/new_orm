export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  email_alias: string;
  created_at?: Date;
  modified_at?: Date;
}

export const InitialUser: IUser = {
  name: '',
  email: '',
  password: '',
  phone: '',
  email_alias: ''
};
