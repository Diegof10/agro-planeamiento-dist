import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, b as Navigate, f as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as useCurrentUserState, n as SiteNav } from "./site-nav-AKpnAPBZ.mjs";
import { t as authMiddleware } from "./middleware-Caamrm23.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/require-auth-BMH_D_o-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var KIND_SET = /* @__PURE__ */ new Set([
	"clientes",
	"escenarios",
	"open",
	"trades",
	"cartera_client",
	"fotos",
	"informe_src",
	"campaign_input",
	"catalog"
]);
var MAX_JSON = 15e5;
function asKind(v) {
	return typeof v === "string" && KIND_SET.has(v) ? v : null;
}
function toJson(payload) {
	const text = JSON.stringify(payload ?? null);
	if (text.length > MAX_JSON) throw new Error("Payload demasiado grande");
	return JSON.parse(text);
}
var loadUserStore = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7f50cb161ab175b9fac0f2920dc5ae01f98064f679a7bb8628dce216c51b506f"));
var putUserStore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data || typeof data !== "object") throw new Error("Datos inválidos");
	const o = data;
	const kind = asKind(o.kind);
	if (!kind) throw new Error("Tipo inválido");
	return {
		kind,
		payload: toJson(o.payload)
	};
}).handler(createSsrRpc("20635d31f10982ef0028445f7fcd4ddbe445a104f2c9da2da89b310f87e6e5a1"));
var putUserStoreAll = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data || typeof data !== "object") throw new Error("Datos inválidos");
	const records = data.records;
	if (!records || typeof records !== "object") throw new Error("Datos inválidos");
	const out = {};
	for (const [k, v] of Object.entries(records)) {
		const kind = asKind(k);
		if (kind) out[kind] = toJson(v);
	}
	return { records: out };
}).handler(createSsrRpc("a489f487c4e9a3a4238e07c2866aa2674ec88be11daa4a855f91e27ef58ff3d5"));
var KEY = {
	clientes: "dhf-estudio-clientes-v1",
	escenarios: "dhf-estudio-escenarios-v1",
	open: "dhf-estudio-open-v1",
	trades: "dhf-trades-v1",
	cartera_client: "dhf-client-v1",
	fotos: "dhf-informe-fotos-v2",
	informe_src: "dhf-informe-src-v1",
	campaign_input: "dhf-informe-input-v1",
	catalog: "dhf-margenes-catalog-v2"
};
var ESTUDIO_EVENT = "dhf-estudio-updated";
var hydratedId = null;
var timers = /* @__PURE__ */ new Map();
function isHydrated(userId) {
	if (!userId) return Boolean(hydratedId);
	return hydratedId === userId;
}
function resetHydrate() {
	hydratedId = null;
	for (const t of timers.values()) clearTimeout(t);
	timers.clear();
}
function readLocal() {
	if (typeof window === "undefined") return {};
	const out = {};
	for (const kind of Object.keys(KEY)) {
		const raw = window.localStorage.getItem(KEY[kind]);
		if (!raw) continue;
		try {
			out[kind] = kind === "cartera_client" ? raw : JSON.parse(raw);
		} catch {}
	}
	return out;
}
function writeLocal(data) {
	if (typeof window === "undefined") return;
	for (const kind of Object.keys(KEY)) {
		if (!(kind in data)) continue;
		const v = data[kind];
		if (v == null) continue;
		if (kind === "cartera_client") {
			const s = typeof v === "string" ? v : "";
			if (s) window.localStorage.setItem(KEY[kind], s);
			continue;
		}
		window.localStorage.setItem(KEY[kind], JSON.stringify(v));
	}
	window.dispatchEvent(new Event(ESTUDIO_EVENT));
}
function score(data) {
	const n = (v) => Array.isArray(v) ? v.length : 0;
	return n(data.clientes) + n(data.escenarios) + n(data.trades) + n(data.fotos);
}
function queuePersist(kind, payload) {
	if (typeof window === "undefined") return;
	if (!hydratedId) return;
	const prev = timers.get(kind);
	if (prev) clearTimeout(prev);
	timers.set(kind, setTimeout(() => {
		timers.delete(kind);
		putUserStore({ data: {
			kind,
			payload
		} }).catch(() => void 0);
	}, 450));
}
async function hydrateUserStore(userId) {
	if (typeof window === "undefined") return;
	if (hydratedId === userId) return;
	const local = readLocal();
	let remote = {};
	try {
		remote = await loadUserStore() ?? {};
	} catch {
		hydratedId = userId;
		return;
	}
	if (score(remote) === 0 || score(local) > score(remote)) {
		if (score(local) > 0) await putUserStoreAll({ data: { records: local } }).catch(() => void 0);
	} else writeLocal(remote);
	hydratedId = userId;
}
function safeReturnTo(pathname) {
	if (!pathname.startsWith("/") || pathname.startsWith("//") || pathname.startsWith("/login")) return "/clientes";
	return pathname;
}
function GateSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "page-main page-main-narrow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-10 h-40 animate-pulse rounded-lg bg-paper-2 hair" })
		})]
	});
}
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const returnTo = (0, import_react.useRef)(null);
	const [storeReady, setStoreReady] = (0, import_react.useState)(() => Boolean(user && isHydrated(user.id)));
	if (returnTo.current === null) returnTo.current = safeReturnTo(pathname);
	(0, import_react.useEffect)(() => {
		if (!user) {
			resetHydrate();
			setStoreReady(false);
			return;
		}
		if (isHydrated(user.id)) {
			setStoreReady(true);
			return;
		}
		let cancelled = false;
		setStoreReady(false);
		hydrateUserStore(user.id).finally(() => {
			if (!cancelled) setStoreReady(true);
		});
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { next: returnTo.current }
	});
	if (!storeReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateSkeleton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { queuePersist as n, RequireAuth as t };
