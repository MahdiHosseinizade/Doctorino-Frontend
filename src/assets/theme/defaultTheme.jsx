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
