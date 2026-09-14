import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as hasGateSessionMarker } from "./server-_G1yBXj8.mjs";
import { i as Sun, l as Moon } from "../_libs/lucide-react.mjs";
import { c as setTheme, s as getTheme } from "./router-DIhOYZrB.mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-nav-AKpnAPBZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...parts) {
	return parts.filter(Boolean).join(" ");
}
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-10 shrink-0 rounded-md", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "7",
				fill: "#1A302A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10.2 26.4V12.2",
				stroke: "#F3EFE6",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#F3EFE6",
				d: "M10.2 6.2 13.4 11.2 10.2 12.6 7 11.2Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#F3EFE6",
				d: "M10.2 11.4 6.4 14.8 8.4 16.6 10.2 14.2Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#F3EFE6",
				d: "M10.2 11.4 14 14.8 12 16.6 10.2 14.2Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#F3EFE6",
				d: "M10.2 15.4 6.8 18.6 8.6 20.2 10.2 17.8Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#F3EFE6",
				d: "M10.2 15.4 13.6 18.6 11.8 20.2 10.2 17.8Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "17.2",
				y: "19.4",
				width: "3.4",
				height: "7",
				rx: "0.7",
				fill: "#F3EFE6",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "21.4",
				y: "14.2",
				width: "3.4",
				height: "12.2",
				rx: "0.7",
				fill: "#F3EFE6",
				opacity: "0.88"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "25.6",
				y: "8.6",
				width: "3.4",
				height: "17.8",
				rx: "0.7",
				fill: "#F3EFE6"
			})
		]
	});
}
function BrandWordmark({ kicker, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-w-0 items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-[11px] font-medium tracking-[0.18em] text-forest uppercase",
				children: "Agro Planeamiento"
			}), kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-ink-soft",
				children: kicker
			}) : null]
		})]
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function ThemeToggle() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setDark(getTheme() === "dark"), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-pressed": dark,
		"aria-label": dark ? "Cambiar a modo día" : "Cambiar a modo noche",
		title: dark ? "Modo día" : "Modo noche",
		className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-forest px-3 text-sm font-medium text-cream hover:opacity-90",
		onClick: () => {
			const next = dark ? "light" : "dark";
			setTheme(next);
			setDark(next === "dark");
		},
		children: [dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: dark ? "Día" : "Noche"
		})]
	});
}
var PUBLIC_LINKS = [{
	to: "/",
	id: "home",
	label: "Mercado"
}, {
	to: "/granos",
	id: "granos",
	label: "Granos"
}];
var PRIVATE_LINKS = [
	{
		to: "/cartera",
		id: "cartera",
		label: "Cartera"
	},
	{
		to: "/margenes",
		id: "margenes",
		label: "Márgenes"
	},
	{
		to: "/clientes",
		id: "clientes",
		label: "Clientes"
	},
	{
		to: "/informe",
		id: "informe",
		label: "Informe"
	}
];
function SiteNav({ active }) {
	const { user, isPending } = useCurrentUserState();
	const links = user ? [...PUBLIC_LINKS, ...PRIVATE_LINKS] : PUBLIC_LINKS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "site-nav",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-nav-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "site-nav-brand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandWordmark, { kicker: "Márgenes y finanzas" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "site-nav-links",
					"aria-label": "Secciones",
					"data-count": links.length,
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						"data-active": active === l.id ? "true" : void 0,
						className: "site-nav-link",
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-nav-tools",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 animate-pulse rounded-full bg-paper-2" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "site-nav-user",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						"data-active": active === "login" ? "true" : void 0,
						className: "site-nav-link",
						children: "Acceso"
					})]
				})
			]
		})
	});
}
//#endregion
export { useCurrentUserState as i, SiteNav as n, cn as r, BrandMark as t };
