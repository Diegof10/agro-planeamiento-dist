import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import "./router-CdEJY5Qd.mjs";
import { n as SiteNav, t as BrandMark } from "./site-nav-BTEAvpny.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DgjsqIJ6.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { active: "login" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "page-main page-main-narrow grid place-items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "size-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-2xl",
					children: "Acceso"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 w-full space-y-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-soft",
						children: "El acceso está desactivado en este entorno."
					})
				})
			]
		})]
	});
}
//#endregion
export { Login as component };
