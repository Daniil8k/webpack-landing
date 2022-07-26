import "@/styles/main.scss";

let themeBtn = document.getElementById("theme-button");

const changeTheme = (classList, theme) => {
	classList.remove("dark", "light");
	classList.add(theme);
	localStorage.theme = theme;
};

themeBtn.addEventListener("click", () => {
	let htmlClassList = document.documentElement.classList;

	if (htmlClassList.contains("dark")) {
		changeTheme(htmlClassList, "light");
	} else {
		changeTheme(htmlClassList, "dark");
	}
});

import("locomotive-scroll").then((locomotiveModule) => {
	const scroll = new locomotiveModule.default({
		el: document.querySelector("[data-scroll-container]"),
		smooth: true,
		smoothMobile: false,
	});
});
