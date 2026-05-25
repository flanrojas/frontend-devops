export const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.API_URL || "/api").replace(/\/$/, "");

export const apiPath = (path) => `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
