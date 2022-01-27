import React, { ReactNode } from 'react';
import AppLoader from './AppLoader';
import { useAxiosLoader } from '../../services/api/core/AxiosLoading';
interface IAppSuspense {
  lazyLoad?: boolean;
}
const AppSuspense = ({ lazyLoad = false }: IAppSuspense) => {
  const [loading] = useAxiosLoader();
  if (loading || lazyLoad) {
    return <AppLoader />;
  }

  return <></>;
};

export default AppSuspense;
