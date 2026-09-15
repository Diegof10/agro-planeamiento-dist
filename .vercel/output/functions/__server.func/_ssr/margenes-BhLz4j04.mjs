import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Settings } from "../_libs/lucide-react.mjs";
import { r as cn } from "./site-nav-BghOkepp.mjs";
import { t as RequireAuth } from "./require-auth-5tE1T_Cn.mjs";
import { a as PageMain, i as PageHeader, r as Page$1 } from "./page-ZAkukby_.mjs";
import { c as usd, i as num, t as ars } from "./format-BTGgZiZN.mjs";
import { c as Cell, l as ResponsiveContainer, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { A as onCatalogChange, C as loadCatalog, D as loadOpenEscenario, M as patchEscenario, N as patchOpenCrop, P as pizarraQqFromLocal, S as lineUsdHa, _ as ensureEstudioBridge, a as FX_BNA_FALLBACK, c as RINDE_DEFAULT, f as calcularMargen, k as normalizeLine, l as RULES, o as GROUPS, p as doseLabel, r as DEFAULT_CATALOG, s as PRECIO_FALLBACK_QQ, t as CROPS, v as fleteCortoArsT, w as loadClientes } from "./estudio-BLT9hSJC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/margenes-BhLz4j04.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INP = "h-11 w-full rounded-md bg-paper-2 px-3 text-sm tabular hair";
var SLICES = [
	{
		key: "flete",
		label: "Flete",
		fill: "var(--color-t6)"
	},
	{
		key: "labores",
		label: "Labores",
		fill: "var(--color-forest-mid)"
	},
	{
		key: "fertilizantes",
		label: "Fertilizantes",
		fill: "var(--color-t4)"
	},
	{
		key: "semilla",
		label: "Semilla",
		fill: "var(--color-up)"
	},
	{
		key: "agroquimicos",
		label: "Agroquímicos",
		fill: "var(--color-t9)"
	},
	{
		key: "coadyuvantes",
		label: "Coadyuvantes",
		fill: "var(--color-t8)"
	},
	{
		key: "seguro",
		label: "Seguro",
		fill: "var(--color-forest-mid)"
	},
	{
		key: "gastos",
		label: "Gastos",
		fill: "var(--color-forest)"
	}
];
function pctOf(part, total) {
	return `${(total > 0 ? part / total * 100 : 0).toLocaleString("es-AR", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	})}%`;
}
function blank(crop, precio) {
	return {
		precioQq: precio,
		rinde: RINDE_DEFAULT[crop],
		km: 15,
		alquilerQq: 0,
		precioDirty: false
	};
}
function Field({ label, unit, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-1 flex items-baseline justify-between gap-2 text-xs text-ink-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-ink-faint",
				children: unit
			}) : null]
		}), children]
	});
}
function Num({ value, onChange, label, step = "any", min = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "number",
		inputMode: "decimal",
		"aria-label": label,
		min,
		step,
		value: Number.isFinite(value) ? value : "",
		onChange: (e) => {
			const n = Number(e.target.value);
			if (Number.isFinite(n)) onChange(n);
		},
		className: INP
	});
}
function Card({ title, kicker, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "desk-card",
		children: [
			kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
				children: kicker
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: cn("font-display text-lg text-ink", kicker && "mt-1"),
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children
			})
		]
	});
}
function Row({ label, hint, value, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-b border-line/70 py-1.5 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
			className: "min-w-0 text-xs text-ink-soft",
			children: [label, hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-[10px] text-ink-faint",
				children: hint
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("shrink-0 tabular text-sm", strong && "font-medium"),
			children: value
		})]
	});
}
function MargenesDesk() {
	const [crop, setCrop] = (0, import_react.useState)("soja");
	const [forms, setForms] = (0, import_react.useState)({
		maiz: blank("maiz", PRECIO_FALLBACK_QQ.maiz),
		soja: blank("soja", PRECIO_FALLBACK_QQ.soja),
		trigo: blank("trigo", PRECIO_FALLBACK_QQ.trigo)
	});
	const [fxBna, setFxBna] = (0, import_react.useState)(FX_BNA_FALLBACK);
	const [catalog, setCatalog] = (0, import_react.useState)(DEFAULT_CATALOG);
	const [pizarraOk, setPizarraOk] = (0, import_react.useState)(false);
	const [openLabel, setOpenLabel] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		ensureEstudioBridge();
		const escenario = loadOpenEscenario();
		if (escenario) {
			const cliente = loadClientes().find((c) => c.id === escenario.clienteId);
			setOpenLabel(`${escenario.nombre} · ${cliente?.nombre ?? "cliente"}`);
			setCatalog(escenario.catalog);
			setForms({
				maiz: {
					precioQq: escenario.crops.maiz.precioQq,
					rinde: escenario.crops.maiz.rinde,
					km: escenario.crops.maiz.km,
					alquilerQq: escenario.crops.maiz.alquilerQq,
					precioDirty: !!escenario.crops.maiz.precioManual
				},
				soja: {
					precioQq: escenario.crops.soja.precioQq,
					rinde: escenario.crops.soja.rinde,
					km: escenario.crops.soja.km,
					alquilerQq: escenario.crops.soja.alquilerQq,
					precioDirty: !!escenario.crops.soja.precioManual
				},
				trigo: {
					precioQq: escenario.crops.trigo.precioQq,
					rinde: escenario.crops.trigo.rinde,
					km: escenario.crops.trigo.km,
					alquilerQq: escenario.crops.trigo.alquilerQq,
					precioDirty: !!escenario.crops.trigo.precioManual
				}
			});
			if (escenario.fxBna > 0) setFxBna(escenario.fxBna);
		} else setCatalog(loadCatalog());
		return onCatalogChange(() => setCatalog(loadCatalog()));
	}, []);
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		(async () => {
			try {
				const r = await fetch("/api/granos", { signal: ac.signal });
				if (!r.ok) return;
				const j = await r.json();
				if (ac.signal.aborted) return;
				if (j.fxBna && j.fxBna > 0) setFxBna(j.fxBna);
				const piz = pizarraQqFromLocal(j.local ?? []);
				if (piz) {
					setForms((prev) => ({
						maiz: prev.maiz.precioDirty || piz.maiz == null ? prev.maiz : {
							...prev.maiz,
							precioQq: piz.maiz
						},
						soja: prev.soja.precioDirty || piz.soja == null ? prev.soja : {
							...prev.soja,
							precioQq: piz.soja
						},
						trigo: prev.trigo.precioDirty || piz.trigo == null ? prev.trigo : {
							...prev.trigo,
							precioQq: piz.trigo
						}
					}));
					setPizarraOk(true);
				}
				const escenario = loadOpenEscenario();
				if (escenario && !escenario.snapshotAt) {
					const crops = { ...escenario.crops };
					if (piz) [
						"maiz",
						"soja",
						"trigo"
					].forEach((k) => {
						const n = piz[k];
						if (n && !crops[k].precioManual) crops[k] = {
							...crops[k],
							precioQq: n
						};
					});
					patchEscenario(escenario.id, {
						crops,
						fxBna: j.fxBna && j.fxBna > 0 ? j.fxBna : escenario.fxBna
					});
				}
			} catch {}
		})();
		return () => ac.abort();
	}, []);
	const form = forms[crop];
	function patch(p) {
		setForms((prev) => ({
			...prev,
			[crop]: {
				...prev[crop],
				...p
			}
		}));
		if (loadOpenEscenario()) {
			const next = {
				...form,
				...p
			};
			patchOpenCrop(crop, {
				precioQq: next.precioQq,
				rinde: next.rinde,
				km: next.km,
				alquilerQq: next.alquilerQq,
				...p.precioQq != null || p.precioDirty ? { precioManual: true } : {}
			});
		}
	}
	const res = (0, import_react.useMemo)(() => calcularMargen({
		crop,
		precioQq: form.precioQq,
		rinde: form.rinde,
		km: form.km,
		alquilerQq: form.alquilerQq,
		fxBna,
		catalog
	}), [
		crop,
		form,
		fxBna,
		catalog
	]);
	const label = CROPS.find((c) => c.id === crop)?.label ?? crop;
	const lines = catalog.lines.filter((l) => l.crop === crop).map(normalizeLine);
	const usdOf = (l) => lineUsdHa(l, form.precioQq, form.rinde);
	const pie = SLICES.map((s) => ({
		name: s.label,
		value: Math.max(0, res?.groups[s.key] ?? 0),
		fill: s.fill
	})).filter((s) => s.value > .01);
	const pieTot = pie.reduce((a, b) => a + b.value, 0);
	const corto = fleteCortoArsT(form.km, catalog.freight);
	const rules = RULES[crop];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page$1, {
		nav: "margenes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMain, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Agro Planeamiento · Márgenes",
				title: "Márgenes de cultivo",
				lead: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Costo y margen bruto por hectárea. Precio de pizarra Rosario CAC, editable.", openLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-forest",
					children: [
						"Escenario abierto: ",
						openLabel,
						".",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/clientes",
							className: "underline-offset-2 hover:underline",
							children: "Volver a clientes"
						})
					]
				}) : null] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-3 gap-1.5",
				children: CROPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setCrop(c.id),
					className: cn("h-12 rounded-md font-display text-base sm:text-lg", crop === c.id ? "bg-forest text-cream" : "text-ink hair hover:bg-paper-2"),
					children: c.label
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-w-0 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: `Datos · ${label}`,
						kicker: "Pizarra Rosario CAC",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Precio cereal",
									unit: "USD/qq",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
										label: "Precio cereal USD/qq",
										value: Math.round(form.precioQq * 100) / 100,
										step: "0.1",
										onChange: (n) => patch({
											precioQq: n,
											precioDirty: true
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Rinde",
									unit: "qq/ha",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
										label: "Rinde qq/ha",
										value: form.rinde,
										step: "1",
										onChange: (n) => patch({ rinde: n })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Flete corto",
									unit: "km",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
										label: "Km flete corto",
										value: form.km,
										step: "1",
										onChange: (n) => patch({ km: n })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Alquiler",
									unit: "qq/ha",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
										label: "Alquiler qq/ha",
										value: form.alquilerQq,
										step: "0.5",
										onChange: (n) => patch({ alquilerQq: n })
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-ink-faint",
							children: [
								form.precioDirty ? "Precio editado" : pizarraOk ? "Pizarra Rosario CAC" : "Precio de referencia",
								" · ",
								num(form.precioQq * 10, 0),
								" US$/t · flete corto ",
								ars(corto, 0),
								"/t · largo ",
								ars(catalog.fleteLargoArsT ?? 27095, 0),
								"/t · BNA billete ",
								num(fxBna, 0)
							]
						})]
					}), GROUPS.map((g) => {
						const rows = lines.filter((l) => l.group === g.id);
						if (!rows.length) return null;
						const tot = rows.reduce((a, l) => a + usdOf(l), 0);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: g.label,
							kicker: `${usd(tot, 0)}/ha`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[420px] text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3",
												children: "Insumo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 text-right",
												children: "Dosis"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 text-right",
												children: "USD unit"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 text-right",
												children: "USD/ha"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((l) => {
										const n = normalizeLine(l);
										const u = usdOf(n);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-line/70 last:border-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 pr-3",
													children: n.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 pr-3 text-right tabular text-ink-soft",
													children: doseLabel(n)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 pr-3 text-right tabular text-ink-soft",
													children: n.kind === "qty" ? usd(n.usdUnit, n.usdUnit >= 10 ? 0 : 2) : n.kind === "qqPrice" ? usd(form.precioQq, 2) : `${num(n.dose, 1)}%`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 text-right tabular font-medium",
													children: usd(u, 0)
												})
											]
										}, `${n.id}-${form.precioQq}-${form.rinde}`);
									}) })]
								})
							})
						}, g.id);
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-w-0 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: `Resultado · ${label}`,
							kicker: "USD / ha",
							children: res ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-paper-2 px-3 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
											children: "Margen bruto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: cn("mt-1 font-display text-2xl tabular leading-none", res.margenBruto >= 0 ? "text-up" : "text-down"),
											children: [
												usd(res.margenBruto, 0),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-lg text-ink-soft",
													children: pctOf(res.margenBruto, res.ingresoBruto)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px] text-ink-faint",
											children: "por hectárea · s/ ingreso bruto"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-cream px-3 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
											children: "Rinde indiferencia"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-2xl tabular leading-none",
											children: num(res.rindeIndiferencia, 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px] text-ink-faint",
											children: "qq/ha para MB = 0"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Ingreso bruto",
										hint: `${num(form.rinde, 0)} qq × ${num(form.precioQq, 1)}`,
										value: usd(res.ingresoBruto, 0),
										strong: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "(−) Comercialización",
										hint: `${num(rules.gastosPct, 1)}%`,
										value: usd(res.comercializacion, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "(−) Flete",
										hint: `${form.km} km + largo`,
										value: usd(res.fleteUsdHa, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "(−) Directos",
										value: usd(res.directos, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "(−) Alquiler",
										hint: rules.alqUsdQq ? `${num(form.alquilerQq, 1)} qq × US$ ${num(rules.alqUsdQq, 0)}` : `${num(form.alquilerQq, 1)} qq × precio × ${num(rules.alqFactor, 2)}`,
										value: usd(res.alquiler, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Margen bruto",
										hint: `${pctOf(res.margenBruto, res.ingresoBruto)} s/ ingreso`,
										value: usd(res.margenBruto, 0),
										strong: true
									})
								]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ink-faint",
								children: "Cargá precio y rinde."
							})
						}),
						res && pieTot > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							title: `Costos · ${label}`,
							kicker: "Distribución",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto h-52 w-full max-w-[240px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: pie,
										dataKey: "value",
										nameKey: "name",
										innerRadius: 52,
										outerRadius: 80,
										stroke: "var(--color-cream)",
										strokeWidth: 2,
										children: pie.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: s.fill }, s.name))
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
								className: "mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs",
								children: pie.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex min-w-0 items-center gap-2 text-ink-soft",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-2 shrink-0 rounded-full",
											style: { background: s.fill }
										}), s.name]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular",
										children: [num(s.value / pieTot * 100, 0), "%"]
									})]
								}, s.name))
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/mantenimiento",
							className: "inline-flex h-11 items-center justify-center gap-2 rounded-md text-sm text-ink-soft hair hover:text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), "Mantenimiento de dosis y flete"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-2xl text-xs leading-relaxed text-ink-faint",
				children: "Documento de trabajo de Agro Planeamiento. Precio default: pizarra Rosario CAC en USD/qq. Flete corto según tabla km→ARS/t convertido con dólar BNA; flete largo 27.095 ARS/t. No constituye oferta ni recomendación agronómica. Verificar con el establecimiento."
			})
		] })
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MargenesDesk, {}) });
}
//#endregion
export { Page as component };
