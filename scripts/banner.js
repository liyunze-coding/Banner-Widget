function loadGoogleFont(font) {
	if (!configs.styles.usingGoogleFont) return;
	WebFont.load({
		google: {
			families: [font],
		},
	});
}

// hex to rgb that accepts 3 or 6 digits
function hexToRgb(hex) {
	// remove # if present
	if (hex[0] === "#") {
		hex = hex.slice(1);
	}

	let r = 0,
		g = 0,
		b = 0;

	if (hex.length == 3) {
		// 3 digits
		r = "0x" + hex[0] + hex[0];
		g = "0x" + hex[1] + hex[1];
		b = "0x" + hex[2] + hex[2];
	} else if (hex.length == 6) {
		// 6 digits
		r = "0x" + hex[0] + hex[1];
		g = "0x" + hex[2] + hex[3];
		b = "0x" + hex[4] + hex[5];
	}

	// interger value of rgb
	r = +r;
	g = +g;
	b = +b;

	return `${r}, ${g}, ${b}`;
}

// convert bannerListBorderColor to banner-list-border-color
function convertToCSSVar(name) {
	let cssVar = name.replace(/([A-Z])/g, "-$1").toLowerCase();
	return `--${cssVar}`;
}

function importStyles() {
	const styles = configs.styles;

	loadGoogleFont(styles.fontFamily);

	const stylesToImport = Object.keys(styles).filter((style) => {
		return !style.includes("background");
	});

	stylesToImport.forEach((style) => {
		document.documentElement.style.setProperty(
			convertToCSSVar(style),
			styles[style]
		);
	});

	document.documentElement.style.setProperty(
		"--background-color",
		`rgba(${hexToRgb(styles.backgroundColor)}, ${
			styles.backgroundOpacity
		})`
	);
}

// sleep function
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// scroll left and right
async function animate() {
	// banner container width
	let bannerContainer = document.querySelector("#main");
	let bannerContainerWidth = bannerContainer.scrollWidth;

	// banner wrapper width
	let bannerWrapper = document.querySelector("#banner-wrapper");
	let bannerWrapperWidth = bannerWrapper.clientWidth;

	if (bannerContainerWidth - bannerWrapperWidth > 0) {
		document.querySelector("#main").style.display = "none";
		document.querySelector("#primary").style.display = "flex";
		document.querySelector("#secondary").style.display = "flex";

		let pixelsPerSecond = configs.styles.pixelsPerSecond;

		let duration =
			((bannerContainerWidth * configs.styles.gapSizeValue) /
				pixelsPerSecond) *
			1000;

		let primaryKeyFrames = [
			{ left: "0px" },
			{
				left: `-${
					bannerContainerWidth * configs.styles.gapSizeValue
				}px`,
			},
		];

		let secondaryKeyFrames = [
			{
				left: `${
					bannerContainerWidth * configs.styles.gapSizeValue
				}px`,
			},
			{ left: "0px" },
		];

		let options = {
			duration: duration,
			iterations: Infinity,
			easing: "linear",
		};

		let primaryAnimation = document
			.querySelector("#primary")
			.animate(primaryKeyFrames, options);

		let secondaryAnimation = document
			.querySelector("#secondary")
			.animate(secondaryKeyFrames, options);

		// play animation
		primaryAnimation.play();
		secondaryAnimation.play();

		// on cancel
		primaryAnimation.oncancel = () => {
			animate();
		};
	} else {
		document.querySelector("#main").style.display = "flex";
		document.querySelector("#primary").style.display = "none";
		document.querySelector("#secondary").style.display = "none";

		// cancel animations
		document.querySelectorAll(".banner").forEach((banner) => {
			banner.getAnimations().forEach((animation) => {
				animation.cancel();
			});
		});
	}
}

async function updateBanner(text) {
	document.querySelectorAll(".banner").forEach((banner) => {
		banner.innerHTML = text;
	});

	animate();
}

(async () => {
	importStyles();

	updateBanner(configs.details.defaultText);

	animate();
})();
