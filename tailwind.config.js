module.exports = {
	content: ["./src/**/*.{html,js,hbs}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: "var(--color-background)",
				},
				primary: {
					DEFAULT: "var(--color-primary)",
					light: "var(--color-primary-light)",
				},
				secondary: {
					DEFAULT: "var(--color-secondary)",
					light: "var(--color-secondary-light)",
				},
				accent: {
					DEFAULT: "var(--color-accent)",
					light: "var(--color-accent-light)",
				},
				input: {
					DEFAULT: "var(--color-input)",
				},
				danger: {
					DEFAULT: "var(--color-danger)",
				},
			},
			fontSize: {
				tiny: "0.625rem",
			},
			height: {
				header: "10vh"
			}
		},
	},
	plugins: [],
};
