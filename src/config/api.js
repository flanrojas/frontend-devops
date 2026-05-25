const cleanUrl = (url) => url.replace(/\/$/, "");

export const VENTAS_API_URL = cleanUrl(
  import.meta.env.VITE_VENTAS_API_URL || "/api-ventas"
);

export const DESPACHOS_API_URL = cleanUrl(
  import.meta.env.VITE_DESPACHOS_API_URL || "/api-despachos"
);

const buildApiPath = (baseUrl, path) => `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const ventasApiPath = (path) => buildApiPath(VENTAS_API_URL, path);

export const despachosApiPath = (path) => buildApiPath(DESPACHOS_API_URL, path);
