import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteNav, r as cn } from "./site-nav-AKpnAPBZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-BU_NP2BG.js
var import_jsx_runtime = require_jsx_runtime();
function Page({ children, nav }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "print:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { active: nav })
		}), children]
	});
}
function PageMain({ children, width = "wide" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: cn("page-main", width === "readable" && "page-main-readable", width === "narrow" && "page-main-narrow"),
		children
	});
}
function PageHeader({ kicker, title, lead, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "page-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.22em] text-forest uppercase",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.08] font-medium tracking-[-0.03em]",
					children: title
				}),
				lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 hidden max-w-xl text-sm leading-relaxed text-ink-soft sm:block",
					children: lead
				}) : null
			]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-actions",
			children: actions
		}) : null]
	});
}
function DeskGrid({ children, invertMobile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("desk-grid", invertMobile && "desk-grid-invert"),
		children
	});
}
function ChipRow({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("chip-row", className),
		children
	});
}
function ScrollPane({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("scroll-x", className),
		children
	});
}
//#endregion
export { PageMain as a, PageHeader as i, DeskGrid as n, ScrollPane as o, Page as r, ChipRow as t };
