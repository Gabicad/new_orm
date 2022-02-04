export const appConfigDev = {
  apiBaseUrl: 'http://localhost/api'
};
export const appConfigProd = {
  apiBaseUrl: 'https://mgmbackend.biogames.hu/api'
};
export const appConfig = process.env.NODE_ENV === 'development' ? appConfigDev : appConfigProd;

export const sanctumConfig = {
  apiUrl: appConfig.apiBaseUrl,
  csrfCookieRoute: 'sanctum/csrf-cookie',
  signInRoute: 'login',
  signOutRoute: 'logout',
  userObjectRoute: 'Users/2'
};

export const DataTableOptions = {
  paginationRowsPerPageOptions: [20, 40, 50, 100, 200],
  paginationPerPage: 50
};
