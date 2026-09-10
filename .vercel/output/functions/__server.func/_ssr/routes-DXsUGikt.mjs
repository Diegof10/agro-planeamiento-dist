import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as RefreshCw } from "../_libs/lucide-react.mjs";
import { r as cn } from "./site-nav-Co5vIArY.mjs";
import { a as PageMain, i as PageHeader, r as Page } from "./page-CoA-y-pq.mjs";
import { n as DISCLAIMER_MERCADO, r as FIRM } from "./brand-CbU4ly2d.mjs";
import { a as pct, c as usd, i as num, l as usdCompact, n as bp, o as pctPts, r as multiple, s as signedClass, t as ars, u as usdT } from "./format-BTGgZiZN.mjs";
import { n as FuentesSemaforo, r as fuentesOk } from "./fuentes-G3hs-CcR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DXsUGikt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MANAGERS = [
	{
		id: "BRK",
		label: "Warren Buffett — Berkshire"
	},
	{
		id: "HC",
		label: "Li Lu — Himalaya"
	},
	{
		id: "psc",
		label: "Bill Ackman — Pershing Square"
	},
	{
		id: "AM",
		label: "David Tepper — Appaloosa"
	},
	{
		id: "ic",
		label: "Carl Icahn"
	},
	{
		id: "AC",
		label: "Chuck Akre"
	},
	{
		id: "GFT",
		label: "Gates Foundation"
	},
	{
		id: "HA",
		label: "Bill Nygren — Oakmark"
	},
	{
		id: "FS",
		label: "Terry Smith — Fundsmith"
	},
	{
		id: "FFH",
		label: "Prem Watsa — Fairfax"
	},
	{
		id: "BAUPOST",
		label: "Seth Klarman — Baupost"
	},
	{
		id: "PI",
		label: "Mohnish Pabrai"
	},
	{
		id: "MKL",
		label: "Thomas Gayner — Markel"
	},
	{
		id: "YAM",
		label: "Yacktman"
	},
	{
		id: "SAM",
		label: "Michael Burry — Scion"
	},
	{
		id: "GLRE",
		label: "David Einhorn — Greenlight"
	},
	{
		id: "tci",
		label: "Chris Hohn — TCI"
	},
	{
		id: "tp",
		label: "Daniel Loeb — Third Point"
	},
	{
		id: "TGM",
		label: "Chase Coleman — Tiger"
	},
	{
		id: "LPC",
		label: "Stephen Mandel — Lone Pine"
	}
];
function fmt(e) {
	const t = e.value;
	if (t == null) return "—";
	switch (e.unit) {
		case "usd": return Math.abs(t) >= 1e3 ? usdCompact(t) : usd(t, 2);
		case "usdt": return usdT(t);
		case "ars": return ars(t, t >= 100 ? 0 : 2);
		case "pct100": return pctPts(t, t >= 10 ? 1 : 2);
		case "bp": return bp(t);
		case "ratio": return multiple(t, 1);
		case "fx": return num(t, t >= 20 ? 2 : 4);
		default: return num(t, t >= 100 ? 0 : 2);
	}
}
function delta(e) {
	if (e.change == null || !Number.isFinite(e.change)) return null;
	if (e.unit === "pct100") {
		const t = e.value == null ? null : e.value / (1 + e.change);
		if (t == null) return pct(e.change, Math.abs(e.change) < .01 ? 2 : 1);
		const n = e.value - t;
		if (Math.abs(n) < .005) return pct(e.change, Math.abs(e.change) < .01 ? 2 : 1);
		return `${n > 0 ? "+" : "−"}${Math.abs(n).toFixed(2)} pp`;
	}
	if (e.unit === "ratio") return multiple(e.change, 2);
	return pct(e.change, Math.abs(e.change) < .01 ? 2 : 1);
}
function stale(asOf) {
	if (!asOf) return null;
	const t = Date.parse(asOf.length === 10 ? `${asOf}T00:00:00Z` : asOf);
	if (!Number.isFinite(t) || Date.now() - t < 10368e5) return null;
	return asOf.slice(0, 10);
}
function QuoteList({ items }) {
	const t = items.filter((e) => e.value != null);
	if (!t.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-3 text-xs text-ink-faint",
		children: "Sin lectura en esta tanda."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: t.map((e) => {
		const d = delta(e);
		const n = stale(e.asOf);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3 border-b border-line/70 py-1.5 last:border-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
				className: "min-w-0 text-xs text-ink-soft",
				children: [
					e.label,
					e.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-[10px] text-ink-faint",
						children: e.hint
					}) : null,
					n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-[10px] text-ink-faint",
						children: n
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
				className: "shrink-0 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular text-sm font-medium text-ink",
					children: fmt(e)
				}), d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("ml-2 tabular text-[11px]", signedClass(e.change)),
					children: d
				}) : null]
			})]
		}, e.id);
	}) });
}
function DolarTable({ items }) {
	const t = items.filter((e) => e.unit === "ars" && e.value != null);
	const oficial = t.find((e) => e.id === "ars-oficial")?.value ?? null;
	const mep = t.find((e) => e.id === "ars-bolsa")?.value ?? null;
	const ccl = t.find((e) => e.id === "ars-contadoconliqui")?.value ?? null;
	if (!t.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-3 text-xs text-ink-faint",
		children: "Sin lectura en esta tanda."
	});
	const vsOf = (id, v) => id === "ars-oficial" || oficial == null || oficial === 0 ? null : v / oficial - 1;
	const spread = mep != null && ccl != null ? ccl - mep : null;
	const spreadPct = mep != null && ccl != null && mep !== 0 ? ccl / mep - 1 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [mep != null && ccl != null && spread != null && spreadPct != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 grid grid-cols-3 gap-px overflow-hidden rounded-lg bg-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-cream px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: "MEP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-lg tabular leading-none",
					children: ars(mep, 0)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-cream px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: "CCL"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-lg tabular leading-none",
					children: ars(ccl, 0)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-paper-2 px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
						children: "CCL–MEP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 font-display text-lg tabular leading-none", signedClass(spreadPct)),
						children: pct(spreadPct, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] tabular text-ink-faint",
						children: ars(spread, 0)
					})
				]
			})
		]
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2",
						children: "Casa"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2 text-right",
						children: "Precio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2 text-right",
						children: "Δ día"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 text-right",
						children: "vs Of."
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: t.map((e) => {
				const d = delta(e);
				const vso = e.value == null ? null : vsOf(e.id, e.value);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-2 font-medium",
							children: e.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-2 text-right tabular",
							children: fmt(e)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("py-2 pr-2 text-right tabular text-[11px]", d ? signedClass(e.change) : "text-ink-faint"),
							children: d ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("py-2 text-right tabular text-[11px]", vso == null ? "text-ink-faint" : signedClass(vso)),
							children: vso == null ? "—" : pct(vso, 1)
						})
					]
				}, e.id);
			}) })]
		})
	})] });
}
function Card({ title, kicker, children, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("desk-card", wide && "md:col-span-2"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
				children: kicker ?? "Mercado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-lg text-ink",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children
			})
		]
	});
}
function pick(items, id) {
	return items.find((e) => e.id === id && e.value != null) ?? null;
}
function Strip({ data }) {
	const t = [
		pick(data.fxArs, "ars-blue"),
		pick(data.fxArs, "ars-contadoconliqui"),
		pick(data.macroAr, "riesgo-pais"),
		pick(data.indices, "^GSPC"),
		pick(data.agro, "ZC=F"),
		pick(data.crypto, "BTC-USD")
	].filter((e) => !!e);
	if (!t.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "kpi-strip mb-4",
		children: t.map((e) => {
			const d = delta(e);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: e.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-lg tabular leading-none text-ink sm:text-xl",
					children: fmt(e)
				}),
				d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 text-[11px] tabular", signedClass(e.change)),
					children: d
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-ink-faint",
					children: e.hint ?? e.source
				})
			] }, e.id);
		})
	});
}
function Super({ seed, tickers }) {
	const [id, setId] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "BRK";
		const saved = window.localStorage.getItem("dhf-super-m");
		return MANAGERS.some((t) => t.id === saved) ? saved : "BRK";
	});
	const [books, setBooks] = (0, import_react.useState)(() => {
		const t = {};
		for (const n of seed) if (n.id) t[n.id] = n;
		if (seed[0] && !seed[0].id) t.BRK = {
			...seed[0],
			id: "BRK"
		};
		return t;
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setBooks((prev) => {
			const n = { ...prev };
			for (const t of seed) if (t.id) n[t.id] = t;
			return n;
		});
	}, [seed]);
	(0, import_react.useEffect)(() => {
		if (books[id]) return;
		const ac = new AbortController();
		setLoading(true);
		const q = new URLSearchParams({ m: id });
		if (tickers.length) q.set("tickers", tickers.join(","));
		(async () => {
			try {
				const r = await fetch(`/api/dataroma?${q}`, { signal: ac.signal });
				if (!r.ok) throw new Error("fail");
				const j = await r.json();
				if (ac.signal.aborted) return;
				setBooks((e) => ({
					...e,
					[id]: j
				}));
			} catch (e) {
				if (e instanceof DOMException && e.name === "AbortError") return;
			} finally {
				if (!ac.signal.aborted) setLoading(false);
			}
		})();
		return () => ac.abort();
	}, [
		id,
		tickers,
		books
	]);
	function choose(v) {
		setId(v);
		try {
			window.localStorage.setItem("dhf-super-m", v);
		} catch {}
	}
	const u = books[id];
	const d = MANAGERS.find((e) => e.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: "Superinversores",
		kicker: "Dataroma",
		wide: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value: id,
			onChange: (e) => choose(e.target.value),
			"aria-label": "Elegir cartera",
			className: "mb-3 h-11 w-full max-w-md cursor-pointer rounded-md bg-paper-2 px-3 text-sm text-ink hair",
			children: MANAGERS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: e.id,
				children: e.label
			}, e.id))
		}), u ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-xs text-ink-soft",
			children: [
				u.manager,
				u.period ? ` · ${u.period}` : "",
				u.date ? ` · corte ${u.date}` : ""
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[420px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3",
							children: "Ticker"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3",
							children: "Nombre"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 text-right",
							children: "Peso"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right",
							children: "Actividad"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: u.holdings.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: cn("border-b border-line/70 last:border-0", e.inBook && "bg-paper-2/60"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2 pr-3 font-medium",
							children: [e.symbol, e.inBook ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-[10px] tracking-wide text-forest uppercase",
								children: "en cartera"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-ink-soft",
							children: e.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right tabular",
							children: pctPts(e.weight, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 text-right text-xs text-ink-soft",
							children: e.activity || "—"
						})
					]
				}, e.symbol)) })]
			})
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-3 text-xs text-ink-faint",
			children: loading ? `Cargando ${d?.label ?? id}…` : "Sin lectura en esta tanda."
		})]
	});
}
function Board({ tickers, refreshKey }) {
	const [data, setData] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		setLoading(true);
		const q = tickers.length ? `?tickers=${encodeURIComponent(tickers.join(","))}` : "";
		(async () => {
			try {
				const r = await fetch(`/api/monitor${q}`, { signal: ac.signal });
				if (!r.ok) throw new Error("fail");
				const j = await r.json();
				if (ac.signal.aborted) return;
				setData(j);
				setErr(null);
			} catch (e) {
				if (ac.signal.aborted || e instanceof DOMException && e.name === "AbortError") return;
				setErr("No se pudo armar el monitor.");
			} finally {
				if (!ac.signal.aborted) setLoading(false);
			}
		})();
		return () => ac.abort();
	}, [tickers.join(","), refreshKey]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-ink-soft",
					children: "Agro en US$/t (solo CBOT, ¢/bu convertido). Δ vs el cierre previo de Chicago."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FuentesSemaforo, { ok: fuentesOk(data?.sources) })]
			}),
			loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 card-grid",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-xl bg-cream hair" }, i))
			}) : null,
			err && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-xl bg-cream px-4 py-3 text-sm text-down hair",
				children: err
			}) : null,
			data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strip, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Dólar Argentina",
							kicker: "DolarAPI · Bluelytics",
							wide: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DolarTable, { items: data.fxArs })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Macro local",
							kicker: "BCRA · ArgentinaDatos · Data912",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteList, { items: data.macroAr })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "BYMA",
							kicker: "Data912 · acciones",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteList, { items: data.byma ?? [] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Índices",
							kicker: "Yahoo Finance",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteList, { items: data.indices })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Tasas y FX",
							kicker: "Yahoo Finance",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteList, { items: [...data.rates, ...data.fx] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Energía y metales",
							kicker: "Yahoo Finance",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteList, { items: [...data.energy, ...data.metals] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Agro",
							kicker: "CBOT US$/t",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteList, { items: data.agro })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: "Cripto",
							kicker: "Yahoo · Coinlore",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteList, { items: data.crypto })
						}),
						data.superinvestors.length || MANAGERS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Super, {
							seed: data.superinvestors,
							tickers
						}) : null
					]
				})]
			}) : null
		]
	});
}
function MercadoDesk() {
	const [key, setKey] = (0, import_react.useState)(0);
	const [spin, setSpin] = (0, import_react.useState)(false);
	function refresh() {
		setSpin(true);
		setKey((e) => e + 1);
		window.setTimeout(() => setSpin(false), 1200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		nav: "home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMain, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${FIRM} · Mercado`,
				title: "Tablero macro",
				lead: "Índices, tasas, energía, metales, agro CBOT, FX, cripto y Argentina. El maíz y el resto de granos van en US$/t, convertidos desde ¢/bushel.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: refresh,
					className: "inline-flex h-11 items-center gap-2 rounded-md px-3 text-xs text-ink-soft hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", spin && "animate-spin") }), "Actualizar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cartera",
					className: "inline-flex h-11 items-center rounded-md bg-forest px-4 text-sm font-medium text-cream hover:opacity-90",
					children: "Armar cartera"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {
				tickers: [],
				refreshKey: key
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-12 border-t border-line pt-6 text-[11px] leading-relaxed text-ink-faint",
				children: DISCLAIMER_MERCADO
			})
		] })
	});
}
var SplitComponent = MercadoDesk;
//#endregion
export { SplitComponent as component };
