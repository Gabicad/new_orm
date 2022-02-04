export const appConfig = {
  apiBaseUrl: 'http://localhost/api'
};

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
