import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, U as require_react, _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-_G1yBXj8.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BBCS8va8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var THEME_META = {
	light: "#f3efe6",
	dark: "#0c100e"
};
var THEME_BOOT = `(function(){try{var t=localStorage.getItem("dhf-theme");if(t!=="light"&&t!=="dark")t="light";var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#0c100e":"#f3efe6");}catch(e){}})();`;
function getTheme() {
	if (typeof window === "undefined") return "light";
	return window.localStorage.getItem("dhf-theme") === "dark" ? "dark" : "light";
}
function setTheme(t) {
	window.localStorage.setItem("dhf-theme", t);
	document.documentElement.setAttribute("data-theme", t);
	document.documentElement.style.colorScheme = t;
	const m = document.querySelector("meta[name=\"theme-color\"]");
	if (m) m.setAttribute("content", t === "dark" ? "#0c100e" : "#f3efe6");
}
var styles_default = "/assets/styles-BhA_r0Lx.css";
var APP_NAME = "Agro Planeamiento";
var Route$17 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: THEME_META.light
			},
			{
				name: "description",
				content: "Tablero de márgenes, granos y planeamiento financiero agro — Agro Planeamiento"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg?v=3"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$7 = () => import("./routes-CJXH9T7L.mjs");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./cartera-C5jOK7nt.mjs");
var Route$15 = createFileRoute("/cartera")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./clientes-CaGJVrcD.mjs");
var Route$14 = createFileRoute("/clientes")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./granos-B6_1i9_9.mjs");
var Route$13 = createFileRoute("/granos")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./informe-B3DdTEEL.mjs");
var Route$12 = createFileRoute("/informe")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./login-DGGOsl95.mjs");
var Route$11 = createFileRoute("/login")({
	validateSearch: (s) => {
		const next = typeof s.next === "string" ? s.next : void 0;
		if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/login")) return {};
		return { next };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./mantenimiento-DXymo4iD.mjs");
var Route$10 = createFileRoute("/mantenimiento")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./margenes-D-5UpO82.mjs");
var Route$9 = createFileRoute("/margenes")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var UA = "Mozilla/5.0 (compatible; AgroPlaneamiento/1.0; +https://agroplaneamiento.com)";
async function fetchText(url, ms = 8e3) {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), ms);
	try {
		const res = await fetch(url, {
			signal: ctrl.signal,
			headers: {
				"user-agent": UA,
				accept: "text/html,application/json,*/*"
			},
			redirect: "follow"
		});
		if (!res.ok) throw new Error(`${res.status}`);
		return await res.text();
	} finally {
		clearTimeout(t);
	}
}
async function fetchJson(url, ms = 8e3) {
	const raw = await fetchText(url, ms);
	return JSON.parse(raw);
}
function settled(p) {
	return p.status === "fulfilled" ? p.value : null;
}
function errMsg(e) {
	if (e instanceof Error) {
		if (e.name === "AbortError") return "timeout";
		return e.message || "fail";
	}
	return "fail";
}
var MANAGERS = {
	BRK: "Warren Buffett - Berkshire Hathaway",
	HC: "Li Lu - Himalaya Capital Management",
	psc: "Bill Ackman - Pershing Square",
	AM: "David Tepper - Appaloosa",
	ic: "Carl Icahn",
	AC: "Chuck Akre",
	GFT: "Gates Foundation",
	HA: "Bill Nygren - Oakmark",
	FS: "Terry Smith - Fundsmith",
	FFH: "Prem Watsa - Fairfax",
	BAUPOST: "Seth Klarman - Baupost",
	PI: "Mohnish Pabrai",
	MKL: "Thomas Gayner - Markel",
	YAM: "Yacktman",
	SAM: "Michael Burry - Scion",
	GLRE: "David Einhorn - Greenlight",
	tci: "Chris Hohn - TCI",
	tp: "Daniel Loeb - Third Point",
	TGM: "Chase Coleman - Tiger",
	LPC: "Stephen Mandel - Lone Pine"
};
function decode(s) {
	return s.replace(/&/g, "&").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/<[^>]+>/g, "").trim();
}
function escapeRe(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseDataromaHoldings(html, bookTickers = []) {
	const book = new Set(bookTickers.map((t) => t.toUpperCase()));
	const holdings = [];
	const rowRe = /<td class="stock"><a href="[^"]*stock\.php\?sym=([^"&#]+)[^"]*">([\s\S]*?)<\/a><\/td>\s*<td[^>]*>\s*([0-9]+(?:\.[0-9]+)?)\s*<\/td>([\s\S]*?)<\/tr>/gi;
	let m;
	while (m = rowRe.exec(html)) {
		const symbol = decode(m[1]).toUpperCase();
		const inner = decode(m[2]);
		const name = inner.replace(new RegExp(`^${escapeRe(symbol)}\\s*[-–]\\s*`, "i"), "") || inner;
		const weight = Number(m[3]);
		const act = />(Add [^<]+|Reduce [^<]+|Buy|Sell)</i.exec(m[4])?.[1] ?? "";
		holdings.push({
			symbol,
			name,
			weight: Number.isFinite(weight) ? weight : 0,
			activity: act,
			inBook: book.has(symbol)
		});
	}
	return holdings;
}
async function scrapeDataroma(id, bookTickers = []) {
	const html = await fetchText(`https://www.dataroma.com/m/holdings.php?m=${encodeURIComponent(id)}`, 8e3);
	const holdings = parseDataromaHoldings(html, bookTickers);
	const period = /Q[1-4]\s+20\d{2}/.exec(html)?.[0] ?? "";
	const date = /\d{1,2}\s+\w+\s+20\d{2}/.exec(html)?.[0] ?? "";
	if (!holdings.length) throw new Error("dataroma empty");
	return {
		id,
		manager: MANAGERS[id] ?? id,
		period,
		date,
		holdings: holdings.slice(0, 25)
	};
}
var Route$8 = createFileRoute("/api/dataroma")({ server: { handlers: { GET: async ({ request }) => {
	const url = new URL(request.url);
	const m = url.searchParams.get("m") || url.searchParams.get("manager") || "BRK";
	const tickers = (url.searchParams.get("tickers") ?? "").split(",").filter(Boolean);
	try {
		const data = await scrapeDataroma(m, tickers);
		return Response.json(data, { headers: { "cache-control": "public, max-age=120" } });
	} catch {
		return Response.json({
			id: m,
			manager: m,
			period: "",
			date: "",
			holdings: []
		}, { status: 200 });
	}
} } } });
function xml(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function cell(v) {
	if (typeof v === "number" && Number.isFinite(v)) return `<Cell><Data ss:Type="Number">${v}</Data></Cell>`;
	return `<Cell><Data ss:Type="String">${xml(String(v ?? ""))}</Data></Cell>`;
}
var Route$7 = createFileRoute("/api/excel")({ server: { handlers: { POST: async ({ request }) => {
	let body = {};
	try {
		body = await request.json();
	} catch {
		body = {};
	}
	const trades = Array.isArray(body.trades) ? body.trades : [];
	const name = (body.client || "movimientos").slice(0, 80);
	const book = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Blotter"><Table>${[`<Row>${[
		"Fecha",
		"Lado",
		"Ticker",
		"Tipo",
		"Broker",
		"Cantidad",
		"Precio",
		"Notional"
	].map(cell).join("")}</Row>`, ...trades.map((t) => {
		const qty = Number(t.qty) || 0;
		const price = Number(t.price) || 0;
		const kind = t.cedear ? "CEDEAR ARS" : "US USD";
		return `<Row>${[
			t.date ?? "",
			t.side === "sell" ? "Venta" : "Compra",
			t.ticker ?? "",
			kind,
			t.broker ?? "",
			qty,
			price,
			qty * price
		].map(cell).join("")}</Row>`;
	})].join("")}</Table></Worksheet>
</Workbook>`;
	const file = `Agro-Cartera-${name.replace(/[^A-Za-z0-9_-]+/g, "-").slice(0, 32) || "movimientos"}.xls`;
	return new Response(book, { headers: {
		"content-type": "application/vnd.ms-excel; charset=utf-8",
		"content-disposition": `attachment; filename="${file}"`
	} });
} } } });
function parseBnaArs(raw) {
	const s = raw.trim().replace(/\s/g, "");
	if (!s) return null;
	const n = s.includes(",") ? Number(s.replace(/\./g, "").replace(",", ".")) : Number(s);
	return Number.isFinite(n) && n > 100 && n < 2e4 ? n : null;
}
/** Pesos o dólares en formato AR ($560.000,00 / 373,58) o entero ($ 561000). */
function parseArMoney(raw) {
	const s = raw.replace(/[^\d,.-]/g, "").trim();
	if (!s) return null;
	let n;
	if (s.includes(",")) n = Number(s.replace(/\./g, "").replace(",", "."));
	else if (/^\d{1,3}(\.\d{3})+$/.test(s)) n = Number(s.replace(/\./g, ""));
	else n = Number(s);
	return Number.isFinite(n) && n > 0 ? n : null;
}
function isTimbuesPlaza(plaza, hint = "") {
	return /timbu|guaz[uú]|del guazu|pto\.?\s*timb/i.test(`${plaza} ${hint}`);
}
var EMPTY_PX = {
	ars: null,
	usd: null
};
function grainBlock(html, key) {
	const re = new RegExp(`<div class="board board-${key}[\\s\\S]*?</div>\\s*</div>\\s*</div>`, "i");
	return html.match(re)?.[0] ?? "";
}
function grainFromBoard(html, key) {
	const block = grainBlock(html, key);
	if (!block) return { ...EMPTY_PX };
	const arsRaw = block.match(/class="price"[^>]*>\s*([\s\S]*?)<\/div>/i)?.[1] ?? "";
	const usdRaw = block.match(/US\$\s*<\/strong>\s*([\s\S]*?)<\/div>/i)?.[1] ?? "";
	return {
		ars: parseArMoney(arsRaw),
		usd: parseArMoney(usdRaw)
	};
}
function parseCacPizarra(html) {
	const asOf = html.match(/Precios Pizarra del d[ií]a[^\d]{0,12}(\d{2}\/\d{2}\/\d{4})/i)?.[1] ?? null;
	const fx = parseArMoney(html.match(/TC BNA Divisas[\s\S]{0,80}?\$\s*([\d.]+,\d{2})/i)?.[1] ?? "");
	return {
		asOf,
		fx: fx && fx > 100 && fx < 2e4 ? fx : null,
		soja: grainFromBoard(html, "soja"),
		maiz: grainFromBoard(html, "maiz"),
		trigo: grainFromBoard(html, "trigo"),
		girasol: grainFromBoard(html, "girasol")
	};
}
function parseAfaDiario(html) {
	const out = [];
	const re = /float-right">\s*([^<]+?)\s*<\/div>\s*<div class="lead[^"]*">\s*([^<]+)\s*<\/div>\s*<div><small[^>]*>\s*([^<]+)\s*<\/small><\/div>\s*<div class="badge[^"]*"><h4>\s*([^<]+)\s*<\/h4>/gi;
	let m;
	while (m = re.exec(html)) {
		const ars = parseArMoney(m[4]);
		if (ars == null || ars < 1e3) continue;
		out.push({
			asOf: m[1].trim().match(/\d{2}\/\d{2}\/\d{4}/)?.[0] ?? m[1].trim() ?? null,
			grain: m[2].trim(),
			plaza: m[3].trim(),
			ars
		});
	}
	return out;
}
var GRAIN_KEY = {
	soja: "soja",
	maíz: "maiz",
	maiz: "maiz",
	trigo: "trigo",
	girasol: "girasol"
};
function afaSanMartin(cards) {
	const pick = (grain) => {
		const rows = cards.filter((c) => GRAIN_KEY[c.grain.toLowerCase()] === grain && !isTimbuesPlaza(c.plaza));
		return rows.find((c) => /san mart/i.test(c.plaza)) ?? rows[0] ?? null;
	};
	const soja = pick("soja");
	const maiz = pick("maiz");
	const trigo = pick("trigo");
	const girasol = pick("girasol");
	const plaza = soja?.plaza || maiz?.plaza || trigo?.plaza || "San Martín";
	return {
		asOf: soja?.asOf || maiz?.asOf || trigo?.asOf || girasol?.asOf || null,
		plaza,
		soja: soja?.ars ?? null,
		maiz: maiz?.ars ?? null,
		trigo: trigo?.ars ?? null,
		girasol: girasol?.ars ?? null
	};
}
function usdTRound(n) {
	return Math.round(n * 10) / 10;
}
function arsToUsd(ars, fx) {
	if (ars == null || !(fx && fx > 0)) return null;
	return usdTRound(ars / fx);
}
function bnaBilleteVenta(html) {
	if (!html) return null;
	const m = html.match(/Dolar U\.S\.A<\/td>\s*<td[^>]*>\s*([\d.,]+)\s*<\/td>\s*<td[^>]*>\s*([\d.,]+)\s*<\/td>/i);
	return m ? parseBnaArs(m[2]) : null;
}
function row(id, label, uses, mode, ms, host, extra = {}) {
	return {
		id,
		label,
		uses,
		ok: mode !== "caido",
		mode,
		ms,
		host,
		...extra
	};
}
async function checkYahoo() {
	const uses = "Índices, CBOT, tasas, energía, metales, FX, cripto";
	const t0 = Date.now();
	const errors = [];
	for (const host of ["query1", "query2"]) try {
		const px = (await fetchJson(`https://${host}.finance.yahoo.com/v8/finance/chart/ZS=F?interval=1d&range=5d`, 7e3)).chart?.result?.[0]?.meta?.regularMarketPrice;
		if (px == null) throw new Error("sin precio");
		return row("yahoo", "Yahoo Finance", uses, host === "query1" ? "vivo" : "respaldo", Date.now() - t0, `${host}.finance.yahoo.com`, { note: host === "query2" ? "query1 no respondió · el tablero usa query2" : `ZS=F ${px}` });
	} catch (e) {
		errors.push(`${host}: ${errMsg(e)}`);
	}
	return row("yahoo", "Yahoo Finance", uses, "caido", Date.now() - t0, "finance.yahoo.com", {
		ok: false,
		error: errors.join(" · "),
		note: "Sin respaldo extra. Hay que cambiar la fuente de cotizaciones."
	});
}
async function checkDolarApi() {
	const uses = "Oficial, blue, MEP, CCL";
	const t0 = Date.now();
	try {
		const oficial = (await fetchJson("https://dolarapi.com/v1/dolares", 6e3)).find((x) => x.casa === "oficial")?.venta;
		if (!oficial || oficial <= 0) throw new Error("sin oficial");
		return row("dolarapi", "DolarAPI", uses, "vivo", Date.now() - t0, "dolarapi.com", { note: `oficial ${oficial}` });
	} catch (e) {
		const first = errMsg(e);
		try {
			const oficial = (await fetchJson("https://api.bluelytics.com.ar/v2/latest", 6e3)).oficial?.value_sell;
			if (!oficial || oficial <= 0) throw new Error("sin oficial");
			return row("dolarapi", "DolarAPI", uses, "respaldo", Date.now() - t0, "api.bluelytics.com.ar", {
				error: first,
				note: `DolarAPI caído · tablero usa Bluelytics oficial ${oficial}`
			});
		} catch (e2) {
			return row("dolarapi", "DolarAPI", uses, "caido", Date.now() - t0, "dolarapi.com", {
				ok: false,
				error: `${first} · Bluelytics ${errMsg(e2)}`,
				note: "Sin respaldo para el tablero de casas. El BNA cubre solo el billete vendedor."
			});
		}
	}
}
async function checkBna() {
	const uses = "Tipo de cambio Granos (billete vendedor)";
	const t0 = Date.now();
	try {
		const venta = bnaBilleteVenta(await fetchText("https://www.bna.com.ar/Personas", 8e3));
		if (venta == null) throw new Error("HTML 200, sin fila Dólar U.S.A.");
		return row("bna", "BNA billete", uses, "vivo", Date.now() - t0, "bna.com.ar", { note: `venta ${venta}` });
	} catch (e) {
		const first = errMsg(e);
		try {
			const oficial = (await fetchJson("https://dolarapi.com/v1/dolares", 6e3)).find((x) => x.casa === "oficial")?.venta;
			if (!oficial || oficial <= 0) throw new Error("sin oficial");
			return row("bna", "BNA billete", uses, "respaldo", Date.now() - t0, "dolarapi.com", {
				error: first,
				note: `BNA caído · Granos usa DolarAPI oficial ${oficial}`
			});
		} catch (e2) {
			return row("bna", "BNA billete", uses, "caido", Date.now() - t0, "bna.com.ar", {
				ok: false,
				error: `${first} · DolarAPI ${errMsg(e2)}`,
				note: "Sin tipo de cambio vivo. Queda el último corte."
			});
		}
	}
}
async function checkBcra() {
	const uses = "Mayorista, reservas, BADLAR, inflación";
	const t0 = Date.now();
	try {
		const data = await fetchJson("https://api.bcra.gob.ar/estadisticas/v4.0/monetarias?limit=20", 1e4);
		const n = data.results?.length ?? 0;
		if (!n) throw new Error("sin series");
		const mayorista = data.results?.find((x) => x.idVariable === 5)?.ultValorInformado;
		return row("bcra", "BCRA v4", uses, "vivo", Date.now() - t0, "api.bcra.gob.ar", { note: mayorista != null ? `mayorista ${mayorista}` : `${n} series` });
	} catch (e) {
		return row("bcra", "BCRA v4", uses, "caido", Date.now() - t0, "api.bcra.gob.ar", {
			ok: false,
			error: errMsg(e),
			note: "v3 está deprecada. Si v4 cae hay que cambiar de fuente — no hay respaldo automático."
		});
	}
}
async function checkRiesgo() {
	const uses = "Riesgo país";
	const t0 = Date.now();
	try {
		const data = await fetchJson("https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo", 6e3);
		if (data.valor == null) throw new Error("sin valor");
		return row("argentinadatos", "ArgentinaDatos", uses, "vivo", Date.now() - t0, "api.argentinadatos.com", { note: `${data.valor} bp${data.fecha ? ` · ${data.fecha}` : ""}` });
	} catch (e) {
		return row("argentinadatos", "ArgentinaDatos", uses, "caido", Date.now() - t0, "api.argentinadatos.com", {
			ok: false,
			error: errMsg(e),
			note: "Sin respaldo. Data912 /live/risk ya no existe."
		});
	}
}
async function checkBonds() {
	const uses = "AL30D, GD30D, MEP implícito, acciones BYMA, CEDEAR";
	const t0 = Date.now();
	try {
		const [bonds, stocks, cedears] = await Promise.all([
			fetchJson("https://data912.com/live/arg_bonds", 6e3),
			fetchJson("https://data912.com/live/arg_stocks", 6e3),
			fetchJson("https://data912.com/live/arg_cedears", 6e3).catch(() => [])
		]);
		const al30d = bonds.find((x) => x.symbol === "AL30D")?.c;
		const ggal = stocks.find((x) => x.symbol === "GGAL")?.c;
		const aapl = cedears.find((x) => x.symbol === "AAPL")?.c;
		if (!bonds.length && !stocks.length) throw new Error("lista vacía");
		const bits = [
			al30d != null ? `AL30D ${al30d}` : `${bonds.length} bonos`,
			ggal != null ? `GGAL ${ggal}` : `${stocks.length} acciones`,
			aapl != null ? `AAPL CEDEAR ${aapl}` : cedears.length ? `${cedears.length} CEDEAR` : null
		].filter(Boolean);
		return row("data912", "Data912", uses, "vivo", Date.now() - t0, "data912.com", { note: bits.join(" · ") });
	} catch (e) {
		return row("data912", "Data912", uses, "caido", Date.now() - t0, "data912.com", {
			ok: false,
			error: errMsg(e),
			note: "Sin respaldo para bonos ni BYMA. Hay que cambiar de fuente."
		});
	}
}
async function checkCoin() {
	const uses = "Dominancia BTC / TOTAL2 / TOTAL3";
	const t0 = Date.now();
	try {
		const raw = await fetchJson("https://api.coinlore.net/api/global/", 6e3);
		const row0 = Array.isArray(raw) ? raw[0] : raw?.data?.[0];
		const btc = Number(row0?.btc_d);
		if (!Number.isFinite(btc) || btc <= 0) throw new Error("sin btc_d");
		return row("coinlore", "Coinlore", uses, "vivo", Date.now() - t0, "api.coinlore.net", { note: `BTC.D ${btc}` });
	} catch (e) {
		const first = errMsg(e);
		try {
			const btc = (await fetchJson("https://api.coingecko.com/api/v3/global", 6e3)).data?.market_cap_percentage?.btc;
			if (btc == null || btc <= 0) throw new Error("sin btc");
			return row("coinlore", "Coinlore", uses, "respaldo", Date.now() - t0, "api.coingecko.com", {
				error: first,
				note: `Coinlore caído · tablero usa CoinGecko BTC.D ${btc}`
			});
		} catch (e2) {
			return row("coinlore", "Coinlore", uses, "caido", Date.now() - t0, "api.coinlore.net", {
				ok: false,
				error: `${first} · CoinGecko ${errMsg(e2)}`,
				note: "Hay que cambiar la fuente de dominancia cripto."
			});
		}
	}
}
async function checkDataroma() {
	const uses = "Carteras de superinversores";
	const t0 = Date.now();
	try {
		const holdings = parseDataromaHoldings(await fetchText("https://www.dataroma.com/m/holdings.php?m=BRK", 8e3));
		if (!holdings.length) throw new Error("HTML 200, sin tenencias (parser)");
		const top = holdings[0];
		return row("dataroma", "Dataroma", uses, "vivo", Date.now() - t0, "dataroma.com", { note: `${holdings.length} tenencias · ${top.symbol} ${top.weight}%` });
	} catch (e) {
		return row("dataroma", "Dataroma", uses, "caido", Date.now() - t0, "dataroma.com", {
			ok: false,
			error: errMsg(e),
			note: "No hay API pública de respaldo. Si el HTML cambia, hay que ajustar el parser."
		});
	}
}
async function checkCac() {
	const uses = "Pizarra Rosario";
	const t0 = Date.now();
	try {
		const p = parseCacPizarra(await fetchText("https://www.cac.bcr.com.ar/es", 8e3));
		if (p.soja.usd == null && p.soja.ars == null) throw new Error("HTML 200, sin pizarra soja");
		return row("cac", "CAC Rosario", uses, "vivo", Date.now() - t0, "cac.bcr.com.ar", { note: `soja ${p.soja.usd ?? p.soja.ars} · ${p.asOf ?? "hoy"}` });
	} catch (e) {
		return row("cac", "CAC Rosario", uses, "caido", Date.now() - t0, "cac.bcr.com.ar", {
			ok: false,
			error: errMsg(e),
			note: "Sin pizarra viva; Granos usa el último corte guardado."
		});
	}
}
async function checkAfa() {
	const uses = "Precios locales AFA San Martín";
	const t0 = Date.now();
	try {
		const soja = parseAfaDiario(await fetchText("https://www.afascl.coop/afadiario/mercados-en-linea", 8e3)).find((c) => /soja/i.test(c.grain) && /san mart/i.test(c.plaza));
		if (!soja) throw new Error("HTML 200, sin soja San Martín");
		return row("afa", "AFA Diario", uses, "vivo", Date.now() - t0, "afascl.coop", { note: `soja San Martín ${soja.ars} · ${soja.asOf ?? ""}`.trim() });
	} catch (e) {
		return row("afa", "AFA Diario", uses, "caido", Date.now() - t0, "afascl.coop", {
			ok: false,
			error: errMsg(e),
			note: "Sin AFA Diario vivo; no se muestra Timbúes."
		});
	}
}
var ARCHIVO = [row("magyp", "MAGYP FOB/FAS", "FOB Up River, FAS teórico, campaña", "archivo", 0, "archivo local", { note: "No hay endpoint vivo; se lee del último corte guardado." }), row("usda", "USDA WASDE", "Balances mundiales y Crop Progress", "archivo", 0, "archivo local", { note: "Informe mensual, no cotización. Se actualiza a mano con el WASDE." })];
var cache = null;
var TTL_MS = 15e3;
async function checkFuentes(force = false) {
	if (!force && cache && Date.now() - cache.at < TTL_MS) return cache.report;
	const live = await Promise.all([
		checkYahoo(),
		checkDolarApi(),
		checkBna(),
		checkBcra(),
		checkRiesgo(),
		checkBonds(),
		checkCoin(),
		checkDataroma(),
		checkCac(),
		checkAfa()
	]);
	const items = [...live, ...ARCHIVO];
	const report = {
		asOf: (/* @__PURE__ */ new Date()).toISOString(),
		vivos: live.filter((x) => x.mode === "vivo").length,
		respaldos: live.filter((x) => x.mode === "respaldo").length,
		caidos: live.filter((x) => x.mode === "caido").length,
		items
	};
	cache = {
		at: Date.now(),
		report
	};
	return report;
}
var Route$6 = createFileRoute("/api/fuentes")({ server: { handlers: { GET: async ({ request }) => {
	const data = await checkFuentes(new URL(request.url).searchParams.get("fresh") === "1");
	return Response.json(data, { headers: { "cache-control": "public, max-age=15" } });
} } } });
var granos_fallback_default = {
	asOf: "2026-09-03T13:19:16.474Z",
	sources: [
		{
			"id": "cbot",
			"label": "Yahoo CBOT",
			"ok": true
		},
		{
			"id": "magyp",
			"label": "MAGYP FOB/FAS",
			"ok": true
		},
		{
			"id": "cac",
			"label": "CAC Rosario",
			"ok": true
		},
		{
			"id": "plazas",
			"label": "MAGYP pizarra puertos",
			"ok": true
		},
		{
			"id": "fx",
			"label": "BNA / DolarAPI",
			"ok": true
		},
		{
			"id": "wasde",
			"label": "USDA WASDE",
			"ok": true
		},
		{
			"id": "progress",
			"label": "USDA Crop Progress",
			"ok": true
		},
		{
			"id": "magyp-series",
			"label": "MAGYP series",
			"ok": true
		},
		{
			"id": "mae",
			"label": "A3 MAE CEM",
			"ok": true
		},
		{
			"id": "afa",
			"label": "AFA Diario",
			"ok": true
		},
		{
			"id": "aca",
			"label": "ACA físico",
			"ok": true
		}
	],
	fxBna: 1530,
	cbot: [
		{
			"id": "ZS=F",
			"label": "Soja CBOT",
			"value": 477,
			"change": -.008022922636103158,
			"hint": "1298.25 ¢/bu"
		},
		{
			"id": "ZC=F",
			"label": "Maíz CBOT",
			"value": 209,
			"change": -.021198156682027625,
			"hint": "531.00 ¢/bu"
		},
		{
			"id": "ZW=F",
			"label": "Trigo CBOT",
			"value": 272.9,
			"change": -.041303646337528255,
			"hint": "742.75 ¢/bu"
		}
	],
	local: [{
		"plaza": "Rosario",
		"hint": "CAC",
		"soja": 375.5,
		"maiz": 190,
		"trigo": 237.48,
		"girasol": 500,
		"unit": "usdt"
	}, {
		"plaza": "AFA",
		"hint": "San Martín · 02/09/2026",
		"soja": 376.2,
		"maiz": 196.4,
		"trigo": 241.7,
		"girasol": 500,
		"unit": "usdt"
	}],
	fas: [
		{
			"grain": "soja",
			"label": "Soja",
			"fob": 506,
			"dexPct": .26877470355731226,
			"costs": 136,
			"fas": 370,
			"pizarra": 375.5,
			"asOf": "02/09/2026"
		},
		{
			"grain": "maiz",
			"label": "Maíz",
			"fob": 225,
			"dexPct": .14800000000000002,
			"costs": 33.3,
			"fas": 191.7,
			"pizarra": 190,
			"asOf": "02/09/2026"
		},
		{
			"grain": "trigo",
			"label": "Trigo",
			"fob": 266,
			"dexPct": .13233082706766908,
			"costs": 35.2,
			"fas": 230.8,
			"pizarra": 237.48,
			"asOf": "02/09/2026"
		},
		{
			"grain": "girasol",
			"label": "Girasol",
			"fob": 593,
			"dexPct": .30893760539629,
			"costs": 183.2,
			"fas": 409.8,
			"pizarra": 500,
			"asOf": "02/09/2026"
		},
		{
			"grain": "cebada",
			"label": "Cebada",
			"fob": 267,
			"dexPct": .1262172284644194,
			"costs": 33.7,
			"fas": 233.3,
			"pizarra": null,
			"asOf": "02/09/2026"
		},
		{
			"grain": "sorgo",
			"label": "Sorgo",
			"fob": 215,
			"dexPct": .16604651162790696,
			"costs": 35.7,
			"fas": 179.3,
			"pizarra": 181.49,
			"asOf": "02/09/2026"
		}
	],
	matba: [
		{
			"id": "soja-MAY27",
			"label": "Soja Rosario",
			"contract": "May-27",
			"value": 359.5,
			"change": .0027894,
			"volume": 1102,
			"openInterest": 9973,
			"asOf": "2026-09-02"
		},
		{
			"id": "soja-NOV26",
			"label": "Soja Rosario",
			"contract": "Nov-26",
			"value": 377.2,
			"change": .00319149,
			"volume": 1890,
			"openInterest": 9418,
			"asOf": "2026-09-02"
		},
		{
			"id": "maiz-DIC26",
			"label": "Maíz Rosario",
			"contract": "Dic-26",
			"value": 208.7,
			"change": -.00571701,
			"volume": 409,
			"openInterest": 9411,
			"asOf": "2026-09-02"
		},
		{
			"id": "maiz-JUL27",
			"label": "Maíz Rosario",
			"contract": "Jul-27",
			"value": 204.7,
			"change": -.00823643,
			"volume": 440,
			"openInterest": 5959,
			"asOf": "2026-09-02"
		},
		{
			"id": "maiz-ABR27",
			"label": "Maíz Rosario",
			"contract": "Abr-27",
			"value": 208.2,
			"change": -.004784689999999999,
			"volume": 572,
			"openInterest": 5731,
			"asOf": "2026-09-02"
		},
		{
			"id": "maiz-SEP26",
			"label": "Maíz Rosario",
			"contract": "Sep-26",
			"value": 199,
			"change": .00505051,
			"volume": 1035,
			"openInterest": 2470,
			"asOf": "2026-09-02"
		},
		{
			"id": "trigo-DIC26",
			"label": "Trigo Rosario",
			"contract": "Dic-26",
			"value": 238.9,
			"change": -.00790021,
			"volume": 608,
			"openInterest": 5801,
			"asOf": "2026-09-02"
		},
		{
			"id": "trigo-ENE27",
			"label": "Trigo Rosario",
			"contract": "Ene-27",
			"value": 242.5,
			"change": -.0077741400000000006,
			"volume": 405,
			"openInterest": 5422,
			"asOf": "2026-09-02"
		},
		{
			"id": "trigo-MAR27",
			"label": "Trigo Rosario",
			"contract": "Mar-27",
			"value": 245.7,
			"change": -.00724638,
			"volume": 116,
			"openInterest": 1020,
			"asOf": "2026-09-02"
		}
	],
	matbaAsOf: "2026-09-02",
	fob: [
		{
			"id": "upriver-soja",
			"label": "Soja",
			"origin": "Up River",
			"value": 506,
			"change": null,
			"vsCbot": .06079664570230614
		},
		{
			"id": "upriver-maiz",
			"label": "Maíz",
			"origin": "Up River",
			"value": 225,
			"change": null,
			"vsCbot": .07655502392344493
		},
		{
			"id": "upriver-trigo",
			"label": "Trigo",
			"origin": "Up River",
			"value": 266,
			"change": null,
			"vsCbot": -.02528398680835464
		},
		{
			"id": "upriver-girasol",
			"label": "Girasol",
			"origin": "Up River",
			"value": 593,
			"change": null,
			"vsCbot": null
		},
		{
			"id": "upriver-sorgo",
			"label": "Sorgo",
			"origin": "Up River",
			"value": 215,
			"change": null,
			"vsCbot": null
		},
		{
			"id": "upriver-cebada",
			"label": "Cebada",
			"origin": "Up River",
			"value": 267,
			"change": null,
			"vsCbot": null
		}
	],
	campaign: [
		{
			"grain": "soja",
			"label": "Soja",
			"campaign": "WASDE 2026/27",
			"production": 50,
			"areaPlanted": 17.99,
			"stocks": 24.22,
			"djve": null
		},
		{
			"grain": "maiz",
			"label": "Maíz",
			"campaign": "WASDE 2026/27",
			"production": 55,
			"areaPlanted": 9.23,
			"stocks": 4.01,
			"djve": null
		},
		{
			"grain": "trigo",
			"label": "Trigo",
			"campaign": "2025/26",
			"production": 27.86,
			"areaPlanted": 6.96,
			"stocks": null,
			"djve": null
		},
		{
			"grain": "girasol",
			"label": "Girasol",
			"campaign": "—",
			"production": null,
			"areaPlanted": null,
			"stocks": null,
			"djve": null
		},
		{
			"grain": "cebada",
			"label": "Cebada",
			"campaign": "—",
			"production": null,
			"areaPlanted": null,
			"stocks": null,
			"djve": null
		},
		{
			"grain": "sorgo",
			"label": "Sorgo",
			"campaign": "—",
			"production": null,
			"areaPlanted": null,
			"stocks": null,
			"djve": null
		}
	],
	usda: {
		"wasde": {
			"kind": "wasde",
			"title": "WASDE · Oferta y demanda mundial",
			"published": "agosto 2026",
			"period": "2026/27 vs informe previo",
			"headline": "WASDE agosto 2026 · n.° 674. Soja mundial en 442,3 mill. t y stocks de cierre en 124,2 mill. t. Maíz mundial 1.298,9 mill. t. Trigo mundial 819,3 mill. t.",
			"bullets": [
				"Soja mundial: producción 442,3 mill. t, stocks de cierre 124,2 mill. t (+0,04 mill. t vs el informe previo). EE.UU. 123,0 mill. t. Argentina 50,0 mill. t.",
				"Maíz mundial: producción 1.298,9 mill. t, stocks 274,7 mill. t (−0,60 mill. t vs el informe previo). EE.UU. 406,8 mill. t. Argentina 55,0 mill. t.",
				"Trigo mundial: producción 819,3 mill. t, stocks 273,3 mill. t (+0,41 mill. t vs el informe previo). EE.UU. 41,7 mill. t.",
				"Lectura local: el FAS teórico MAGYP y la pizarra Rosario se leen contra este número de stocks — no contra el futuro de Chicago solo."
			],
			"balances": [
				{
					"grain": "Soja",
					"usProduction": 122.99,
					"usYield": 52.7,
					"usStocks": 8.71,
					"worldProduction": 442.25,
					"worldStocks": 124.21,
					"stocksDelta": .00032213900297972664,
					"unit": "mill. t"
				},
				{
					"grain": "Maíz",
					"usProduction": 406.75,
					"usYield": 47.8,
					"usStocks": 41.98,
					"worldProduction": 1298.88,
					"worldStocks": 274.66,
					"stocksDelta": -.002179757320351583,
					"unit": "mill. t"
				},
				{
					"grain": "Trigo",
					"usProduction": 41.66,
					"usYield": null,
					"usStocks": 19.51,
					"worldProduction": 819.3,
					"worldStocks": 273.25,
					"stocksDelta": .0015027122122857062,
					"unit": "mill. t"
				}
			],
			"sourceUrl": "https://esmis.nal.usda.gov/publication/world-agricultural-supply-and-demand-estimates",
			"pending": false
		},
		"progress": {
			"kind": "progress",
			"title": "Crop Progress · Condición y avance",
			"published": "31 de agosto de 2026",
			"period": "semana al 30 de agosto de 2026",
			"headline": "Crop Progress semana al 30 de agosto de 2026. Maíz G+E 57% (semana previa 57%, año anterior 69%). Soja G+E 58%.",
			"bullets": [
				"Maíz: condición buena+excelente 57% vs 69% un año atrás. En dough 92% (promedio 5 años 89%).",
				"Soja: G+E 58% vs 65% el año pasado. Vainas 95% (promedio 5 años 93%).",
				"Un G+E más flojo que el año previo suele leerse como stocks más ajustados en el próximo WASDE — no es señal de precio por sí sola."
			],
			"balances": [],
			"sourceUrl": "https://esmis.nal.usda.gov/publication/crop-progress",
			"pending": false
		},
		"exports": {
			"kind": "exports",
			"title": "Exportable WASDE",
			"published": "agosto 2026",
			"period": "2026/27 vs informe previo",
			"headline": "Saldo exportable del WASDE agosto 2026. Datos extraídos de USDA · delay.",
			"bullets": [
				"Soja: exportaciones mundiales 190,4 mill. t. EE.UU. produce 123,0 mill. t.",
				"Maíz: exportaciones mundiales 210,5 mill. t. EE.UU. produce 406,8 mill. t.",
				"Trigo: exportaciones mundiales — mill. t. EE.UU. produce 41,7 mill. t."
			],
			"balances": [
				{
					"grain": "Soja",
					"usProduction": 122.99,
					"usYield": 52.7,
					"usStocks": 8.71,
					"worldProduction": 442.25,
					"worldStocks": 124.21,
					"stocksDelta": .00032213900297972664,
					"unit": "mill. t"
				},
				{
					"grain": "Maíz",
					"usProduction": 406.75,
					"usYield": 47.8,
					"usStocks": 41.98,
					"worldProduction": 1298.88,
					"worldStocks": 274.66,
					"stocksDelta": -.002179757320351583,
					"unit": "mill. t"
				},
				{
					"grain": "Trigo",
					"usProduction": 41.66,
					"usYield": null,
					"usStocks": 19.51,
					"worldProduction": 819.3,
					"worldStocks": 273.25,
					"stocksDelta": .0015027122122857062,
					"unit": "mill. t"
				}
			],
			"sourceUrl": "https://apps.fas.usda.gov/export-sales/esrd1.html",
			"pending": false
		}
	}
};
/**
* Variación vs el cierre previo de la rueda — no vs chartPreviousClose.
* En el chart de Yahoo (range=5d) chartPreviousClose es el borde izquierdo
* de la serie, ~5 días atrás. En cripto 24/7 eso infla el % diario.
* regularMarketChangePercent viene en puntos porcentuales (0.64 = +0.64%).
*/
function dailyChange(last, meta, closes) {
	const prior = previousDailyClose(last, meta, closes);
	const fromPct = meta.regularMarketChangePercent;
	if (fromPct != null && Number.isFinite(fromPct)) return {
		change: fromPct / 100,
		previous: prior
	};
	if (prior != null && prior !== 0) return {
		change: last / prior - 1,
		previous: prior
	};
	return {
		change: null,
		previous: prior
	};
}
function previousDailyClose(last, meta, closes) {
	const named = meta.previousClose ?? meta.regularMarketPreviousClose;
	if (named != null && Number.isFinite(named) && named !== 0) return named;
	if (closes.length < 2) return null;
	const latest = closes[closes.length - 1];
	const prior = closes[closes.length - 2];
	if (!(prior > 0)) return null;
	if (latest > 0 && Math.abs(latest - last) / Math.abs(last) < .005) return prior;
	return latest;
}
function fromChart(symbol, data) {
	const r = data.chart?.result?.[0];
	if (!r) throw new Error("empty");
	const meta = r.meta ?? {};
	const closes = (r.indicators?.quote?.[0]?.close ?? []).filter((n) => n != null && Number.isFinite(n));
	const last = meta.regularMarketPrice ?? closes[closes.length - 1] ?? null;
	if (last == null) throw new Error("sin precio");
	const { change, previous } = dailyChange(last, meta, closes);
	const ts = r.timestamp ?? [];
	const rawCloses = r.indicators?.quote?.[0]?.close ?? [];
	const spark = [];
	for (let i = 0; i < ts.length; i++) {
		const c = rawCloses[i];
		if (c == null || !Number.isFinite(c)) continue;
		spark.push({
			d: (/* @__PURE__ */ new Date(ts[i] * 1e3)).toISOString().slice(0, 10),
			c
		});
	}
	return {
		id: symbol,
		label: meta.shortName ?? meta.longName ?? symbol,
		value: last,
		change,
		previous,
		currency: meta.currency,
		spark
	};
}
var YAHOO_HOSTS = ["query1", "query2"];
async function yahooChart(symbol, range = "5d") {
	let lastErr;
	for (const host of YAHOO_HOSTS) try {
		return fromChart(symbol, await fetchJson(`https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`, 7e3));
	} catch (e) {
		lastErr = e;
	}
	throw lastErr instanceof Error ? lastErr : /* @__PURE__ */ new Error("yahoo fail");
}
async function yahooMany(symbols) {
	const rows = await Promise.allSettled(symbols.map((s) => yahooChart(s)));
	const out = {};
	rows.forEach((r, i) => {
		const id = symbols[i];
		if (r.status === "fulfilled") out[id] = {
			...r.value,
			id
		};
	});
	return out;
}
function yahooLive(quotes) {
	return !!quotes && Object.keys(quotes).length > 0;
}
/** ¢/bu → USD/t. Corn 56 lb/bu; soy/wheat 60 lb/bu. */
function cbotUsdT(raw, grain) {
	const cents = raw < 80 ? raw * 100 : raw;
	const buPerT = grain === "maiz" ? 39.368 : 36.7437;
	return cents / 100 * buPerT;
}
async function buildGranos() {
	const board = structuredClone(granos_fallback_default);
	const sources = board.sources.map((s) => ({
		...s,
		ok: s.ok
	}));
	const [yh, dolar, bnaPage, cacPage, afaPage] = await Promise.allSettled([
		yahooMany([
			"ZS=F",
			"ZC=F",
			"ZW=F"
		]),
		fetchJson("https://dolarapi.com/v1/dolares", 6e3),
		fetchText("https://www.bna.com.ar/Personas", 8e3),
		fetchText("https://www.cac.bcr.com.ar/es", 8e3),
		fetchText("https://www.afascl.coop/afadiario/mercados-en-linea", 8e3)
	]);
	const quotes = settled(yh);
	const mark = (id, ok) => {
		const s = sources.find((x) => x.id === id);
		if (s) s.ok = ok;
	};
	mark("cbot", yahooLive(quotes));
	if (quotes && yahooLive(quotes)) {
		board.cbot = [
			[
				"ZS=F",
				"Soja CBOT",
				"soja"
			],
			[
				"ZC=F",
				"Maíz CBOT",
				"maiz"
			],
			[
				"ZW=F",
				"Trigo CBOT",
				"trigo"
			]
		].map(([id, label, grain]) => {
			const q = quotes[id];
			const prev = board.cbot.find((x) => x.id === id);
			const cents = q?.value;
			if (cents == null) return prev ?? {
				id,
				label,
				value: 0,
				change: 0,
				hint: ""
			};
			return {
				id,
				label,
				value: Math.round(cbotUsdT(cents, grain) * 10) / 10,
				change: q?.change ?? 0,
				hint: `${cents.toFixed(2)} ¢/bu`
			};
		});
		const soja = board.cbot.find((x) => x.id === "ZS=F")?.value;
		const maiz = board.cbot.find((x) => x.id === "ZC=F")?.value;
		const trigo = board.cbot.find((x) => x.id === "ZW=F")?.value;
		board.fob = board.fob.map((row) => {
			const ref = row.label === "Soja" ? soja : row.label === "Maíz" ? maiz : row.label === "Trigo" ? trigo : null;
			const vs = row.value != null && ref ? row.value / ref - 1 : row.vsCbot;
			return {
				...row,
				vsCbot: vs
			};
		});
	}
	const fromBna = bnaBilleteVenta(settled(bnaPage));
	const fromApi = settled(dolar)?.find((x) => x.casa === "oficial")?.venta;
	const fx = fromBna ?? (fromApi && fromApi > 0 ? fromApi : null);
	mark("fx", fx != null);
	if (fx) board.fxBna = fx;
	const cac = settled(cacPage) ? parseCacPizarra(settled(cacPage)) : null;
	const cacOk = !!(cac && (cac.soja.usd || cac.soja.ars));
	mark("cac", cacOk);
	const fxGranos = cac?.fx ?? (cac?.soja.ars && cac.soja.usd ? cac.soja.ars / cac.soja.usd : null) ?? fx ?? board.fxBna;
	const afaHtml = settled(afaPage);
	const afa = afaHtml ? afaSanMartin(parseAfaDiario(afaHtml)) : null;
	const afaOk = !!(afa && (afa.soja || afa.maiz || afa.trigo));
	mark("afa", afaOk);
	mark("aca", false);
	board.local = board.local.filter((r) => !isTimbuesPlaza(r.plaza, r.hint));
	if (cacOk && cac) {
		const ros = board.local.find((r) => /rosario/i.test(r.plaza));
		const soja = cac.soja.usd ?? arsToUsd(cac.soja.ars, fxGranos) ?? ros?.soja ?? 0;
		const maiz = cac.maiz.usd ?? arsToUsd(cac.maiz.ars, fxGranos) ?? ros?.maiz ?? 0;
		const trigo = cac.trigo.usd ?? arsToUsd(cac.trigo.ars, fxGranos) ?? ros?.trigo ?? 0;
		const girasol = cac.girasol.usd ?? arsToUsd(cac.girasol.ars, fxGranos) ?? ros?.girasol ?? 0;
		const hint = cac.asOf ? `CAC · ${cac.asOf}` : "CAC";
		if (ros) {
			ros.hint = hint;
			ros.soja = soja;
			ros.maiz = maiz;
			ros.trigo = trigo;
			ros.girasol = girasol;
		} else board.local.unshift({
			plaza: "Rosario",
			hint,
			soja,
			maiz,
			trigo,
			girasol,
			unit: "usdt"
		});
	}
	if (afaOk && afa) {
		const prev = board.local.find((r) => /^afa$/i.test(r.plaza));
		const row = {
			plaza: "AFA",
			hint: `${afa.plaza}${afa.asOf ? ` · ${afa.asOf}` : ""}`,
			soja: arsToUsd(afa.soja, fxGranos) ?? prev?.soja ?? 0,
			maiz: arsToUsd(afa.maiz, fxGranos) ?? prev?.maiz ?? 0,
			trigo: arsToUsd(afa.trigo, fxGranos) ?? prev?.trigo ?? 0,
			girasol: arsToUsd(afa.girasol, fxGranos) ?? prev?.girasol ?? 0,
			unit: "usdt"
		};
		const i = board.local.findIndex((r) => /^afa$/i.test(r.plaza) || /afa diario/i.test(r.hint));
		if (i >= 0) board.local[i] = {
			...board.local[i],
			...row
		};
		else board.local.push(row);
	}
	board.asOf = (/* @__PURE__ */ new Date()).toISOString();
	board.sources = sources;
	return board;
}
var Route$5 = createFileRoute("/api/granos")({ server: { handlers: { GET: async () => {
	const data = await buildGranos();
	return Response.json(data, { headers: { "cache-control": "public, max-age=30" } });
} } } });
var monitor_fallback_default = {
	asOf: "2026-09-03T13:43:56.016Z",
	sources: [
		{
			"id": "yahoo",
			"label": "Yahoo Finance",
			"ok": true
		},
		{
			"id": "dolarapi",
			"label": "DolarAPI",
			"ok": true
		},
		{
			"id": "bcra",
			"label": "BCRA",
			"ok": true
		},
		{
			"id": "argentinadatos",
			"label": "ArgentinaDatos",
			"ok": true
		},
		{
			"id": "data912",
			"label": "Data912",
			"ok": true
		},
		{
			"id": "coinlore",
			"label": "Coinlore",
			"ok": true
		},
		{
			"id": "dataroma",
			"label": "Dataroma",
			"ok": true
		}
	],
	fxArs: [
		{
			"id": "ars-oficial",
			"label": "Oficial",
			"value": 1535,
			"change": .0009259380012780483,
			"unit": "ars",
			"source": "DolarAPI",
			"asOf": "2026-09-03T10:00:00.000Z"
		},
		{
			"id": "ars-blue",
			"label": "Blue",
			"value": 1540,
			"change": 0,
			"unit": "ars",
			"source": "DolarAPI",
			"asOf": "2026-09-03T12:58:00.000Z"
		},
		{
			"id": "ars-bolsa",
			"label": "MEP",
			"value": 1535.2,
			"change": .0005865867170697925,
			"unit": "ars",
			"source": "DolarAPI",
			"asOf": "2026-09-03T12:58:00.000Z"
		},
		{
			"id": "ars-contadoconliqui",
			"label": "CCL",
			"value": 1594.4,
			"change": .00341730806749041,
			"unit": "ars",
			"source": "DolarAPI",
			"asOf": "2026-09-03T12:58:00.000Z"
		},
		{
			"id": "ars-cripto",
			"label": "Cripto",
			"value": 1589.6,
			"change": .0023,
			"unit": "ars",
			"source": "DolarAPI",
			"asOf": "2026-09-03T12:58:00.000Z"
		},
		{
			"id": "ars-tarjeta",
			"label": "Tarjeta",
			"value": 1995.5,
			"change": 0,
			"unit": "ars",
			"source": "DolarAPI",
			"asOf": "2026-09-03T10:00:00.000Z"
		},
		{
			"id": "ars-brecha",
			"label": "Brecha blue",
			"value": .0032573289902280145,
			"change": null,
			"unit": "ratio",
			"source": "DolarAPI"
		},
		{
			"id": "ars-brecha-mep",
			"label": "Brecha MEP",
			"value": .00013029315960921828,
			"change": null,
			"unit": "ratio",
			"source": "DolarAPI"
		},
		{
			"id": "ars-brecha-ccl",
			"label": "Brecha CCL",
			"value": .03869706840390896,
			"change": null,
			"unit": "ratio",
			"source": "DolarAPI"
		},
		{
			"id": "ars-brecha-mep-ccl",
			"label": "Brecha MEP–CCL",
			"value": .03856175091193337,
			"change": null,
			"unit": "ratio",
			"source": "DolarAPI"
		}
	],
	indices: [
		{
			"id": "^GSPC",
			"label": "S&P 500",
			"value": 7713.16,
			"change": .006073096287793733,
			"unit": "index",
			"source": "Yahoo"
		},
		{
			"id": "^IXIC",
			"label": "Nasdaq",
			"value": 26449.398,
			"change": .008832462488314263,
			"unit": "index",
			"source": "Yahoo"
		},
		{
			"id": "^DJI",
			"label": "Dow Jones",
			"value": 53495.75,
			"change": .00817534975627554,
			"unit": "index",
			"source": "Yahoo"
		},
		{
			"id": "^RUT",
			"label": "Russell 2000",
			"value": 2953.17,
			"change": .011314564762527679,
			"unit": "index",
			"source": "Yahoo"
		},
		{
			"id": "^VIX",
			"label": "VIX",
			"value": 15.02,
			"change": -.011842105263157876,
			"unit": "index",
			"source": "Yahoo"
		},
		{
			"id": "^GDAXI",
			"label": "DAX",
			"value": 25992.63,
			"change": .005932816369464744,
			"unit": "index",
			"source": "Yahoo"
		},
		{
			"id": "^N225",
			"label": "Nikkei",
			"value": 64214.48,
			"change": -.0017280823012408852,
			"unit": "index",
			"source": "Yahoo"
		},
		{
			"id": "^FTSE",
			"label": "FTSE 100",
			"value": 10861.13,
			"change": .009727141728257171,
			"unit": "index",
			"source": "Yahoo"
		}
	],
	rates: [{
		"id": "^TNX",
		"label": "UST 10 años",
		"value": 4.744,
		"change": -.010842368640533895,
		"unit": "pct100",
		"source": "Yahoo"
	}, {
		"id": "^IRX",
		"label": "T-Bill 13 sem.",
		"value": 3.748,
		"change": -.006362672322375307,
		"unit": "pct100",
		"source": "Yahoo"
	}],
	energy: [
		{
			"id": "CL=F",
			"label": "WTI",
			"value": 91.87,
			"change": .009449511042742609,
			"unit": "usd",
			"source": "Yahoo"
		},
		{
			"id": "BZ=F",
			"label": "Brent",
			"value": 96.16,
			"change": .005542193872215773,
			"unit": "usd",
			"source": "Yahoo"
		},
		{
			"id": "NG=F",
			"label": "Gas natural",
			"value": 2.995,
			"change": .013193504736130013,
			"unit": "usd",
			"source": "Yahoo"
		}
	],
	metals: [
		{
			"id": "GC=F",
			"label": "Oro",
			"value": 4529.5,
			"change": .03737718434372339,
			"unit": "usd",
			"source": "Yahoo"
		},
		{
			"id": "SI=F",
			"label": "Plata",
			"value": 67.04,
			"change": .03579871143179414,
			"unit": "usd",
			"source": "Yahoo"
		},
		{
			"id": "HG=F",
			"label": "Cobre",
			"value": 6.653,
			"change": .023381018304876156,
			"unit": "usd",
			"source": "Yahoo"
		}
	],
	agro: [
		{
			"id": "ZC=F",
			"label": "Maíz CBOT",
			"value": 208.8,
			"change": -.022119815668202758,
			"unit": "usdt",
			"source": "Yahoo",
			"hint": "· 530.50 ¢/bu"
		},
		{
			"id": "ZS=F",
			"label": "Soja CBOT",
			"value": 475.6,
			"change": -.01107927411652343,
			"unit": "usdt",
			"source": "Yahoo",
			"hint": "· 1294.25 ¢/bu"
		},
		{
			"id": "ZW=F",
			"label": "Trigo CBOT",
			"value": 272.6,
			"change": -.042271700548564106,
			"unit": "usdt",
			"source": "Yahoo",
			"hint": "· 742.00 ¢/bu"
		}
	],
	fx: [
		{
			"id": "EURUSD=X",
			"label": "EUR/USD",
			"value": 1.1625,
			"change": .0025008623663334006,
			"unit": "fx",
			"source": "Yahoo"
		},
		{
			"id": "USDJPY=X",
			"label": "USD/JPY",
			"value": 155.68,
			"change": -.028190466678319037,
			"unit": "fx",
			"source": "Yahoo"
		},
		{
			"id": "USDBRL=X",
			"label": "USD/BRL",
			"value": 5.1049,
			"change": -.009180544233531318,
			"unit": "fx",
			"source": "Yahoo"
		}
	],
	crypto: [
		{
			"id": "BTC.D",
			"label": "BTC.D",
			"value": 59.73,
			"change": null,
			"unit": "pct100",
			"source": "Coinlore",
			"hint": "dominancia"
		},
		{
			"id": "TOTAL2",
			"label": "TOTAL2",
			"value": 40.27,
			"change": null,
			"unit": "pct100",
			"source": "Coinlore",
			"hint": "sin BTC"
		},
		{
			"id": "TOTAL3",
			"label": "TOTAL3",
			"value": 28.970000000000002,
			"change": null,
			"unit": "pct100",
			"source": "Coinlore",
			"hint": "sin BTC ni ETH"
		},
		{
			"id": "BTC-USD",
			"label": "Bitcoin",
			"value": 78902.04,
			"change": .020718629431537794,
			"unit": "usd",
			"source": "Yahoo"
		},
		{
			"id": "ETH-USD",
			"label": "Ether",
			"value": 2434.76,
			"change": .01808863972877295,
			"unit": "usd",
			"source": "Yahoo"
		},
		{
			"id": "SOL-USD",
			"label": "Solana",
			"value": 101.93,
			"change": .015384474389857905,
			"unit": "usd",
			"source": "Yahoo"
		},
		{
			"id": "BNB-USD",
			"label": "BNB",
			"value": 712.33,
			"change": .03541860445172018,
			"unit": "usd",
			"source": "Yahoo"
		}
	],
	macroAr: [
		{
			"id": "bcra-5",
			"label": "BCRA mayorista",
			"value": 1511.6306,
			"change": -.0007270297470057807,
			"unit": "ars",
			"source": "BCRA",
			"asOf": "2026-09-02"
		},
		{
			"id": "bcra-1",
			"label": "Reservas",
			"value": 48259e6,
			"change": -.03080754322896795,
			"unit": "usd",
			"source": "BCRA",
			"asOf": "2026-08-31"
		},
		{
			"id": "bcra-7",
			"label": "BADLAR priv.",
			"value": 23.0625,
			"change": .0027173913043478937,
			"unit": "pct100",
			"source": "BCRA",
			"asOf": "2026-09-01"
		},
		{
			"id": "bcra-12",
			"label": "Plazo 30 días",
			"value": 21.36,
			"change": -.00046794571829678056,
			"unit": "pct100",
			"source": "BCRA",
			"asOf": "2026-09-01"
		},
		{
			"id": "bcra-160",
			"label": "Tasa de política",
			"value": 29,
			"change": 0,
			"unit": "pct100",
			"source": "BCRA",
			"asOf": "2025-07-10"
		},
		{
			"id": "bcra-27",
			"label": "Inflación m/m",
			"value": 2.1,
			"change": .10526315789473695,
			"unit": "pct100",
			"source": "BCRA",
			"asOf": "2026-07-31"
		},
		{
			"id": "bcra-28",
			"label": "Inflación i.a.",
			"value": 33.8,
			"change": .008955223880596996,
			"unit": "pct100",
			"source": "BCRA",
			"asOf": "2026-07-31"
		},
		{
			"id": "riesgo-pais",
			"label": "Riesgo país",
			"value": 500,
			"change": -.001996007984031989,
			"unit": "bp",
			"source": "ArgentinaDatos",
			"asOf": "2026-09-02"
		},
		{
			"id": "al30d",
			"label": "AL30D",
			"value": 55.76,
			"change": .0014000000000000002,
			"unit": "usd",
			"source": "Data912"
		},
		{
			"id": "gd30d",
			"label": "GD30D",
			"value": 58.15,
			"change": .0113,
			"unit": "usd",
			"source": "Data912"
		},
		{
			"id": "mep-al30",
			"label": "MEP implícito AL30",
			"value": 1532.4605451936873,
			"change": null,
			"unit": "ars",
			"source": "Data912"
		}
	],
	superinvestors: [{
		"id": "BRK",
		"manager": "Warren Buffett - Berkshire Hathaway",
		"period": "Q2 2026",
		"date": "30 Jun 2026",
		"holdings": [
			{
				"symbol": "AAPL",
				"name": "Apple Inc.",
				"weight": 22.04,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "AXP",
				"name": "American Express",
				"weight": 17.14,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "KO",
				"name": "Coca Cola Co.",
				"weight": 10.86,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "GOOGL",
				"name": "Alphabet Inc.",
				"weight": 9.41,
				"activity": "Add 45.24%",
				"inBook": false
			},
			{
				"symbol": "BAC",
				"name": "Bank of America Corp.",
				"weight": 9.2,
				"activity": "Reduce 5.89%",
				"inBook": false
			},
			{
				"symbol": "CVX",
				"name": "Chevron Corp.",
				"weight": 4.67,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "OXY",
				"name": "Occidental Petroleum",
				"weight": 4.3,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "CB",
				"name": "Chubb Limited",
				"weight": 3.9,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "MCO",
				"name": "Moody's Corp.",
				"weight": 3.73,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "GOOG",
				"name": "Alphabet Inc. CL C",
				"weight": 3.21,
				"activity": "Add 658.35%",
				"inBook": false
			},
			{
				"symbol": "KHC",
				"name": "Kraft Heinz Co.",
				"weight": 2.57,
				"activity": "",
				"inBook": false
			},
			{
				"symbol": "DVA",
				"name": "DaVita HealthCare Partners",
				"weight": 2.15,
				"activity": "Reduce 4.05%",
				"inBook": false
			}
		]
	}],
	byma: [
		{
			"id": "GGAL",
			"label": "Galicia",
			"value": 7080,
			"change": -.0125,
			"unit": "ars",
			"source": "Data912"
		},
		{
			"id": "YPFD",
			"label": "YPF",
			"value": 8315,
			"change": -.032,
			"unit": "ars",
			"source": "Data912"
		},
		{
			"id": "PAMP",
			"label": "Pampa",
			"value": 5390,
			"change": -.0173,
			"unit": "ars",
			"source": "Data912"
		},
		{
			"id": "BMA",
			"label": "Macro",
			"value": 12610,
			"change": .0023,
			"unit": "ars",
			"source": "Data912"
		},
		{
			"id": "ALUA",
			"label": "Aluar",
			"value": 847.5,
			"change": -.0023,
			"unit": "ars",
			"source": "Data912"
		},
		{
			"id": "CRES",
			"label": "Cresud",
			"value": 1879,
			"change": -.0279,
			"unit": "ars",
			"source": "Data912"
		},
		{
			"id": "AGRO",
			"label": "Agrometal",
			"value": null,
			"change": null,
			"unit": "ars",
			"source": "Data912"
		},
		{
			"id": "CEPU",
			"label": "Central Puerto",
			"value": 2220,
			"change": -.022,
			"unit": "ars",
			"source": "Data912"
		}
	]
};
var INDICES = [
	["^GSPC", "S&P 500"],
	["^IXIC", "Nasdaq"],
	["^DJI", "Dow Jones"],
	["^RUT", "Russell 2000"],
	["^VIX", "VIX"],
	["^GDAXI", "DAX"],
	["^N225", "Nikkei"],
	["^FTSE", "FTSE 100"]
];
var RATES = [["^TNX", "UST 10 años"], ["^IRX", "UST 3 meses"]];
var ENERGY = [
	["CL=F", "WTI"],
	["BZ=F", "Brent"],
	["NG=F", "Henry Hub"]
];
var METALS = [
	["GC=F", "Oro"],
	["SI=F", "Plata"],
	["HG=F", "Cobre"]
];
var FX = [
	["EURUSD=X", "EUR/USD"],
	["USDJPY=X", "USD/JPY"],
	["USDBRL=X", "USD/BRL"]
];
var CRYPTO = [
	["BTC-USD", "Bitcoin"],
	["ETH-USD", "Ethereum"],
	["SOL-USD", "Solana"],
	["BNB-USD", "BNB"]
];
var AGRO$1 = [
	[
		"ZC=F",
		"Maíz CBOT",
		"maiz"
	],
	[
		"ZS=F",
		"Soja CBOT",
		"soja"
	],
	[
		"ZW=F",
		"Trigo CBOT",
		"trigo"
	]
];
var BYMA = [
	["GGAL", "Galicia"],
	["YPFD", "YPF"],
	["PAMP", "Pampa"],
	["BMA", "Macro"],
	["ALUA", "Aluar"],
	["CRES", "Cresud"],
	["AGRO", "Agrometal"],
	["CEPU", "Central Puerto"]
];
var DOLAR_MAP = {
	oficial: "ars-oficial",
	blue: "ars-blue",
	bolsa: "ars-bolsa",
	contadoconliqui: "ars-contadoconliqui",
	cripto: "ars-cripto",
	tarjeta: "ars-tarjeta"
};
var DOLAR_LABEL = {
	oficial: "Oficial",
	blue: "Blue",
	bolsa: "MEP",
	contadoconliqui: "CCL",
	cripto: "Cripto",
	tarjeta: "Tarjeta"
};
function item(id, label, value, change, unit, extra = {}) {
	return {
		id,
		label,
		value,
		change,
		unit,
		...extra
	};
}
function ambitoChange(rows) {
	const out = {};
	if (!rows) return out;
	for (const r of rows) if (typeof r.variacion === "number" && Number.isFinite(r.variacion)) out[r.casa] = r.variacion / 100;
	return out;
}
async function coinDominance() {
	try {
		const raw = await fetchJson("https://api.coinlore.net/api/global/", 6e3);
		const row = Array.isArray(raw) ? raw[0] : raw?.data?.[0];
		if (row && Number(row.btc_d) > 0) return {
			row,
			source: "Coinlore"
		};
	} catch {}
	try {
		const g = await fetchJson("https://api.coingecko.com/api/v3/global", 6e3);
		const btc = g.data?.market_cap_percentage?.btc;
		const eth = g.data?.market_cap_percentage?.eth;
		if (btc != null && btc > 0) return {
			row: {
				btc_d: String(btc),
				eth_d: eth != null ? String(eth) : void 0
			},
			source: "CoinGecko"
		};
	} catch {}
	return null;
}
async function buildMonitor(tickers = []) {
	const base = structuredClone(monitor_fallback_default);
	const sources = [];
	const symbols = [
		...INDICES.map((x) => x[0]),
		...RATES.map((x) => x[0]),
		...ENERGY.map((x) => x[0]),
		...METALS.map((x) => x[0]),
		...FX.map((x) => x[0]),
		...CRYPTO.map((x) => x[0]),
		...AGRO$1.map((x) => x[0]),
		...tickers
	];
	const [yh, dolar, blue, ambito, bcra, riskAd, bonds, stocks, coinDom, superB] = await Promise.allSettled([
		yahooMany(symbols),
		fetchJson("https://dolarapi.com/v1/dolares", 6e3),
		fetchJson("https://api.bluelytics.com.ar/v2/latest", 6e3),
		fetchJson("https://dolarapi.com/v1/ambito/dolares", 6e3),
		fetchJson("https://api.bcra.gob.ar/estadisticas/v4.0/monetarias?limit=1000", 1e4),
		fetchJson("https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo", 6e3),
		fetchJson("https://data912.com/live/arg_bonds", 6e3),
		fetchJson("https://data912.com/live/arg_stocks", 6e3),
		coinDominance(),
		scrapeDataroma("BRK", tickers)
	]);
	const quotes = settled(yh);
	sources.push({
		id: "yahoo",
		label: "Yahoo Finance",
		ok: yahooLive(quotes)
	});
	if (quotes && yahooLive(quotes)) {
		base.indices = INDICES.map(([id, label]) => {
			const q = quotes[id];
			return item(id, label, q?.value ?? null, q?.change ?? null, "index", { source: "Yahoo" });
		});
		base.rates = RATES.map(([id, label]) => {
			const q = quotes[id];
			return item(id, label, q?.value ?? null, q?.change ?? null, "pct100", { source: "Yahoo" });
		});
		base.energy = ENERGY.map(([id, label]) => {
			const q = quotes[id];
			return item(id, label, q?.value ?? null, q?.change ?? null, "usd", { source: "Yahoo" });
		});
		base.metals = METALS.map(([id, label]) => {
			const q = quotes[id];
			return item(id, label, q?.value ?? null, q?.change ?? null, "usd", { source: "Yahoo" });
		});
		base.fx = FX.map(([id, label]) => {
			const q = quotes[id];
			return item(id, label, q?.value ?? null, q?.change ?? null, "fx", { source: "Yahoo" });
		});
		base.agro = AGRO$1.map(([id, label, grain]) => {
			const q = quotes[id];
			const cents = q?.value ?? null;
			return item(id, label, cents != null ? cbotUsdT(cents, grain) : null, q?.change ?? null, "usdt", {
				source: "Yahoo",
				hint: cents != null ? `· ${cents.toFixed(2)} ¢/bu` : void 0
			});
		});
		const cryptoY = CRYPTO.map(([id, label]) => {
			const q = quotes[id];
			return item(id, label, q?.value ?? null, q?.change ?? null, "usd", { source: "Yahoo" });
		});
		base.crypto = [...base.crypto.filter((c) => c.id === "BTC.D" || c.id === "TOTAL2" || c.id === "TOTAL3"), ...cryptoY];
	}
	const dolares = settled(dolar);
	const blueBook = settled(blue);
	const chCasa = ambitoChange(settled(ambito));
	if (dolares?.length) {
		sources.push({
			id: "dolarapi",
			label: "DolarAPI",
			ok: true
		});
		const mapped = dolares.map((row) => {
			const id = DOLAR_MAP[row.casa];
			if (!id) return null;
			return item(id, DOLAR_LABEL[row.casa] ?? row.nombre, row.venta, chCasa[row.casa] ?? null, "ars", {
				source: "DolarAPI",
				asOf: row.fechaActualizacion ?? null
			});
		}).filter((x) => x !== null);
		const oficial = mapped.find((x) => x.id === "ars-oficial")?.value ?? null;
		const bluePx = mapped.find((x) => x.id === "ars-blue")?.value ?? null;
		const mep = mapped.find((x) => x.id === "ars-bolsa")?.value ?? null;
		const ccl = mapped.find((x) => x.id === "ars-contadoconliqui")?.value ?? null;
		const extra = [];
		if (oficial && bluePx) extra.push(item("ars-brecha", "Brecha blue", bluePx / oficial - 1, null, "ratio", { source: "DolarAPI" }));
		if (oficial && mep) extra.push(item("ars-brecha-mep", "Brecha MEP", mep / oficial - 1, null, "ratio", { source: "DolarAPI" }));
		if (oficial && ccl) extra.push(item("ars-brecha-ccl", "Brecha CCL", ccl / oficial - 1, null, "ratio", { source: "DolarAPI" }));
		if (mep && ccl) extra.push(item("ars-brecha-mep-ccl", "Brecha MEP–CCL", ccl / mep - 1, null, "ratio", { source: "DolarAPI" }));
		base.fxArs = [...mapped, ...extra];
	} else {
		const oficial = blueBook?.oficial?.value_sell ?? null;
		const bluePx = blueBook?.blue?.value_sell ?? null;
		sources.push({
			id: "dolarapi",
			label: "Bluelytics",
			ok: oficial != null && oficial > 0
		});
		if (oficial && oficial > 0) {
			const mapped = [item("ars-oficial", "Oficial", oficial, chCasa.oficial ?? null, "ars", { source: "Bluelytics" }), item("ars-blue", "Blue", bluePx, chCasa.blue ?? null, "ars", { source: "Bluelytics" })];
			if (bluePx) mapped.push(item("ars-brecha", "Brecha blue", bluePx / oficial - 1, null, "ratio", { source: "Bluelytics" }));
			base.fxArs = mapped;
		}
	}
	const bcraRows = settled(bcra)?.results;
	sources.push({
		id: "bcra",
		label: "BCRA",
		ok: !!bcraRows?.length
	});
	if (bcraRows?.length) {
		const pick = (id, label, unit) => {
			const row = bcraRows.find((x) => x.idVariable === id);
			if (!row) return null;
			let valor = row.ultValorInformado ?? row.valor;
			if (valor == null) return null;
			if (id === 1 && Math.abs(valor) < 1e6) valor *= 1e6;
			return item(`bcra-${id}`, label, valor, null, unit, {
				source: "BCRA",
				asOf: row.ultFechaInformada ?? row.fecha
			});
		};
		const rows = [
			pick(5, "BCRA mayorista", "ars"),
			pick(1, "Reservas", "usd"),
			pick(7, "BADLAR priv.", "pct100"),
			pick(12, "Plazo 30 días", "pct100"),
			pick(160, "Tasa de política", "pct100"),
			pick(27, "Inflación m/m", "pct100"),
			pick(28, "Inflación i.a.", "pct100")
		].filter((x) => x !== null);
		const rest = base.macroAr.filter((x) => !x.id.startsWith("bcra-"));
		base.macroAr = [...rows, ...rest];
	}
	const risk = settled(riskAd);
	sources.push({
		id: "argentinadatos",
		label: "ArgentinaDatos",
		ok: risk?.valor != null
	});
	if (risk?.valor != null) {
		const row = item("riesgo-pais", "Riesgo país", risk.valor, null, "bp", {
			source: "ArgentinaDatos",
			asOf: risk.fecha
		});
		const i = base.macroAr.findIndex((x) => x.id === "riesgo-pais");
		if (i >= 0) base.macroAr[i] = row;
		else base.macroAr.push(row);
	}
	const bondRows = settled(bonds);
	const stockRows = settled(stocks);
	sources.push({
		id: "data912",
		label: "Data912",
		ok: !!bondRows?.length || !!stockRows?.length
	});
	if (bondRows?.length) {
		const bySym = (s) => bondRows.find((x) => x.symbol === s);
		const al30 = bySym("AL30");
		const al30d = bySym("AL30D");
		const gd30d = bySym("GD30D");
		const patch = (id, label, value, change, unit) => {
			if (value == null) return;
			const row = item(id, label, value, change, unit, { source: "Data912" });
			const i = base.macroAr.findIndex((x) => x.id === id);
			if (i >= 0) base.macroAr[i] = row;
			else base.macroAr.push(row);
		};
		const ch = (x) => x?.pct_change != null ? x.pct_change / 100 : null;
		if (al30d?.c) patch("al30d", "AL30D", al30d.c, ch(al30d), "usd");
		if (gd30d?.c) patch("gd30d", "GD30D", gd30d.c, ch(gd30d), "usd");
		if (al30?.c && al30d?.c && al30d.c > 0) patch("mep-al30", "MEP implícito AL30", al30.c / al30d.c, null, "ars");
	}
	if (stockRows?.length) {
		const by = Object.fromEntries(stockRows.map((x) => [x.symbol, x]));
		base.byma = BYMA.map(([id, label]) => {
			const row = by[id];
			const ch = row?.pct_change != null ? row.pct_change / 100 : null;
			return item(id, label, row?.c ?? null, ch, "ars", { source: "Data912" });
		});
	}
	const coin = settled(coinDom);
	sources.push({
		id: "coinlore",
		label: coin?.source ?? "Coinlore",
		ok: !!coin
	});
	if (coin?.row) {
		const btcD = Number(coin.row.btc_d);
		const ethD = Number(coin.row.eth_d);
		if (Number.isFinite(btcD) && btcD > 0) {
			const setC = (id, label, value, hint) => {
				const row = item(id, label, value, null, "pct100", {
					source: coin.source,
					hint
				});
				const i = base.crypto.findIndex((x) => x.id === id);
				if (i >= 0) base.crypto[i] = row;
				else base.crypto.unshift(row);
			};
			setC("BTC.D", "BTC.D", btcD, "dominancia");
			setC("TOTAL2", "TOTAL2", 100 - btcD, "sin BTC");
			if (Number.isFinite(ethD)) setC("TOTAL3", "TOTAL3", 100 - btcD - ethD, "sin BTC ni ETH");
		}
	}
	const book = settled(superB);
	sources.push({
		id: "dataroma",
		label: "Dataroma",
		ok: !!book
	});
	if (book) base.superinvestors = [book];
	return {
		...base,
		asOf: (/* @__PURE__ */ new Date()).toISOString(),
		sources
	};
}
function q(items, id) {
	return items.find((e) => e.id === id) ?? null;
}
function n(e) {
	return e?.value ?? null;
}
function ch(e) {
	return e?.change ?? null;
}
async function buildMakeFeed() {
	const [monitor, granos] = await Promise.all([buildMonitor(), buildGranos()]);
	const fx = monitor.fxArs;
	const ros = granos.local.find((p) => p.plaza === "Rosario");
	const afa = granos.local.find((p) => p.plaza === "AFA");
	const riesgo = q(monitor.macroAr, "riesgo-pais");
	const oficial = q(fx, "ars-oficial");
	const blue = q(fx, "ars-blue");
	const mep = q(fx, "ars-bolsa");
	const ccl = q(fx, "ars-contadoconliqui");
	const cripto = q(fx, "ars-cripto");
	const tarjeta = q(fx, "ars-tarjeta");
	const now = /* @__PURE__ */ new Date();
	const fecha = now.toISOString().slice(0, 10);
	return {
		asOf: monitor.asOf ?? now.toISOString(),
		row: {
			fecha,
			oficial: n(oficial),
			oficial_delta: ch(oficial),
			blue: n(blue),
			blue_delta: ch(blue),
			mep: n(mep),
			mep_delta: ch(mep),
			ccl: n(ccl),
			ccl_delta: ch(ccl),
			cripto: n(cripto),
			tarjeta: n(tarjeta),
			fx_bna: granos.fxBna ?? null,
			soja_cac: ros?.soja ?? null,
			maiz_cac: ros?.maiz ?? null,
			trigo_cac: ros?.trigo ?? null,
			soja_afa: afa?.soja ?? null,
			maiz_afa: afa?.maiz ?? null,
			trigo_afa: afa?.trigo ?? null,
			riesgo_pais: n(riesgo)
		},
		dolares: fx.filter((e) => e.unit === "ars").map((e) => ({
			id: e.id,
			label: e.label,
			venta: e.value,
			delta: e.change,
			asOf: e.asOf ?? null
		})),
		fuentes: monitor.sources
	};
}
var CORS = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET, OPTIONS",
	"cache-control": "public, max-age=60"
};
var Route$4 = createFileRoute("/api/make")({ server: { handlers: {
	OPTIONS: async () => new Response(null, {
		status: 204,
		headers: CORS
	}),
	GET: async () => {
		const data = await buildMakeFeed();
		return Response.json(data, { headers: CORS });
	}
} } });
var Route$3 = createFileRoute("/api/monitor")({ server: { handlers: { GET: async ({ request }) => {
	const data = await buildMonitor((new URL(request.url).searchParams.get("tickers") ?? "").split(",").map((s) => s.trim()).filter(Boolean));
	return Response.json(data, { headers: { "cache-control": "public, max-age=30" } });
} } } });
var RATIOS = {
	AABA: 3,
	AAL: 2,
	AAP: 14,
	AAPL: 20,
	ABBV: 10,
	ABEV: .3333333333333333,
	ABEV3: 1,
	ABT: 4,
	ACN: 75,
	ACWI: 26,
	ADBE: 44,
	ADI: 15,
	ADP: 6,
	ADS: 22,
	AEG: 1,
	AEM: 6,
	AGRO: 1,
	AI: 5,
	AIG: 5,
	"AKO.B": 1,
	ALAB: 44,
	AMAT: 5,
	AMD: 10,
	AMGN: 30,
	AMX: 1,
	AMZN: 144,
	ANF: 1,
	ARCO: .5,
	ARKK: 10,
	ARM: 27,
	ASML: 146,
	ASR: 20,
	ASTS: 15,
	ATAD: 4,
	AVGO: 39,
	AVY: 18,
	AXIA: .25,
	AXP: 15,
	AZN: 4,
	B: 2,
	BA: 24,
	BABA: 9,
	BAC: 4,
	BAK: 2,
	"BAS GR": 2,
	"BAYN GR": 3,
	BB: 3,
	BBAS3: 2,
	BBD: 1,
	BBDC3: 1,
	BBVA: 1,
	BCS: 1,
	BG: 5,
	BHP: 2,
	BIDU: 11,
	BIIB: 13,
	BIOX: 1,
	BK: 2,
	BKNG: 700,
	BKR: 7,
	BMNR: 8,
	BMY: 3,
	BP: 5,
	"BRK/B": 22,
	BSBR: 1,
	"BSN GR": 20,
	BX: 30,
	C: 3,
	CAAP: .25,
	CAH: 3,
	CAR: 26,
	CAT: 20,
	CBD: 1,
	CCL: 3,
	CDE: 1,
	CEG: 45,
	CIBR: 10,
	CL: 3,
	CLS: 20,
	COIN: 27,
	COPX: 14,
	COST: 48,
	CRM: 18,
	CRWV: 27,
	CSCO: 5,
	CVS: 15,
	CVX: 16,
	CX: 1,
	DAL: 8,
	DD: 5,
	DE: 40,
	DECK: 25,
	DEO: 6,
	DHR: 54,
	DIA: 20,
	DIS: 12,
	"DJNJ3-XD004": 1,
	DOCU: 22,
	DOW: 6,
	"DTEA GR": 3,
	E: 4,
	EA: 14,
	EBAY: 2,
	ECL: 56,
	EEM: 5,
	EFA: 18,
	EFX: 16,
	ELPC: .3333333333333333,
	"EOAN GR": 6,
	EQNR: 6,
	ERIC: 2,
	ERJ: 1,
	ESGU: 30,
	ETHA: 5,
	ETSY: 16,
	EWJ: 14,
	EWY: 50,
	EWZ: 2,
	F: 1,
	FCX: 3,
	FDX: 10,
	FMCC: 1,
	FMX: 6,
	FNMA: 1,
	FSLR: 18,
	FXI: 5,
	GDX: 10,
	GE: 8,
	GFI: 1,
	GGB: .25,
	GILD: 4,
	GLD: 50,
	GLOB: 18,
	GLW: 4,
	GM: 6,
	GOOGL: 58,
	GPRK: 1,
	GRMN: 3,
	GS: 13,
	GSK: 4,
	GT: 2,
	HAL: 2,
	HAPV3: 1,
	HD: 32,
	HDB: 2,
	"HHPD LI": 2,
	HL: 1,
	HMC: 1,
	HMY: 1,
	HOG: 3,
	HON: 8,
	HOOD: 29,
	HPQ: 1,
	HSBC: 2,
	HSY: 21,
	HUT: 5,
	HWM: 1,
	IBB: 27,
	IBIT: 10,
	IBM: 15,
	IBN: 1,
	ICLN: 5,
	IEMG: 12,
	IEUR: 11,
	IFF: 12,
	IJH: 12,
	ILF: 6,
	INFY: 1,
	ING: 3,
	INTC: 5,
	IP: 4,
	IREN: 12,
	ISRG: 90,
	ITA: 50,
	ITUB: 1,
	ITUB3: 1,
	IVE: 40,
	IVV: 692,
	IVW: 20,
	IWDA: 24,
	IWM: 10,
	JCI: 2,
	JD: 4,
	JNJ: 15,
	JOYY: 5,
	JPM: 15,
	KB: 2,
	KEP: 1,
	KGC: 1,
	KMB: 6,
	KO: 5,
	KOF: 2,
	LAC: 1,
	LAR: 1,
	LKOD: 4,
	LLY: 56,
	LMT: 20,
	LND: 1,
	LRCX: 56,
	LVS: 2,
	LYG: 2,
	MA: 33,
	"MBG GR": 4,
	MBT: 2,
	MCD: 24,
	MDLZ: 15,
	MDT: 4,
	MELI: 120,
	META: 24,
	MFG: 1,
	MGLU3: 1,
	MMM: 10,
	MO: 4,
	MOS: 5,
	MRK: 5,
	MRNA: 19,
	MRSH: 16,
	MRVL: 14,
	MSFT: 30,
	MSI: 20,
	MSTR: 20,
	MU: 5,
	MUFG: 1,
	MUX: 2,
	"NEC1 GR": .3333333333333333,
	NEM: 3,
	NFLX: 48,
	NBIS: 27,
	NG: .25,
	NGG: 2,
	NIO: 4,
	NKE: 12,
	"NLMK LI": 2,
	NMR: 1,
	NOK: 1,
	NOW: 172,
	NSANY: 1,
	NTES: 14,
	NU: 2,
	NUE: 16,
	NVDA: 24,
	NVS: 4,
	NXE: 1,
	OGZD: 2,
	OKLO: 28,
	ORANY: 1,
	ORCL: 3,
	ORLY: 222,
	OXY: 5,
	PAAS: 3,
	PAC: 16,
	PAGS: 3,
	PANW: 50,
	PATH: 2,
	PBI: 1,
	PBR: 1,
	PCAR: 3,
	PDD: 25,
	PEP: 18,
	PETR3: 1,
	PFE: 4,
	PG: 15,
	PHG: 5,
	PINS: 7,
	PKX: 3,
	PLTR: 3,
	PM: 18,
	PRIO3: 2,
	PSO: 1,
	PSQ: 8,
	PSX: 6,
	PYPL: 8,
	QCOM: 11,
	QQQ: 20,
	RACE: 83,
	RBLX: 2,
	RENT3: 2,
	RGTI: 2,
	RIO: 8,
	RIOT: 3,
	RKLB: 12,
	ROKU: 13,
	ROST: 4,
	RSP: 30,
	RTX: 5,
	SAN: .25,
	SAP: 6,
	SATL: 1,
	SBS: .5,
	SBUX: 12,
	SCCO: 2,
	SCHW: 13,
	SDA: 2,
	SE: 32,
	SH: 8,
	SHEL: 2,
	SHOP: 107,
	SHPW: .5,
	SID: .125,
	SIEGY: 3,
	SLB: 3,
	SLV: 6,
	SMH: 50,
	"SMSN LI": 14,
	SNA: 6,
	SNAP: 1,
	SNDK: 170,
	SNOW: 30,
	SONY: 8,
	SPCE: .5,
	SPCX: 50,
	SPGI: 45,
	SPHQ: 14,
	SPOT: 28,
	SPXL: 25,
	SPY: 60,
	STLA: 5,
	STNE: 3,
	SUZ: 1,
	SUZB3: 1,
	SWKS: 21,
	SYY: 8,
	T: 3,
	TCOM: 2,
	TEAM: 47,
	TELFY: 8,
	TEM: 12,
	TGT: 24,
	TIIAY: 1,
	TIMB: 1,
	TJX: 22,
	TM: 15,
	TMO: 22,
	TMUS: 33,
	TQQQ: 25,
	TRIP: 2,
	TRV: 6,
	TS: 1,
	TSLA: 15,
	TSM: 9,
	TTE: 3,
	TV: 3,
	TWLO: 36,
	TX: 4,
	TXN: 5,
	UAL: 5,
	UBER: 2,
	UGP: 1,
	UL: 3,
	UNH: 33,
	UNP: 20,
	UPST: 5,
	URA: 5,
	URBN: 2,
	USB: 5,
	USO: 15,
	V: 18,
	VALE: 2,
	VALE3: 1,
	VEA: 10,
	VIG: 39,
	VIST: 3,
	VIV: 1,
	VOD: 1,
	VRSN: 6,
	VRTX: 101,
	VST: 26,
	VXX: 5,
	VZ: 4,
	WB: 6,
	WFC: 5,
	WMT: 18,
	XLB: 18,
	XLC: 19,
	XLE: 2,
	XLF: 2,
	XLI: 28,
	XLK: 46,
	XLP: 16,
	XLRE: 9,
	XLU: 15,
	XLV: 29,
	XLY: 43,
	XME: 30,
	XOM: 10,
	XP: 4,
	XPEV: 4,
	XRX: 1,
	XYZ: 20,
	YELP: 2,
	YZCAY: 2,
	ZM: 47
};
var ALIAS = {
	BRKB: "BRK/B",
	"BRK.B": "BRK/B",
	"BRK-B": "BRK/B"
};
function cedearBase(ticker) {
	return ticker.trim().toUpperCase().replace(/\.BA$/i, "");
}
function cedearRatio(ticker) {
	const b = cedearBase(ticker);
	const r = RATIOS[ALIAS[b] ?? b] ?? RATIOS[b];
	return r && r > 0 ? r : null;
}
function isKnownCedear(ticker) {
	return cedearRatio(ticker) != null;
}
function knownCedearSymbols() {
	return Object.keys(RATIOS).filter((k) => /^[A-Z0-9.-]{1,12}$/.test(k));
}
function ratioLabel(ratio) {
	if (!(ratio > 0)) return "—";
	if (ratio >= 1) return `${Number.isInteger(ratio) ? String(ratio) : ratio.toFixed(2)}:1`;
	const inv = 1 / ratio;
	return `1:${Math.abs(inv - Math.round(inv)) < 1e-6 ? String(Math.round(inv)) : inv.toFixed(2)}`;
}
function cedearToUsd(ars, ratio, ccl) {
	if (!(ars > 0) || !(ratio > 0) || !(ccl > 0)) return null;
	return ars * ratio / ccl;
}
async function loadCcl() {
	try {
		const ccl = (await fetchJson("https://dolarapi.com/v1/dolares", 6e3)).find((x) => x.casa === "contadoconliqui")?.venta;
		return ccl && ccl > 0 ? ccl : null;
	} catch {
		try {
			const one = await fetchJson("https://dolarapi.com/v1/dolares/contadoconliqui", 6e3);
			return one.venta && one.venta > 0 ? one.venta : null;
		} catch {
			return null;
		}
	}
}
async function loadCedearArs() {
	const rows = await fetchJson("https://data912.com/live/arg_cedears", 8e3);
	const out = {};
	for (const r of rows) {
		if (!r.symbol) continue;
		if (r.c != null && r.c > 0) out[r.symbol] = r;
	}
	return out;
}
async function quoteCedears(tickers) {
	const unique = [...new Set(tickers.map(cedearBase).filter(Boolean))];
	const quotes = {};
	const errors = {};
	if (!unique.length) return {
		quotes,
		ccl: null,
		errors
	};
	const [ccl, table] = await Promise.all([loadCcl(), loadCedearArs().catch(() => ({}))]);
	if (!ccl) {
		for (const t of unique) errors[t] = "sin CCL";
		return {
			quotes,
			ccl: null,
			errors
		};
	}
	await Promise.all(unique.map(async (t) => {
		const ratio = cedearRatio(t);
		if (!ratio) {
			errors[t] = "sin ratio";
			return;
		}
		let ars = table[t]?.c ?? null;
		let change = table[t]?.pct_change != null ? table[t].pct_change / 100 : null;
		if (ars == null) try {
			const y = await yahooChart(`${t}.BA`, "5d");
			if (y.value == null) throw new Error("sin precio");
			ars = y.value;
			change = y.change;
		} catch (e) {
			errors[t] = e instanceof Error ? e.message : "sin precio BYMA";
			return;
		}
		const prevArs = change != null && change > -.999 ? ars / (1 + change) : null;
		const usd = cedearToUsd(ars, ratio, ccl);
		if (usd == null) {
			errors[t] = "sin conversión";
			return;
		}
		let spark = [];
		try {
			spark = ((await yahooChart(`${t}.BA`, "3mo")).spark ?? []).map((p) => {
				const u = cedearToUsd(p.c, ratio, ccl);
				return {
					d: p.d,
					c: u ?? p.c
				};
			});
		} catch {
			spark = [];
		}
		const q = {
			ticker: t,
			ars,
			previousArs: prevArs,
			ratio,
			ccl,
			usd,
			previousUsd: prevArs != null ? cedearToUsd(prevArs, ratio, ccl) : null,
			change,
			spark
		};
		quotes[t] = q;
		quotes[`${t}.BA`] = q;
	}));
	return {
		quotes,
		ccl,
		errors
	};
}
async function quotePacks(tickers, cedears = []) {
	const packs = {};
	const errors = {};
	const unique = [...new Set(tickers.map((t) => t.trim().toUpperCase()).filter(Boolean))].slice(0, 24);
	if (!unique.length) return {
		packs,
		errors: { _: "sin tickers" }
	};
	const cedearSet = new Set(cedears.map((t) => t.trim().toUpperCase()).filter(Boolean));
	const cedearTickers = unique.filter((t) => cedearSet.has(t) || t.endsWith(".BA"));
	const usTickers = unique.filter((t) => !cedearTickers.includes(t));
	if (cedearTickers.length) {
		const { quotes, errors: ce } = await quoteCedears(cedearTickers);
		Object.assign(errors, ce);
		for (const t of cedearTickers) {
			const q = quotes[t] ?? quotes[cedearBase(t)];
			if (!q) continue;
			packs[t] = {
				company: {
					ticker: t,
					name: `${cedearBase(t)} CEDEAR`,
					short: cedearBase(t),
					exchange: "BYMA CEDEAR",
					price: q.usd,
					previousClose: q.previousUsd,
					ret1d: q.change
				},
				spark: q.spark,
				cedear: {
					ars: q.ars,
					ratio: q.ratio,
					ccl: q.ccl,
					previousArs: q.previousArs
				}
			};
		}
	}
	await Promise.all(usTickers.map(async (t) => {
		try {
			const q = await yahooChart(t, "3mo");
			if (q.value == null) throw new Error("sin precio");
			packs[t] = {
				company: {
					ticker: t,
					name: q.label,
					short: q.label.split(/[,(]/)[0].trim(),
					exchange: q.currency === "USD" ? "US" : q.currency ?? "",
					price: q.value,
					previousClose: q.previous,
					ret1d: q.change
				},
				spark: q.spark ?? []
			};
		} catch (e) {
			errors[t] = e instanceof Error ? e.message : "fail";
		}
	}));
	return {
		packs,
		errors
	};
}
var LOCAL_US = {
	AAPL: "Apple",
	NVDA: "NVIDIA",
	MSFT: "Microsoft",
	AMZN: "Amazon",
	TSLA: "Tesla",
	MELI: "MercadoLibre",
	GOOGL: "Alphabet",
	GOOG: "Alphabet",
	META: "Meta",
	SPCX: "SpaceX",
	SPY: "SPDR S&P 500",
	QQQ: "Invesco QQQ",
	IWM: "iShares Russell 2000",
	"BRK.B": "Berkshire Hathaway",
	JPM: "JPMorgan",
	V: "Visa",
	UNH: "UnitedHealth",
	XOM: "Exxon",
	AVGO: "Broadcom",
	COST: "Costco",
	NFLX: "Netflix",
	AMD: "AMD",
	KO: "Coca-Cola",
	WMT: "Walmart",
	PG: "Procter & Gamble",
	LLY: "Eli Lilly",
	YPF: "YPF",
	GGAL: "Grupo Galicia",
	BMA: "Banco Macro",
	PAM: "Pampa Energía"
};
async function searchTickers(q) {
	const t = q.trim().toUpperCase();
	const results = [];
	const seen = /* @__PURE__ */ new Set();
	const push = (row) => {
		const key = `${row.symbol}|${row.type}`;
		if (seen.has(key)) return;
		seen.add(key);
		results.push(row);
	};
	if (t.length >= 1 && t.length <= 12) {
		if (isKnownCedear(t)) push({
			symbol: t,
			name: `${cedearBase(t)} CEDEAR`,
			exchange: "BYMA",
			type: "CEDEAR",
			sector: ""
		});
		for (const s of knownCedearSymbols()) {
			if (results.filter((r) => r.type === "CEDEAR").length >= 6) break;
			if (s.startsWith(t)) push({
				symbol: s,
				name: `${s} CEDEAR`,
				exchange: "BYMA",
				type: "CEDEAR",
				sector: ""
			});
		}
		for (const [s, name] of Object.entries(LOCAL_US)) if (s.startsWith(t) || name.toUpperCase().startsWith(t)) push({
			symbol: s,
			name,
			exchange: "US",
			type: "EQUITY",
			sector: ""
		});
	}
	if (results.length < 6) try {
		const data = await fetchJson(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=8&newsCount=0`, 2200);
		for (const x of data.quotes ?? []) {
			if (!x.symbol) continue;
			push({
				symbol: x.symbol,
				name: x.shortname ?? x.longname ?? x.symbol,
				exchange: x.exchDisp ?? "",
				type: x.quoteType ?? "",
				sector: x.sector ?? ""
			});
		}
	} catch {}
	return { results: results.slice(0, 10) };
}
var Route$2 = createFileRoute("/api/quotes")({ server: { handlers: { POST: async ({ request }) => {
	let body = {};
	try {
		body = await request.json();
	} catch {
		body = {};
	}
	const data = await quotePacks(body.tickers ?? [], body.cedears ?? []);
	return Response.json(data, { headers: { "cache-control": "no-store" } });
} } } });
var Route$1 = createFileRoute("/api/search")({ server: { handlers: { GET: async ({ request }) => {
	const q = new URL(request.url).searchParams.get("q") ?? "";
	if (q.trim().length < 1) return Response.json({ results: [] });
	try {
		const data = await searchTickers(q.trim());
		return Response.json(data, { headers: { "cache-control": "public, max-age=60" } });
	} catch {
		return Response.json({ results: [] });
	}
} } } });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$16.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$17
	}),
	CarteraRoute: Route$15.update({
		id: "/cartera",
		path: "/cartera",
		getParentRoute: () => Route$17
	}),
	ClientesRoute: Route$14.update({
		id: "/clientes",
		path: "/clientes",
		getParentRoute: () => Route$17
	}),
	GranosRoute: Route$13.update({
		id: "/granos",
		path: "/granos",
		getParentRoute: () => Route$17
	}),
	InformeRoute: Route$12.update({
		id: "/informe",
		path: "/informe",
		getParentRoute: () => Route$17
	}),
	LoginRoute: Route$11.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$17
	}),
	MantenimientoRoute: Route$10.update({
		id: "/mantenimiento",
		path: "/mantenimiento",
		getParentRoute: () => Route$17
	}),
	MargenesRoute: Route$9.update({
		id: "/margenes",
		path: "/margenes",
		getParentRoute: () => Route$17
	}),
	ApiDataromaRoute: Route$8.update({
		id: "/api/dataroma",
		path: "/api/dataroma",
		getParentRoute: () => Route$17
	}),
	ApiExcelRoute: Route$7.update({
		id: "/api/excel",
		path: "/api/excel",
		getParentRoute: () => Route$17
	}),
	ApiFuentesRoute: Route$6.update({
		id: "/api/fuentes",
		path: "/api/fuentes",
		getParentRoute: () => Route$17
	}),
	ApiGranosRoute: Route$5.update({
		id: "/api/granos",
		path: "/api/granos",
		getParentRoute: () => Route$17
	}),
	ApiMakeRoute: Route$4.update({
		id: "/api/make",
		path: "/api/make",
		getParentRoute: () => Route$17
	}),
	ApiMonitorRoute: Route$3.update({
		id: "/api/monitor",
		path: "/api/monitor",
		getParentRoute: () => Route$17
	}),
	ApiQuotesRoute: Route$2.update({
		id: "/api/quotes",
		path: "/api/quotes",
		getParentRoute: () => Route$17
	}),
	ApiSearchRoute: Route$1.update({
		id: "/api/search",
		path: "/api/search",
		getParentRoute: () => Route$17
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$17
	})
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { ratioLabel as a, setTheme as c, isKnownCedear as i, cedearRatio as n, Route$11 as o, cedearToUsd as r, getTheme as s, router_exports as t };
