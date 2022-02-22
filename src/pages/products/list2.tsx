import React, { useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import { ProductState, ProductEvents, ProductEventKeys } from '../../store/product';
import DataGird from '../../components/DataGrid';
import { IProduct, IProductList } from '../../models/Product';
import { GridColumns, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { ActionMenu, IActionMenu } from '../../components/TableActionMenu';
import { AddCircle, Delete, Edit, Pageview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageBar, { IPageBar } from '../../components/PageBar';
import Dialog from '../../components/Dialog';
import ProductForm from './form';
import { confirm } from 'react-confirm-box';

const products = () => {
  const { dispatch, products } = useStoreon<ProductState, ProductEvents>('products');
  const history = useNavigate();
  useEffect(() => {
    dispatch(ProductEventKeys.InitProductsEvent);
  }, []);

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [productEdit, setProductEdit] = useState<IProduct | undefined>(undefined);
  const [modalTitle, setModalTitle] = useState<string>('Új termék');

  const ActionItems: IActionMenu<IProductList>[] = [
    {
      title: 'Adatlap',
      icon: Pageview,
      onClick: (item: IProductList) => {
        history(`/Product/view/${item.id}`);
      }
    },
    {
      title: 'Törlés',
      icon: Delete,
      onClick: async (item: IProductList) => {
        const result = await confirm('Biztos benne hogy törli?', {
          labels: {
            confirmable: 'Igen',
            cancellable: 'Nem'
          }
        });
        if (result) {
          dispatch(ProductEventKeys.DeleteProductEvent, item.id);
          return;
        }
        return;
      }
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
    {
      hideable: false,
      field: 'Actions',
      flex: 0.3,
      headerName: 'Műveletek',
      renderCell: (params: GridRenderCellParams<IProductList>) =>
        ActionMenu(params.row, ActionItems)
    }
  ];

  const pageBar: IPageBar<IProduct> = {
    title: 'Új termék',
    buttons: [
      {
        icon: AddCircle,
        title: 'Új termék',
        color: 'primary',
        onClick: () => {
          setOpenEdit(!openEdit);
        }
      }
    ]
  };

  return (
    <>
      <Dialog buttonVisible={false} outsideOpener={openEdit} title={modalTitle}>
        <ProductForm data={productEdit}></ProductForm>
      </Dialog>
      <PageBar pageProps={pageBar} />
      <DataGird listData={products} columns={columns}></DataGird>
    </>
  );
};

export default products;
