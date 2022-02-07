import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { ProductState, ProductEvents, ProductEventKeys } from '../../store/product';
import DataGird from '../../components/DataGrid';
import { IProductList } from '../../models/Product';
import { GridColumns, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { ActionMenu, IActionMenu } from '../../components/TableActionMenu';
import { Delete, Edit, Pageview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const products = () => {
  const { dispatch, products } = useStoreon<ProductState, ProductEvents>('products');
  const history = useNavigate();
  useEffect(() => {
    dispatch(ProductEventKeys.InitProductsEvent);
  }, []);

  const ActionItems: IActionMenu<IProductList>[] = [
    {
      title: 'Adatlap',
      icon: Pageview,
      onClick: (item: IProductList) => {
        history(`/Product/view/${item.id}`, { replace: true });
      }
    },
    {
      title: 'Módosítás',
      icon: Edit,
      onClick: (item: IProductList) => {}
    },
    {
      title: 'Törlés',
      icon: Delete,
      onClick: (item: IProductList) => console.log(typeof item)
    }
  ];

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Név', flex: 1, minWidth: 150 },
    {
      field: 'manufacturer',
      headerName: 'Gyártó',
      flex: 0,
      valueGetter: (params: GridValueGetterParams<IProductList>) => {
        return params.row?.manufacturer?.name ?? '';
      }
    },
    { field: 'price', headerName: 'Ár', flex: 0.2 },
    {
      hideable: false,
      field: 'Actions',
      flex: 0.3,
      headerName: 'Műveletek',
      renderCell: (params: GridRenderCellParams<IProductList>) =>
        ActionMenu(params.row, ActionItems)
    }
  ];
  return (
    <>
      <DataGird listData={products} columns={columns}></DataGird>
    </>
  );
};

export default products;
