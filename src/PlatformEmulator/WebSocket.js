import { WebpackModules } from "@zlibrary";
const FluxDisptacher = WebpackModules.getByProps("_dispatch");

function die() {
	FluxDisptacher.unsubscribe("MESSAGE_CREATE", die);
	throw "Resetting WebSocket.";
}

export function reset() {
	try {
		FluxDisptacher.subscribe("MESSAGE_CREATE", die);
		FluxDisptacher.dispatch({ type: "MESSAGE_CREATE" });
	} catch {}
}
