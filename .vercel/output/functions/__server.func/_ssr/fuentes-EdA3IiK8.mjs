import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./site-nav-BghOkepp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fuentes-EdA3IiK8.js
var import_jsx_runtime = require_jsx_runtime();
var MODE = {
	vivo: "Vivo",
	respaldo: "Respaldo",
	caido: "Caído",
	archivo: "Archivo"
};
function tone(mode) {
	if (mode === "vivo") return "text-up";
	if (mode === "respaldo") return "text-t8";
	if (mode === "caido") return "text-down";
	return "text-ink-faint";
}
function Dot({ mode }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: cn("mt-0.5 size-1.5 shrink-0 rounded-full", mode === "vivo" && "bg-up", mode === "respaldo" && "bg-t8", mode === "caido" && "bg-down", mode === "archivo" && "bg-ink-faint")
	});
}
function summary(report) {
	const live = report.items.filter((x) => x.mode !== "archivo");
	const n = live.length;
	if (report.caidos === 0 && report.respaldos === 0) return `${report.vivos} de ${n} vivas`;
	const bits = [`${report.vivos} de ${n} vivas`];
	if (report.respaldos) bits.push(`${report.respaldos} en respaldo`);
	if (report.caidos) {
		const names = live.filter((x) => x.mode === "caido").map((x) => x.label);
		bits.push(`sin ${names.join(", ")}`);
	}
	return bits.join(" · ");
}
function fuentesOk(sources) {
	if (!sources?.length) return null;
	return sources.every((s) => s.ok);
}
function FuentesSemaforo({ ok }) {
	if (ok == null) return null;
	const label = ok ? "Fuentes en línea" : "Fuentes caídas";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center",
		title: label,
		"aria-label": label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: cn("size-2.5 rounded-full", ok ? "bg-up" : "bg-down")
		})
	});
}
function FuenteRow({ e }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-line/70 last:border-0 align-top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 pr-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { mode: e.mode }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-ink",
							children: e.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-ink-faint",
							children: e.host
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "hidden py-2 pr-3 text-xs text-ink-soft sm:table-cell",
				children: e.uses
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: cn("py-2 pr-3 text-right text-xs font-medium tabular", tone(e.mode)),
				children: MODE[e.mode]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 pr-3 text-right text-xs tabular text-ink-soft",
				children: e.mode === "archivo" ? "—" : `${e.ms} ms`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "py-2 text-xs text-ink-soft",
				children: [
					e.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-down",
						children: e.error
					}) : null,
					e.error && e.note ? " · " : null,
					e.note ?? ""
				]
			})
		]
	});
}
function FuentesCard({ report }) {
	const live = report?.items.filter((x) => x.mode !== "archivo") ?? [];
	const archivo = report?.items.filter((x) => x.mode === "archivo") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "desk-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase",
				children: "Chequeo interno"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-lg text-ink",
				children: "Fuentes de mercado"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-ink-faint",
				children: report ? summary(report) : "Consultando…"
			})]
		}), !report ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-32 animate-pulse rounded-lg bg-paper-2" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[560px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-y border-line text-left text-[11px] font-medium tracking-wide text-ink-soft uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3",
							children: "Fuente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "hidden py-2 pr-3 sm:table-cell",
							children: "Para qué"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 text-right",
							children: "Estado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 text-right",
							children: "Latencia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2",
							children: "Qué está pasando"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: live.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FuenteRow, { e }, e.id)) })]
			})
		}), archivo.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-[11px] leading-relaxed text-ink-faint",
			children: [
				"Archivo, sin ping: ",
				archivo.map((e) => e.label).join(" · "),
				". Si una fuente viva cae, el tablero usa el respaldo cuando hay (Yahoo query2, BNA → DolarAPI, Coinlore → CoinGecko). Si no hay respaldo, quedan los números del último corte."
			]
		}) : null] })]
	});
}
//#endregion
export { FuentesSemaforo as n, fuentesOk as r, FuentesCard as t };
