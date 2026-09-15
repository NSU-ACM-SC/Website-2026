export function isExternalLink(href: string) {
  return /^(https?:\/\/|\/\/|mailto:|tel:)/.test(href);
}

export function isRouterLink(href?: string) {
  return Boolean(href && !isExternalLink(href));
}

export function getPathFromHref(href: string) {
  return href.split("?")[0].split("#")[0];
}

export function isHrefActive(pathname: string, href: string) {
  const path = getPathFromHref(href);
  return path === "/"
    ? pathname === "/"
    : pathname === path || pathname.startsWith(`${path}/`);
}
