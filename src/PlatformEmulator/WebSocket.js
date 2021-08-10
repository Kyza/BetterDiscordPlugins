import { WebpackModules } from "@zlibrary";
const FluxDisptacher = WebpackModules.getByProps("_dispatch");

export let ws;

function die() {
	FluxDisptacher.unsubscribe("MESSAGE_CREATE", die);
	throw "Resetting WebSocket.";
}

export function reset() {
	if (!ws) {
		try {
			FluxDisptacher.subscribe("MESSAGE_CREATE", die);
			FluxDisptacher.dispatch({ type: "MESSAGE_CREATE" });
		} catch {}
	} else {
		ws.close();
	}
}
