import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { IProductList } from '../../models/Product';
import { ProductState, ProductEvents, ProductEventKeys } from '../../store/product';
import { DataList, IColumn } from '../../components/DataList';
import { useNavigate } from 'react-router-dom';
import { IActionMenu, ActionMenu } from '../../components/TableActionMenu';
import { Settings, Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useLocation, useParams } from 'react-router-dom';
const products = () => {
  const { dispatch, products } = useStoreon<ProductState, ProductEvents>('products');

  const history = useNavigate();
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    //dispatch(ProductEventKeys.InitProductsEvent);
  }, []);

  const ActionItems: IActionMenu<IProductList>[] = [
    {
      title: 'Módosítás',
      icon: Settings,
      onClick: (item: IProductList) => {}
    },
    {
      title: 'Törlés',
      icon: Delete,
      onClick: (item: IProductList) => console.log(typeof item)
    }
  ];

  const columns: IColumn<IProductList>[] = [
    {
      name: 'ID',
      selector: (row: IProductList) => row.id
    },
    {
      name: 'Termék Neve',
      selector: (row: IProductList) => row.name
    },
    {
      name: 'Gyártó',
      selector: (row: IProductList) => row.manufacturer.name
    },
    {
      name: 'Ár',
      selector: (row: IProductList) => row.price
    },
    {
      name: 'Active',
      cell: (row: IProductList) => (
        <Chip
          size="small"
          label={row.active ? 'Igen' : 'Nem'}
          color={row.active ? 'success' : 'error'}
        />
      )
    },
    {
      name: 'Művelet',
      cell: (row: IProductList) => ActionMenu(row, ActionItems)
    }
  ];

  const actions = (
    <Button variant="outlined" onClick={() => history('/Products/New', { replace: true })}>
      Új termék
    </Button>
  );

  return (
    <>
      <DataList listData={products} columns={columns} headerActions={actions}></DataList>
    </>
  );
};

export default products;
