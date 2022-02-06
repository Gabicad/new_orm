import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userService } from '../services/api';
import { useStoreon } from 'storeon/react';
import { AuthEvents, IAuthUser } from '../store/core/AuthStore';
const Login = () => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { dispatch } = useStoreon<IAuthUser, AuthEvents>('loggedIn');
  // @ts-ignore
  const handleChange = (e) => {
    setUsername(e.currentTarget.value);
  };

  // @ts-ignore
  const handleChangePass = (e) => {
    setPassword(e.currentTarget.value);
  };
  const login = async () => {
    dispatch('Login', { username: username, password: password });
  };

  return (
    <div className="App">
      <form className="form">
        <TextField id="email" onChange={handleChange} type="text" />
        <TextField id="password" onChange={handleChangePass} type="password" />

        <Button type="button" color="primary" onClick={login} className="form__custom-button">
          Log in
        </Button>
      </form>
    </div>
  );
};
export default Login;
