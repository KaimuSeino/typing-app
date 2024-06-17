/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 * ログインしていないユーザでもアクセスができる
 * これらのルートは認証を必要としていない
 */

export const publicRoutes = [
  "/",
  "/auth/new-verification"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 * 認証に使用されるルートの配列
 * 認証済みのユーザはこれらのルートにアクセスすると/settingにリダイレクトされるようにした。　// Eventiでは/searchにすればいいね
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 * API 認証ルートのプレフィックス
 * このプレフィックスで始まるルートはAPIに使用されます  prefix: 接頭辞
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAUT_LOGIN_REDIRECT = "/learn"