import { createTheme } from '@mui/material/styles';
import IranYekan from "../fonts/iranyekanwebregular(fanum).woff2"

const theme = createTheme({
    palette: {
        mode: 'light',
        secondary: {
            main: "#cfcfcf"
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
