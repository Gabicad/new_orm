import React, { useMemo, useEffect, useRef } from 'react';
import { useStoreon } from 'storeon/react';
import { IUser } from '../../models/User';
import { UserState, UserEvents, UserEventKeys } from '../../store/user';
import { DataList, IColumn } from '../../components/DataList';
import { Button } from '@mui/material';
import Dialog from '../../components/Dialog';
import Userform from './form';
import { IActionMenu, ActionMenu } from '../../components/TableActionMenu';
import {
  Dashboard,
  AdminPanelSettings,
  Settings,
  PrecisionManufacturing,
  LocalOffer,
  Add,
  Delete,
  DoNotDisturb,
  CheckCircleOutline,
  Done,
  Send,
  ChangeCircle,
  SvgIconComponent
} from '@mui/icons-material';
const user = () => {
  const { dispatch, users } = useStoreon<UserState, UserEvents>('users');

  useEffect(() => {
    dispatch(UserEventKeys.InitUsersEvent);
  }, []);

  const ActionItems: IActionMenu<IUser>[] = [
    {
      title: 'Módosítás',
      icon: Settings,
      onClick: (user: IUser) => console.log(user)
    }
  ];

  const handleOnclick = (row: IUser) => {
    console.log(row);
  };

  const columns: IColumn<IUser>[] = [
    {
      name: 'Név',
      selector: (row: IUser) => row.name
    },
    {
      name: 'E-mail',
      selector: (row: IUser) => row.email
    },
    {
      name: 'Alias',
      selector: (row: IUser) => row.email_alias
    },
    {
      name: 'Telefon',
      selector: (row: IUser) => row.phone
    },
    {
      name: 'Létrehozva',
      selector: (row: IUser) => row?.created_at?.toString() ?? ''
    },
    {
      name: 'Művelet',
      cell: (row: IUser) => <Button onClick={() => handleOnclick(row)}>asdf</Button>
    }
  ];

  const actions = (
    <Dialog title="Új admin">
      <Userform></Userform>
    </Dialog>
  );

  return (
    <>
      <DataList listData={users} columns={columns} headerActions={actions}></DataList>
    </>
  );
};

export default user;
