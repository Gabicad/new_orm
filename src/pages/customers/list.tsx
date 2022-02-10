import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { CustomerState, CustomerEvents, CustomerEventKeys } from '../../store/customer';
import DataGird from '../../components/DataGrid';
import { ICustomerList } from '../../models/Customer';
import { GridColumns, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { ActionMenu, IActionMenu } from '../../components/TableActionMenu';
import { Delete, Edit, Pageview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const customers = () => {
  const { dispatch, customers } = useStoreon<CustomerState, CustomerEvents>('customers');
  const history = useNavigate();
  useEffect(() => {
    dispatch(CustomerEventKeys.InitCustomersEvent);
  }, []);

  const ActionItems: IActionMenu<ICustomerList>[] = [
    {
      title: 'Adatlap',
      icon: Pageview,
      onClick: (item: ICustomerList) => {
        history(`/Customer/view/${item.id}`, { replace: true });
      }
    },
    {
      title: 'Módosítás',
      icon: Edit,
      onClick: (item: ICustomerList) => {}
    },
    {
      title: 'Törlés',
      icon: Delete,
      onClick: (item: ICustomerList) => console.log(typeof item)
    }
  ];

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'full_name', headerName: 'Név', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'E-mail', flex: 0.2 },
    { field: 'phone', headerName: 'Telefon', flex: 0.2 },
    { field: 'company', headerName: 'Cég', flex: 0.2 },
    { field: 'type', headerName: 'Típus', flex: 0.2 },
    {
      hideable: false,
      field: 'Actions',
      flex: 0.3,
      headerName: 'Műveletek',
      renderCell: (params: GridRenderCellParams<ICustomerList>) =>
        ActionMenu(params.row, ActionItems)
    }
  ];
  return (
    <>
      <DataGird listData={customers} columns={columns}></DataGird>
    </>
  );
};

export default customers;
