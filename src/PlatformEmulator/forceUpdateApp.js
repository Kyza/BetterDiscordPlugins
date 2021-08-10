export default function forceUpdateApp() {
	let root =
		document.getElementById("app-mount")._reactRootContainer._internalRoot
			.current;
	while (root?.type?.displayName !== "App") {
		root?.stateNode?.forceUpdate?.();
		root = root.child;
	}
}
