import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as FileSpreadsheet, o as Search, r as Trash2, s as RefreshCw, t as X } from "../_libs/lucide-react.mjs";
import { a as ratioLabel, i as isKnownCedear, n as cedearRatio, r as cedearToUsd } from "./router-DIhOYZrB.mjs";
import { r as cn } from "./site-nav-AKpnAPBZ.mjs";
import { n as queuePersist, t as RequireAuth } from "./require-auth-BMH_D_o-.mjs";
import { a as PageMain, i as PageHeader, n as DeskGrid, o as ScrollPane, r as Page$1, t as ChipRow } from "./page-BU_NP2BG.mjs";
import { t as Button } from "./button-DaNrgsa4.mjs";
import { n as DISCLAIMER_MERCADO, r as FIRM } from "./brand-CbU4ly2d.mjs";
import { a as pct, c as usd, i as num, s as signedClass, t as ars } from "./format-BTGgZiZN.mjs";
import { a as Line, c as Cell, i as XAxis, l as ResponsiveContainer, n as LineChart, o as CartesianGrid, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cartera-BR0t_PFL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SEED_DATE = "2026-01-15";
var SEED_HOLDINGS = [
	{
		ticker: "GOOGL",
		shares: 1200,
		cost: 275
	},
	{
		ticker: "META",
		shares: 650,
		cost: 620
	},
	{
		ticker: "SPCX",
		shares: 1800,
		cost: 148
	}
];
var BROKERS = [
	"IBKR",
	"IOL",
	"Balanz",
	"PPI",
	"Bull Market",
	"Cocos Capital"
];
var QUICK = [
	"AAPL",
	"NVDA",
	"MSFT",
	"AMZN",
	"TSLA",
	"MELI"
];
var QUICK_CEDEAR = [
	"AAPL",
	"META",
	"GOOGL",
	"NVDA",
	"SPY",
	"MELI"
];
var LS_TRADES = "dhf-trades-v1";
var LS_CLIENT = "dhf-client-v1";
var DEFAULT_CLIENT = "Presentación confidencial";
function uid() {
	return `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
function normTicker(s) {
	return s.trim().toUpperCase().replace(/\s+/g, "");
}
function validTicker(s) {
	return /^[A-Z][A-Z0-9.^-]{0,11}$/.test(normTicker(s));
}
function seedTrades() {
	return SEED_HOLDINGS.filter((e) => e.shares > 0 && e.cost > 0).map((e) => ({
		id: `seed-${e.ticker}`,
		ticker: e.ticker,
		side: "buy",
		qty: e.shares,
		price: e.cost,
		date: SEED_DATE,
		broker: ""
	}));
}
function parseTrade(x) {
	if (!x || typeof x !== "object") return null;
	const t = x;
	if (typeof t.ticker !== "string") return null;
	const ticker = normTicker(t.ticker);
	if (!validTicker(ticker)) return null;
	const side = t.side === "sell" ? "sell" : t.side === "buy" ? "buy" : null;
	if (!side) return null;
	const qty = Number(t.qty);
	const price = Number(t.price);
	if (!Number.isFinite(qty) || qty <= 0 || qty >= 1e9 || !Number.isFinite(price) || price <= 0 || price >= 1e7) return null;
	const date = typeof t.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(t.date) ? t.date : null;
	if (!date) return null;
	return {
		id: typeof t.id === "string" && t.id.trim() && t.id.length < 40 ? t.id.trim() : uid(),
		ticker,
		side,
		qty,
		price,
		date,
		broker: typeof t.broker === "string" ? t.broker.trim().replace(/\s+/g, " ").slice(0, 40) : "",
		...t.cedear === true ? { cedear: true } : {}
	};
}
function parseTrades(x) {
	if (!Array.isArray(x)) return [];
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const row of x) {
		const t = parseTrade(row);
		if (!t) continue;
		let id = t.id;
		if (seen.has(id)) id = uid();
		seen.add(id);
		out.push({
			...t,
			id
		});
		if (out.length >= 400) break;
	}
	return out.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}
function loadTrades() {
	if (typeof window === "undefined") return seedTrades();
	try {
		const raw = window.localStorage.getItem(LS_TRADES);
		if (!raw) return seedTrades();
		const t = parseTrades(JSON.parse(raw));
		return t.length ? t : seedTrades();
	} catch {
		return seedTrades();
	}
}
function saveTrades(list) {
	window.localStorage.setItem(LS_TRADES, JSON.stringify(list));
	queuePersist("trades", list);
}
function loadClient() {
	if (typeof window === "undefined") return DEFAULT_CLIENT;
	try {
		const v = window.localStorage.getItem(LS_CLIENT);
		return (typeof v === "string" ? v.trim().slice(0, 80) : "") || "Presentación confidencial";
	} catch {
		return DEFAULT_CLIENT;
	}
}
function saveClient(name) {
	const v = name.trim().slice(0, 80) || "Presentación confidencial";
	window.localStorage.setItem(LS_CLIENT, v);
	queuePersist("cartera_client", v);
}
function openQty(trades, ticker) {
	let n = 0;
	for (const t of trades) if (t.ticker === ticker) n += t.side === "buy" ? t.qty : -t.qty;
	return Math.max(0, n);
}
function daysBetween(iso, now) {
	const t = Date.parse(`${iso}T00:00:00Z`);
	if (!Number.isFinite(t)) return 1;
	return Math.max(1, Math.round((now.getTime() - t) / 864e5));
}
function rates(ret, days) {
	if (!Number.isFinite(ret) || days < 1) return {
		tna: null,
		tea: null
	};
	return {
		tna: 365 / days * ret,
		tea: (1 + Math.max(-.999999, ret)) ** (365 / days) - 1
	};
}
function bookCclOf(px) {
	for (const q of Object.values(px)) if (q.ccl && q.ccl > 0) return q.ccl;
	return 0;
}
function bookOf(trades, px, now = /* @__PURE__ */ new Date()) {
	const rows = [...trades].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
	const lots = /* @__PURE__ */ new Map();
	const realizedMap = /* @__PURE__ */ new Map();
	const bought = /* @__PURE__ */ new Map();
	const firstBuy = /* @__PURE__ */ new Map();
	let cash = 0;
	let firstDate = null;
	const bookCcl = bookCclOf(px);
	for (const t of rows) {
		if (!firstDate || t.date < firstDate) firstDate = t.date;
		if (!firstBuy.has(t.ticker) || t.date < firstBuy.get(t.ticker)) firstBuy.set(t.ticker, t.date);
		const notion = t.qty * t.price;
		const notionUsd = t.cedear ? bookCcl > 0 ? notion / bookCcl : 0 : notion;
		if (t.side === "buy") {
			const list = lots.get(t.ticker) ?? [];
			list.push({
				qty: t.qty,
				price: t.price,
				date: t.date
			});
			lots.set(t.ticker, list);
			bought.set(t.ticker, (bought.get(t.ticker) ?? 0) + notion);
			cash += notionUsd;
		} else {
			let left = t.qty;
			const list = lots.get(t.ticker) ?? [];
			let real = realizedMap.get(t.ticker) ?? 0;
			for (const lot of list) {
				if (left <= 0) break;
				const take = Math.min(lot.qty, left);
				real += (t.price - lot.price) * take;
				lot.qty -= take;
				left -= take;
			}
			lots.set(t.ticker, list.filter((l) => l.qty > 1e-9));
			realizedMap.set(t.ticker, real);
		}
	}
	const keys = /* @__PURE__ */ new Set([...lots.keys(), ...realizedMap.keys()]);
	const positions = [];
	const closed = [];
	for (const ticker of keys) {
		const list = lots.get(ticker) ?? [];
		const qty = list.reduce((a, l) => a + l.qty, 0);
		const costValue = list.reduce((a, l) => a + l.qty * l.price, 0);
		const realized = realizedMap.get(ticker) ?? 0;
		const q = px[ticker];
		const cedear = q?.cedear === true || rows.some((t) => t.ticker === ticker && t.cedear);
		const ratio = q?.ratio;
		const ccl = q?.ccl;
		const ars = q?.ars;
		const name = q?.short || q?.name || ticker;
		if (cedear) {
			if (qty <= 1e-9) {
				const fx = ccl && ccl > 0 ? ccl : bookCcl;
				const realizedOut = fx > 0 ? realized / fx : 0;
				if (Math.abs(realizedOut) > 1e-9) closed.push({
					ticker,
					realized: realizedOut
				});
				continue;
			}
			const ratioUse = ratio && ratio > 0 ? ratio : cedearRatio(ticker);
			const cclUse = ccl && ccl > 0 ? ccl : bookCcl;
			const arsUse = ars && ars > 0 ? ars : qty ? costValue / qty : 0;
			const ratioFinal = ratioUse && ratioUse > 0 ? ratioUse : 1;
			const qtyUnd = qty / ratioFinal;
			const costUsd = cclUse > 0 ? costValue / cclUse : 0;
			const marketUsd = cclUse > 0 && arsUse > 0 ? qty * arsUse / cclUse : 0;
			const priceUsd = cclUse > 0 && arsUse > 0 ? arsUse * ratioFinal / cclUse : 0;
			const prevArs = q?.previousArs ?? null;
			const prevUsd = q?.previousClose ?? priceUsd;
			const avgCost = qtyUnd ? costUsd / qtyUnd : 0;
			const unrealized = marketUsd - costUsd;
			const realizedUsd = cclUse > 0 ? realized / cclUse : 0;
			const days = daysBetween(firstBuy.get(ticker) ?? now.toISOString().slice(0, 10), now);
			const invested = cclUse > 0 ? (bought.get(ticker) || costValue) / cclUse : 0;
			const { tna } = rates(invested ? (unrealized + realizedUsd) / invested : 0, days);
			positions.push({
				ticker,
				name: name.includes("CEDEAR") ? name : `${name} CEDEAR`,
				qty: qtyUnd,
				avgCost,
				costValue: costUsd,
				price: priceUsd,
				previousClose: prevUsd,
				marketValue: marketUsd,
				unrealized,
				unrealizedPct: costUsd ? unrealized / costUsd : 0,
				realized: realizedUsd,
				dayPnl: prevArs != null && cclUse > 0 ? qty * (arsUse - prevArs) / cclUse : (priceUsd - prevUsd) * qtyUnd,
				dayPnlPct: prevUsd ? priceUsd / prevUsd - 1 : 0,
				tna,
				days,
				weight: 0,
				cedear: true,
				ratio: ratioFinal,
				qtyCedear: qty,
				pxArs: arsUse,
				ccl: cclUse || void 0
			});
			continue;
		}
		if (qty <= 1e-9) {
			if (Math.abs(realized) > 1e-9) closed.push({
				ticker,
				realized
			});
			continue;
		}
		const price = q?.price ?? 0;
		const previousClose = q?.previousClose ?? price;
		const avgCost = costValue / qty;
		const marketValue = qty * price;
		const unrealized = marketValue - costValue;
		const days = daysBetween(firstBuy.get(ticker) ?? now.toISOString().slice(0, 10), now);
		const invested = bought.get(ticker) || costValue;
		const { tna } = rates(invested ? (unrealized + realized) / invested : 0, days);
		positions.push({
			ticker,
			name,
			qty,
			avgCost,
			costValue,
			price,
			previousClose,
			marketValue,
			unrealized,
			unrealizedPct: costValue ? unrealized / costValue : 0,
			realized,
			dayPnl: (price - previousClose) * qty,
			dayPnlPct: previousClose ? price / previousClose - 1 : 0,
			tna,
			days,
			weight: 0
		});
	}
	positions.sort((a, b) => b.marketValue - a.marketValue);
	const marketValue = positions.reduce((a, p) => a + p.marketValue, 0);
	const costValue = positions.reduce((a, p) => a + p.costValue, 0);
	const unrealized = positions.reduce((a, p) => a + p.unrealized, 0);
	const realized = positions.reduce((a, p) => a + p.realized, 0) + closed.reduce((a, p) => a + p.realized, 0);
	const dayPnl = positions.reduce((a, p) => a + p.dayPnl, 0);
	const totalPnl = unrealized + realized;
	const days = firstDate ? daysBetween(firstDate, now) : 0;
	const { tna, tea } = cash > 0 && days > 0 ? rates(totalPnl / cash, days) : {
		tna: null,
		tea: null
	};
	return {
		positions: positions.map((p) => ({
			...p,
			weight: marketValue ? p.marketValue / marketValue : 0
		})),
		closed,
		marketValue,
		costValue,
		unrealized,
		unrealizedPct: costValue ? unrealized / costValue : 0,
		realized,
		totalPnl,
		totalPnlPct: cash ? totalPnl / cash : 0,
		dayPnl,
		dayPnlPct: marketValue - dayPnl ? dayPnl / (marketValue - dayPnl) : 0,
		cashInvested: cash,
		tna,
		tea,
		days,
		firstDate
	};
}
function navSeries(positions, sparks) {
	const dates = /* @__PURE__ */ new Set();
	for (const p of positions) for (const s of sparks[p.ticker] ?? []) dates.add(s.d);
	const ordered = [...dates].sort();
	if (ordered.length < 2) return [];
	const last = new Map(positions.map((p) => [p.ticker, p.price]));
	const rows = ordered.map((d) => {
		let nav = 0;
		for (const p of positions) {
			const hit = (sparks[p.ticker] ?? []).filter((s) => s.d <= d).at(-1);
			nav += p.qty * (hit?.c ?? last.get(p.ticker) ?? p.price);
		}
		return {
			d,
			nav
		};
	});
	const base = rows[0]?.nav || 1;
	return rows.map((r) => ({
		d: r.d,
		v: r.nav / base * 100
	}));
}
var FILLS = [
	"var(--color-googl)",
	"var(--color-meta)",
	"var(--color-spcx)",
	"var(--color-t3)",
	"var(--color-t4)",
	"var(--color-t5)",
	"var(--color-t6)",
	"var(--color-t7)"
];
var INP = "h-11 w-full rounded-md bg-cream px-3 text-sm text-ink outline-none hair";
function qtyFmt(n) {
	return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}
function px2(n) {
	if (!Number.isFinite(n)) return "";
	return (Math.round(n * 100) / 100).toFixed(2);
}
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function CarteraDesk() {
	const [trades, setTrades] = (0, import_react.useState)(seedTrades);
	const [client, setClient] = (0, import_react.useState)(DEFAULT_CLIENT);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [packs, setPacks] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [refresh, setRefresh] = (0, import_react.useState)(0);
	const [excelBusy, setExcelBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [openTicker, setOpenTicker] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setTrades(loadTrades());
		setClient(loadClient());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveTrades(trades);
		saveClient(client);
	}, [
		trades,
		client,
		ready
	]);
	const tickers = (0, import_react.useMemo)(() => [...new Set(trades.map((t) => t.ticker))], [trades]);
	const cedears = (0, import_react.useMemo)(() => [...new Set(trades.filter((t) => t.cedear).map((t) => t.ticker))], [trades]);
	(0, import_react.useEffect)(() => {
		if (!ready || !tickers.length) return;
		const ac = new AbortController();
		setLoading(true);
		(async () => {
			try {
				const json = await (await fetch("/api/quotes", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						tickers,
						cedears
					}),
					signal: ac.signal
				})).json();
				if (ac.signal.aborted) return;
				setPacks((p) => ({
					...p,
					...json.packs ?? {}
				}));
			} catch {} finally {
				if (!ac.signal.aborted) setLoading(false);
			}
		})();
		return () => ac.abort();
	}, [
		tickers.join(","),
		cedears.join(","),
		ready,
		refresh
	]);
	const px = (0, import_react.useMemo)(() => {
		const o = {};
		for (const [k, v] of Object.entries(packs)) o[k] = {
			price: v.company.price,
			previousClose: v.company.previousClose,
			name: v.company.name,
			short: v.company.short,
			...v.cedear ? {
				cedear: true,
				ratio: v.cedear.ratio,
				ccl: v.cedear.ccl,
				ars: v.cedear.ars,
				previousArs: v.cedear.previousArs
			} : {}
		};
		return o;
	}, [packs]);
	const snap = (0, import_react.useMemo)(() => bookOf(trades, px), [trades, px]);
	const blotter = (0, import_react.useMemo)(() => [...trades].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)), [trades]);
	const sparks = (0, import_react.useMemo)(() => {
		const o = {};
		for (const [k, v] of Object.entries(packs)) o[k] = v.spark ?? [];
		return o;
	}, [packs]);
	const series = (0, import_react.useMemo)(() => navSeries(snap.positions, sparks), [snap.positions, sparks]);
	const filtered = snap.positions.filter((p) => {
		const q = query.trim().toUpperCase();
		if (!q) return true;
		return p.ticker.includes(q) || p.name.toUpperCase().includes(q);
	});
	const openPos = openTicker ? snap.positions.find((p) => p.ticker === openTicker) ?? null : null;
	function addTrade(t) {
		if (!ready) return;
		if (trades.length >= 400) throw new Error("Tope de operaciones.");
		setTrades((list) => [...list, {
			...t,
			id: uid()
		}]);
	}
	function dropTrade(id) {
		setTrades((list) => list.filter((t) => t.id !== id));
	}
	function resetModel() {
		setTrades(seedTrades());
		setPacks({});
		setRefresh((n) => n + 1);
	}
	async function excel() {
		setExcelBusy(true);
		setErr(null);
		try {
			const res = await fetch("/api/excel", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					trades,
					client
				})
			});
			if (!res.ok) throw new Error("fail");
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `Agro-Cartera-${client.replace(/[^A-Za-z0-9_-]+/g, "-").slice(0, 32) || "movimientos"}.xls`;
			a.click();
			URL.revokeObjectURL(url);
		} catch {
			setErr("No se pudo generar el Excel.");
		} finally {
			setExcelBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		nav: "cartera",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMain, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${FIRM} · Cartera`,
				title: "Mis tenencias",
				lead: "Precio, PPC, invertido y TNA en dólares. Los CEDEAR entran al precio local × ratio / CCL para dejar toda la cartera homogénea. FIFO como un extracto de broker.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden items-center gap-1.5 text-[11px] text-ink-faint md:flex",
						children: "Solo en este navegador"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "hidden sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Cuenta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: client,
							onChange: (e) => setClient(e.target.value.slice(0, 80)),
							className: "h-11 w-48 rounded-md bg-cream px-3 text-sm hair outline-none",
							placeholder: "Nombre de la cuenta"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRefresh((n) => n + 1),
						className: "inline-flex h-11 items-center gap-2 px-2 text-xs text-ink-soft hover:text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", loading && "animate-spin") }), "Precios"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => void excel(),
						disabled: excelBusy || !ready,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: cn("size-4", excelBusy && "animate-spin") }), "Excel"]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "desk-stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "desk-stack-kpis",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { snap }), err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-down",
						children: err
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "desk-stack-work",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskGrid, {
						invertMobile: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glance, {
							positions: filtered,
							query,
							onQuery: setQuery,
							onOpen: setOpenTicker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, {
							ready,
							trades,
							packs,
							onAdd: addTrade,
							onReset: resetModel
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Valuacion, {
				positions: filtered,
				loading: loading && !snap.positions.length,
				onOpen: setOpenTicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieBox, {
					positions: snap.positions,
					onOpen: setOpenTicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBox, { series })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blotter, {
				trades: blotter,
				onDrop: dropTrade
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-12 border-t border-line pt-6 text-[11px] leading-relaxed text-ink-faint",
				children: DISCLAIMER_MERCADO
			})
		] }), openTicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
			ticker: openTicker,
			pos: openPos,
			pack: packs[openTicker],
			onClose: () => setOpenTicker(null)
		}) : null]
	});
}
function Kpis({ snap }) {
	const items = [
		{
			label: "NAV",
			value: usd(snap.marketValue),
			sub: `Costo ${usd(snap.costValue)}`,
			tone: void 0
		},
		{
			label: "P&L no realizado",
			value: usd(snap.unrealized),
			sub: pct(snap.unrealizedPct, 1),
			tone: signedClass(snap.unrealized)
		},
		{
			label: "P&L realizado",
			value: usd(snap.realized),
			sub: "FIFO · operaciones cerradas",
			tone: signedClass(snap.realized)
		},
		{
			label: "P&L del día",
			value: usd(snap.dayPnl),
			sub: pct(snap.dayPnlPct, 1),
			tone: signedClass(snap.dayPnl)
		},
		{
			label: "TNA",
			value: pct(snap.tna, 1),
			sub: snap.days ? `${snap.days} días · sobre compras` : "Sin historial",
			tone: signedClass(snap.tna)
		},
		{
			label: "TEA",
			value: pct(snap.tea, 1),
			sub: snap.firstDate ? `desde ${snap.firstDate}` : "—",
			tone: signedClass(snap.tea)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "kpi-strip mt-4",
		children: items.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
				children: e.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 font-display text-lg tabular leading-none sm:text-xl", e.tone),
				children: e.value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 text-[11px] tabular text-ink-faint", e.tone === "text-up" || e.tone === "text-down" ? e.tone : ""),
				children: e.sub
			})
		] }, e.label))
	});
}
function Glance({ positions, query, onQuery, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "desk-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
					children: "Cartera"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-lg",
					children: "Posiciones de un vistazo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-ink-faint",
					children: "Clic en el ticker para fundamentales, PPC y TNA."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative block w-full max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (e) => onQuery(e.target.value),
					placeholder: "Buscar tenencia",
					className: cn(INP, "pl-9")
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3",
			children: positions.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onOpen(e.ticker),
				className: "rounded-lg bg-paper-2 p-3 text-left hair hover:bg-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [e.ticker, e.cedear ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-[10px] tracking-wide text-ink-faint uppercase",
								children: "CEDEAR"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("tabular text-xs", signedClass(e.unrealizedPct)),
							children: pct(e.unrealizedPct, 1)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-xs text-ink-soft",
						children: e.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-lg tabular leading-none",
						children: usd(e.marketValue)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-ink-faint",
						children: [num(e.weight * 100, 1), "% cartera"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 inline-block size-1.5 rounded-full",
						style: { background: FILLS[i % FILLS.length] }
					})
				]
			}, e.ticker))
		})]
	});
}
function Ticket({ ready, trades, packs, onAdd, onReset }) {
	const [side, setSide] = (0, import_react.useState)("buy");
	const [asCedear, setAsCedear] = (0, import_react.useState)(false);
	const [ticker, setTicker] = (0, import_react.useState)("");
	const [qty, setQty] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(today);
	const [broker, setBroker] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ceMeta, setCeMeta] = (0, import_react.useState)(null);
	const [tickerFocus, setTickerFocus] = (0, import_react.useState)(false);
	const allowSearch = (0, import_react.useRef)(true);
	const t = normTicker(ticker);
	const held = openQty(trades, t);
	const ce = packs[t]?.cedear ?? (ceMeta ? {
		ars: Number(price) || 0,
		ratio: ceMeta.ratio,
		ccl: ceMeta.ccl,
		previousArs: null
	} : void 0);
	const typedPx = Number(price);
	const impliedUsd = asCedear && ce && typedPx > 0 ? cedearToUsd(typedPx, ce.ratio, ce.ccl) : null;
	(0, import_react.useEffect)(() => {
		if (!allowSearch.current || !tickerFocus) {
			if (!tickerFocus) setHits([]);
			return;
		}
		const q = ticker.trim();
		if (q.length < 1) {
			setHits([]);
			return;
		}
		const id = window.setTimeout(async () => {
			try {
				const json = await (await fetch(`/api/search?q=${encodeURIComponent(q)}`)).json();
				if (!allowSearch.current) return;
				const results = [...json.results ?? []];
				if (asCedear && isKnownCedear(normTicker(q)) && !results.some((r) => r.symbol === normTicker(q) && r.type === "CEDEAR")) results.unshift({
					symbol: normTicker(q),
					name: `${normTicker(q)} CEDEAR`,
					type: "CEDEAR"
				});
				setHits(results);
			} catch {
				setHits([]);
			}
		}, 160);
		return () => window.clearTimeout(id);
	}, [
		ticker,
		asCedear,
		tickerFocus
	]);
	async function pick(sym, kind) {
		const n = normTicker(sym);
		const useCe = kind === "cedear" || kind !== "us" && asCedear;
		if (kind === "cedear") setAsCedear(true);
		if (kind === "us") {
			setAsCedear(false);
			setCeMeta(null);
		}
		allowSearch.current = false;
		setTicker(n);
		setHits([]);
		setTickerFocus(false);
		setMsg(null);
		const body = useCe ? {
			tickers: [n],
			cedears: [n]
		} : { tickers: [n] };
		if (!useCe && packs[n] && !packs[n].cedear) {
			setPrice(px2(packs[n].company.price));
			return;
		}
		if (useCe && packs[n]?.cedear) {
			setCeMeta({
				ratio: packs[n].cedear.ratio,
				ccl: packs[n].cedear.ccl
			});
			setPrice(px2(packs[n].cedear.ars));
			return;
		}
		try {
			const json = await (await fetch("/api/quotes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			})).json();
			const p = json.packs?.[n];
			if (useCe) {
				if (p?.cedear) {
					setCeMeta({
						ratio: p.cedear.ratio,
						ccl: p.cedear.ccl
					});
					setPrice(px2(p.cedear.ars));
				} else {
					setCeMeta(null);
					setMsg(json.errors?.[n] ?? "Sin cotización CEDEAR. Completá el precio en ARS a mano.");
				}
			} else if (p) setPrice(px2(p.company.price));
			else setMsg("Sin cotización automática. Completá el precio de la operación.");
		} catch {
			setMsg("Sin cotización automática. Completá el precio de la operación.");
		}
	}
	function toggleKind(next) {
		setAsCedear(next);
		setPrice("");
		setMsg(null);
		if (!next) setCeMeta(null);
		if (t) pick(t, next ? "cedear" : "us");
	}
	async function submit(e) {
		e.preventDefault();
		setMsg(null);
		setHits([]);
		if (!ready) {
			setMsg("Todavía cargando la cartera.");
			return;
		}
		if (!validTicker(t)) {
			setMsg("Ticker inválido.");
			return;
		}
		const q = Number(qty);
		const p = Number(price);
		if (!Number.isFinite(q) || q <= 0) {
			setMsg("Cantidad inválida.");
			return;
		}
		if (!Number.isFinite(p) || p <= 0) {
			setMsg("Precio inválido. Completá el precio pactado.");
			return;
		}
		const existing = trades.filter((x) => x.ticker === t);
		if (asCedear && existing.some((x) => !x.cedear)) {
			setMsg(`${t} ya está como acción US. Borre esas operaciones o cargue otro ticker.`);
			return;
		}
		if (!asCedear && existing.some((x) => x.cedear)) {
			setMsg(`${t} ya está como CEDEAR. Borre esas operaciones o cargue otro ticker.`);
			return;
		}
		if (asCedear && !isKnownCedear(t)) {
			setMsg("No tenemos el ratio de ese CEDEAR. No se puede pasar a dólares.");
			return;
		}
		if (side === "sell" && q - held > 1e-9) {
			setMsg(`Solo hay ${qtyFmt(held)} ${asCedear ? "CEDEAR" : "acciones"} de ${t}.`);
			return;
		}
		setBusy(true);
		try {
			onAdd({
				ticker: t,
				side,
				qty: q,
				price: p,
				date: date || today(),
				broker,
				...asCedear ? { cedear: true } : {}
			});
			setQty("");
			setMsg(null);
		} catch (err) {
			setMsg(err instanceof Error ? err.message : "Error");
		} finally {
			setBusy(false);
		}
	}
	const shownHits = [];
	const seenHit = /* @__PURE__ */ new Set();
	for (const h of hits) {
		const base = h.symbol.replace(/\.BA$/i, "");
		if (asCedear && h.type !== "CEDEAR" && !isKnownCedear(base)) continue;
		if (asCedear && seenHit.has(base)) continue;
		if (asCedear) seenHit.add(base);
		shownHits.push(asCedear ? {
			...h,
			symbol: base
		} : h);
		if (shownHits.length >= 5) break;
	}
	const chips = asCedear ? QUICK_CEDEAR : QUICK;
	const showHits = tickerFocus && shownHits.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-w-0 rounded-xl bg-forest p-5 text-cream sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.18em] text-cream/70 uppercase",
				children: "Operación"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-lg",
				children: "Compra o venta al precio pactado. FIFO al cerrar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-11 overflow-hidden rounded-md",
					children: ["buy", "sell"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSide(s),
						className: cn("h-11 flex-1 text-sm", side === s ? "bg-cream text-forest" : "bg-forest-mid text-cream/80"),
						children: s === "buy" ? "Comprar" : "Vender"
					}, s))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-11 overflow-hidden rounded-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggleKind(false),
						className: cn("h-11 flex-1 text-sm", !asCedear ? "bg-cream text-forest" : "bg-forest-mid text-cream/80"),
						children: "Acción US"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggleKind(true),
						className: cn("h-11 flex-1 text-sm", asCedear ? "bg-cream text-forest" : "bg-forest-mid text-cream/80"),
						children: "CEDEAR"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => void submit(e),
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-[11px] font-medium tracking-wide text-cream/70 uppercase",
							children: "Ticker"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: ticker,
							onChange: (e) => {
								allowSearch.current = true;
								setTicker(e.target.value);
							},
							onFocus: () => setTickerFocus(true),
							onBlur: () => window.setTimeout(() => setTickerFocus(false), 180),
							onKeyDown: (e) => {
								if (e.key !== "Enter") return;
								if (shownHits[0]) {
									e.preventDefault();
									pick(shownHits[0].symbol, shownHits[0].type === "CEDEAR" || asCedear ? "cedear" : "us");
								}
							},
							className: INP,
							autoComplete: "off",
							placeholder: asCedear ? "AAPL, SPY, MELI…" : "AAPL, NVDA, MELI…"
						})]
					}),
					showHits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "overflow-hidden rounded-md bg-cream text-ink hair",
						children: shownHits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onMouseDown: (e) => e.preventDefault(),
							onClick: () => void pick(h.symbol, h.type === "CEDEAR" || asCedear ? "cedear" : "us"),
							className: "flex h-11 w-full items-center justify-between px-3 text-left text-sm hover:bg-paper-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: h.symbol
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate pl-3 text-xs text-ink-soft",
								children: h.type === "CEDEAR" ? "CEDEAR" : h.name
							})]
						}) }, `${h.symbol}-${h.type ?? "us"}`))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] font-medium tracking-wide text-cream/70 uppercase",
								children: asCedear ? "Cantidad CEDEAR" : "Cantidad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								inputMode: "decimal",
								min: 0,
								step: "any",
								value: qty,
								onChange: (e) => setQty(e.target.value),
								className: cn(INP, "tabular")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] font-medium tracking-wide text-cream/70 uppercase",
								children: asCedear ? "Precio ARS" : "Precio USD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								inputMode: "decimal",
								min: 0,
								step: "any",
								value: price,
								onChange: (e) => setPrice(e.target.value),
								className: cn(INP, "tabular")
							})]
						})]
					}),
					asCedear ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-cream/70",
						children: ce ? `Equiv. ${usd(impliedUsd ?? ce.ars * ce.ratio / ce.ccl, 2)} · ratio ${ratioLabel(ce.ratio)} · CCL ${ars(ce.ccl, 0)}` : t && isKnownCedear(t) ? "Precio local × ratio / CCL para pasar a dólares." : t ? "Sin ratio cargado para ese ticker." : "El lote queda en CEDEAR; la cartera lo muestra en dólares."
					}) : null,
					t && side === "sell" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-cream/70",
						children: [
							"Disponible ",
							qtyFmt(held),
							" ",
							asCedear ? "CEDEAR" : t
						]
					}) : null,
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-amber-200",
						children: msg
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy || !ready,
						className: "relative z-20 inline-flex h-11 w-full items-center justify-center rounded-md bg-cream px-4 text-sm font-medium text-forest hover:opacity-90 disabled:opacity-50",
						children: busy ? "…" : !ready ? "Cargando…" : side === "sell" ? "Registrar venta" : "Registrar operación"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] font-medium tracking-wide text-cream/70 uppercase",
								children: "Fecha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value),
								className: INP
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[11px] font-medium tracking-wide text-cream/70 uppercase",
									children: "Broker"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									list: "dhf-brokers",
									value: broker,
									onChange: (e) => setBroker(e.target.value),
									placeholder: "IBKR, IOL, Balanz…",
									className: INP
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
									id: "dhf-brokers",
									children: BROKERS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: b }, b))
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: chips.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void pick(s, asCedear ? "cedear" : "us"),
					className: "h-11 rounded-md px-3 text-xs text-cream/80 hair hover:text-cream",
					children: s
				}, s)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onReset,
				className: "mt-4 h-11 text-xs text-cream/70 underline-offset-2 hover:underline",
				children: "Volver al modelo META · SPCX · GOOGL"
			})
		]
	});
}
function Valuacion({ positions, loading, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 min-w-0 overflow-hidden rounded-xl bg-cream hair",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
					children: "Detalle"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-lg",
					children: "Detalle de valuación"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-ink-faint",
					children: "Nominales (acciones equiv. en CEDEAR), precio en USD, PPC, invertido y TNA. Clic en el nombre."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollPane, {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[920px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: [
						"Ticker",
						"Nominales",
						"Precio",
						"PPC",
						"Invertido",
						"Valor mdo.",
						"% Cart.",
						"TNA",
						"Días",
						"No real.",
						"Día",
						"Realiz."
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: cn("py-2 pr-3", h !== "Ticker" && "text-right"),
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: positions.length ? positions.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line/70 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onOpen(e.ticker),
								className: "text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: e.ticker
									}),
									e.cedear ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-[10px] tracking-wide text-ink-faint uppercase",
										children: "CEDEAR"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 text-xs text-ink-soft",
										children: e.name.replace(/ CEDEAR$/, "")
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: [qtyFmt(e.qty), e.cedear && e.qtyCedear != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-ink-faint",
								children: [qtyFmt(e.qtyCedear), " papeles"]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: usd(e.price, 2) }), e.cedear && e.pxArs != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-ink-faint",
								children: [
									ars(e.pxArs, 0),
									" · ",
									e.ratio ? ratioLabel(e.ratio) : ""
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("text-[11px]", signedClass(e.dayPnlPct)),
								children: pct(e.dayPnlPct)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: usd(e.avgCost, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: usd(e.costValue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: usd(e.marketValue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: pct(e.weight, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("py-2 pr-3 text-right tabular", signedClass(e.tna)),
							children: pct(e.tna)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular text-ink-soft",
							children: e.days
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: cn("py-2 pr-3 text-right tabular", signedClass(e.unrealized)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: usd(e.unrealized) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px]",
								children: pct(e.unrealizedPct)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("py-2 pr-3 text-right tabular", signedClass(e.dayPnl)),
							children: usd(e.dayPnl)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("py-2 text-right tabular", signedClass(e.realized)),
							children: usd(e.realized)
						})
					]
				}, e.ticker)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 12,
					className: "px-5 py-8 text-sm text-ink-faint",
					children: loading ? "Cargando precios…" : "Sin posiciones abiertas. Cargue una compra a la derecha."
				}) }) })]
			})
		})]
	});
}
function PieBox({ positions, onOpen }) {
	const data = positions.filter((p) => p.marketValue > 0).map((p, i) => ({
		name: p.ticker,
		value: p.marketValue,
		fill: FILLS[i % FILLS.length],
		weight: p.weight
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "desk-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
				children: "Distribución"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-lg",
				children: "Composición por activo. Clic en la leyenda abre la ficha."
			}),
			data.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid items-center gap-4 sm:grid-cols-[160px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto h-40 w-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							data,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 52,
							outerRadius: 80,
							stroke: "var(--color-cream)",
							strokeWidth: 2,
							children: data.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: e.fill }, e.name))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							formatter: (v) => usd(Number(v)),
							contentStyle: {
								background: "var(--color-cream)",
								border: "1px solid var(--color-line)",
								fontSize: 12
							}
						})] })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1.5 text-sm",
					children: data.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onOpen(e.name),
						className: "flex w-full items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 text-ink-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2 rounded-full",
								style: { background: e.fill }
							}), e.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular",
							children: pct(e.weight, 1)
						})]
					}) }, e.name))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-xs text-ink-faint",
				children: "Sin posiciones."
			})
		]
	});
}
function NavBox({ series }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "desk-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
				children: "nav"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-lg",
				children: "Performance · 3 meses"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-ink-faint",
				children: "Base 100. Línea de cartera (NAV de las posiciones abiertas) y cada nombre."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-48",
				children: series.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: series,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "d",
								tick: {
									fontSize: 11,
									fill: "var(--color-ink-faint)"
								},
								tickFormatter: (e) => String(e).slice(5),
								minTickGap: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fontSize: 11,
									fill: "var(--color-ink-faint)"
								},
								domain: ["auto", "auto"],
								width: 36
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (v) => num(Number(v), 1),
								contentStyle: {
									background: "var(--color-cream)",
									border: "1px solid var(--color-line)",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "v",
								stroke: "var(--color-forest)",
								strokeWidth: 2,
								dot: false,
								name: "Cartera"
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-xs text-ink-faint",
					children: "Sin historial."
				})
			})
		]
	});
}
function Blotter({ trades, onDrop }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 min-w-0 overflow-hidden rounded-xl bg-cream hair",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
				children: "Blotter"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-lg",
				children: "Historial de compras y ventas. Borrar recálcula FIFO."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollPane, {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: [
						"Fecha",
						"Lado",
						"Ticker",
						"Broker",
						"Cant.",
						"Precio",
						"Notional",
						""
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: cn("py-2 pr-3", [
							"Cant.",
							"Precio",
							"Notional"
						].includes(h) && "text-right"),
						children: h
					}, h || "x"))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: trades.length ? trades.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line/70 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 tabular",
							children: e.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("py-2 pr-3", e.side === "buy" ? "text-up" : "text-down"),
							children: e.side === "buy" ? "Compra" : "Venta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2 pr-3 font-medium",
							children: [e.ticker, e.cedear ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-[10px] tracking-wide text-ink-faint uppercase",
								children: "CEDEAR"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-ink-soft",
							children: e.broker || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: qtyFmt(e.qty)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: e.cedear ? ars(e.price, 2) : usd(e.price, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: e.cedear ? ars(e.qty * e.price) : usd(e.qty * e.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onDrop(e.id),
								className: "grid size-11 place-items-center text-ink-faint hover:text-down",
								"aria-label": "Borrar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						})
					]
				}, e.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 8,
					className: "px-5 py-8 text-sm text-ink-faint",
					children: "Sin movimientos."
				}) }) })]
			})
		})]
	});
}
function Ficha({ ticker, pos, pack, onClose }) {
	(0, import_react.useEffect)(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);
	const c = pack?.company;
	const rows = pos ? [
		{
			l: "Nominales",
			v: qtyFmt(pos.qty)
		},
		...pos.cedear && pos.qtyCedear != null ? [{
			l: "Papeles CEDEAR",
			v: qtyFmt(pos.qtyCedear)
		}] : [],
		{
			l: "PPC",
			v: usd(pos.avgCost, 2)
		},
		{
			l: "Invertido",
			v: usd(pos.costValue)
		},
		{
			l: "Valor mdo.",
			v: usd(pos.marketValue)
		},
		{
			l: "No realizado",
			v: usd(pos.unrealized)
		},
		{
			l: "% cartera",
			v: pct(pos.weight, 1)
		},
		{
			l: "TNA",
			v: pct(pos.tna)
		},
		{
			l: "Días",
			v: String(pos.days)
		}
	] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sheet-root",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Cerrar ficha",
			className: "absolute inset-0 bg-forest/50",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "asset-sheet-title",
			className: "sheet-panel max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] font-medium tracking-[0.18em] text-forest uppercase",
						children: [ticker, pos?.cedear ? " · CEDEAR" : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "asset-sheet-title",
						className: "mt-1 font-display text-2xl leading-tight",
						children: c?.name ?? ticker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-ink-soft",
						children: c ? `${c.short} · ${c.exchange || "Yahoo"}` : "Sin ficha fundamental completa"
					}),
					c ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-display text-xl tabular",
						children: [
							usd(c.price, 2),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-sm", signedClass(c.ret1d)),
								children: pct(c.ret1d)
							})
						]
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "grid size-11 place-items-center rounded-md text-ink-soft hover:bg-paper-2",
					"aria-label": "Cerrar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 py-5",
				children: rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid grid-cols-2 gap-3",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[11px] text-ink-soft uppercase",
						children: r.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 tabular text-sm font-medium",
						children: r.v
					})] }, r.l))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-ink-soft",
					children: [
						"Sin posición abierta en ",
						ticker,
						"."
					]
				})
			})]
		})]
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarteraDesk, {}) });
}
//#endregion
export { Page as component };
