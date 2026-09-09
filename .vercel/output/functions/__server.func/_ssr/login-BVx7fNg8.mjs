import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, H as require_react, b as Navigate, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Route$11, n as GROK_PROVIDERS } from "./router-CM1kWFYK.mjs";
import { a as signIn, n as SiteNav, o as useCurrentUserState, r as authClient, t as BrandMark } from "./site-nav-Bv-HDqOI.mjs";
import { t as Button } from "./button-DGq-09Xz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BVx7fNg8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INP = "h-11 w-full rounded-md bg-paper-2 px-3 text-sm hair";
function safeNext(next) {
	if (typeof next !== "string") return "/clientes";
	if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/login")) return "/clientes";
	return next;
}
function Login() {
	const next = safeNext(Route$11.useSearch().next);
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("entrar");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: next });
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			if (mode === "crear") {
				const { error: err } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.trim()
				});
				if (err) throw new Error(err.message || "No se pudo crear la cuenta");
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (err) throw new Error(err.message || "Email o contraseña incorrectos");
			}
			await authClient.getSession();
			await navigate({ to: next });
		} catch (err) {
			setError(err instanceof Error ? err.message : "No se pudo entrar");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { active: "login" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "page-main page-main-narrow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-6 max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "size-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-2xl",
						children: "Acceso al estudio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink-soft",
						children: "Mercado y granos son públicos. Para cartera, márgenes, clientes e informe creá un usuario con contraseña (mínimo 8 caracteres)."
					}),
					isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-48 animate-pulse rounded-md bg-paper-2 hair" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-1 rounded-md bg-paper-2 p-1 hair",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-active": mode === "entrar" ? "true" : void 0,
								className: "h-11 rounded text-sm data-[active=true]:bg-cream data-[active=true]:font-medium",
								onClick: () => {
									setMode("entrar");
									setError(null);
								},
								children: "Entrar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-active": mode === "crear" ? "true" : void 0,
								className: "h-11 rounded text-sm data-[active=true]:bg-cream data-[active=true]:font-medium",
								onClick: () => {
									setMode("crear");
									setError(null);
								},
								children: "Crear cuenta"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-5 space-y-3",
							onSubmit,
							children: [
								mode === "crear" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm",
									htmlFor: "login-name",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink-soft",
										children: "Nombre"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "login-name",
										className: `${INP} mt-1`,
										autoComplete: "name",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm",
									htmlFor: "login-email",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink-soft",
										children: "Usuario (email)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "login-email",
										className: `${INP} mt-1`,
										type: "email",
										autoComplete: "email",
										inputMode: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm",
									htmlFor: "login-password",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ink-soft",
										children: "Contraseña"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "login-password",
										className: `${INP} mt-1`,
										type: "password",
										autoComplete: mode === "crear" ? "new-password" : "current-password",
										minLength: 8,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										required: true
									})]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-down",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									disabled: busy,
									children: busy ? "Un segundo…" : mode === "crear" ? "Crear cuenta" : "Entrar"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-center text-xs text-ink-faint",
							children: "o continuar con"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 space-y-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void signIn(p.providerId, { callbackURL: next }),
								className: "h-11 w-full rounded-md bg-cream text-sm hair hover:bg-paper-2",
								children: ["Continuar con ", p.label]
							}, p.providerId))
						})
					] })
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
