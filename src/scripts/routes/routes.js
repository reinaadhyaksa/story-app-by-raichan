import RegisterPage from '../pages/auth/register/register-page';
import LoginPage from '../pages/auth/login/login-page';
import HomePage from '../pages/home/home-page';
import ReportDetailPage from '../pages/report-detail/report-detail-page';
import BookmarkPage from '../pages/bookmark/bookmark-page';
import NewPage from '../pages/new/new-page';
import NotFoundPage from '../pages/not-found/404';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import { getActiveRoute } from './url-parser';

export const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/new': () => checkAuthenticatedRoute(new NewPage()),
  '/reports/:id': () => checkAuthenticatedRoute(new ReportDetailPage()),
  '/bookmark': () => checkAuthenticatedRoute(new BookmarkPage()),
  '*': () => new NotFoundPage(),
};

export function resolveRoute() {
  const routePattern = getActiveRoute();
  return routes[routePattern](); 
}