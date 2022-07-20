/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				primary: {
					main: "rgba(0 149 246 / 1)",
					blue: "rgba(0 55 107 / 1 )",
				},
			},
			screens: {
				xs: "450px",
			},
			fontSize: {
				big: ["1.875rem", "2rem"],
			},
		},
	},
	plugins: [],
};
