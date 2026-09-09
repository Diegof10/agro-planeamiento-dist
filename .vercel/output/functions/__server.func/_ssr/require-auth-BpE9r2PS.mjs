import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, H as require_react, b as Navigate, f as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteNav, o as useCurrentUserState } from "./site-nav-Bv-HDqOI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/require-auth-BpE9r2PS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function safeReturnTo(pathname) {
	if (!pathname.startsWith("/") || pathname.startsWith("//") || pathname.startsWith("/login")) return "/clientes";
	return pathname;
}
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const returnTo = (0, import_react.useRef)(null);
	if (returnTo.current === null) returnTo.current = safeReturnTo(pathname);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "page-main page-main-narrow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-10 h-40 animate-pulse rounded-lg bg-paper-2 hair" })
		})]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { next: returnTo.current }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { RequireAuth as t };
