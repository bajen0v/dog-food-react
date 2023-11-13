import { createContext } from "react";

export const themes = {
	light: {
		color: '#000000',
		background: '#FFFFFF'
	},
	dark: {
		color: '#FFFFFF',
		background: '#222222'
	}
};

export const ThemeContext =  createContext({
    theme: themes.dark,
    toggleTheme: () => {
        ThemeContext.theme = themes.light
    }
})

ThemeContext.displayName = 'ThemeContext'