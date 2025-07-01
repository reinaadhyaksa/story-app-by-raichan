export function extractPathnameSegments(path) {
  const splitUrl = path.split('/');
  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = '';

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat('/:id');
  }

  return pathname || '/';
}

export function getActivePathname() {
  return location.hash.replace('#', '') || '/';
}

export function getActiveRoute() {
  const pathname = getActivePathname(); // Contoh: "/reports/123"
  const segments = extractPathnameSegments(pathname);

  if (segments.resource === 'reports' && segments.id) {
    return '/reports/:id';
  }
  else if (!segments.resource) {
    return '/';
  }
  else if (['login', 'register', 'new', 'bookmark'].includes(segments.resource)) {
    return `/${segments.resource}`;
  }
  else {
    return '*';
  }
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
