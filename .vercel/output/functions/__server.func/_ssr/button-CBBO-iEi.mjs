import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./site-nav-BghOkepp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CBBO-iEi.js
var import_jsx_runtime = require_jsx_runtime();
function Button({ className, variant = "primary", type = "button", ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium", variant === "primary" && "bg-forest text-cream hover:opacity-90", variant === "secondary" && "bg-cream hair hover:bg-paper-2", variant === "ghost" && "text-ink-soft hover:text-ink", className),
		...rest
	});
}
//#endregion
export { Button as t };
