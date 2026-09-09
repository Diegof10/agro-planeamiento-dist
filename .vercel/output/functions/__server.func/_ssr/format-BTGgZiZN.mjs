//#region node_modules/.nitro/vite/services/ssr/assets/format-BTGgZiZN.js
var money0 = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0
});
var money2 = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
var num0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
var num1 = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});
var num2 = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
function usd(n, digits = 0) {
	if (!Number.isFinite(n)) return "—";
	return (digits === 0 ? money0 : money2).format(n);
}
function usdCompact(n) {
	if (!Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	const sign = n < 0 ? "−" : "";
	if (abs >= 0xe8d4a51000) return `${sign}US$ ${num2.format(abs / 0xe8d4a51000)} bn`;
	if (abs >= 1e9) return `${sign}US$ ${num1.format(abs / 1e9)} mil M`;
	if (abs >= 1e6) return `${sign}US$ ${num1.format(abs / 1e6)} M`;
	return usd(n);
}
function usdT(n) {
	return Number.isFinite(n) ? `${usd(n, 0)}/t` : "—";
}
function ars(n, digits = 0) {
	if (!Number.isFinite(n)) return "—";
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(n);
}
function pct(n, digits = 1) {
	if (n == null || !Number.isFinite(n)) return "—";
	const nf = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
	return `${n > 0 ? "+" : n < 0 ? "−" : ""}${nf.format(Math.abs(n) * 100)}%`;
}
function pctPts(n, digits = 1) {
	if (n == null || !Number.isFinite(n)) return "—";
	return `${num(n, digits)}%`;
}
function bp(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	return `${num0.format(n)} pb`;
}
function num(n, digits = 1) {
	if (n == null || !Number.isFinite(n)) return "—";
	if (digits === 0) return num0.format(n);
	if (digits === 1) return num1.format(n);
	return num2.format(n);
}
function multiple(n, digits = 1) {
	if (n == null || !Number.isFinite(n)) return "—";
	return `${num(n, digits)}×`;
}
function signedClass(n) {
	if (n == null || !Number.isFinite(n) || n === 0) return "text-ink-soft";
	return n > 0 ? "text-up" : "text-down";
}
//#endregion
export { pct as a, usd as c, num as i, usdCompact as l, bp as n, pctPts as o, multiple as r, signedClass as s, ars as t, usdT as u };
