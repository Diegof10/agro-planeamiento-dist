import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, r as Trash2, s as RefreshCw } from "../_libs/lucide-react.mjs";
import { r as cn } from "./site-nav-BQjdxVH2.mjs";
import { t as RequireAuth } from "./require-auth-DXF52AGr.mjs";
import { a as PageMain, i as PageHeader, r as Page$1 } from "./page-C_mfpDjx.mjs";
import { t as Button } from "./button-BSBEnbg8.mjs";
import { i as num } from "./format-BTGgZiZN.mjs";
import { C as loadCatalog, F as resetCatalog, L as saveCatalog, O as makeLine, _ as ensureEstudioBridge, k as normalizeLine, o as GROUPS, p as doseLabel, r as DEFAULT_CATALOG, t as CROPS, u as UNITS } from "./estudio-5MfS_QS9.mjs";
import { t as FuentesCard } from "./fuentes-Bi8s7P98.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mantenimiento-B940c4X0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INP = "h-11 w-full rounded-md bg-paper-2 px-3 text-sm tabular hair";
var AUTH = "dhf-margenes-auth";
function FuentesPanel() {
	const [report, setReport] = (0, import_react.useState)(null);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [spin, setSpin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		(async () => {
			try {
				const r = await fetch("/api/fuentes?fresh=1", { signal: ac.signal });
				if (!r.ok) throw new Error("fail");
				const j = await r.json();
				if (!ac.signal.aborted) setReport(j);
			} catch (e) {
				if (e instanceof DOMException && e.name === "AbortError") return;
			}
		})();
		return () => ac.abort();
	}, [tick]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setSpin(true);
					setTick((n) => n + 1);
					window.setTimeout(() => setSpin(false), 1200);
				},
				className: "inline-flex h-11 items-center gap-2 rounded-md px-3 text-xs text-ink-soft hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", spin && "animate-spin") }), "Chequear fuentes"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FuentesCard, { report })]
	});
}
function unitOptions(current) {
	return UNITS.includes(current) ? [...UNITS] : [current, ...UNITS];
}
function MantenimientoDesk() {
	const [ok, setOk] = (0, import_react.useState)(false);
	const [pin, setPin] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const [crop, setCrop] = (0, import_react.useState)("soja");
	const [catalog, setCatalog] = (0, import_react.useState)(DEFAULT_CATALOG);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [group, setGroup] = (0, import_react.useState)("fertilizantes");
	const [unit, setUnit] = (0, import_react.useState)("kg");
	const [dose, setDose] = (0, import_react.useState)(1);
	const [usdUnit, setUsdUnit] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.sessionStorage.getItem(AUTH) === "1") setOk(true);
		ensureEstudioBridge();
		setCatalog(loadCatalog());
	}, []);
	function persist(next) {
		const c = {
			...next,
			lines: next.lines.map(normalizeLine)
		};
		setCatalog(c);
		saveCatalog(c);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1600);
	}
	function patchLine(id, p) {
		persist({
			...catalog,
			lines: catalog.lines.map((l) => l.id === id ? {
				...l,
				...p
			} : l)
		});
	}
	function addLine(g, n, u, d, usd) {
		persist({
			...catalog,
			lines: [...catalog.lines, makeLine({
				crop,
				group: g,
				name: n,
				unitLabel: u,
				dose: d,
				usdUnit: usd
			})]
		});
	}
	function dropLine(l) {
		if (!window.confirm(`¿Borrar “${l.name}”? Sale del cálculo de ${CROPS.find((c) => c.id === l.crop)?.label ?? l.crop}.`)) return;
		persist({
			...catalog,
			lines: catalog.lines.filter((x) => x.id !== l.id)
		});
	}
	const lines = (0, import_react.useMemo)(() => catalog.lines.filter((l) => l.crop === crop).map(normalizeLine), [catalog, crop]);
	if (!ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMain, {
		width: "narrow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.22em] text-forest uppercase",
				children: "Agro Planeamiento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl",
				children: "Mantenimiento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: "Ingresá el PIN para editar insumos y ver el chequeo de fuentes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					if (pin.trim() === "2026") {
						window.sessionStorage.setItem(AUTH, "1");
						setOk(true);
						setErr(null);
					} else setErr("PIN incorrecto.");
				},
				className: "mt-6 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: pin,
						onChange: (e) => setPin(e.target.value),
						className: INP,
						placeholder: "PIN",
						"aria-label": "PIN",
						autoComplete: "off"
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-down",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Entrar"
					})
				]
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMain, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Agro Planeamiento",
			title: "Mantenimiento",
			lead: "Agregá o quitá insumos. El Excel es el seed inicial; lo que guardes acá es lo que usa la calculadora.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/margenes",
				className: "inline-flex h-11 items-center px-4 text-sm text-ink-soft hair hover:text-ink",
				children: "Volver a márgenes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				onClick: () => {
					if (!window.confirm("¿Restablecer al catálogo inicial del Excel? Se pierden altas y bajas.")) return;
					resetCatalog();
					setCatalog(DEFAULT_CATALOG);
					setSaved(true);
				},
				children: "Restablecer"
			})] })
		}),
		saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-up",
			children: "Guardado."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FuentesPanel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid grid-cols-3 gap-1.5",
			children: CROPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCrop(c.id),
				className: cn("h-12 rounded-md font-display text-base", crop === c.id ? "bg-forest text-cream" : "text-ink hair hover:bg-paper-2"),
				children: c.label
			}, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				if (!name.trim()) return;
				addLine(group, name.trim(), unit, dose, usdUnit);
				setName("");
				setDose(1);
				setUsdUnit(0);
			},
			className: "mt-4 rounded-xl bg-cream p-4 hair sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Agregar línea"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-ink-soft",
					children: [
						"Cultivo ",
						CROPS.find((c) => c.id === crop)?.label,
						". Costo = dosis × USD unit."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs text-ink-soft",
								children: "Insumo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: INP,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "ej. MAP 11-52",
								"aria-label": "Nombre del insumo",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs text-ink-soft",
								children: "Grupo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: INP,
								value: group,
								onChange: (e) => setGroup(e.target.value),
								"aria-label": "Grupo",
								children: GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: g.id,
									children: g.label
								}, g.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs text-ink-soft",
								children: "Unidad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: INP,
								value: unit,
								onChange: (e) => setUnit(e.target.value),
								"aria-label": "Unidad",
								children: UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u,
									children: u
								}, u))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs text-ink-soft",
								children: "Dosis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "any",
								className: INP,
								value: dose,
								"aria-label": "Dosis",
								onChange: (e) => {
									const n = e.target.valueAsNumber;
									if (Number.isFinite(n)) setDose(n);
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs text-ink-soft",
								children: "USD unit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "any",
								className: INP,
								value: usdUnit,
								"aria-label": "USD unit",
								onChange: (e) => {
									const n = e.target.valueAsNumber;
									if (Number.isFinite(n)) setUsdUnit(n);
								}
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Agregar línea"]
				})
			]
		}),
		GROUPS.map((g) => {
			const rows = lines.filter((l) => l.group === g.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl bg-cream p-4 hair sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg",
						children: g.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => addLine(g.id, "Nuevo insumo", "kg", 1, 0),
						className: "inline-flex h-11 items-center gap-1.5 px-3 text-sm text-ink-soft hover:text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "+ línea"]
					})]
				}), rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Insumo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Unidad"
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
									children: " "
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line/70 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: INP,
										value: l.name,
										"aria-label": `${l.name} nombre`,
										onChange: (e) => patchLine(l.id, { name: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-ink-soft",
									children: l.kind === "qty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: INP,
										value: l.unitLabel,
										"aria-label": `${l.name} unidad`,
										onChange: (e) => patchLine(l.id, { unitLabel: e.target.value }),
										children: unitOptions(l.unitLabel).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: u,
											children: u
										}, u))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block px-1 text-xs",
										children: doseLabel(l)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "any",
										"aria-label": `${l.name} dosis`,
										className: INP,
										value: l.dose,
										onChange: (e) => {
											const n = e.target.valueAsNumber;
											if (Number.isFinite(n)) patchLine(l.id, { dose: n });
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "any",
										disabled: l.kind !== "qty",
										"aria-label": `${l.name} USD unit`,
										className: INP,
										value: l.kind === "qty" ? l.usdUnit : "",
										onChange: (e) => {
											const n = e.target.valueAsNumber;
											if (Number.isFinite(n)) patchLine(l.id, { usdUnit: n });
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => dropLine(l),
										"aria-label": `Borrar ${l.name}`,
										className: "inline-flex size-11 items-center justify-center text-ink-soft hover:text-down",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								})
							]
						}, l.id)) })]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-ink-faint",
					children: "Sin líneas en este grupo."
				})]
			}, g.id);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl bg-cream p-4 hair sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Flete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-ink-soft",
					children: "Flete USD/ha = rinde × (corto + largo) / 10. El largo se pasa a USD con el dólar BNA del escenario."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block text-xs text-ink-soft",
						children: "Flete largo (ARS/t)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						step: "any",
						min: 0,
						className: INP,
						value: catalog.fleteLargoArsT,
						"aria-label": "Flete largo ARS/t",
						onChange: (e) => {
							const n = e.target.valueAsNumber;
							if (Number.isFinite(n) && n >= 0) persist({
								...catalog,
								fleteLargoArsT: n
							});
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-5 font-display text-base",
					children: "Flete corto · ARS/t"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-ink-soft",
					children: "Hasta km inclusive. Más de 100 km usa el tramo de 100."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[280px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3",
								children: "Hasta km"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: "ARS/t"
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: catalog.freight.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line/70 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									"aria-label": `Hasta km ${i + 1}`,
									className: INP,
									value: row.maxKm,
									onChange: (e) => {
										const n = e.target.valueAsNumber;
										if (Number.isFinite(n)) persist({
											...catalog,
											freight: catalog.freight.map((r, j) => j === i ? {
												...r,
												maxKm: n
											} : r)
										});
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "any",
									"aria-label": `ARS/t tramo ${num(row.maxKm, 0)} km`,
									className: INP,
									value: row.arsT,
									onChange: (e) => {
										const n = e.target.valueAsNumber;
										if (Number.isFinite(n)) persist({
											...catalog,
											freight: catalog.freight.map((r, j) => j === i ? {
												...r,
												arsT: n
											} : r)
										});
									}
								})
							})]
						}, `${row.maxKm}-${i}`)) })]
					})
				})
			]
		})
	] }) });
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MantenimientoDesk, {}) });
}
//#endregion
export { Page as component };
