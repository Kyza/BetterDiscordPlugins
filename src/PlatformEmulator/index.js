import { Patcher, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import Settings from "./components/Settings.jsx";
import forceUpdateApp from "./forceUpdateApp.js";
import { get } from "./storage.js";
import { Platforms } from "./Platforms.js";
import { reset } from "./WebSocket.js";

const Platform = WebpackModules.getModule((m) => m.PlatformTypes?.WINDOWS);

const Packer = WebpackModules.getModule((m) =>
	m.prototype?.hasOwnProperty("unpack")
).prototype;

export default class PlatformEmulator extends BasePlugin {
	onStart() {
		for (const [functionName, platformName] of Object.entries(Platforms)) {
			Patcher.instead(
				Platform.default,
				`is${functionName}`,
				(that, args, t) => {
					return get("platform").toLowerCase() === platformName.toLowerCase();
				}
			);
		}

		Patcher.before(WebSocket.prototype, "send", (that, args) => {
			const data = Packer.unpack(args[0]);

			if (data.op === 2) {
				switch (get("websocket")) {
					case "win32":
						data.d.properties = { browser: "Discord Client", os: "Windows" };
						break;
					case "darwin":
						data.d.properties = { browser: "Discord Client", os: "Mac OS X" };
						break;
					case "linux":
						data.d.properties = { browser: "Discord Client", os: "Linux" };
						break;
					case "temple":
						data.d.properties = { browser: "Discord Client", os: "TempleOS" };
						break;
					case "web":
						data.d.properties = { browser: "Discord Web", os: "Other" };
						break;
					case "android":
						data.d.properties = { browser: "Discord Android", os: "Android" };
						break;
					case "ios":
						data.d.properties = { browser: "Discord iOS", os: "iOS" };
						break;
				}
			}

			args[0] = Packer.pack(data);

			return args;
		});

		forceUpdateApp();
		reset();
	}
	onStop() {
		Patcher.unpatchAll();
		forceUpdateApp();
		reset();
	}

	getSettingsPanel() {
		return <Settings />;
	}
}
