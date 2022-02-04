import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

const UserList = React.lazy(() => import('../pages/users/list'));
const OfferNew = React.lazy(() => import('../pages/offers/new'));
const UserForm = React.lazy(() => import('../pages/users/form'));
const ProductList = React.lazy(() => import('../pages/products/list2'));

const Routing = () => {
  return (
    <React.Suspense fallback={<></>}>
      <Routes>
        <Route path="products/list" element={<ProductList />} />
        <Route path="offers/new" element={<OfferNew />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/form" element={<UserForm />} />
      </Routes>
    </React.Suspense>
  );
};

export default Routing;
