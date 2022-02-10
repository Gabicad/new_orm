import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

const UserList = React.lazy(() => import('../pages/users/list'));
const OfferNew = React.lazy(() => import('../pages/offers/new'));
const UserForm = React.lazy(() => import('../pages/users/form'));
const ProductList = React.lazy(() => import('../pages/products/list2'));
const ProductView = React.lazy(() => import('../pages/products/view'));
const ProductForm = React.lazy(() => import('../pages/products/form'));
const CustomersList = React.lazy(() => import('../pages/customers/list'));

const Routing = () => {
  return (
    <React.Suspense fallback={<></>}>
      <Routes>
        <Route path="Customers" element={<CustomersList />} />
        <Route path="product/view/:id" element={<ProductView />} />
        <Route path="product/edit/:id" element={<ProductForm />} />
        <Route path="product/new" element={<ProductForm />} />
        <Route path="products/list" element={<ProductList />} />
        <Route path="offers/new" element={<OfferNew />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/form" element={<UserForm />} />
      </Routes>
    </React.Suspense>
  );
};

export default Routing;
