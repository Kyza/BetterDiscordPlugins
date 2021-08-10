import { WebpackModules, PluginUtilities } from "@zlibrary";
import { getPlatform } from "./Platforms.js";
const Platform = WebpackModules.getModule((m) => m.PlatformTypes?.WINDOWS);

const storage = PluginUtilities.loadData("PlatformEmulator", "settings", {
	platform: getPlatform(Platform.default.getPlatform()),
	websocket: "default",
});

export function set(path, value) {
	_.set(storage, path, value);
	PluginUtilities.saveData("PlatformEmulator", "settings", storage);
	return storage;
}

export function get(path, defaultValue) {
	return _.get(
		PluginUtilities.loadData("PlatformEmulator", "settings", storage),
		path,
		defaultValue
	);
}
