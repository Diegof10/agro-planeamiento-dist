import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-hhyiVbEC.mjs";
import { t as authMiddleware } from "./middleware-Caamrm23.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-store-Bz3uPpVd.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var KIND_SET = /* @__PURE__ */ new Set([
	"clientes",
	"escenarios",
	"open",
	"trades",
	"cartera_client",
	"fotos",
	"informe_src",
	"campaign_input",
	"catalog"
]);
var MAX_JSON = 15e5;
function asKind(v) {
	return typeof v === "string" && KIND_SET.has(v) ? v : null;
}
function toJson(payload) {
	const text = JSON.stringify(payload ?? null);
	if (text.length > MAX_JSON) throw new Error("Payload demasiado grande");
	return JSON.parse(text);
}
function decodePayload(raw) {
	if (typeof raw === "string") try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
	return toJson(raw);
}
var loadUserStore_createServerFn_handler = createServerRpc({
	id: "7f50cb161ab175b9fac0f2920dc5ae01f98064f679a7bb8628dce216c51b506f",
	name: "loadUserStore",
	filename: "src/lib/user-store.ts"
}, (opts) => loadUserStore.__executeServer(opts));
var loadUserStore = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadUserStore_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql()).query(`select kind, payload from user_store where user_id = $1`, [context.userId]);
	const out = {};
	for (const row of rows) {
		const kind = asKind(row.kind);
		if (!kind) continue;
		out[kind] = decodePayload(row.payload);
	}
	return out;
});
var putUserStore_createServerFn_handler = createServerRpc({
	id: "20635d31f10982ef0028445f7fcd4ddbe445a104f2c9da2da89b310f87e6e5a1",
	name: "putUserStore",
	filename: "src/lib/user-store.ts"
}, (opts) => putUserStore.__executeServer(opts));
var putUserStore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data || typeof data !== "object") throw new Error("Datos inválidos");
	const o = data;
	const kind = asKind(o.kind);
	if (!kind) throw new Error("Tipo inválido");
	return {
		kind,
		payload: toJson(o.payload)
	};
}).handler(putUserStore_createServerFn_handler, async ({ context, data }) => {
	await (await getSql()).query(`insert into user_store (user_id, kind, payload, updated_at)
       values ($1, $2, $3::jsonb, now())
       on conflict (user_id, kind)
       do update set payload = excluded.payload, updated_at = now()`, [
		context.userId,
		data.kind,
		JSON.stringify(data.payload)
	]);
	return { ok: true };
});
var putUserStoreAll_createServerFn_handler = createServerRpc({
	id: "a489f487c4e9a3a4238e07c2866aa2674ec88be11daa4a855f91e27ef58ff3d5",
	name: "putUserStoreAll",
	filename: "src/lib/user-store.ts"
}, (opts) => putUserStoreAll.__executeServer(opts));
var putUserStoreAll = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	if (!data || typeof data !== "object") throw new Error("Datos inválidos");
	const records = data.records;
	if (!records || typeof records !== "object") throw new Error("Datos inválidos");
	const out = {};
	for (const [k, v] of Object.entries(records)) {
		const kind = asKind(k);
		if (kind) out[kind] = toJson(v);
	}
	return { records: out };
}).handler(putUserStoreAll_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	for (const [kind, payload] of Object.entries(data.records)) await sql.query(`insert into user_store (user_id, kind, payload, updated_at)
         values ($1, $2, $3::jsonb, now())
         on conflict (user_id, kind)
         do update set payload = excluded.payload, updated_at = now()`, [
		context.userId,
		kind,
		JSON.stringify(payload)
	]);
	return { ok: true };
});
//#endregion
export { loadUserStore_createServerFn_handler, putUserStoreAll_createServerFn_handler, putUserStore_createServerFn_handler };
