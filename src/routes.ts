/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
      "/",
      "/canecas",
      "/carrinho",
      "/canecas/detalhes",
      "/auth/account-verification",
      "/politicas-do-site/politicas-de-privacidade",
      "/politicas-do-site/politicas-de-cookies",
      "/politicas-do-site/termos-e-condicoes",
      "/suporte",
      "/suporte/atendimento-ao-cliente",
      "/suporte/devolucao",
      "/suporte/entregas-e-rastreio",
      "/suporte/faq",
      "/suporte/instrucoes-de-uso",
      "/suporte/opnioes-e-sugestoes",
      "/seus-pedidos",
      "/seus-pedidos/rastreio",
      "/successo",
      "/pesquisar",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/error",
      "/auth/reset",
      "/auth/new-password",
      "/auth/owner-verification",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";