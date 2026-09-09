import { n as queuePersist } from "./require-auth-PJQJki3G.mjs";
import { S as lineUsdHa, f as calcularMargen, k as normalizeLine } from "./estudio-2GszQLWJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaign-store-CbgUnV4l.js
var MES = [
	"ene",
	"feb",
	"mar",
	"abr",
	"may",
	"jun",
	"jul",
	"ago",
	"sep",
	"oct",
	"nov",
	"dic"
];
var CAL = {
	trigo: {
		plant: [
			5,
			6,
			7
		],
		harvest: [12, 1]
	},
	maiz: {
		plant: [9, 10],
		harvest: [3, 4]
	},
	soja: {
		plant: [10, 11],
		harvest: [4, 5]
	}
};
var INSUMOS = /* @__PURE__ */ new Set([
	"semilla",
	"fertilizantes",
	"agroquimicos",
	"coadyuvantes"
]);
var SIEMBRA_FECHA_DEFAULT = {
	trigo: "2026-07-15",
	maiz: "2026-10-15",
	soja: "2026-11-15"
};
var SIEMBRA_IDX = {
	trigo: 2,
	maiz: 5,
	soja: 6
};
var PARTIDA_META = [
	{
		key: "grano",
		label: "Ingreso de grano",
		ingreso: true
	},
	{
		key: "rendimiento",
		label: "Rendimiento colocación",
		ingreso: true
	},
	{
		key: "insumos",
		label: "Insumos",
		ingreso: false
	},
	{
		key: "labores",
		label: "Labores",
		ingreso: false
	},
	{
		key: "seguro",
		label: "Seguro",
		ingreso: false
	},
	{
		key: "flete",
		label: "Flete",
		ingreso: false
	},
	{
		key: "cosechaCom",
		label: "Cosecha / comercialización",
		ingreso: false
	},
	{
		key: "alquiler",
		label: "Alquiler",
		ingreso: false
	},
	{
		key: "carga",
		label: "Carga financiera",
		ingreso: false
	}
];
function blankPartidas() {
	return {
		grano: 0,
		rendimiento: 0,
		insumos: 0,
		labores: 0,
		seguro: 0,
		flete: 0,
		cosechaCom: 0,
		alquiler: 0,
		carga: 0
	};
}
function waterfallDiff(from, to) {
	return PARTIDA_META.map(({ key, label, ingreso }) => {
		const a = to[key] - from[key];
		return {
			key,
			label,
			value: ingreso ? a : -a
		};
	}).filter((e) => Math.abs(e.value) >= .5);
}
function mesesCampana() {
	return Array.from({ length: 16 }, (_, i) => mesDe(i));
}
function mesDe(i) {
	const t = 4 + i;
	const y = 2026 + Math.floor(t / 12);
	const m = t % 12 + 1;
	return {
		i,
		y,
		m,
		key: `${y}-${String(m).padStart(2, "0")}`,
		label: `${MES[m - 1]}. ${String(y).slice(2)}`
	};
}
function fechaVtoCanje(i) {
	const { y, m } = mesDe(i);
	return new Date(y, m - 1, 20);
}
function fmtFecha(d) {
	const p = (n) => String(n).padStart(2, "0");
	return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}
function idxDeFecha(d) {
	return (d.getFullYear() - 2026) * 12 + d.getMonth() - 4;
}
function parseIso(s) {
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
	return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}
function siembraIdx(e, crop) {
	const d = parseIso(e.crops[crop]?.siembraFecha || SIEMBRA_FECHA_DEFAULT[crop]);
	if (d) {
		const i = idxDeFecha(d);
		if (Number.isFinite(i)) return Math.min(15, Math.max(0, i));
	}
	const sm = e.crops[crop]?.siembraMes;
	if (sm != null && Number.isFinite(Number(sm))) return Math.min(15, Math.max(0, Math.round(Number(sm))));
	return SIEMBRA_IDX[crop];
}
function harvestIdx(crop) {
	return CAL[crop].harvest.map((m) => m === 12 ? 7 : 7 + m);
}
function split(arr, idxs, amount) {
	if (!idxs.length || !amount) return;
	const p = amount / idxs.length;
	for (const i of idxs) if (i >= 0 && i < arr.length) arr[i] += p;
}
function daysBetween(a, b) {
	const n = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	return Math.max(0, Math.round(n / 864e5));
}
function lastHarvest(e) {
	let max = 0, any = false;
	[
		"maiz",
		"soja",
		"trigo"
	].forEach((c) => {
		const row = e.crops[c];
		if (!row.activo || !(row.ha > 0)) return;
		const h = harvestIdx(c);
		if (h.length) {
			any = true;
			max = Math.max(max, h[h.length - 1]);
		}
	});
	return any ? max : 12;
}
function canjeIdxOf(e) {
	const def = lastHarvest(e);
	let n = e.canjeMes == null ? def : Math.round(e.canjeMes);
	if (!Number.isFinite(n)) n = def;
	return Math.min(15, Math.max(0, n));
}
/** Defer insumos to canje date only if planting is before vto. If canje vence before/at siembra, that tramo pays at planting. */
function splitOrDefer(eg, idxs, amount, canje, vto) {
	let diferidos = 0;
	if (!(amount > 0) || !idxs.length) return diferidos;
	const o = amount / idxs.length;
	for (const n of idxs) {
		if (n < 0 || n >= 16) continue;
		if (!canje || vto <= n) {
			eg[n] += o;
			continue;
		}
		diferidos += o;
	}
	return diferidos;
}
function planFinanciero(e) {
	const crops = [
		"maiz",
		"soja",
		"trigo"
	].flatMap((crop) => {
		const row = e.crops[crop];
		if (!row.activo || !(row.ha > 0)) return [];
		const res = calcularMargen({
			crop,
			precioQq: row.precioQq,
			rinde: row.rinde,
			km: row.km,
			alquilerQq: row.alquilerQq,
			fxBna: e.fxBna,
			catalog: e.catalog
		});
		if (!res) return [];
		return [{
			crop,
			ha: row.ha,
			res,
			ingreso: res.ingresoBruto * row.ha,
			costos: (res.ingresoBruto - res.margenBruto) * row.ha,
			mb: res.margenBruto * row.ha
		}];
	});
	const ha = crops.reduce((a, c) => a + c.ha, 0);
	const ingresoCult = crops.reduce((a, c) => a + c.ingreso, 0);
	const costosCult = crops.reduce((a, c) => a + c.costos, 0);
	const mbCultivo = crops.reduce((a, c) => a + c.mb, 0);
	const rindeInd = {};
	for (const c of crops) rindeInd[c.crop] = c.res.rindeIndiferencia;
	const eg = Array.from({ length: 16 }, () => 0);
	const ing = Array.from({ length: 16 }, () => 0);
	const vto = canjeIdxOf(e);
	const tnaC = Math.max(0, e.canjeTna) / 100;
	const tnaR = Math.max(0, e.canjeRendTna) / 100;
	const hoy = /* @__PURE__ */ new Date();
	const fechaCanje = fechaVtoCanje(vto);
	const dias = e.canje ? daysBetween(hoy, fechaCanje) : 0;
	let diferidos = 0;
	const partidas = blankPartidas();
	for (const c of crops) {
		const plant = [siembraIdx(e, c.crop)];
		const harv = harvestIdx(c.crop);
		const mid = Math.round((plant.reduce((a, b) => a + b, 0) / plant.length + harv.reduce((a, b) => a + b, 0) / harv.length) / 2);
		let insumos = 0, seguro = 0, labores = 0, pulv = 0, cosecha = 0;
		for (const line of e.catalog.lines.filter((l) => l.crop === c.crop)) {
			const n = normalizeLine(line);
			const usdHa = lineUsdHa(n, e.crops[c.crop].precioQq, e.crops[c.crop].rinde) * c.ha;
			const name = n.name.toLowerCase();
			if (INSUMOS.has(n.group)) insumos += usdHa;
			else if (n.group === "seguro") seguro += usdHa;
			else if (name.includes("pulveriz")) pulv += usdHa;
			else if (n.kind === "pctIncome" || name.includes("cosecha")) cosecha += usdHa;
			else labores += usdHa;
		}
		split(eg, plant, labores);
		const p0 = plant[0];
		if (seguro && p0 >= 0 && p0 < 16) eg[p0] += seguro;
		diferidos += splitOrDefer(eg, plant, insumos, e.canje, vto);
		if (pulv) {
			if (mid >= 0 && mid < 16) eg[mid] += pulv;
			else split(eg, plant, pulv);
		}
		const flete = c.res.fleteUsdHa * c.ha;
		const com = c.res.comercializacion * c.ha;
		const alq = c.res.alquiler * c.ha;
		split(eg, harv, cosecha + flete + com + alq);
		partidas.grano += c.ingreso;
		partidas.insumos += insumos;
		partidas.labores += labores + pulv;
		partidas.seguro += seguro;
		partidas.flete += flete;
		partidas.cosechaCom += cosecha + com;
		partidas.alquiler += alq;
		if (e.venta === "50-60") {
			split(ing, harv, c.ingreso * .5);
			const last = harv[harv.length - 1] ?? 0;
			ing[Math.min(15, last + 2)] += c.ingreso * .5;
		} else split(ing, harv, c.ingreso);
	}
	const carga = e.canje && diferidos > 0 ? diferidos * tnaC * (dias / 365) : 0;
	const rend = e.canje && diferidos > 0 ? diferidos * tnaR * (dias / 365) : 0;
	if (e.canje && diferidos > 0 && vto >= 0 && vto < 16) {
		eg[vto] += diferidos + carga;
		const from = Math.min(Math.max(0, idxDeFecha(hoy)), vto);
		const n = Math.max(1, vto - from);
		if (rend) {
			const p = rend / n;
			for (let i = from; i < vto && i < 16; i++) ing[i] += p;
		}
	}
	partidas.rendimiento = rend;
	partidas.carga = carga;
	const flujo = [];
	let acum = 0;
	let pico = null;
	for (let i = 0; i < 16; i++) {
		const m = mesDe(i);
		const neto = ing[i] - eg[i];
		acum += neto;
		const row = {
			...m,
			ingreso: ing[i],
			egreso: eg[i],
			neto,
			acum
		};
		flujo.push(row);
		if (!pico || row.acum < pico.acum) pico = row;
	}
	const ingreso = ingresoCult + rend;
	const costos = costosCult + carga;
	const mb = mbCultivo - carga + rend;
	const ct = Math.max(0, pico ? -pico.acum : 0);
	let qqTot = 0, ingPond = 0;
	const qqGapPorCultivo = {};
	for (const c of crops) {
		const row = e.crops[c.crop];
		qqTot += row.rinde * c.ha;
		ingPond += c.ingreso;
		if (row.precioQq > 0) qqGapPorCultivo[c.crop] = ct / row.precioQq;
	}
	const precioPond = qqTot > 0 ? ingPond / qqTot : 0;
	return {
		crops,
		ha,
		ingreso,
		costos,
		mb,
		mbCultivo,
		mbHa: ha > 0 ? mb / ha : 0,
		rindeInd,
		flujo,
		picoMes: pico,
		capitalTrabajo: ct,
		qqGap: precioPond > 0 ? ct / precioPond : 0,
		precioPond,
		qqGapPorCultivo,
		canje: {
			on: e.canje,
			insumos: diferidos,
			carga,
			rendimiento: rend,
			meses: dias > 0 ? dias * 12 / 365 : 0,
			dias,
			hoy: fmtFecha(hoy),
			fechaCanje: fmtFecha(fechaCanje),
			canjeIdx: vto,
			canjeLabel: mesDe(vto).label,
			deltaContado: e.canje ? rend - carga : 0
		},
		partidas
	};
}
var LS_SRC = "dhf-informe-src-v1";
var LS_FOTOS = "dhf-informe-fotos-v2";
var LS_INPUT = "dhf-informe-input-v1";
function saveInformeSource(v) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(LS_SRC, JSON.stringify(v));
	queuePersist("informe_src", v);
}
function loadInformeSource() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(LS_SRC);
		if (!raw) return null;
		const t = JSON.parse(raw);
		return t?.clienteId && t?.escenarioId ? t : null;
	} catch {
		return null;
	}
}
function saveCampaignInput(v) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(LS_INPUT, JSON.stringify(v));
	queuePersist("campaign_input", v);
}
function loadFotos() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(LS_FOTOS);
		if (!raw) return [];
		const t = JSON.parse(raw);
		return Array.isArray(t) ? t.filter((x) => x && x.id && x.snap) : [];
	} catch {
		return [];
	}
}
function freezeFoto(e) {
	const row = {
		...e,
		id: `f-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
		at: (/* @__PURE__ */ new Date()).toISOString()
	};
	const list = [row, ...loadFotos()].slice(0, 20);
	window.localStorage.setItem(LS_FOTOS, JSON.stringify(list));
	queuePersist("fotos", list);
	return row;
}
function dropFoto(id) {
	const list = loadFotos().filter((f) => f.id !== id);
	window.localStorage.setItem(LS_FOTOS, JSON.stringify(list));
	queuePersist("fotos", list);
}
//#endregion
export { freezeFoto as a, mesesCampana as c, saveInformeSource as d, waterfallDiff as f, fmtFecha as i, planFinanciero as l, dropFoto as n, loadFotos as o, fechaVtoCanje as r, loadInformeSource as s, SIEMBRA_FECHA_DEFAULT as t, saveCampaignInput as u };
