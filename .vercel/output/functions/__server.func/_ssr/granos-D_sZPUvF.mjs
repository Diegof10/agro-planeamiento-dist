import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, l as require_react_dom } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as FileText, p as ExternalLink, s as RefreshCw, t as X } from "../_libs/lucide-react.mjs";
import { r as cn } from "./site-nav-BQjdxVH2.mjs";
import { a as PageMain, i as PageHeader, r as Page } from "./page-C_mfpDjx.mjs";
import { r as FIRM, t as DISCLAIMER_GRANOS } from "./brand-CbU4ly2d.mjs";
import { a as pct, i as num, u as usdT } from "./format-BTGgZiZN.mjs";
import { n as FuentesSemaforo, r as fuentesOk } from "./fuentes-Bi8s7P98.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/granos-D_sZPUvF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var USDA_URL = "https://www.usda.gov/oce/commodity/wasde";
var EMPTY_USDA = {
	wasde: {
		kind: "wasde",
		title: "WASDE · Oferta y demanda mundial",
		published: null,
		period: null,
		headline: "Sin lectura del WASDE en esta tanda.",
		bullets: [],
		balances: [],
		sourceUrl: USDA_URL,
		pending: true
	},
	progress: {
		kind: "progress",
		title: "Crop Progress · Condición y avance",
		published: null,
		period: null,
		headline: "Sin lectura del Crop Progress en esta tanda.",
		bullets: [],
		balances: [],
		sourceUrl: "https://esmis.nal.usda.gov/publication/crop-progress",
		pending: true
	},
	exports: {
		kind: "exports",
		title: "Exportable WASDE",
		published: null,
		period: null,
		headline: "Saldo exportable según el último WASDE.",
		bullets: [],
		balances: [],
		sourceUrl: "https://apps.fas.usda.gov/export-sales/esrd1.html",
		pending: true
	}
};
function Dash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-ink-faint",
		children: "—"
	});
}
function Cell({ n, kind = "usd" }) {
	if (n == null || !Number.isFinite(n)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dash, {});
	if (kind === "pct") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: pct(n, 1) });
	if (kind === "mt") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: num(n, 1) });
	if (kind === "mha") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: num(n, 2) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: usdT(n) });
}
function Source({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-3 text-xs text-ink-faint",
		children: [
			"Datos extraídos de ",
			name,
			" · delay"
		]
	});
}
function Card({ title, kicker, children, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("desk-card", wide && "md:col-span-2"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
				children: kicker ?? "Granos"
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
function chClass(n) {
	if (n == null || !Number.isFinite(n) || n === 0) return "text-ink-soft";
	return n > 0 ? "text-up" : "text-down";
}
function chTxt(n) {
	if (n == null || !Number.isFinite(n) || n === 0) return null;
	return pct(n, Math.abs(n) < .01 ? 2 : 1);
}
var KINDS = [
	{
		id: "wasde",
		label: "WASDE"
	},
	{
		id: "progress",
		label: "Progreso"
	},
	{
		id: "exports",
		label: "Export sales"
	}
];
function UsdaSheet({ kind, reports, onKind, onClose }) {
	const a = reports[kind];
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
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sheet-root",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Cerrar informe",
			className: "absolute inset-0 bg-forest/50",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "usda-sheet-title",
			className: "sheet-panel max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium tracking-[0.18em] text-forest uppercase",
								children: "USDA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "usda-sheet-title",
								className: "mt-1 font-display text-2xl leading-tight",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-ink-soft",
								children: [
									a.published ? `Publicado ${a.published}` : "Datos extraídos de USDA",
									a.period ? ` · ${a.period}` : "",
									" · delay"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "grid size-11 shrink-0 place-items-center rounded-md text-ink-soft hover:bg-paper-2 hover:text-ink",
						"aria-label": "Cerrar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto border-b border-line px-5 py-2",
					children: KINDS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onKind(t.id),
						"aria-pressed": kind === t.id,
						className: cn("inline-flex h-11 shrink-0 items-center rounded-md px-3 text-sm", kind === t.id ? "bg-forest text-cream" : "text-ink-soft hover:bg-paper-2 hover:text-ink"),
						children: t.label
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-y-auto px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 text-xs text-ink-faint",
							children: "Datos extraídos de USDA · delay"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-ink",
							children: a.headline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: a.bullets.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 text-sm leading-relaxed text-ink-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-forest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e })]
							}, e))
						}),
						a.balances.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[560px] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Cultivo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Prod. EE.UU."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Rinde"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Stocks EE.UU."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Prod. mundo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Stocks mundo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 text-right",
											children: "Δ stocks"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: a.balances.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line/70 last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 font-medium",
											children: b.grain
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: num(b.usProduction, 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: num(b.usYield, 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: num(b.usStocks, 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: num(b.worldProduction, 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: num(b.worldStocks, 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: cn("py-2 text-right tabular", chClass(b.stocksDelta)),
											children: b.stocksDelta == null ? "—" : pct(b.stocksDelta, 2)
										})
									]
								}, b.grain)) })]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: a.sourceUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-6 inline-flex h-11 items-center gap-2 text-sm text-forest",
							children: ["Original USDA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
						})
					]
				})
			]
		})]
	}), document.body);
}
function GranosDesk() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [kind, setKind] = (0, import_react.useState)("wasde");
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [spin, setSpin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		setLoading(true);
		(async () => {
			try {
				const r = await fetch("/api/granos", { signal: ac.signal });
				if (!r.ok) throw new Error("fail");
				const j = await r.json();
				if (!ac.signal.aborted) setData(j);
			} catch (e) {
				if (e instanceof DOMException && e.name === "AbortError") return;
			} finally {
				if (!ac.signal.aborted) setLoading(false);
			}
		})();
		return () => ac.abort();
	}, [tick]);
	function refresh() {
		setSpin(true);
		setTick((e) => e + 1);
		window.setTimeout(() => setSpin(false), 1400);
	}
	function openUsda(k = "wasde") {
		setKind(k);
		setOpen(true);
	}
	const sojaC = data?.cbot.find((e) => e.id === "ZS=F");
	const maizC = data?.cbot.find((e) => e.id === "ZC=F");
	const trigoC = data?.cbot.find((e) => e.id === "ZW=F");
	const sojaF = data?.fas.find((e) => e.grain === "soja");
	const piz = data?.local.find((e) => e.plaza === "Rosario")?.soja ?? null;
	const fobUp = data?.fob.find((e) => e.id === "upriver-soja")?.value ?? sojaF?.fob ?? null;
	const tiles = [
		{
			label: "Soja CBOT",
			hint: sojaC?.hint ?? "US$/t",
			value: sojaC?.value ?? null,
			change: sojaC?.change ?? null
		},
		{
			label: "Maíz CBOT",
			hint: maizC?.hint ?? "US$/t",
			value: maizC?.value ?? null,
			change: maizC?.change ?? null
		},
		{
			label: "Trigo CBOT",
			hint: trigoC?.hint ?? "US$/t",
			value: trigoC?.value ?? null,
			change: trigoC?.change ?? null
		},
		{
			label: "Soja FAS",
			hint: "MAGYP",
			value: sojaF?.fas ?? null,
			change: null
		},
		{
			label: "Pizarra Rosario",
			hint: "Soja CAC",
			value: piz,
			change: null
		},
		{
			label: "FOB Up River",
			hint: "Soja MAGYP",
			value: fobUp,
			change: null
		}
	];
	const usda = data?.usda ?? EMPTY_USDA;
	const locales = (data?.local ?? []).filter((e) => e.soja != null || e.maiz != null || e.trigo != null || e.girasol != null);
	const fas = (data?.fas ?? []).filter((e) => e.fob != null || e.fas != null);
	const fob = (data?.fob ?? []).filter((e) => e.value != null);
	const camp = (data?.campaign ?? []).filter((e) => e.production != null || e.areaPlanted != null || e.stocks != null);
	const matba = data?.matba ?? [];
	const ready = !usda.wasde.pending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		nav: "granos",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMain, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${FIRM} · Granos`,
				title: "Mercado de granos",
				lead: "Pizarra, FAS, futuros Rosario y Chicago, USDA.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: refresh,
					className: "inline-flex h-11 items-center gap-2 rounded-md px-3 text-xs text-ink-soft hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", spin && "animate-spin") }), "Actualizar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => openUsda("wasde"),
					className: "inline-flex h-11 items-center gap-2 rounded-md bg-forest px-4 text-sm font-medium text-cream hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Informe USDA"]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-ink-faint",
					children: ["Datos extraídos de CAC, MAGYP, A3 MAE, CBOT y USDA · delay", data?.fxBna ? ` · BNA billete ${num(data.fxBna, 0)}` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FuentesSemaforo, { ok: fuentesOk((data?.sources ?? []).filter((s) => s.id === "cbot" || s.id === "fx")) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "kpi-strip",
					children: tiles.map((e) => {
						const d = chTxt(e.change);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
								children: e.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-lg tabular leading-none text-ink sm:text-xl",
								children: e.value == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-ink-faint",
									children: "—"
								}) : usdT(e.value)
							}),
							d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-1 text-[11px] tabular", chClass(e.change)),
								children: d
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-ink-faint",
								children: e.hint
							})
						] }, e.label);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-4 rounded-xl bg-forest p-5 text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium tracking-[0.18em] text-cream/70 uppercase",
								children: "USDA · WASDE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-2xl leading-tight",
								children: "Último informe USDA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-cream/80",
								children: ready ? usda.wasde.headline : "Resumen en castellano del WASDE y el Crop Progress."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openUsda("wasde"),
							className: "inline-flex h-11 items-center gap-2 rounded-md bg-cream px-4 text-sm font-medium text-forest hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Ver resumen"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: USDA_URL,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm text-cream/80 hover:text-cream",
							children: ["Original USDA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
						})]
					})]
				})
			}),
			loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-2",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-xl bg-cream hair" }, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid min-w-0 gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "Precios locales",
						kicker: "Pizarra y cooperativas · US$/t",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Source, { name: "CAC Rosario y AFA Diario San Martín" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[480px] text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3",
												children: "Plaza"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 text-right",
												children: "Soja"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 text-right",
												children: "Maíz"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 text-right",
												children: "Trigo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 text-right",
												children: "Girasol"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: locales.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-line/70 last:border-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-2 pr-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: e.plaza
												}), e.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-1 text-[11px] text-ink-faint",
													children: e.hint
												}) : null]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-right tabular",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.soja })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-right tabular",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.maiz })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-right tabular",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.trigo })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 text-right tabular",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.girasol })
											})
										]
									}, e.plaza)) })]
								})
							}),
							data?.fxBna ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-ink-soft tabular",
								children: [
									"Tipo de cambio BNA billete vendedor $ ",
									data.fxBna.toLocaleString("es-AR", { maximumFractionDigits: 2 }),
									" / US$ · US$/t = pesos ÷ BNA"
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "FAS teórico",
						kicker: "US$/t",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Source, { name: "MAGYP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[520px] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Cultivo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "FOB"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Desc."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "FOB−FAS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "FAS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 text-right",
											children: "Pizarra"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: fas.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line/70 last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 font-medium",
											children: e.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.fob })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												n: e.dexPct,
												kind: "pct"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.costs })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.fas })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.pizarra })
										})
									]
								}, e.grain)) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "Futuros Chicago",
						kicker: "US$/t",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Source, { name: "CBOT" }), data?.cbot.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: data.cbot.map((e) => {
							const d = chTxt(e.change);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3 border-b border-line/70 py-1.5 last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
									className: "text-xs text-ink-soft",
									children: [e.label, e.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-[10px] text-ink-faint",
										children: e.hint
									}) : null]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular text-sm font-medium",
										children: e.value == null ? "—" : usdT(e.value)
									}), d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("ml-2 tabular text-[11px]", chClass(e.change)),
										children: d
									}) : null]
								})]
							}, e.id);
						}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-3 text-xs text-ink-faint",
							children: "Datos extraídos de CBOT · delay"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "Futuros Matba Rofex",
						kicker: data?.matbaAsOf ? `US$/t · ${data.matbaAsOf}` : "US$/t",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Source, { name: "A3 MAE" }), matba.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[420px] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Cultivo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Mes"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Precio"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Δ"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 text-right",
											children: "IA"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: matba.map((e) => {
									const d = chTxt(e.change);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-line/70 last:border-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 font-medium",
												children: e.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-ink-soft",
												children: e.contract
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-right tabular",
												children: e.value == null ? "—" : usdT(e.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: cn("py-2 pr-3 text-right tabular text-[11px]", d ? chClass(e.change) : "text-ink-faint"),
												children: d ?? "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 text-right tabular text-ink-soft",
												children: e.openInterest == null ? "—" : num(e.openInterest, 0)
											})
										]
									}, e.id);
								}) })]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-3 text-xs text-ink-faint",
							children: "Datos extraídos de A3 MAE · delay"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "FOB y primas",
						kicker: "Up River · vs CBOT",
						wide: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Source, { name: "MAGYP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[480px] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Origen"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Cultivo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "FOB"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 text-right",
											children: "vs CBOT"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: fob.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line/70 last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-ink-soft",
											children: e.origin
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 font-medium",
											children: e.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { n: e.value })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: cn("py-2 text-right tabular", chClass(e.vsCbot)),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												n: e.vsCbot,
												kind: "pct"
											})
										})
									]
								}, e.id)) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: "Campaña Argentina",
						kicker: "mill. t",
						wide: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Source, { name: "USDA WASDE y MAGYP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[480px] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Cultivo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3",
											children: "Campaña"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Prod."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 pr-3 text-right",
											children: "Área M ha"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2 text-right",
											children: "Stocks"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: camp.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line/70 last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 font-medium",
											children: e.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-ink-soft",
											children: e.campaign
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												n: e.production,
												kind: "mt"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												n: e.areaPlanted,
												kind: "mha"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-right tabular",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												n: e.stocks,
												kind: "mt"
											})
										})
									]
								}, e.grain)) })]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-12 border-t border-line pt-6 text-[11px] leading-relaxed text-ink-faint",
				children: DISCLAIMER_GRANOS
			})
		] }), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsdaSheet, {
			kind,
			reports: usda,
			onKind: setKind,
			onClose: () => setOpen(false)
		}) : null]
	});
}
var SplitComponent = GranosDesk;
//#endregion
export { SplitComponent as component };
