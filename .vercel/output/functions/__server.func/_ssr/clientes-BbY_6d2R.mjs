import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, H as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, m as Copy, u as Minus } from "../_libs/lucide-react.mjs";
import { i as cn } from "./site-nav-Bv-HDqOI.mjs";
import { t as RequireAuth } from "./require-auth-BpE9r2PS.mjs";
import { a as PageMain, i as PageHeader, r as Page$1, t as ChipRow } from "./page-sOSmG9Nq.mjs";
import { t as Button } from "./button-DGq-09Xz.mjs";
import { c as usd, i as num } from "./format-BTGgZiZN.mjs";
import { B as seedCliente, E as loadOpen, H as touchEstudioAt, L as saveClientes, P as pizarraQqFromLocal, R as saveEscenarios, S as lineUsdHa, T as loadEscenarios, V as seedEscenario, _ as ensureEstudioBridge, a as FX_BNA_FALLBACK, b as haEscenario, d as alquilerUsdHa, g as emptyEscenario, h as emptyCliente, j as parseFleteLargo, l as RULES, m as duplicateEscenario, n as CROP_LABEL, o as GROUPS, t as CROPS, v as fleteCortoArsT, w as loadClientes, y as freezeEscenariosDeCliente, z as saveOpen } from "./estudio-Cu-Uiuh8.mjs";
import { c as mesesCampana, d as saveInformeSource, f as waterfallDiff, i as fmtFecha, l as planFinanciero, r as fechaVtoCanje, t as SIEMBRA_FECHA_DEFAULT, u as saveCampaignInput } from "./campaign-store-B_X5Pudx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clientes-BbY_6d2R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INP = "h-11 w-full rounded-md bg-paper-2 px-3 text-sm tabular hair";
var CROP_API = {
	maiz: {
		crop: "corn",
		key: "corn",
		season: "coarse",
		label: "Maíz"
	},
	soja: {
		crop: "soy_1",
		key: "soy",
		season: "coarse",
		label: "Soja"
	},
	trigo: {
		crop: "wheat",
		key: "wheat",
		season: "fine",
		label: "Trigo"
	}
};
function signedUsd(n) {
	const t = Math.round(Math.abs(n)).toLocaleString("es-AR");
	if (n > .5) return `+USD ${t}`;
	if (n < -.5) return `−USD ${t}`;
	return `USD ${t}`;
}
function Waterfall({ from, to, fromLabel, toLabel }) {
	const rows = waterfallDiff(from, to);
	const total = rows.reduce((a, r) => a + r.value, 0);
	if (!rows.length) return null;
	const scale = Math.max(...rows.map((r) => Math.abs(r.value)), Math.abs(total), 1);
	const h = (rows.length + 1) * 36 + 24;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "mt-4 overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "font-display text-base text-ink",
			children: [
				"De ",
				fromLabel,
				" a ",
				toLabel,
				": ",
				signedUsd(total)
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 476 ${h}`,
			className: "mt-3 w-full max-w-xl",
			role: "img",
			"aria-label": `Waterfall de ${fromLabel} a ${toLabel}`,
			children: [rows.map((row, i) => {
				const y = 12 + i * 36;
				const w = Math.abs(row.value) / scale * 102;
				const pos = row.value >= 0;
				const x = pos ? 278 : 278 - w;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 0,
						y: y + 18,
						fill: "var(--color-ink-soft)",
						fontSize: "11",
						children: row.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: 278,
						y1: y + 4,
						x2: 278,
						y2: y + 28,
						stroke: "var(--color-line)",
						strokeWidth: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x,
						y: y + 8,
						width: Math.max(w, 2),
						height: 16,
						rx: 2,
						fill: pos ? "var(--color-up)" : "var(--color-down)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: pos ? 278 + w + 6 : 278 - w - 6,
						y: y + 20,
						fontSize: "11",
						className: "tabular",
						fill: pos ? "var(--color-up)" : "var(--color-down)",
						textAnchor: pos ? "start" : "end",
						children: usd(row.value, 0)
					})
				] }, row.key);
			}), (() => {
				const y = 12 + rows.length * 36;
				const w = Math.abs(total) / scale * 102;
				const pos = total >= 0;
				const x = pos ? 278 : 278 - w;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 0,
						y: y + 18,
						fill: "var(--color-ink)",
						fontSize: "11",
						fontWeight: "600",
						children: "Diferencia"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x,
						y: y + 8,
						width: Math.max(w, 2),
						height: 16,
						rx: 2,
						fill: pos ? "var(--color-forest)" : "var(--color-down)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: pos ? 278 + w + 6 : 278 - w - 6,
						y: y + 20,
						fontSize: "11",
						className: "tabular",
						fill: "var(--color-ink)",
						textAnchor: pos ? "start" : "end",
						fontWeight: "600",
						children: signedUsd(total)
					})
				] });
			})()]
		})]
	});
}
function costsUsdPerHa(e, crop, precioQq, rinde) {
	const out = {
		seed: 0,
		n_fertilizer: 0,
		p_fertilizer: 0,
		other_fertilizer: 0,
		herbicides: 0,
		insecticides: 0,
		fungicides: 0,
		inoculant: 0,
		other_inputs: 0,
		planting: 0,
		spraying: 0,
		fertilizing_labor: 0,
		other_labors: 0,
		harvest_usd_per_ha: 0,
		structure_tax_usd_per_ha: 0
	};
	for (const a of e.catalog.lines) {
		if (a.crop !== crop || a.kind === "pctIncome") continue;
		const usdHa = lineUsdHa(a, precioQq, rinde);
		const o = a.name.toLowerCase();
		if (a.group === "semilla") out.seed += usdHa;
		else if (a.group === "fertilizantes") {
			if (/urea/.test(o)) out.n_fertilizer += usdHa;
			else if (/arrancador|fosfato|12-40/.test(o)) out.p_fertilizer += usdHa;
			else out.other_fertilizer += usdHa;
		} else if (a.group === "agroquimicos") {
			if (/fung/.test(o)) out.fungicides += usdHa;
			else if (/lambda|imida|cloran|insect/.test(o)) out.insecticides += usdHa;
			else out.herbicides += usdHa;
		} else if (a.group === "coadyuvantes") out.other_inputs += usdHa;
		else if (a.group === "labores") {
			if (/siembra/.test(o)) out.planting += usdHa;
			else if (/pulver/.test(o)) out.spraying += usdHa;
			else out.other_labors += usdHa;
		} else if (a.group === "seguro") out.other_inputs += usdHa;
	}
	return out;
}
function buildCampaign(cliente, e) {
	const soyT = (e.crops.soja.precioQq > 0 ? e.crops.soja.precioQq : 28) * 10;
	const asOf = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const fields = [];
	const cycles = [];
	Object.keys(CROP_API).forEach((key) => {
		const row = e.crops[key];
		if (!row.activo || !(row.ha > 0) || !(row.rinde > 0) || !(row.precioQq > 0)) return;
		const meta = CROP_API[key];
		const fieldId = `L-${key}`;
		const alq = alquilerUsdHa(key, row.alquilerQq, row.precioQq);
		const rented = alq > 0;
		const rentQqSoy = rented && soyT > 0 ? alq * 10 / soyT : 0;
		const fx = e.fxBna > 0 ? e.fxBna : FX_BNA_FALLBACK;
		fields.push({
			field_id: fieldId,
			name: meta.label,
			hectares: row.ha,
			land_tenure: rented ? "rented" : "owned",
			rent_qq_soy_per_ha: rented ? rentQqSoy : 0,
			yield_history_qq: [row.rinde]
		});
		cycles.push({
			cycle_id: key,
			field_id: fieldId,
			crop: meta.crop,
			season: meta.season,
			hectares: row.ha,
			expected_yield_qq_per_ha: row.rinde,
			yield_high_qq_per_ha: row.rinde * 1.18,
			yield_low_qq_per_ha: row.rinde * .82,
			price_crop_key: meta.key,
			rent_split_pct_this_cycle: 1,
			costs_usd_per_ha: costsUsdPerHa(e, key, row.precioQq, row.rinde),
			harvest_mode: "pct_of_grain",
			harvest_pct_of_grain: .08,
			commercial: {
				commission_pct_of_ib: RULES[key].gastosPct / 100,
				paritary_pct_of_ib: 0,
				other_pct_of_ib: 0,
				short_haul_usd_per_t: fleteCortoArsT(row.km, e.catalog.freight) / fx,
				long_haul_usd_per_t: parseFleteLargo(e.catalog.fleteLargoArsT) / fx,
				other_usd_per_t: 0
			},
			cost_source: {
				inputs: "client_invoice",
				labors: "own_declared"
			}
		});
	});
	const zona = (cliente.zona || "").toLowerCase();
	const nucleo = /marcos juárez|marcos juarez|rosario|santa fe|núcleo|nucleo/.test(zona);
	return {
		meta: {
			producer_id: cliente.id,
			producer_name: cliente.nombre,
			farm_name: `${e.nombre} · ${cliente.nombre}`,
			farm_location: cliente.zona || "Marcos Juárez",
			campaign: e.campana || "2026/27",
			report_type: "campana",
			as_of: asOf,
			fx_ars_per_usd: e.fxBna > 0 ? e.fxBna : FX_BNA_FALLBACK,
			notes: `estudio:${cliente.id}:${e.id}`
		},
		market: {
			prices_usd_per_t: {
				soy: soyT,
				corn: e.crops.maiz.precioQq * 10,
				wheat: e.crops.trigo.precioQq * 10,
				sunflower: 380
			},
			basis_usd_per_t: {
				soy: 0,
				corn: 0,
				wheat: 0,
				sunflower: 0
			},
			diesel_usd_per_l: 1.15,
			price_source: "pizarra_rosario",
			price_date: asOf
		},
		fields,
		cycles,
		sales: [],
		cash_events: [],
		opening_cash_usd: 0,
		policy: {
			target_priced_pct_at_planting: .35,
			zone: nucleo ? "nucleo" : "extra_nucleo"
		}
	};
}
function Card({ title, kicker, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("desk-card", className),
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
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs text-ink-soft",
			children: label
		}), children]
	});
}
function Num({ value, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "number",
		inputMode: "decimal",
		className: INP,
		"aria-label": label,
		value: Number.isFinite(value) ? value : "",
		onChange: (e) => {
			const n = Number(e.target.value);
			if (Number.isFinite(n)) onChange(n);
		}
	});
}
function Stat({ label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-cream p-4 hair",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 font-display text-2xl tabular leading-none", tone === "up" && "text-up", tone === "down" && "text-down"),
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-ink-faint",
				children: hint
			}) : null
		]
	});
}
function Row({ label, hint, value, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-b border-line/70 py-1.5 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
			className: "text-xs text-ink-soft",
			children: [label, hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-ink-faint",
				children: hint
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("tabular text-sm", strong && "font-medium"),
			children: value
		})]
	});
}
function CmpRow({ label, values }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-line/70 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "py-2 pr-3 text-ink-soft",
			children: label
		}), values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "py-2 pr-3 text-right tabular",
			children: v
		}, i))]
	});
}
function ClientesDesk() {
	const nav = useNavigate();
	const [clientes, setClientes] = (0, import_react.useState)([seedCliente()]);
	const [escenarios, setEscenarios] = (0, import_react.useState)([seedEscenario()]);
	const [clienteId, setClienteId] = (0, import_react.useState)(seedCliente().id);
	const [escenarioId, setEscenarioId] = (0, import_react.useState)(seedEscenario().id);
	const [archivados, setArchivados] = (0, import_react.useState)(false);
	const [cmpIds, setCmpIds] = (0, import_react.useState)([]);
	const [openCostos, setOpenCostos] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		ensureEstudioBridge();
		const c = loadClientes();
		const e = loadEscenarios();
		const open = loadOpen();
		setClientes(c);
		setEscenarios(e);
		const cli = c.find((x) => x.id === open.clienteId) ?? c.find((x) => !x.archived) ?? c[0];
		const del = e.filter((x) => x.clienteId === cli?.id);
		const esc = del.find((x) => x.id === open.escenarioId) ?? del[0];
		if (cli) setClienteId(cli.id);
		if (esc) setEscenarioId(esc.id);
		if (cli && esc) saveOpen({
			clienteId: cli.id,
			escenarioId: esc.id
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		(async () => {
			try {
				const r = await fetch("/api/granos", { signal: ac.signal });
				if (!r.ok) return;
				const j = await r.json();
				if (ac.signal.aborted) return;
				const fx = j.fxBna && j.fxBna > 0 ? j.fxBna : 0;
				const piz = pizarraQqFromLocal(j.local);
				setEscenarios((list) => {
					const next = list.map((e) => {
						if (e.snapshotAt) return e;
						const crops = { ...e.crops };
						let dirty = false;
						if (piz) [
							"maiz",
							"soja",
							"trigo"
						].forEach((k) => {
							const q = piz[k];
							if (q && !crops[k].precioManual && Math.abs(crops[k].precioQq - q) >= .005) {
								crops[k] = {
									...crops[k],
									precioQq: q
								};
								dirty = true;
							}
						});
						if (fx && Math.abs(e.fxBna - fx) >= .5) dirty = true;
						return dirty ? {
							...e,
							crops,
							fxBna: fx || e.fxBna
						} : e;
					});
					saveEscenarios(next);
					return next;
				});
			} catch {}
		})();
		return () => ac.abort();
	}, [escenarioId]);
	const visible = clientes.filter((c) => archivados ? c.archived : !c.archived);
	const cliente = clientes.find((c) => c.id === clienteId) ?? visible[0] ?? clientes[0];
	const del = escenarios.filter((e) => e.clienteId === cliente?.id);
	const escenario = del.find((e) => e.id === escenarioId) ?? del[0];
	const plan = (0, import_react.useMemo)(() => escenario ? planFinanciero(escenario) : null, [escenario]);
	const planContado = (0, import_react.useMemo)(() => escenario ? planFinanciero({
		...escenario,
		canje: false
	}) : null, [escenario]);
	const cmp = (0, import_react.useMemo)(() => cmpIds.slice(0, 3).map((id) => {
		const e = escenarios.find((x) => x.id === id);
		return e ? {
			e,
			p: planFinanciero(e)
		} : null;
	}).filter((x) => x !== null), [cmpIds, escenarios]);
	function persistC(list) {
		setClientes(list);
		saveClientes(list);
		touchEstudioAt();
	}
	function persistE(list) {
		setEscenarios(list);
		saveEscenarios(list);
		touchEstudioAt();
	}
	function open(cid, eid) {
		setClienteId(cid);
		setEscenarioId(eid);
		setOpenCostos(false);
		saveOpen({
			clienteId: cid,
			escenarioId: eid
		});
	}
	function patchCliente(p) {
		if (!clienteId) return;
		setClientes((list) => {
			const next = list.map((c) => c.id === clienteId ? {
				...c,
				...p
			} : c);
			saveClientes(next);
			touchEstudioAt();
			return next;
		});
	}
	function patchEsc(p) {
		if (!escenario) return;
		persistE(escenarios.map((e) => e.id === escenario.id ? {
			...e,
			...p
		} : e));
	}
	function patchCrop(crop, p) {
		if (!escenario) return;
		patchEsc({ crops: {
			...escenario.crops,
			[crop]: {
				...escenario.crops[crop],
				...p
			}
		} });
	}
	function patchLine(id, p) {
		if (!escenario) return;
		patchEsc({ catalog: {
			...escenario.catalog,
			lines: escenario.catalog.lines.map((l) => l.id === id ? {
				...l,
				...p
			} : l)
		} });
	}
	function addCliente() {
		const n = emptyCliente();
		const e = emptyEscenario(n.id, "Base 2026/27");
		persistC([...clientes, n]);
		persistE([...escenarios, e]);
		open(n.id, e.id);
	}
	function addEscenario() {
		if (!cliente) return;
		const e = emptyEscenario(cliente.id, `Escenario ${del.length + 1}`);
		persistE([...escenarios, e]);
		open(cliente.id, e.id);
	}
	function dupEscenario() {
		if (!escenario || !cliente) return;
		const e = duplicateEscenario(escenario);
		persistE([...escenarios, e]);
		open(cliente.id, e.id);
	}
	function archivar() {
		if (!cliente) return;
		if (cliente.archived) {
			persistC(clientes.map((c) => c.id === cliente.id ? {
				...c,
				archived: false
			} : c));
			setArchivados(false);
			return;
		}
		const nextC = clientes.map((c) => c.id === cliente.id ? {
			...c,
			archived: true
		} : c);
		const nextE = freezeEscenariosDeCliente(escenarios, cliente.id, escenario?.id);
		persistC(nextC);
		persistE(nextE);
		setArchivados(true);
	}
	function generar() {
		if (!cliente || !escenario) return;
		const payload = buildCampaign(cliente, escenario);
		if (!payload.cycles.length) return;
		saveCampaignInput(payload);
		saveInformeSource({
			clienteId: cliente.id,
			escenarioId: escenario.id
		});
		saveOpen({
			clienteId: cliente.id,
			escenarioId: escenario.id
		});
		nav({ to: "/informe" });
	}
	if (!cliente || !escenario || !plan) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page$1, {
		nav: "clientes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMain, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Agro Planeamiento · Consultoría agro",
				title: "Clientes",
				lead: "Cada escenario copia costos, rindes y precios. Márgenes usa el escenario abierto."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChipRow, {
				className: "mt-5",
				children: [
					visible.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							const first = escenarios.find((e) => e.clienteId === c.id);
							open(c.id, first?.id ?? escenario.id);
						},
						className: cn("inline-flex h-11 items-center rounded-md px-3 text-sm", c.id === cliente.id ? "bg-forest text-cream" : "text-ink hair hover:bg-paper-2"),
						children: c.nombre
					}, c.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addCliente,
						className: "inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-sm text-ink-soft hair hover:text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Cliente"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setArchivados((v) => !v),
						className: "inline-flex h-11 items-center px-3 text-sm text-ink-soft",
						children: archivados ? "Activos" : "Archivados"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				title: cliente.nombre,
				kicker: cliente.zona || "Marcos Juárez",
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nombre",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: INP,
								value: cliente.nombre,
								onChange: (e) => patchCliente({ nombre: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Zona",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: INP,
								value: cliente.zona,
								onChange: (e) => patchCliente({ zona: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tipo de persona",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: `${INP} cursor-pointer`,
								value: cliente.tipoPersona === "juridica" ? "juridica" : "fisica",
								onChange: (e) => patchCliente({ tipoPersona: e.target.value === "juridica" ? "juridica" : "fisica" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "fisica",
									children: "Persona física"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "juridica",
									children: "Persona jurídica"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Hectáreas (opcional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: INP,
								type: "number",
								inputMode: "decimal",
								value: cliente.ha ?? "",
								placeholder: "—",
								onChange: (e) => {
									const n = Number(e.target.value);
									patchCliente({ ha: e.target.value === "" || !Number.isFinite(n) ? null : n });
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Notas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: INP,
								value: cliente.notas,
								onChange: (e) => patchCliente({ notas: e.target.value })
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: cliente.archived ? "secondary" : "primary",
						onClick: archivar,
						children: cliente.archived ? "Restaurar" : "Archivar"
					}), cliente.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-ink-soft",
						children: "Archivado · márgenes copiados"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-ink-faint",
						children: "Guarda una copia de los márgenes y pasa a Archivados"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-1.5",
				children: [
					del.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => open(cliente.id, e.id),
						className: cn("inline-flex h-11 items-center rounded-md px-3 text-sm", e.id === escenario.id ? "bg-forest text-cream" : "text-ink hair hover:bg-paper-2"),
						children: e.nombre
					}, e.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addEscenario,
						className: "inline-flex h-11 items-center gap-1.5 px-3 text-sm text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Escenario"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: dupEscenario,
						className: "inline-flex h-11 items-center gap-1.5 px-3 text-sm text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Duplicar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: generar,
						disabled: haEscenario(escenario) <= 0,
						children: "Generar informe"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				title: escenario.nombre,
				kicker: `${escenario.campana} · ${haEscenario(escenario)} ha${escenario.snapshotAt ? ` · márgenes ${new Date(escenario.snapshotAt).toLocaleDateString("es-AR")}` : ""}`,
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nombre del escenario",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: INP,
									value: escenario.nombre,
									onChange: (e) => patchEsc({ nombre: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Campaña",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: INP,
									value: escenario.campana,
									onChange: (e) => patchEsc({ campana: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Cobro de cosecha",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-1.5",
									children: ["100", "50-60"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => patchEsc({ venta: v }),
										className: cn("h-11 rounded-md text-sm", escenario.venta === v ? "bg-forest text-cream" : "hair hover:bg-paper-2"),
										children: v === "100" ? "100% cosecha" : "50/50 + 60 d"
									}, v))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
								children: "Fecha de siembra por cultivo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-ink-soft",
								children: "Ahí caen labores, seguro e insumos de contado. Editable con día."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-3 sm:grid-cols-3",
								children: CROPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: c.label,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										className: INP,
										"aria-label": `Fecha de siembra ${c.label}`,
										min: "2026-05-01",
										max: "2027-08-31",
										value: escenario.crops[c.id].siembraFecha ?? SIEMBRA_FECHA_DEFAULT[c.id],
										onChange: (e) => patchCrop(c.id, { siembraFecha: e.target.value || null })
									})
								}, c.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
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
										children: "Ha"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 text-right",
										children: "Rinde"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 text-right",
										children: "USD/qq"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 text-right",
										children: "Km"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 text-right",
										children: "Alq. qq"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: CROPS.map((c) => {
								const row = escenario.crops[c.id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line/70 last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "inline-flex h-11 items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: row.activo,
													onChange: (e) => patchCrop(c.id, { activo: e.target.checked })
												}), c.label]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
												value: row.ha,
												onChange: (n) => patchCrop(c.id, {
													ha: n,
													activo: n > 0 || row.activo
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
												value: row.rinde,
												onChange: (n) => patchCrop(c.id, { rinde: n })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
												value: row.precioQq,
												onChange: (n) => patchCrop(c.id, {
													precioQq: n,
													precioManual: true
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
												value: row.km,
												onChange: (n) => patchCrop(c.id, { km: n })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
												value: row.alquilerQq,
												onChange: (n) => patchCrop(c.id, { alquilerQq: n })
											})
										})
									]
								}, c.id);
							}) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 border-t border-line/70 pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex h-11 w-full items-center justify-between gap-2 text-left",
							"aria-expanded": openCostos,
							onClick: () => setOpenCostos((v) => !v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
								children: "Márgenes de este escenario"
							}), escenario.snapshotAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-xs text-ink-faint",
								children: ["copia ", new Date(escenario.snapshotAt).toLocaleDateString("es-AR")]
							}) : null] }), openCostos ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4 text-forest" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-forest" })]
						}), openCostos ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-ink-soft",
							children: escenario.snapshotAt ? `Copia al archivar · ${new Date(escenario.snapshotAt).toLocaleString("es-AR")}. Se puede editar.` : "Costos de este escenario. Al archivar se guarda una copia."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 overflow-x-auto",
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
											className: "py-2 pr-3",
											children: "Grupo"
										}),
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
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: escenario.catalog.lines.filter((l) => escenario.crops[l.crop]?.activo && escenario.crops[l.crop].ha > 0).map((l) => {
									const crop = escenario.crops[l.crop];
									const usdHa = lineUsdHa(l, crop.precioQq, crop.rinde);
									const grupo = GROUPS.find((g) => g.id === l.group)?.label ?? l.group;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-line/70 last:border-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-1.5 pr-3",
												children: CROP_LABEL[l.crop]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-1.5 pr-3 text-ink-soft",
												children: grupo
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-1.5 pr-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													className: INP,
													value: l.name,
													onChange: (e) => patchLine(l.id, { name: e.target.value }),
													"aria-label": `Insumo ${l.name}`
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-1.5 pr-3",
												children: l.kind === "qty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
													value: l.dose,
													onChange: (n) => patchLine(l.id, { dose: n }),
													label: `Dosis ${l.name}`
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-right text-xs text-ink-faint",
													children: l.kind === "pctIncome" ? "rinde × 0.08 × precio" : `${l.dose} qq × precio`
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-1.5 pr-3",
												children: l.kind === "qty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
													value: l.usdUnit,
													onChange: (n) => patchLine(l.id, { usdUnit: n }),
													label: `USD ${l.name}`
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-right text-xs text-ink-faint",
													children: "—"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-1.5 text-right tabular",
												children: usd(usdHa, 0)
											})
										]
									}, l.id);
								}) })]
							})
						})] }) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Resultado",
						value: usd(plan.mb, 0),
						hint: escenario.canje ? "cultivo − carga + rend" : `${usd(plan.mbHa, 0)}/ha`,
						tone: plan.mb >= 0 ? "up" : "down"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Ingreso",
						value: usd(plan.ingreso, 0),
						hint: escenario.canje ? "grano + colocación" : "campaña"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Costos",
						value: usd(plan.costos, 0),
						hint: escenario.canje ? "cultivo + carga" : "total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pico de caja",
						value: usd(plan.picoMes?.acum ?? 0, 0),
						hint: plan.picoMes ? plan.picoMes.label : "—",
						tone: (plan.picoMes?.acum ?? 0) < 0 ? "down" : "up"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Plan financiero",
				kicker: "v1 · Gap de caja",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Gap de caja",
							hint: "capital de trabajo · pico de caja",
							value: usd(plan.capitalTrabajo, 0),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Margen de cultivo",
							hint: `${num(plan.ha, 0)} ha`,
							value: usd(plan.mbCultivo, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Resultado",
							hint: escenario.canje ? "cultivo − carga + rend" : "igual al margen",
							value: usd(plan.mb, 0),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Qq gap",
							hint: `Gap ÷ precio ponderado (${num(plan.precioPond, 2)} USD/qq)`,
							value: `${num(plan.qqGap, 1)} qq`
						}),
						CROPS.filter((c) => plan.qqGapPorCultivo[c.id] != null && plan.crops.length > 1).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: `Qq gap en ${c.label.toLowerCase()}`,
							hint: `Gap ÷ precio ${c.label.toLowerCase()} (${num(escenario.crops[c.id].precioQq, 2)} USD/qq)`,
							value: `${num(plan.qqGapPorCultivo[c.id], 1)} qq`
						}, c.id)),
						CROPS.filter((c) => plan.rindeInd[c.id] != null).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: `Rinde indiferencia ${c.label}`,
							hint: "qq/ha",
							value: num(plan.rindeInd[c.id], 1)
						}, `ind-${c.id}`))
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				title: "Flujo de caja",
				kicker: "mensual · 2026/27",
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Canje de insumos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-1.5",
								children: [false, true].map((on) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": on ? "Canje ON" : "Canje OFF",
									onClick: () => patchEsc({ canje: on }),
									className: cn("h-11 rounded-md text-sm", escenario.canje === on ? "bg-forest text-cream" : "hair hover:bg-paper-2"),
									children: on ? "ON" : "OFF"
								}, String(on)))
							})
						}), escenario.canje ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Fecha de canje",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: INP,
									value: escenario.canjeMes ?? plan.canje.canjeIdx,
									onChange: (e) => patchEsc({ canjeMes: Number(e.target.value) }),
									"aria-label": "Mes de canje",
									children: mesesCampana().map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: m.i,
										children: [
											m.label,
											" · vto ",
											fmtFecha(fechaVtoCanje(m.i))
										]
									}, m.i))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Carga TNA %",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "Carga TNA %",
									value: escenario.canjeTna,
									onChange: (n) => patchEsc({ canjeTna: n })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "TNA rendimiento %",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "TNA rendimiento %",
									value: escenario.canjeRendTna,
									onChange: (n) => patchEsc({ canjeRendTna: n })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Colocación",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: INP,
									value: escenario.canjeColocacion,
									onChange: (e) => patchEsc({ canjeColocacion: e.target.value }),
									"aria-label": "Tipo de colocación",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "plazo fijo",
											children: "Plazo fijo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "letra",
											children: "Letra"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "otro",
											children: "Otro"
										})
									]
								})
							})
						] }) : null]
					}),
					escenario.canje ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Insumos a canje",
								value: usd(plan.canje.insumos, 0),
								hint: "semilla · fert · agro · coady."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Carga",
								value: usd(plan.canje.carga, 0),
								hint: "insumos × TNA × días / 365"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Rendimiento",
								value: usd(plan.canje.rendimiento, 0),
								hint: "insumos × TNA rend × días / 365",
								tone: "up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Vs contado",
								value: usd(plan.canje.deltaContado, 0),
								hint: plan.canje.deltaContado > 0 ? "canje rinde más" : plan.canje.deltaContado < 0 ? "canje rinde menos" : "igual al contado",
								tone: plan.canje.deltaContado > 0 ? "up" : plan.canje.deltaContado < 0 ? "down" : void 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Pico de financiamiento",
								value: usd(plan.picoMes?.acum ?? 0, 0),
								hint: plan.picoMes ? plan.picoMes.label : "—",
								tone: (plan.picoMes?.acum ?? 0) < 0 ? "down" : "up"
							})
						]
					}) : null,
					escenario.canje ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-md bg-paper-2 p-3 text-sm leading-relaxed hair",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
								children: "Cálculo · año calendario 365"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 tabular",
								children: [
									"Hoy ",
									plan.canje.hoy,
									" → vto ",
									plan.canje.fechaCanje
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular",
								children: [
									plan.canje.dias,
									" días / 365",
									plan.canje.meses ? ` · ${plan.canje.meses.toLocaleString("es-AR", {
										minimumFractionDigits: 1,
										maximumFractionDigits: 1
									})} meses (días × 12 / 365)` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 tabular text-ink-soft",
								children: [
									"Carga = ",
									usd(plan.canje.insumos, 0),
									" × ",
									num(escenario.canjeTna, 1),
									"% × ",
									plan.canje.dias,
									" / 365 =",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink",
										children: usd(plan.canje.carga, 0)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular text-ink-soft",
								children: [
									"Rendimiento = ",
									usd(plan.canje.insumos, 0),
									" × ",
									num(escenario.canjeRendTna, 1),
									"% × ",
									plan.canje.dias,
									" / 365 =",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-up",
										children: usd(plan.canje.rendimiento, 0)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-ink-faint",
								children: "Interés simple actual/365. Vencimiento: día 20 del mes de canje. Mismos días para carga y rendimiento. Si el canje vence antes de la siembra de un insumo, ese tramo se paga en siembra, sin carga ni rendimiento."
							})
						]
					}) : null,
					escenario.canje && planContado ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waterfall, {
						from: planContado.partidas,
						to: plan.partidas,
						fromLabel: "contado",
						toLabel: "canje"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[520px] text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3",
										children: "Mes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 text-right",
										children: "Ingreso"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 text-right",
										children: "Egreso"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 text-right",
										children: "Neto"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 text-right",
										children: "Acumulado"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: plan.flujo.filter((m) => m.ingreso || m.egreso).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: cn("border-b border-line/70 last:border-0", plan.picoMes?.key === m.key && m.acum < 0 && "bg-paper-2"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3",
										children: m.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3 text-right tabular",
										children: m.ingreso ? usd(m.ingreso, 0) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3 text-right tabular",
										children: m.egreso ? usd(m.egreso, 0) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("py-2 pr-3 text-right tabular", m.neto < 0 && "text-down"),
										children: usd(m.neto, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("py-2 text-right tabular font-medium", m.acum < 0 && "text-down"),
										children: usd(m.acum, 0)
									})
								]
							}, m.key)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-ink-soft",
						children: escenario.canje ? "Canje ON: vence el día 20 del mes elegido. Carga y rendimiento de hoy a esa fecha (días / 365). Labores, seguro e insumos de contado salen en la siembra que elegiste por cultivo." : "Labores, seguro e insumos al mes de siembra de cada cultivo. Pulverizadora a mitad. Cosecha, flete y comercialización al cosechar."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				title: "Comparar escenarios",
				kicker: "elegí 2 o 3",
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: del.map((e) => {
						const on = cmpIds.includes(e.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCmpIds((ids) => on ? ids.filter((x) => x !== e.id) : ids.length >= 3 ? [...ids.slice(1), e.id] : [...ids, e.id]),
							className: cn("inline-flex h-11 items-center rounded-md px-3 text-sm", on ? "bg-forest text-cream" : "hair hover:bg-paper-2"),
							children: e.nombre
						}, e.id);
					})
				}), cmp.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3",
								children: " "
							}), cmp.map(({ e }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: e.nombre
							}, e.id))]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmpRow, {
								label: "Margen USD/ha",
								values: cmp.map(({ p }) => usd(p.mbHa, 0))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmpRow, {
								label: "Ingreso",
								values: cmp.map(({ p }) => usd(p.ingreso, 0))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmpRow, {
								label: "Costos",
								values: cmp.map(({ p }) => usd(p.costos, 0))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmpRow, {
								label: "Rinde indiferencia",
								values: cmp.map(({ p }) => Object.entries(p.rindeInd).map(([k, v]) => `${CROP_LABEL[k]} ${num(v, 1)}`).join(" · "))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmpRow, {
								label: "Pico de caja",
								values: cmp.map(({ p }) => `${usd(p.picoMes?.acum ?? 0, 0)} (${p.picoMes?.label ?? "—"})`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmpRow, {
								label: "Gap de caja",
								values: cmp.map(({ p }) => usd(p.capitalTrabajo, 0))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmpRow, {
								label: "Qq gap",
								values: cmp.map(({ p }) => `${num(p.qqGap, 1)} qq`)
							})
						] })]
					})
				}), cmp.slice(1).map(({ e, p }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waterfall, {
					from: cmp[0].p.partidas,
					to: p.partidas,
					fromLabel: cmp[0].e.nombre,
					toLabel: e.nombre
				}, e.id))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-ink-faint",
					children: "Duplicá Base y marcá dos escenarios para comparar."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-2xl text-xs leading-relaxed text-ink-faint",
				children: "Documento de trabajo de Agro Planeamiento. Costos Excel 1:1 por escenario (no se pisan). Seguro y cosecha viven con el precio. Flete corto según tabla, largo ARS/t en Mantenimiento. No es oferta."
			})
		] })
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientesDesk, {}) });
}
//#endregion
export { Page as component };
