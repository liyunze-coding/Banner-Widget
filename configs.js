const configs = (function () {
	"use strict";

	// details
	const username = "itsbrandonut"; // your twitch username in lowercase (IMPORTANT)
	const defaultText = "!banner [text] to modify text here"; // default text to display when no command is used

	// styles

	// font
	const fontColor = "#fff"; // hex code
	const fontSize = "30px"; // must have px at the end
	const usingGoogleFont = false; // if false, you must provide a system font: sans-serif, Helvetica, Arial, Times New Roman...
	const fontFamily = "Arial"; // must be a valid (Google/system) font family
	const fontWeight = "bold"; // normal, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900

	const textStrokeColor = "#000"; // hex code
	const textStrokeWidth = "1px"; // must have px at the end

	// container (the box around the text)
	const containerWidth = "300px"; // must have px at the end
	const containerHeight = "50px"; // must have px at the end

	const horizontalPadding = "50px"; // must have px at the end
	const gapSizeValue = 1.3; // how much space between the two text elements (primary and secondary)

	const backgroundColor = "#000000"; // hex code
	const backgroundOpacity = "0.5"; // must be a decimal between 0 and 1

	// animation
	const pixelsPerSecond = 100; // how many pixels to scroll per second

	// border
	const borderRadius = "5px"; // must have px at the end
	const borderColor = "#141414"; // hex code
	const borderWidth = "1px"; // must have px at the end

	// commands
	const commands = ["!banner", "!currentactivity"];

	const details = {
		username,
		defaultText,
	};

	const styles = {
		fontColor,
		fontSize,
		usingGoogleFont,
		fontFamily,
		fontWeight,
		textStrokeColor,
		textStrokeWidth,
		containerWidth,
		containerHeight,
		horizontalPadding,
		gapSizeValue,
		backgroundColor,
		backgroundOpacity,
		pixelsPerSecond,
		borderRadius,
		borderColor,
		borderWidth,
	};

	let module = {
		details,
		styles,
		commands,
	};

	return module;
})();
