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
