import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useStoreon } from 'storeon/react';
import { IUser } from '../../models/User';
import { UserState, UserEvents, UserEventKeys } from '../../store/user';
import { DataList, IColumn } from '../../components/DataList';
import { Chip } from '@mui/material';
import Dialog, { SimpleDialog } from '../../components/Dialog';
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
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    dispatch(UserEventKeys.InitUsersEvent);
  }, []);

  const ActionItems: IActionMenu<IUser>[] = [
    {
      title: 'Módosítás',
      icon: Settings,
      onClick: (item: IUser) => {
        setOpenEdit(!openEdit);
        setUserEdit(item);
      }
    },
    {
      title: 'Törlés',
      icon: Done,
      onClick: (item: IUser) => console.log(typeof item)
    }
  ];

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
      cell: (row: IUser) => {
        const style = {};
        const color = 'error';
        return <Chip label={color} color={color} />;
      }
    },
    {
      name: 'Létrehozva',
      selector: (row: IUser) => row?.created_at?.toString() ?? ''
    },
    {
      name: 'Művelet',
      cell: (row: IUser) => ActionMenu(row, ActionItems)
    }
  ];

  const actions = (
    <Dialog title="Új admin">
      <Userform></Userform>
    </Dialog>
  );

  return (
    <>
      <Dialog buttonVisible={false} outsideOpener={openEdit} title="Módosítás">
        <Userform data={userEdit}></Userform>
      </Dialog>
      <DataList listData={users} columns={columns} headerActions={actions}></DataList>
    </>
  );
};

export default user;
