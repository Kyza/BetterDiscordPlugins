import { WebpackModules } from "@zlibrary";
import { storage, set, get } from "../storage.js";
import forceUpdateApp from "../forceUpdateApp.js";
import { reset } from "../WebSocket.js";

// import modalStyles from "./Modal.scss";

const { useState } = React;

const Text = WebpackModules.getByDisplayName("Text");
const Header = WebpackModules.getByDisplayName("Header");
const FormDivider = WebpackModules.getByDisplayName("FormDivider");
const RadioGroup = WebpackModules.getByDisplayName("RadioGroup");

export default function Settings() {
	const [platform, setPlatform] = useState(get("platform"));
	const [websocket, setWebsocket] = useState(get("websocket"));
	return (
		<>
			<Header>UI Spoof</Header>
			<FormDivider style={{ marginTop: "8px", marginBottom: "8px" }} />
			<RadioGroup
				options={[
					{ name: "Windows", value: "win32" },
					{ name: "OSX", value: "darwin" },
					{ name: "Linux", value: "linux" },
				]}
				value={platform}
				onChange={(e) => {
					setPlatform(e.value);
					set("platform", e.value);
					forceUpdateApp();
				}}
			/>
			<Header>WebSocket Spoof</Header>
			<FormDivider style={{ marginTop: "8px", marginBottom: "8px" }} />
			<RadioGroup
				options={[
					{ name: "Default", value: "default" },
					{ name: "Windows", value: "win32" },
					{ name: "OSX", value: "darwin" },
					{ name: "Linux", value: "linux" },
					{ name: "TempleOS", value: "temple" },
					{ name: "Web", value: "web" },
					{ name: "Android", value: "android" },
					{ name: "iOS", value: "ios" },
				]}
				value={websocket}
				onChange={(e) => {
					setWebsocket(e.value);
					set("websocket", e.value);
					reset();
				}}
			/>
		</>
	);
}
