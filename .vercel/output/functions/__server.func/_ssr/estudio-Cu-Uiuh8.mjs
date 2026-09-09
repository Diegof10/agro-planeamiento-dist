//#region node_modules/.nitro/vite/services/ssr/assets/estudio-Cu-Uiuh8.js
var bridge = null;
function setCatalogBridge(next) {
	bridge = next;
}
function bridgeLoad() {
	return bridge?.load() ?? null;
}
function bridgeSave(c) {
	return bridge?.save(c) ?? false;
}
function bridgeReset() {
	return bridge?.reset() ?? false;
}
var CROPS = [
	{
		id: "maiz",
		label: "Maíz"
	},
	{
		id: "soja",
		label: "Soja"
	},
	{
		id: "trigo",
		label: "Trigo"
	}
];
var GROUPS = [
	{
		id: "semilla",
		label: "Semilla"
	},
	{
		id: "agroquimicos",
		label: "Agroquímicos"
	},
	{
		id: "coadyuvantes",
		label: "Coadyuvantes"
	},
	{
		id: "fertilizantes",
		label: "Fertilizantes"
	},
	{
		id: "labores",
		label: "Labores"
	},
	{
		id: "seguro",
		label: "Seguro"
	}
];
var RINDE_DEFAULT = {
	maiz: 110,
	soja: 45,
	trigo: 40
};
var PRECIO_FALLBACK_QQ = {
	maiz: 18,
	soja: 26,
	trigo: 22
};
var FLETE_LARGO_ARS_T = 27095;
var LS_CATALOG = "dhf-margenes-catalog-v2";
var RULES = {
	maiz: {
		gastosPct: 3.5,
		alqFactor: 1.17,
		alqUsdQq: 0
	},
	soja: {
		gastosPct: 3,
		alqFactor: 1.12,
		alqUsdQq: 0
	},
	trigo: {
		gastosPct: 3,
		alqFactor: 0,
		alqUsdQq: 21
	}
};
var DEFAULT_FREIGHT = [
	{
		maxKm: 10,
		arsT: 7500
	},
	{
		maxKm: 15,
		arsT: 8119.99
	},
	{
		maxKm: 20,
		arsT: 9097.03
	},
	{
		maxKm: 25,
		arsT: 10061.11
	},
	{
		maxKm: 30,
		arsT: 11057
	},
	{
		maxKm: 35,
		arsT: 11885.54
	},
	{
		maxKm: 40,
		arsT: 12571.08
	},
	{
		maxKm: 45,
		arsT: 13280.97
	},
	{
		maxKm: 50,
		arsT: 14018.37
	},
	{
		maxKm: 55,
		arsT: 14681.91
	},
	{
		maxKm: 60,
		arsT: 15297.13
	},
	{
		maxKm: 65,
		arsT: 15930.41
	},
	{
		maxKm: 70,
		arsT: 16580.98
	},
	{
		maxKm: 75,
		arsT: 17253.56
	},
	{
		maxKm: 80,
		arsT: 17950.1
	},
	{
		maxKm: 85,
		arsT: 18673.35
	},
	{
		maxKm: 90,
		arsT: 19425.28
	},
	{
		maxKm: 95,
		arsT: 20209.82
	},
	{
		maxKm: 100,
		arsT: 21029.32
	}
];
function L(crop, group, name, dose, unit, usd, kind = "qty") {
	return {
		id: `${crop}-${group}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
		crop,
		group,
		name,
		dose,
		unitLabel: unit,
		usdUnit: usd,
		kind
	};
}
var DEFAULT_CATALOG = {
	freight: DEFAULT_FREIGHT,
	fleteLargoArsT: FLETE_LARGO_ARS_T,
	lines: [
		L("maiz", "semilla", "HIBRIDO", 1, "BOLSA", 160),
		L("maiz", "agroquimicos", "Glifosato", 4, "Lts", 4.7),
		L("maiz", "agroquimicos", "Dicamba", .2, "Lts", 7.48),
		L("maiz", "agroquimicos", "2-4 D EHE", 1.5, "Lts", 5.06),
		L("maiz", "agroquimicos", "Atrazina", 2, "Lts", 3.41),
		L("maiz", "agroquimicos", "Acuron", 1, "Lts", 38.5),
		L("maiz", "agroquimicos", "S-Metolacor", 1.2, "Lts", 6.38),
		L("maiz", "agroquimicos", "Lambdacialotrina SC", .1, "Lts", 17),
		L("maiz", "fertilizantes", "UREA", 250, "kg", .616),
		L("maiz", "fertilizantes", "Arrancador (12-40-0-5-1)", 70, "kg", 1.124),
		L("maiz", "labores", "Siembra", 1, "ha", 75),
		L("maiz", "labores", "Pulverizadora", 3, "ha", 7),
		L("maiz", "labores", "Cosecha", 8, "% ingreso", 0, "pctIncome"),
		L("maiz", "seguro", "Seguro", 2, "qq × precio", 0, "qqPrice"),
		L("soja", "semilla", "Semilla", 1.5, "Bolsa", 40),
		L("soja", "agroquimicos", "Glifosato", 4, "Lts", 4.7),
		L("soja", "agroquimicos", "2-4 D EHE", 1.5, "Lts", 5.06),
		L("soja", "agroquimicos", "Diclosulam", 30, "grs", .165),
		L("soja", "agroquimicos", "Atrazina", 2, "Lts", 3.41),
		L("soja", "agroquimicos", "FIERCE", .6, "Lts", 61.6),
		L("soja", "agroquimicos", "EMPIRIC", 2, "Lts", 5.04),
		L("soja", "agroquimicos", "GLUFOSINATO", 2, "Lts", 3.8),
		L("soja", "agroquimicos", "CLETODIM", 2, "Lts", 7.15),
		L("soja", "coadyuvantes", "METILADO", 2, "Lts", 2.57),
		L("soja", "coadyuvantes", "Full tec max", .2, "Lts", 29),
		L("soja", "agroquimicos", "Clorantra", .04, "Lts", 40),
		L("soja", "fertilizantes", "Arrancador (12-40-0-5-1)", 60, "kg", 1.124),
		L("soja", "agroquimicos", "Imida-Lambda", .3, "ha", 14),
		L("soja", "agroquimicos", "Fungicida", .5, "Lts", 14),
		L("soja", "labores", "Siembra", 1, "ha", 70),
		L("soja", "labores", "Pulverizadora", 5, "ha", 7),
		L("soja", "labores", "Cosecha", 8, "% ingreso", 0, "pctIncome"),
		L("soja", "seguro", "Seguro", 1.5, "qq × precio", 0, "qqPrice"),
		L("trigo", "semilla", "Semilla", 150, "Kg", .183),
		L("trigo", "agroquimicos", "Glifosato", 2, "Lts", 5.02),
		L("trigo", "agroquimicos", "2-4 D EHE", 1, "Lts", 5.06),
		L("trigo", "agroquimicos", "Dicamba", .2, "Lts", 7.92),
		L("trigo", "agroquimicos", "Metsulfurón", 10, "grs", .041),
		L("trigo", "agroquimicos", "Curasemilla", .2, "Lts", 17.8),
		L("trigo", "agroquimicos", "Coadyuvante", .4, "Lts", 29),
		L("trigo", "agroquimicos", "Imida-lambda", .25, "Lts", 15),
		L("trigo", "agroquimicos", "Fungicida", .5, "Kg", 14),
		L("trigo", "fertilizantes", "UREA", 200, "Kg", .617),
		L("trigo", "fertilizantes", "Arrancador (12-40-0-5-1)", 80, "Kg", 1.124),
		L("trigo", "labores", "Siembra", 1, "ha", 70),
		L("trigo", "labores", "Pulverizadora", 3, "ha", 7),
		L("trigo", "labores", "Cosecha", 8, "% ingreso", 0, "pctIncome"),
		L("trigo", "seguro", "Seguro", 1.5, "qq × precio", 0, "qqPrice")
	]
};
var UNITS = [
	"kg",
	"Kg",
	"Lts",
	"Bolsa",
	"BOLSA",
	"ha",
	"grs",
	"qq"
];
function makeLine(p) {
	return {
		...L(p.crop, p.group, p.name, p.dose, p.unitLabel, p.usdUnit),
		id: `${p.crop}-${p.group}-${p.name}-${Date.now().toString(36)}`.toLowerCase().replace(/[^a-z0-9]+/g, "-")
	};
}
function doseLabel(e) {
	const r = normalizeLine(e);
	if (r.kind === "qqPrice") return `${r.dose.toFixed(2)} qq × precio`;
	if (r.kind === "pctIncome") return `${r.dose.toFixed(1)} % ingreso`;
	return `${r.dose} ${r.unitLabel}`;
}
function pizarraQqFromLocal(local) {
	const r = local?.find((x) => /rosario/i.test(x.plaza)) ?? local?.[0];
	if (!r) return null;
	const out = {};
	if (r.soja && r.soja > 0) out.soja = r.soja / 10;
	if (r.maiz && r.maiz > 0) out.maiz = r.maiz / 10;
	if (r.trigo && r.trigo > 0) out.trigo = r.trigo / 10;
	return Object.keys(out).length ? out : null;
}
function normalizeLine(e) {
	const t = e.name.trim().toLowerCase();
	if (e.group === "seguro" || t === "seguro") return {
		...e,
		kind: "qqPrice",
		unitLabel: "qq × precio"
	};
	if (t.includes("cosecha")) {
		const oldTrigo = e.crop === "trigo" && e.kind !== "pctIncome" && e.dose === 3.2;
		return {
			...e,
			kind: "pctIncome",
			dose: oldTrigo ? 8 : e.dose,
			unitLabel: "% ingreso",
			usdUnit: 0
		};
	}
	return e;
}
function lineUsdHa(e, precioQq, rinde) {
	const r = normalizeLine(e);
	if (r.kind === "pctIncome") return rinde * precioQq * (r.dose / 100);
	if (r.kind === "qqPrice") return r.dose * precioQq;
	return r.dose * r.usdUnit;
}
function parseFleteLargo(v) {
	const n = Number(v);
	return Number.isFinite(n) && n >= 0 ? n : FLETE_LARGO_ARS_T;
}
function cloneCatalog(c = DEFAULT_CATALOG) {
	return {
		lines: c.lines.map((l) => ({ ...normalizeLine(l) })),
		freight: c.freight.map((r) => ({ ...r })),
		fleteLargoArsT: parseFleteLargo(c.fleteLargoArsT)
	};
}
function parseCatalog(x) {
	if (!x || typeof x !== "object") return null;
	const t = x;
	if (!Array.isArray(t.lines)) return null;
	return cloneCatalog({
		lines: t.lines.filter(Boolean),
		freight: Array.isArray(t.freight) ? t.freight : DEFAULT_FREIGHT,
		fleteLargoArsT: parseFleteLargo(t.fleteLargoArsT)
	});
}
function loadCatalog() {
	const bridged = bridgeLoad();
	if (bridged) return bridged;
	if (typeof window === "undefined") return DEFAULT_CATALOG;
	try {
		const raw = window.localStorage.getItem(LS_CATALOG);
		return raw ? parseCatalog(JSON.parse(raw)) ?? DEFAULT_CATALOG : DEFAULT_CATALOG;
	} catch {
		return DEFAULT_CATALOG;
	}
}
var catalogListeners = /* @__PURE__ */ new Set();
function notifyCatalog() {
	catalogListeners.forEach((fn) => fn());
}
function onCatalogChange(fn) {
	catalogListeners.add(fn);
	return () => {
		catalogListeners.delete(fn);
	};
}
function saveCatalog(c) {
	if (bridgeSave(c)) {
		notifyCatalog();
		return;
	}
	window.localStorage.setItem(LS_CATALOG, JSON.stringify(c));
	notifyCatalog();
}
function resetCatalog() {
	if (bridgeReset()) {
		notifyCatalog();
		return;
	}
	window.localStorage.removeItem(LS_CATALOG);
	notifyCatalog();
}
function fleteCortoArsT(km, freight) {
	const n = Number.isFinite(km) ? Math.max(0, km) : 0;
	const rows = [...freight].sort((a, b) => a.maxKm - b.maxKm);
	for (const r of rows) if (n <= r.maxKm) return r.arsT;
	return rows[rows.length - 1]?.arsT ?? 0;
}
function alquilerUsdHa(crop, qq, precioQq) {
	const r = RULES[crop];
	return qq * (r.alqFactor * precioQq + r.alqUsdQq);
}
function calcularMargen(input) {
	const { crop, precioQq, rinde, km, alquilerQq, fxBna, catalog } = input;
	if (!(precioQq > 0) || !(rinde >= 0) || !(fxBna > 0)) return null;
	const ib = rinde * precioQq;
	const corto = fleteCortoArsT(km, catalog.freight);
	const largo = parseFleteLargo(catalog.fleteLargoArsT);
	const fleteUsdT = (corto + largo) / fxBna;
	const fleteUsdHa = rinde * fleteUsdT / 10;
	const com = ib * (RULES[crop].gastosPct / 100);
	const groups = {
		semilla: 0,
		agroquimicos: 0,
		coadyuvantes: 0,
		fertilizantes: 0,
		labores: 0,
		seguro: 0,
		flete: fleteUsdHa,
		gastos: com
	};
	const lineUsd = [];
	for (const l of catalog.lines.filter((x) => x.crop === crop)) {
		const u = lineUsdHa(l, precioQq, rinde);
		lineUsd.push({
			id: l.id,
			usdHa: u
		});
		groups[l.group] += u;
	}
	const directos = groups.semilla + groups.agroquimicos + groups.coadyuvantes + groups.fertilizantes + groups.labores + groups.seguro;
	const alquiler = alquilerUsdHa(crop, alquilerQq, precioQq);
	const total = com + fleteUsdHa + directos + alquiler;
	return {
		ingresoBruto: ib,
		comercializacion: com,
		fleteUsdT,
		fleteUsdHa,
		fleteCortoArsT: corto,
		fleteLargoArsT: largo,
		directos,
		alquiler,
		margenBruto: ib - total,
		rindeIndiferencia: precioQq > 0 ? total / precioQq : 0,
		groups,
		lineUsd
	};
}
function labelTipoPersona(t) {
	return t === "juridica" ? "Persona jurídica" : "Persona física";
}
var LS_CLIENTES = "dhf-estudio-clientes-v1";
var LS_ESCENARIOS = "dhf-estudio-escenarios-v1";
var LS_OPEN = "dhf-estudio-open-v1";
var LS_ESTUDIO_AT = "dhf-estudio-updated-at";
var ESTUDIO_EVENT = "dhf-estudio-updated";
var ZONA_DEFAULT = "Marcos Juárez";
var CAMPANA_DEFAULT = "2026/27";
var FX_BNA_FALLBACK = 1530;
var CROP_LABEL = {
	maiz: "Maíz",
	soja: "Soja",
	trigo: "Trigo"
};
var CLIENTE_SEED_ID = "campo-propio-dhf";
var ESCENARIO_SEED_ID = "base-2026-27";
function uid() {
	return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function defaultCrops() {
	const row = (key, activo, ha) => ({
		activo,
		ha,
		rinde: RINDE_DEFAULT[key],
		precioQq: PRECIO_FALLBACK_QQ[key],
		km: 15,
		alquilerQq: 0,
		precioManual: false,
		siembraMes: null,
		siembraFecha: null
	});
	return {
		soja: row("soja", true, 100),
		maiz: row("maiz", false, 0),
		trigo: row("trigo", false, 0)
	};
}
function seedCliente() {
	return {
		id: CLIENTE_SEED_ID,
		nombre: "Campo propio",
		zona: ZONA_DEFAULT,
		notas: "",
		ha: null,
		archived: false,
		tipoPersona: "fisica"
	};
}
function seedEscenario() {
	return {
		id: ESCENARIO_SEED_ID,
		clienteId: CLIENTE_SEED_ID,
		nombre: "Base 2026/27",
		campana: CAMPANA_DEFAULT,
		venta: "100",
		fxBna: FX_BNA_FALLBACK,
		catalog: cloneCatalog(DEFAULT_CATALOG),
		crops: defaultCrops(),
		canje: false,
		canjeMes: null,
		canjeTna: 0,
		canjeRendTna: 0,
		canjeColocacion: "plazo fijo",
		snapshotAt: null
	};
}
function emptyCliente() {
	return {
		id: uid(),
		nombre: "Nuevo cliente",
		zona: ZONA_DEFAULT,
		notas: "",
		ha: null,
		archived: false,
		tipoPersona: "fisica"
	};
}
function emptyEscenario(clienteId, nombre = "Base 2026/27") {
	return {
		...seedEscenario(),
		id: uid(),
		clienteId,
		nombre
	};
}
function parseCliente(x) {
	if (!x || typeof x !== "object") return null;
	const o = x;
	if (typeof o.id !== "string" || typeof o.nombre !== "string") return null;
	const ha = o.ha == null || o.ha === "" ? null : Number(o.ha);
	return {
		id: o.id,
		nombre: o.nombre,
		zona: typeof o.zona === "string" && o.zona ? o.zona : ZONA_DEFAULT,
		notas: typeof o.notas === "string" ? o.notas : "",
		ha: ha != null && Number.isFinite(ha) ? ha : null,
		archived: Boolean(o.archived),
		tipoPersona: o.tipoPersona === "juridica" ? "juridica" : "fisica"
	};
}
function parseCrop(x, key) {
	const d = defaultCrops()[key];
	if (!x || typeof x !== "object") return d;
	const o = x;
	return {
		activo: o.activo == null ? d.activo : Boolean(o.activo),
		ha: Number(o.ha) || 0,
		rinde: Number(o.rinde) || d.rinde,
		precioQq: Number(o.precioQq) || d.precioQq,
		km: Number(o.km) || d.km,
		alquilerQq: Number(o.alquilerQq) || 0,
		precioManual: Boolean(o.precioManual),
		siembraMes: (() => {
			if (o.siembraMes == null || o.siembraMes === "") return null;
			const n = Number(o.siembraMes);
			return Number.isFinite(n) ? n : null;
		})(),
		siembraFecha: typeof o.siembraFecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(o.siembraFecha) ? o.siembraFecha : null
	};
}
function parseEscenario(x) {
	if (!x || typeof x !== "object") return null;
	const o = x;
	if (typeof o.id !== "string" || typeof o.clienteId !== "string") return null;
	const cropsRaw = o.crops ?? {};
	const canjeMes = o.canjeMes == null || o.canjeMes === "" ? null : Number(o.canjeMes);
	const cat = o.catalog;
	return {
		id: o.id,
		clienteId: o.clienteId,
		nombre: typeof o.nombre === "string" ? o.nombre : "Escenario",
		campana: typeof o.campana === "string" ? o.campana : CAMPANA_DEFAULT,
		venta: o.venta === "50-60" ? "50-60" : "100",
		fxBna: Number(o.fxBna) > 0 ? Number(o.fxBna) : FX_BNA_FALLBACK,
		catalog: cat && typeof cat === "object" && Array.isArray(cat.lines) ? cloneCatalog(cat) : cloneCatalog(DEFAULT_CATALOG),
		crops: {
			maiz: parseCrop(cropsRaw.maiz, "maiz"),
			soja: parseCrop(cropsRaw.soja, "soja"),
			trigo: parseCrop(cropsRaw.trigo, "trigo")
		},
		canje: Boolean(o.canje),
		canjeMes: canjeMes != null && Number.isFinite(canjeMes) ? canjeMes : null,
		canjeTna: Number.isFinite(Number(o.canjeTna)) ? Number(o.canjeTna) : 0,
		canjeRendTna: Number.isFinite(Number(o.canjeRendTna)) ? Number(o.canjeRendTna) : 0,
		canjeColocacion: o.canjeColocacion === "letra" || o.canjeColocacion === "otro" ? o.canjeColocacion : "plazo fijo",
		snapshotAt: typeof o.snapshotAt === "string" && o.snapshotAt ? o.snapshotAt : null
	};
}
function loadClientes() {
	if (typeof window === "undefined") return [seedCliente()];
	try {
		const raw = window.localStorage.getItem(LS_CLIENTES);
		if (!raw) return [seedCliente()];
		const p = JSON.parse(raw);
		if (!Array.isArray(p)) return [seedCliente()];
		const list = p.map(parseCliente).filter((c) => c !== null);
		return list.length ? list : [seedCliente()];
	} catch {
		return [seedCliente()];
	}
}
function loadEscenarios() {
	if (typeof window === "undefined") return [seedEscenario()];
	try {
		const raw = window.localStorage.getItem(LS_ESCENARIOS);
		if (!raw) return [seedEscenario()];
		const p = JSON.parse(raw);
		if (!Array.isArray(p)) return [seedEscenario()];
		let dirty = false;
		const list = p.map(parseEscenario).filter((e) => e !== null).map((e) => {
			if (!e.snapshotAt && e.fxBna === 1500) {
				dirty = true;
				return {
					...e,
					fxBna: FX_BNA_FALLBACK
				};
			}
			return e;
		});
		if (!list.length) return [seedEscenario()];
		if (dirty) saveEscenarios(list);
		return list;
	} catch {
		return [seedEscenario()];
	}
}
function notifyEstudio() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new Event(ESTUDIO_EVENT));
}
function saveClientes(list) {
	window.localStorage.setItem(LS_CLIENTES, JSON.stringify(list));
	notifyEstudio();
}
function saveEscenarios(list) {
	window.localStorage.setItem(LS_ESCENARIOS, JSON.stringify(list));
	notifyEstudio();
}
function loadOpen() {
	const fallback = {
		clienteId: CLIENTE_SEED_ID,
		escenarioId: ESCENARIO_SEED_ID
	};
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(LS_OPEN);
		if (!raw) return fallback;
		const p = JSON.parse(raw);
		if (p?.clienteId && p?.escenarioId) return p;
	} catch {}
	return fallback;
}
function saveOpen(v) {
	window.localStorage.setItem(LS_OPEN, JSON.stringify(v));
}
function touchEstudioAt(iso) {
	const t = iso ?? (/* @__PURE__ */ new Date()).toISOString();
	window.localStorage.setItem(LS_ESTUDIO_AT, t);
	return t;
}
function freezeEscenariosDeCliente(list, clienteId, openEscenarioId) {
	const at = (/* @__PURE__ */ new Date()).toISOString();
	return list.map((e) => {
		if (e.clienteId !== clienteId) return e;
		const catalog = openEscenarioId && e.id === openEscenarioId ? cloneCatalog(loadCatalog()) : cloneCatalog(e.catalog);
		return {
			...e,
			catalog,
			crops: JSON.parse(JSON.stringify(e.crops)),
			snapshotAt: at
		};
	});
}
function duplicateEscenario(s) {
	return {
		...JSON.parse(JSON.stringify(s)),
		id: uid(),
		nombre: `${s.nombre} copia`,
		catalog: cloneCatalog(s.catalog),
		snapshotAt: null
	};
}
function haEscenario(e) {
	return Object.keys(e.crops).reduce((a, k) => a + (e.crops[k].activo ? e.crops[k].ha : 0), 0);
}
function loadOpenEscenario() {
	const open = loadOpen();
	return loadEscenarios().find((e) => e.id === open.escenarioId) ?? null;
}
function patchEscenario(id, p) {
	saveEscenarios(loadEscenarios().map((e) => e.id === id ? {
		...e,
		...p
	} : e));
}
function patchOpenCrop(crop, p) {
	const cur = loadOpenEscenario();
	if (!cur) return;
	patchEscenario(cur.id, { crops: {
		...cur.crops,
		[crop]: {
			...cur.crops[crop],
			...p
		}
	} });
}
function ensureEstudioBridge() {
	setCatalogBridge({
		load: () => {
			const open = loadOpen();
			return loadEscenarios().find((e) => e.id === open.escenarioId)?.catalog ?? null;
		},
		save: (c) => {
			const open = loadOpen();
			const list = loadEscenarios();
			const cur = list.find((e) => e.id === open.escenarioId);
			if (!cur) return false;
			saveEscenarios(list.map((e) => e.id === cur.id ? {
				...e,
				catalog: cloneCatalog(c)
			} : e));
			return true;
		},
		reset: () => {
			const open = loadOpen();
			const list = loadEscenarios();
			const cur = list.find((e) => e.id === open.escenarioId);
			if (!cur) return false;
			saveEscenarios(list.map((e) => e.id === cur.id ? {
				...e,
				catalog: cloneCatalog(DEFAULT_CATALOG)
			} : e));
			return true;
		}
	});
}
//#endregion
export { onCatalogChange as A, seedCliente as B, loadCatalog as C, loadOpenEscenario as D, loadOpen as E, resetCatalog as F, touchEstudioAt as H, saveCatalog as I, saveClientes as L, patchEscenario as M, patchOpenCrop as N, makeLine as O, pizarraQqFromLocal as P, saveEscenarios as R, lineUsdHa as S, loadEscenarios as T, seedEscenario as V, ensureEstudioBridge as _, FX_BNA_FALLBACK as a, haEscenario as b, RINDE_DEFAULT as c, alquilerUsdHa as d, calcularMargen as f, emptyEscenario as g, emptyCliente as h, ESTUDIO_EVENT as i, parseFleteLargo as j, normalizeLine as k, RULES as l, duplicateEscenario as m, CROP_LABEL as n, GROUPS as o, doseLabel as p, DEFAULT_CATALOG as r, PRECIO_FALLBACK_QQ as s, CROPS as t, UNITS as u, fleteCortoArsT as v, loadClientes as w, labelTipoPersona as x, freezeEscenariosDeCliente as y, saveOpen as z };
