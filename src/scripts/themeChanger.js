const onLoad = () => {
	if (localStorage.theme === "light") {
		document.documentElement.classList.add("light");
		return;
	}

	let isPrefersDarkMode =
		!("theme" in localStorage) &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	if (localStorage.theme === "dark" || isPrefersDarkMode) {
		document.documentElement.classList.add("dark");
	}
};

const switchTheme = (classList, theme) => {
	classList.remove("dark", "light");
	classList.add(theme);
	localStorage.theme = theme;
};

const onChangeTheme = () => {
	let htmlClassList = document.documentElement.classList;

	if (htmlClassList.contains("dark")) {
		switchTheme(htmlClassList, "light");
	} else {
		switchTheme(htmlClassList, "dark");
	}
};

const init = () => {
	onLoad();

	let themeBtn = document.getElementById("theme-button");
	themeBtn.addEventListener("click", onChangeTheme);
};

export { init };
