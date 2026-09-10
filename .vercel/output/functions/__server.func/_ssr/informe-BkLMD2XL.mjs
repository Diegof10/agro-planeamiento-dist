import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteNav, r as cn, t as BrandMark } from "./site-nav-Co5vIArY.mjs";
import { t as RequireAuth } from "./require-auth-BWV1j3hT.mjs";
import { t as Button } from "./button-DfYDIE6_.mjs";
import { c as usd, i as num } from "./format-BTGgZiZN.mjs";
import { T as loadEscenarios, f as calcularMargen, i as ESTUDIO_EVENT, n as CROP_LABEL, t as CROPS, w as loadClientes, x as labelTipoPersona } from "./estudio-78u6XmuT.mjs";
import { a as freezeFoto, l as planFinanciero, n as dropFoto, o as loadFotos, s as loadInformeSource } from "./campaign-store-DA51acbA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/informe-BkLMD2XL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ESCALA_JURIDICA_2026 = [
	{
		from: 0,
		to: 133514185.74,
		fijo: 0,
		alicuota: 25,
		excedente: 0
	},
	{
		from: 133514185.74,
		to: 1335141857.38,
		fijo: 33378546.43,
		alicuota: 30,
		excedente: 133514185.74
	},
	{
		from: 1335141857.38,
		to: Infinity,
		fijo: 393866847.93,
		alicuota: 35,
		excedente: 1335141857.38
	}
];
var ESCALA_FISICA_2026 = [
	{
		from: 0,
		to: 2336953.69,
		fijo: 0,
		alicuota: 5,
		excedente: 0
	},
	{
		from: 2336953.69,
		to: 4673907.36,
		fijo: 116847.68,
		alicuota: 9,
		excedente: 2336953.69
	},
	{
		from: 4673907.36,
		to: 7010861.05,
		fijo: 327173.52,
		alicuota: 12,
		excedente: 4673907.36
	},
	{
		from: 7010861.05,
		to: 10516291.59,
		fijo: 607607.96,
		alicuota: 15,
		excedente: 7010861.05
	},
	{
		from: 10516291.59,
		to: 21032583.18,
		fijo: 1133422.54,
		alicuota: 19,
		excedente: 10516291.59
	},
	{
		from: 21032583.18,
		to: 31548874.77,
		fijo: 3131517.94,
		alicuota: 23,
		excedente: 21032583.18
	},
	{
		from: 31548874.77,
		to: 47323312.16,
		fijo: 5550265.01,
		alicuota: 27,
		excedente: 31548874.77
	},
	{
		from: 47323312.16,
		to: 70984968.25,
		fijo: 9809363.1,
		alicuota: 31,
		excedente: 47323312.16
	},
	{
		from: 70984968.25,
		to: Infinity,
		fijo: 17144476.49,
		alicuota: 35,
		excedente: 70984968.25
	}
];
function escalaDe(tipo) {
	return tipo === "juridica" ? ESCALA_JURIDICA_2026 : ESCALA_FISICA_2026;
}
function tramoDe(raiArs, escala) {
	for (const t of escala) if (raiArs <= t.to) return t;
	return escala[escala.length - 1];
}
function provisionGanancias(raiUsd, fxBna, tipo) {
	const label = tipo === "juridica" ? "Persona jurídica" : "Persona física";
	if (!(raiUsd > 0) || !(fxBna > 0)) return {
		usd: 0,
		ars: 0,
		alicuota: 0,
		tipo,
		nota: `${label} · RAI ≤ 0, sin Ganancias`
	};
	const raiArs = raiUsd * fxBna;
	const t = tramoDe(raiArs, escalaDe(tipo));
	const ars = t.fijo + (raiArs - t.excedente) * (t.alicuota / 100);
	return {
		usd: ars / fxBna,
		ars,
		alicuota: t.alicuota,
		tipo,
		nota: `${label} · ARCA 2026 · fijo + ${t.alicuota}% s/ excedente · BNA ${fxBna.toFixed(0)}`
	};
}
var FACTORS = [
	.9,
	1,
	1.1
];
var TAX_STEPS = [
	-.1,
	-.08,
	-.06,
	-.04,
	-.02,
	0,
	.02,
	.04,
	.06,
	.08,
	.1
];
function cadenaDe(escenario, crop, estructuraUsdHa, depreciacionUsdHa = 0) {
	const row = escenario.crops[crop];
	if (!row?.activo || !(row.ha > 0) || !(row.rinde > 0) || !(row.precioQq > 0)) return null;
	const res = calcularMargen({
		crop,
		precioQq: row.precioQq,
		rinde: row.rinde,
		km: row.km,
		alquilerQq: row.alquilerQq,
		fxBna: escenario.fxBna,
		catalog: escenario.catalog
	});
	if (!res) return null;
	const ib = res.ingresoBruto;
	const agro = res.groups.agroquimicos + res.groups.coadyuvantes;
	const costosDirectos = res.directos + res.alquiler;
	const mb = ib - costosDirectos;
	const comercializacion = res.comercializacion + res.fleteUsdHa;
	const ebit = mb - comercializacion - estructuraUsdHa - depreciacionUsdHa;
	const ri = row.precioQq > 0 ? (costosDirectos + comercializacion + estructuraUsdHa + depreciacionUsdHa) / row.precioQq : 0;
	return {
		crop,
		label: CROP_LABEL[crop],
		ha: row.ha,
		rinde: row.rinde,
		precioQq: row.precioQq,
		ib,
		semilla: res.groups.semilla,
		fert: res.groups.fertilizantes,
		agro,
		labores: res.groups.labores,
		seguro: res.groups.seguro,
		alquiler: res.alquiler,
		costosDirectos,
		mb,
		com: res.comercializacion,
		flete: res.fleteUsdHa,
		comercializacion,
		estructura: estructuraUsdHa,
		depreciacion: depreciacionUsdHa,
		ebit,
		ri,
		ibTotal: ib * row.ha,
		mbTotal: mb * row.ha,
		ebitTotal: ebit * row.ha
	};
}
function patchCrop(escenario, crop, rinde, precioQq) {
	return {
		...escenario,
		crops: {
			...escenario.crops,
			[crop]: {
				...escenario.crops[crop],
				rinde,
				precioQq
			}
		}
	};
}
function ratio(num, den) {
	if (!(den > 0) || !Number.isFinite(num)) return null;
	return num / den;
}
function payback(capital, flujo) {
	if (!(capital > 0) || !(flujo > 0)) return null;
	return capital / flujo;
}
function roiDe(cadenas, ha, opts, plan, er) {
	const valorHaUsd = opts.valorHaUsd > 0 ? opts.valorHaUsd : 0;
	const tierraUsd = valorHaUsd * ha;
	const capitalTrabajo = plan.capitalTrabajo;
	const capitalTotal = tierraUsd + Math.max(0, capitalTrabajo);
	const roiMb = ratio(er.mb, tierraUsd);
	const roiEbit = ratio(er.ebit, tierraUsd);
	const roiRai = ratio(er.rai, tierraUsd);
	const roiNeto = ratio(er.neto, tierraUsd);
	const roiEbitTotal = ratio(er.ebit, capitalTotal);
	const roiNetoTotal = ratio(er.neto, capitalTotal);
	const rotacion = ratio(er.ingresos, tierraUsd);
	const paybackNeto = payback(tierraUsd, er.neto);
	const paybackEbit = payback(tierraUsd, er.ebit);
	return {
		valorHaUsd,
		tierraUsd,
		capitalTrabajo,
		capitalTotal,
		roiMb,
		roiEbit,
		roiRai,
		roiNeto,
		roiEbitTotal,
		roiNetoTotal,
		rotacion,
		paybackNeto,
		paybackEbit,
		lineas: [
			{
				id: "tierra",
				label: "Capital inmovilizado en tierra",
				nota: "Valor de la hectárea × hectáreas del planteo",
				valor: tierraUsd || null,
				fmt: "usd"
			},
			{
				id: "ct",
				label: "Capital de trabajo de campaña",
				nota: "Hueco de caja del flujo (pico). Se suma al inmovilizado total.",
				valor: capitalTrabajo,
				fmt: "usd"
			},
			{
				id: "total",
				label: "Capital total inmovilizado",
				nota: "Tierra + capital de trabajo",
				valor: tierraUsd ? capitalTotal : null,
				fmt: "usd"
			},
			{
				id: "roi-neto",
				label: "ROI neto",
				nota: "Resultado neto ÷ valor de la tierra. Lo que deja el USD inmovilizado en el campo.",
				valor: roiNeto,
				fmt: "pct"
			},
			{
				id: "roi-ebit",
				label: "ROI operativo (cap rate)",
				nota: "EBITDA ÷ valor de la tierra. Rentabilidad de explotación, antes de financieros e impuesto.",
				valor: roiEbit,
				fmt: "pct"
			},
			{
				id: "roi-rai",
				label: "ROI antes de impuestos",
				nota: "RAI ÷ valor de la tierra",
				valor: roiRai,
				fmt: "pct"
			},
			{
				id: "roi-mb",
				label: "Margen bruto / tierra",
				nota: "MB ÷ valor de la tierra. Antes de estructura, flete y D&A.",
				valor: roiMb,
				fmt: "pct"
			},
			{
				id: "roi-neto-t",
				label: "ROI neto sobre capital total",
				nota: "Neto ÷ (tierra + capital de trabajo)",
				valor: roiNetoTotal,
				fmt: "pct"
			},
			{
				id: "roi-ebit-t",
				label: "ROI operativo sobre capital total",
				nota: "EBITDA ÷ (tierra + capital de trabajo)",
				valor: roiEbitTotal,
				fmt: "pct"
			},
			{
				id: "rot",
				label: "Rotación de activos",
				nota: "Ingresos ÷ valor de la tierra. Cuánto produce cada USD de campo.",
				valor: rotacion,
				fmt: "pct"
			},
			{
				id: "pb-neto",
				label: "Payback sobre neto",
				nota: "Años para recuperar el valor de la tierra con el resultado neto de esta campaña.",
				valor: paybackNeto,
				fmt: "years"
			},
			{
				id: "pb-ebit",
				label: "Payback sobre EBITDA",
				nota: "Años para recuperar la tierra con el resultado operativo.",
				valor: paybackEbit,
				fmt: "years"
			}
		],
		porCultivo: cadenas.map((c) => {
			const tierra = valorHaUsd * c.ha;
			return {
				crop: c.crop,
				label: c.label,
				ha: c.ha,
				tierra,
				ebit: c.ebitTotal,
				roi: ratio(c.ebitTotal, tierra)
			};
		})
	};
}
function farmRaiTax(escenario, opts, cliente, financiero) {
	const cadenas = CROPS.map((c) => cadenaDe(escenario, c.id, opts.estructuraUsdHa, opts.depreciacionUsdHa)).filter((x) => x !== null);
	const ha = cadenas.reduce((a, c) => a + c.ha, 0);
	const rai = cadenas.reduce((a, c) => a + c.ebitTotal, 0) + opts.tenenciaUsdHa * ha - financiero;
	const impuesto = provisionGanancias(rai, escenario.fxBna, cliente.tipoPersona ?? "fisica").usd;
	return {
		rai,
		impuesto,
		ratio: rai > 0 ? impuesto / rai : null
	};
}
function buildTaxSens(escenario, cadenas, opts, cliente, financiero) {
	const ratio = TAX_STEPS.map((yf) => TAX_STEPS.map((pf) => {
		let next = escenario;
		for (const c of cadenas) next = patchCrop(next, c.crop, c.rinde * (1 + yf), c.precioQq * (1 + pf));
		return farmRaiTax(next, opts, cliente, financiero).ratio;
	}));
	const vals = ratio.flat().filter((n) => n != null);
	const mid = Math.floor(TAX_STEPS.length / 2);
	return {
		steps: [...TAX_STEPS],
		ratio,
		base: ratio[mid]?.[mid] ?? null,
		min: vals.length ? Math.min(...vals) : null,
		max: vals.length ? Math.max(...vals) : null
	};
}
function ebitHaFarm(escenario, estructuraUsdHa, depreciacionUsdHa) {
	const cadenas = CROPS.map((c) => cadenaDe(escenario, c.id, estructuraUsdHa, depreciacionUsdHa)).filter((x) => x !== null);
	const ha = cadenas.reduce((a, c) => a + c.ha, 0);
	const ebit = cadenas.reduce((a, c) => a + c.ebitTotal, 0);
	return ha > 0 ? ebit / ha : 0;
}
function erDe(cadenas, plan, opts, cliente, fxBna) {
	const ha = cadenas.reduce((a, c) => a + c.ha, 0) || 1;
	const ingresos = cadenas.reduce((a, c) => a + c.ibTotal, 0);
	const directos = cadenas.reduce((a, c) => a + c.costosDirectos * c.ha, 0);
	const mb = ingresos - directos;
	const tenencia = opts.tenenciaUsdHa * ha;
	const ub = mb + tenencia;
	const com = cadenas.reduce((a, c) => a + c.comercializacion * c.ha, 0);
	const est = opts.estructuraUsdHa * ha;
	const da = opts.depreciacionUsdHa * ha;
	const ebit = ub - com - est - da;
	const financiero = plan.canje.carga - plan.canje.rendimiento;
	const rai = ebit - financiero;
	const prov = provisionGanancias(rai, fxBna, cliente.tipoPersona ?? "fisica");
	const impuesto = prov.usd;
	const neto = rai - impuesto;
	const perHa = (n) => n / ha;
	return {
		er: [
			{
				id: "ing",
				label: "Ingresos por producción agrícola",
				nota: "Granos del planteo (rinde × precio)",
				total: ingresos,
				ha: perHa(ingresos)
			},
			{
				id: "vtp",
				label: "Valor total de la producción",
				nota: "Riqueza generada por el establecimiento",
				total: ingresos,
				ha: perHa(ingresos),
				strong: true
			},
			{
				id: "cd",
				label: "(−) Costos directos agrícolas",
				nota: "Semilla, fert, agro, labores, seguro y alquiler",
				total: -directos,
				ha: perHa(-directos)
			},
			{
				id: "mb",
				label: "Margen bruto agropecuario",
				nota: "Resultado directo de las actividades de campo",
				total: mb,
				ha: perHa(mb),
				strong: true
			},
			{
				id: "ten",
				label: "(+/−) Resultado por tenencia",
				nota: "Revalúo de granos en stock, USD/ha × ha. Cero si no se carga.",
				total: tenencia,
				ha: opts.tenenciaUsdHa,
				muted: tenencia === 0
			},
			{
				id: "ub",
				label: "Utilidad bruta total",
				nota: "Margen bruto ± tenencia",
				total: ub,
				ha: perHa(ub),
				strong: true
			},
			{
				id: "com",
				label: "(−) Gastos de comercialización",
				nota: "Flete, paritaria y comisión de acopio",
				total: -com,
				ha: perHa(-com)
			},
			{
				id: "est",
				label: "(−) Gastos de administración y estructura",
				nota: "Sueldos fijos, honorarios, impuestos fijos",
				total: -est,
				ha: perHa(-est),
				muted: est === 0
			},
			{
				id: "da",
				label: "(−) Depreciación y amortización",
				nota: "Máquinas, instalaciones y mejoras. USD/ha × ha. Cero si no se carga.",
				total: -da,
				ha: perHa(-da),
				muted: da === 0
			},
			{
				id: "ebit",
				label: "Resultado operativo (EBITDA)",
				nota: "Después de estructura, depreciación y amortización; antes de financieros",
				total: ebit,
				ha: perHa(ebit),
				strong: true
			},
			{
				id: "fin",
				label: "(+/−) Resultado financiero",
				nota: "Carga de canje menos rendimiento de colocación",
				total: -financiero,
				ha: perHa(-financiero),
				muted: financiero === 0
			},
			{
				id: "rai",
				label: "Resultado antes de impuestos",
				nota: "Base de la provisión de Ganancias",
				total: rai,
				ha: perHa(rai),
				strong: true
			},
			{
				id: "imp",
				label: "(−) Impuesto a las Ganancias",
				nota: prov.nota,
				total: -impuesto,
				ha: perHa(-impuesto),
				muted: impuesto === 0
			},
			{
				id: "neto",
				label: "Resultado neto del ejercicio",
				nota: "RAI − provisión Ganancias ARCA 2026",
				total: neto,
				ha: perHa(neto),
				strong: true
			}
		],
		ingresos,
		mb,
		ebit,
		rai,
		neto,
		financiero,
		impuesto,
		impuestoPct: prov.alicuota,
		impuestoNota: prov.nota
	};
}
function buildInforme(cliente, escenario, opts) {
	const cadenas = CROPS.map((c) => cadenaDe(escenario, c.id, opts.estructuraUsdHa, opts.depreciacionUsdHa)).filter((x) => x !== null);
	if (!cadenas.length) return null;
	const ha = cadenas.reduce((a, c) => a + c.ha, 0);
	const plan = planFinanciero(escenario);
	const er = erDe(cadenas, plan, opts, cliente, escenario.fxBna);
	const matrix = FACTORS.map((yf) => FACTORS.map((pf) => {
		let next = escenario;
		for (const c of cadenas) next = patchCrop(next, c.crop, c.rinde * yf, c.precioQq * pf);
		return ebitHaFarm(next, opts.estructuraUsdHa, opts.depreciacionUsdHa);
	}));
	const base = matrix[1][1];
	const porCultivo = {};
	for (const c of cadenas) {
		const m = FACTORS.map((yf) => FACTORS.map((pf) => cadenaDe(patchCrop(escenario, c.crop, c.rinde * yf, c.precioQq * pf), c.crop, opts.estructuraUsdHa, opts.depreciacionUsdHa)?.ebit ?? 0));
		porCultivo[c.crop] = {
			matrix: m,
			deltaP: m[1][2] - m[1][1],
			deltaR: m[2][1] - m[1][1]
		};
	}
	return {
		cliente,
		escenario,
		cadenas,
		ha,
		...er,
		tenenciaUsdHa: opts.tenenciaUsdHa,
		estructuraUsdHa: opts.estructuraUsdHa,
		depreciacionUsdHa: opts.depreciacionUsdHa,
		plan,
		matrix,
		deltaPrecio10: matrix[1][2] - base,
		deltaRinde10: matrix[2][1] - base,
		tornillo: Math.abs(matrix[1][2] - base) >= Math.abs(matrix[2][1] - base) ? "precio" : "rinde",
		porCultivo,
		taxSens: buildTaxSens(escenario, cadenas, opts, cliente, er.financiero),
		valorHaUsd: opts.valorHaUsd,
		roi: roiDe(cadenas, ha, opts, plan, er)
	};
}
function comentariosDe(inf) {
	const { cadenas, ha, ingresos, mb, ebit, neto, plan } = inf;
	const mix = cadenas.map((c) => `${num(c.ha, 0)} ha de ${c.label.toLowerCase()} (${num(c.rinde, 0)} qq/ha a ${num(c.precioQq, 2)} USD/qq)`).join(", ");
	const mbPct = ingresos > 0 ? mb / ingresos : 0;
	const p1 = `${inf.cliente.nombre}, ${inf.escenario.nombre} (${inf.escenario.campana}): ${mix}. Valor de la producción ${usd(ingresos, 0)} (${usd(ha > 0 ? ingresos / ha : 0, 0)}/ha). Margen bruto ${usd(mb, 0)} (${usd(ha > 0 ? mb / ha : 0, 0)}/ha, ${num(mbPct * 100, 0)}% del ingreso). Resultado operativo (EBITDA) ${usd(ebit, 0)} (${usd(ha > 0 ? ebit / ha : 0, 0)}/ha)${neto !== ebit ? `; neto ${usd(neto, 0)}` : ""}.`;
	const p2 = `Línea de indiferencia (costo total ÷ precio). ${cadenas.map((c) => {
		const ratio = c.rinde > 0 ? c.ri / c.rinde : 0;
		const holgura = ratio <= .55 ? "holgado" : ratio <= .75 ? "razonable" : ratio <= .9 ? "ajustado" : "crítico";
		return `${c.label}: indiferencia ${num(c.ri, 1)} qq/ha contra rinde ${num(c.rinde, 0)} (colchón ${num(c.rinde - c.ri, 1)} qq, ${holgura})`;
	}).join(". ")}. Por debajo de ese rinde el lote no cubre costos operativos a este precio.`;
	const p3 = `Sensibilidad ±10%: un recorte de precio deja el operativo en ${usd(inf.matrix[1]?.[0] ?? 0, 0)}/ha; un recorte de rinde, ${usd(inf.matrix[0]?.[1] ?? 0, 0)}/ha. El escenario peor (ambos −10%) da ${usd(inf.matrix[0]?.[0] ?? 0, 0)}/ha. En este planteo mueve más ${inf.tornillo === "precio" ? "el precio de pizarra" : "el rinde"}.`;
	const p4 = plan.capitalTrabajo > 0 ? `Caja: capital de trabajo ${usd(plan.capitalTrabajo, 0)}${plan.picoMes ? ` (pico ${plan.picoMes.label})` : ""}. Equivale a ${num(plan.qqGap, 0)} qq al precio ponderado.` : `Caja: no aparece hueco de financiamiento en el flujo mensual.`;
	const tight = cadenas.filter((c) => c.rinde > 0 && c.ri / c.rinde > .75);
	return [
		p1,
		p2,
		p3,
		p4,
		ebit < 0 ? "El resultado operativo (EBITDA) da negativo: bajar alquiler o recortar paquete de insumos antes de sembrar." : tight.length ? `Atención en ${tight.map((c) => c.label.toLowerCase()).join(" y ")}: el colchón de rinde es chico.` : "El colchón de rinde es suficiente para bancar un año regular.",
		inf.impuesto > 0 ? `Ganancias: provisión ${usd(inf.impuesto, 0)} (${inf.impuestoNota}). Neto ${usd(inf.neto, 0)}.` : "Ganancias: sin provisión (RAI nulo o negativo).",
		inf.roi.tierraUsd > 0 ? `Tierra: ${usd(inf.roi.valorHaUsd, 0)}/ha × ${num(ha, 0)} ha = ${usd(inf.roi.tierraUsd, 0)} inmovilizados. ROI neto ${inf.roi.roiNeto != null ? num(inf.roi.roiNeto * 100, 1) + "%" : "—"}; ROI operativo ${inf.roi.roiEbit != null ? num(inf.roi.roiEbit * 100, 1) + "%" : "—"}${inf.roi.paybackNeto != null ? `; payback ${num(inf.roi.paybackNeto, 1)} años sobre el neto` : ""}.` : ""
	].filter(Boolean).join("\n\n");
}
var INP = "h-11 w-full rounded-md bg-paper-2 px-3 text-sm tabular hair";
var PAGES = 6;
function Page$1({ n, of, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "informe-page relative mt-4 overflow-hidden rounded-xl bg-cream p-5 hair sm:p-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "informe-wm",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Agro Planeamiento" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confidencial" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Agro Planeamiento" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confidencial" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] font-medium tracking-[0.18em] text-ink-soft uppercase",
				children: [
					"Hoja ",
					n,
					" / ",
					of
				]
			}), children]
		})]
	});
}
function InformeDesk() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [clientes, setClientes] = (0, import_react.useState)([]);
	const [escenarios, setEscenarios] = (0, import_react.useState)([]);
	const [src, setSrc] = (0, import_react.useState)(null);
	const [estructura, setEstructura] = (0, import_react.useState)(0);
	const [tenencia, setTenencia] = (0, import_react.useState)(0);
	const [depreciacion, setDepreciacion] = (0, import_react.useState)(0);
	const [valorHa, setValorHa] = (0, import_react.useState)(0);
	const [reco, setReco] = (0, import_react.useState)("");
	const [recoEditado, setRecoEditado] = (0, import_react.useState)(false);
	const [fotos, setFotos] = (0, import_react.useState)([]);
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [msg, setMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const pull = () => {
			setClientes(loadClientes());
			setEscenarios(loadEscenarios());
			setSrc(loadInformeSource());
			setFotos(loadFotos());
		};
		pull();
		window.addEventListener(ESTUDIO_EVENT, pull);
		window.addEventListener("focus", pull);
		return () => {
			window.removeEventListener(ESTUDIO_EVENT, pull);
			window.removeEventListener("focus", pull);
		};
	}, [pathname]);
	const cliente = clientes.find((c) => c.id === src?.clienteId) ?? clientes.find((c) => !c.archived) ?? clientes[0];
	const delCliente = escenarios.filter((e) => e.clienteId === cliente?.id);
	const escenario = delCliente.find((e) => e.id === src?.escenarioId) ?? delCliente[0];
	const informe = (0, import_react.useMemo)(() => cliente && escenario ? buildInforme(cliente, escenario, {
		estructuraUsdHa: estructura,
		tenenciaUsdHa: tenencia,
		depreciacionUsdHa: depreciacion,
		valorHaUsd: valorHa
	}) : null, [
		cliente,
		cliente?.tipoPersona,
		escenario,
		estructura,
		tenencia,
		depreciacion,
		valorHa
	]);
	const openFoto = fotos.find((f) => f.id === openId) ?? null;
	const view = informe && openFoto ? conFoto(informe, openFoto) : informe;
	(0, import_react.useEffect)(() => {
		setRecoEditado(false);
	}, [cliente?.id, escenario?.id]);
	(0, import_react.useEffect)(() => {
		if (!informe) return;
		if (openFoto) {
			setReco(openFoto.reco.trim() || comentariosDe(conFoto(informe, openFoto)));
			return;
		}
		if (!recoEditado) setReco(comentariosDe(informe));
	}, [
		informe,
		openFoto,
		recoEditado
	]);
	function guardar() {
		if (!cliente || !escenario || !informe) return;
		const row = freezeFoto({
			clienteId: cliente.id,
			escenarioId: escenario.id,
			titulo: `${cliente.nombre} · ${escenario.nombre}`,
			reco: reco.slice(0, 1600),
			estructuraUsdHa: estructura,
			tenenciaUsdHa: tenencia,
			depreciacionUsdHa: depreciacion,
			valorHaUsd: valorHa,
			impuestoPct: informe.impuestoPct,
			snap: {
				ha: informe.ha,
				ingresos: informe.ingresos,
				mb: informe.mb,
				ebit: informe.ebit,
				rai: informe.rai,
				neto: informe.neto,
				financiero: informe.financiero,
				impuesto: informe.impuesto,
				er: informe.er,
				cadenas: informe.cadenas,
				matrix: informe.matrix,
				deltaPrecio10: informe.deltaPrecio10,
				deltaRinde10: informe.deltaRinde10,
				tornillo: informe.tornillo,
				porCultivo: informe.porCultivo,
				capitalTrabajo: informe.plan.capitalTrabajo,
				qqGap: informe.plan.qqGap,
				picoLabel: informe.plan.picoMes?.label ?? null,
				taxSens: informe.taxSens,
				roi: informe.roi,
				valorHaUsd: valorHa
			}
		});
		setFotos(loadFotos());
		setOpenId(row.id);
		setMsg(`Foto guardada · ${new Date(row.at).toLocaleString("es-AR")}`);
	}
	function abrirFoto(f) {
		setOpenId(f.id);
		setEstructura(f.estructuraUsdHa);
		setTenencia(f.tenenciaUsdHa);
		setDepreciacion(f.depreciacionUsdHa ?? 0);
		setValorHa(f.valorHaUsd ?? f.snap.valorHaUsd ?? 0);
		setReco(f.reco);
		setRecoEditado(true);
	}
	function borrarFoto(id) {
		dropFoto(id);
		if (openId === id) setOpenId(null);
		setFotos(loadFotos());
	}
	if (!cliente || !escenario || !informe || !view) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "print:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { active: "informe" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "page-main page-main-readable",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "Estado de resultados"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-ink-soft",
					children: "No hay un escenario abierto. En Clientes elegí el planteo y tocá Generar informe."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/clientes",
					className: "mt-6 inline-flex h-11 items-center rounded-md bg-forest px-4 text-sm text-cream",
					children: "Ir a Clientes"
				})
			]
		})]
	});
	const hoy = (/* @__PURE__ */ new Date()).toLocaleDateString("es-AR");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "print:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { active: "informe" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "page-main page-main-readable",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "print:hidden flex flex-wrap items-center gap-2 border-b border-line pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/clientes",
							className: "inline-flex h-11 items-center px-2 text-sm text-ink-soft hover:text-ink",
							children: "← Clientes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => window.print(),
							children: "Imprimir / PDF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: guardar,
							children: "Guardar foto"
						}),
						msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-forest",
							children: msg
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: "Estructura USD/ha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 w-24 rounded-md bg-cream px-3 text-sm tabular hair",
								type: "number",
								value: estructura || "",
								placeholder: "0",
								onChange: (e) => setEstructura(Number(e.target.value) || 0)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: "Depreciación USD/ha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 w-28 rounded-md bg-cream px-3 text-sm tabular hair",
								type: "number",
								value: depreciacion || "",
								placeholder: "0",
								onChange: (e) => setDepreciacion(Number(e.target.value) || 0)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: "Tenencia USD/ha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 w-28 rounded-md bg-cream px-3 text-sm tabular hair",
								type: "number",
								value: tenencia || "",
								placeholder: "0",
								onChange: (e) => setTenencia(Number(e.target.value) || 0)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: "Valor ha USD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 w-28 rounded-md bg-cream px-3 text-sm tabular hair",
								type: "number",
								value: valorHa || "",
								placeholder: "0",
								onChange: (e) => setValorHa(Number(e.target.value) || 0)
							})]
						})
					]
				}),
				openFoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "print:hidden mt-3 flex flex-wrap items-center gap-2 rounded-md bg-cream px-3 py-2 text-sm hair",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Viendo foto del ",
						new Date(openFoto.at).toLocaleString("es-AR"),
						" · los números no cambian si editás el escenario."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => {
							setOpenId(null);
							setRecoEditado(false);
						},
						children: "Volver al vivo"
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tapa, {
					informe: view,
					hoy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detalle, { cadenas: view.cadenas }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sensibilidad, { informe: view }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxHeat, { informe: view }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roi, { informe: view }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cierre, {
					informe: view,
					reco,
					onReco: (v) => {
						setRecoEditado(true);
						setReco(v);
					},
					onRegenerar: () => {
						setReco(comentariosDe(view));
						setRecoEditado(false);
					},
					hoy,
					picoLabel: openFoto?.snap.picoLabel ?? view.plan.picoMes?.label ?? null
				}),
				fotos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "print:hidden mt-6 rounded-xl bg-cream p-4 hair",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg",
							children: "Fotos guardadas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-ink-soft",
							children: "Congelan márgenes, tenencia, estructura, depreciación, valor de la hectárea y la nota. Se pueden reabrir o borrar."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1.5",
							children: fotos.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: cn("inline-flex min-h-11 min-w-0 flex-1 items-center justify-between rounded-md px-3 text-left text-sm", openId === f.id ? "bg-forest text-cream" : "hair hover:bg-paper-2"),
									onClick: () => abrirFoto(f),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: f.titulo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-3 shrink-0 text-xs opacity-80",
										children: new Date(f.at).toLocaleString("es-AR")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => borrarFoto(f.id),
									children: "Borrar"
								})]
							}, f.id))
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "print:hidden mt-6 text-xs text-ink-faint",
					children: "Guardar foto deja una copia de este estado de resultados en este dispositivo, para consultarla después."
				})
			]
		})]
	});
}
function Tapa({ informe, hoy }) {
	const { cliente, escenario } = informe;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		n: 1,
		of: PAGES,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "size-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.22em] text-forest uppercase",
					children: "Agro Planeamiento"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.08] font-medium tracking-[-0.03em]",
				children: "Estado de resultados agropecuario"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: [
					cliente.nombre,
					" · ",
					labelTipoPersona(cliente.tipoPersona),
					" · ",
					cliente.zona,
					" · ",
					escenario.nombre,
					" · campaña ",
					escenario.campana,
					" · ",
					hoy
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Margen bruto",
						value: usd(informe.mb, 0),
						hint: `${usd(informe.ha ? informe.mb / informe.ha : 0, 0)}/ha`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Resultado operativo (EBITDA)",
						value: usd(informe.ebit, 0),
						hint: `${usd(informe.ha ? informe.ebit / informe.ha : 0, 0)}/ha`,
						tone: informe.ebit >= 0 ? "up" : "down"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Resultado neto",
						value: usd(informe.neto, 0),
						hint: `${usd(informe.ha ? informe.neto / informe.ha : 0, 0)}/ha`,
						tone: informe.neto >= 0 ? "up" : "down"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3",
								children: "Concepto / línea de resultado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "USD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "USD/ha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2",
								children: "Notas"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: informe.er.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErRow, { line }, line.id)) })]
				})
			})
		]
	});
}
function Detalle({ cadenas }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		n: 2,
		of: PAGES,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: "Costos directos por cultivo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-ink-soft",
				children: "USD/ha. El alquiler entra en costos directos, como en el estado de resultados."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-line text-[11px] font-medium tracking-wide text-ink-soft uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 text-left",
							children: "Línea"
						}), cadenas.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 text-right",
							children: c.label
						}, c.crop))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "Ingresos por producción",
							vals: cadenas.map((c) => c.ib)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Semilla",
							vals: cadenas.map((c) => -c.semilla)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Fertilizantes",
							vals: cadenas.map((c) => -c.fert)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Agroquímicos",
							vals: cadenas.map((c) => -c.agro)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Labores (incluye cosecha)",
							vals: cadenas.map((c) => -c.labores)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Seguro",
							vals: cadenas.map((c) => -c.seguro)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Alquiler",
							vals: cadenas.map((c) => -c.alquiler)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "Margen bruto agropecuario",
							vals: cadenas.map((c) => c.mb),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Comercialización y flete",
							vals: cadenas.map((c) => -c.comercializacion)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Estructura",
							vals: cadenas.map((c) => -c.estructura)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "(−) Depreciación y amortización",
							vals: cadenas.map((c) => -c.depreciacion)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "Resultado operativo (EBITDA)",
							vals: cadenas.map((c) => c.ebit),
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
							k: "Rinde indiferencia qq/ha",
							vals: cadenas.map((c) => c.ri),
							raw: true
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-ink-faint",
				children: "Tenencia, financieros e impuesto van solo en el total del establecimiento (hoja 1)."
			})
		]
	});
}
function Sensibilidad({ informe }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		n: 3,
		of: PAGES,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: "Sensibilidad"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-ink-soft",
				children: "Resultado operativo (EBITDA) USD/ha si se mueve rinde y precio ±10%. Cosecha, seguro, comercialización, estructura y depreciación viajan fijos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full max-w-md text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-line text-[11px] font-medium tracking-wide text-ink-soft uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-left",
								children: "Rinde \\ Precio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "−10%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "Base"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: "+10%"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
						"−10%",
						"Base",
						"+10%"
					].map((lab, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-ink-soft",
							children: lab
						}), informe.matrix[i].map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("py-2 text-right tabular", i === 1 && j === 1 && "font-medium", v < 0 && "text-down"),
							children: usd(v, 0)
						}, j))]
					}, lab)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-ink-soft",
				children: [
					"Δ precio +10% ",
					usd(informe.deltaPrecio10, 0),
					"/ha · Δ rinde +10% ",
					usd(informe.deltaRinde10, 0),
					"/ha · lo que más mueve el resultado es el ",
					informe.tornillo,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2",
				children: informe.cadenas.map((c) => {
					const m = informe.porCultivo[c.crop];
					if (!m) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [c.label, " · EBITDA/ha"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: "mt-1 w-full text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: m.matrix.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-line/60",
							children: row.map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("py-1 text-right tabular", i === 1 && j === 1 && "font-medium", v < 0 && "text-down"),
								children: usd(v, 0)
							}, j))
						}, i)) })
					})] }, c.crop);
				})
			})
		]
	});
}
function stepLab(n) {
	if (n === 0) return "Base";
	return `${n > 0 ? "+" : "−"}${Math.abs(n * 100).toFixed(0)}%`;
}
function fmtRatio(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	return `${num(n * 100, 1)}%`;
}
function heatFill(v, min, max) {
	if (v == null || min == null || max == null) return void 0;
	const span = max - min;
	const t = span < 1e-6 ? .5 : (v - min) / span;
	const lerp = (a, b, p) => Math.round(a + (b - a) * p);
	const lo = [
		99,
		190,
		123
	];
	const mid = [
		255,
		235,
		132
	];
	const hi = [
		248,
		105,
		107
	];
	const mix = (a, b, p) => `rgb(${lerp(a[0], b[0], p)},${lerp(a[1], b[1], p)},${lerp(a[2], b[2], p)})`;
	return t <= .5 ? mix(lo, mid, t * 2) : mix(mid, hi, (t - .5) * 2);
}
function TaxHeat({ informe }) {
	const t = informe.taxSens;
	const mid = Math.floor(t.steps.length / 2);
	const tipo = labelTipoPersona(informe.cliente.tipoPersona);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		n: 4,
		of: PAGES,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: "Impuesto a las Ganancias / RAI"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-ink-soft",
				children: [
					"Alícuota efectiva de ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-ink",
						children: tipo
					}),
					": Ganancias ÷ resultado antes de impuestos, escala ARCA 2026. Precio del cereal en el eje X, rinde en el Y, de a 2% hasta ±10%."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Base",
						value: fmtRatio(t.base),
						hint: "planteo actual"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Mínimo en la grilla",
						value: fmtRatio(t.min)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Máximo en la grilla",
						value: fmtRatio(t.max)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "tax-heat w-full min-w-[640px] text-[11px] sm:text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2 text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
						children: "Rinde \\ Precio"
					}), t.steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-0.5 py-2 text-center text-[10px] font-medium tracking-wide text-ink-soft uppercase",
						children: stepLab(s)
					}, s))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: t.steps.map((yf, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-1 pr-2 text-ink-soft",
						children: stepLab(yf)
					}), t.ratio[i].map((v, j) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("px-0.5 py-1.5 text-center tabular", i === mid && j === mid && "font-medium"),
							style: { backgroundColor: heatFill(v, t.min, t.max) },
							children: fmtRatio(v)
						}, j);
					})] }, yf)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-3 text-[11px] text-ink-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "inline-block size-3 rounded-sm",
							style: { background: "#63BE7B" }
						}), " menor presión"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "inline-block size-3 rounded-sm",
							style: { background: "#FFEB84" }
						}), " media"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "inline-block size-3 rounded-sm",
							style: { background: "#F8696B" }
						}), " mayor presión"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Si RAI ≤ 0 la celda queda vacía (sin Ganancias)." })
				]
			})
		]
	});
}
function fmtRoi(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	return `${num(n * 100, 1)}%`;
}
function fmtRoiLine(line) {
	if (line.valor == null || !Number.isFinite(line.valor)) return "—";
	if (line.fmt === "usd") return usd(line.valor, 0);
	if (line.fmt === "years") return `${num(line.valor, 1)} años`;
	return fmtRoi(line.valor);
}
function Roi({ informe }) {
	const r = informe.roi;
	const loaded = r.valorHaUsd > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		n: 5,
		of: PAGES,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: "ROI sobre la tierra"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-ink-soft",
				children: [
					"Qué porcentaje deja tener inmovilizados los USD en el campo. Valor de la hectárea × ",
					num(informe.ha, 0),
					" ha.",
					loaded ? ` Tierra a ${usd(r.valorHaUsd, 0)}/ha.` : " Cargá el valor de la hectárea arriba."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Capital en tierra",
						value: loaded ? usd(r.tierraUsd, 0) : "—",
						hint: loaded ? `${usd(r.valorHaUsd, 0)}/ha` : "sin valor de ha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "ROI neto",
						value: fmtRoi(r.roiNeto),
						hint: "neto ÷ tierra",
						tone: r.roiNeto == null ? void 0 : r.roiNeto >= 0 ? "up" : "down"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "ROI operativo",
						value: fmtRoi(r.roiEbit),
						hint: "EBITDA ÷ tierra · cap rate",
						tone: r.roiEbit == null ? void 0 : r.roiEbit >= 0 ? "up" : "down"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Payback neto",
						value: r.paybackNeto != null ? `${num(r.paybackNeto, 1)} años` : "—",
						hint: "tierra ÷ resultado neto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "ROI sobre capital total",
						value: fmtRoi(r.roiNetoTotal),
						hint: "neto ÷ (tierra + capital de trabajo)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Rotación",
						value: fmtRoi(r.rotacion),
						hint: "ingresos ÷ tierra"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3",
								children: "Ratio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "Valor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2",
								children: "Cómo se lee"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: r.lineas.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: cn("border-b border-line/70", (line.id === "roi-neto" || line.id === "total") && "font-medium"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3",
								children: line.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("py-2 pr-3 text-right tabular", line.fmt === "pct" && line.valor != null && line.valor < 0 && "text-down", line.fmt === "pct" && line.valor != null && line.valor > 0 && "text-up"),
								children: fmtRoiLine(line)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-xs text-ink-faint",
								children: line.nota
							})
						]
					}, line.id)) })]
				})
			}),
			r.porCultivo.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: "Por cultivo · ROI operativo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "mt-2 w-full min-w-[520px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-line text-[11px] font-medium tracking-wide text-ink-soft uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-left",
								children: "Cultivo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "ha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "Tierra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right",
								children: "EBITDA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: "ROI"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: r.porCultivo.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3",
								children: c.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3 text-right tabular",
								children: num(c.ha, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3 text-right tabular",
								children: loaded ? usd(c.tierra, 0) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("py-2 pr-3 text-right tabular", c.ebit < 0 && "text-down"),
								children: usd(c.ebit, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("py-2 text-right tabular", c.roi != null && c.roi < 0 && "text-down", c.roi != null && c.roi > 0 && "text-up"),
								children: fmtRoi(c.roi)
							})
						]
					}, c.crop)) })]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-ink-faint",
				children: "Si el campo es propio, el alquiler no debería estar en costos: el retorno es sobre el valor de la tierra, no sobre un arrendamiento. Este ROI es de una campaña, sin revalúo de la hectárea."
			})
		]
	});
}
function Cierre({ informe, reco, onReco, onRegenerar, hoy, picoLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		n: 6,
		of: PAGES,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: "Campaña"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Valor de la producción",
						value: usd(informe.ingresos, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Resultado neto",
						value: usd(informe.neto, 0),
						tone: informe.neto >= 0 ? "up" : "down"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Capital de trabajo",
						value: usd(informe.plan.capitalTrabajo, 0),
						hint: picoLabel ? `pico ${picoLabel}` : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Qq gap",
						value: num(informe.plan.qqGap, 0),
						hint: "Gap USD ÷ precio ponderado"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-wide text-ink-soft uppercase",
							children: "Comentarios"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "print:hidden text-xs text-forest hover:underline",
							onClick: onRegenerar,
							children: "Regenerar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${INP} mt-2 min-h-44 py-3 print:hidden`,
						maxLength: 1600,
						value: reco,
						placeholder: "Se arman solos con los números del planteo.",
						onChange: (e) => onReco(e.target.value.slice(0, 1600))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 hidden whitespace-pre-wrap text-sm leading-relaxed print:block",
						children: reco.trim() || "Pendiente de carga"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-xs leading-relaxed text-ink-faint",
				children: [
					informe.cliente.nombre,
					" · ",
					labelTipoPersona(informe.cliente.tipoPersona),
					" · ",
					informe.escenario.nombre,
					" · ",
					hoy,
					". Documento de trabajo Agro Planeamiento. Tenencia, estructura, depreciación y valor de la hectárea se cargan arriba. Ganancias: escala ARCA 2026 de ",
					labelTipoPersona(informe.cliente.tipoPersona).toLowerCase(),
					", montos en ARS pasados a USD con el dólar BNA del escenario. Financieros = carga de canje − rendimiento. ROI = resultado ÷ capital inmovilizado en tierra."
				]
			})
		]
	});
}
function conFoto(live, foto) {
	const s = foto.snap;
	return {
		...live,
		ha: s.ha,
		ingresos: s.ingresos,
		mb: s.mb,
		ebit: s.ebit,
		rai: s.rai,
		neto: s.neto,
		financiero: s.financiero,
		impuesto: s.impuesto,
		er: s.er,
		cadenas: s.cadenas,
		matrix: s.matrix,
		deltaPrecio10: s.deltaPrecio10,
		deltaRinde10: s.deltaRinde10,
		tornillo: s.tornillo,
		porCultivo: s.porCultivo,
		tenenciaUsdHa: foto.tenenciaUsdHa,
		estructuraUsdHa: foto.estructuraUsdHa,
		depreciacionUsdHa: foto.depreciacionUsdHa ?? 0,
		valorHaUsd: foto.valorHaUsd ?? live.valorHaUsd,
		roi: s.roi ?? live.roi,
		impuestoPct: foto.impuestoPct,
		impuestoNota: live.impuestoNota,
		plan: {
			...live.plan,
			capitalTrabajo: foto.snap.capitalTrabajo,
			qqGap: foto.snap.qqGap
		},
		taxSens: s.taxSens ?? live.taxSens
	};
}
function ErRow({ line }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn("border-b border-line/70", line.strong && "font-medium", line.muted && "text-ink-faint"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 pr-3",
				children: line.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: cn("py-2 pr-3 text-right tabular", line.total < 0 && !line.strong && "text-ink-soft"),
				children: usd(line.total, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 pr-3 text-right tabular",
				children: usd(line.ha, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 text-xs text-ink-faint",
				children: line.nota
			})
		]
	});
}
function Sub({ k, vals, strong, raw }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn("border-b border-line/70", strong && "font-medium"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "py-1.5 pr-3",
			children: k
		}), vals.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: cn("py-1.5 pr-3 text-right tabular", v < 0 && !strong && "text-ink-soft"),
			children: raw ? num(v, 1) : usd(v, 0)
		}, i))]
	});
}
function Kpi({ label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper-2/50 p-3",
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
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InformeDesk, {}) });
}
//#endregion
export { Page as component };
