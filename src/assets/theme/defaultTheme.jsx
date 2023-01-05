import { createTheme } from '@mui/material/styles';
import IranYekan from "../fonts/iranyekanwebregular(fanum).woff2"

const theme = createTheme({
    palette: {
        mode: 'light',
        
        secondary: {
            main: "#32cd32",
            light: "#c1f0c1",
            dark: "#196719",
            contrastText: '#fff',
        },
        primary: {
            light: "#b3d9ff",
            main: "#0080ff",
            dark: "#004d99",
            contrastText: '#fff',
        }, 
        hotel: {
            main: "#eab308",
            light: "#FFF6E7",
            dark: "#c7ba28",
            contrastText: "#fff",
            icon: '#FFF6E7',
        },
        doctor: {
            main: '#00cccc',
            light: "#",
            dark: "#",
            contrastText: "#FFF6E7",
            icon: '#7fffd4',
        },
        navbar: {
            main: '#33ccff',
            light: "#fff",
            dark: "#000",
            contrastText: "#fff",
            icon: 'primary',
        }


    },
    typography: {
        fontFamily: IranYekan,
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
    direction: "rtl",
})

export default theme;