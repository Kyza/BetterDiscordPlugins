export const Platforms = {
	Linux: "linux",
	OSX: "darwin",
	Web: "web",
	Windows: "win32",
};

// Gets the platform name from the keyword ignoring case.
export function getPlatform(platform) {
	for (let key in Platforms) {
		if (key.toLowerCase() === platform.toLowerCase()) {
			return Platforms[key];
		}
	}
	return null;
}
