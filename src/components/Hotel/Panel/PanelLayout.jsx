// // import { Box, Container, CssBaseline } from '@mui/material';
// // import React from 'react';
// // import SideBar from './components/SideBar';
// // import NavBar from "../../NavBar/newNavBar"
// // // import "./panelLayout.css"

// // const PanelLayout = ({children}) => {
// //     return (
// //         <div>
// //             <Box className="navbar">
// //                 <NavBar />
// //             </Box>

// //             <Box sx={{ marginTop: "20px", position: 'sticky', display: 'flex' }}>
// //                 <SideBar />
// //                 {children}
// //             </Box>
// //         </div>
// //     );
// // }

// // export default PanelLayout;

// import { Box, Container, CssBaseline } from '@mui/material';
// import React from 'react';
// import SideBar from './components/SideBar';
// import NavBar from "../../NavBar/newNavBar";

// export default function PanelLayout({ children }) {
//     return (
//         <Container>
//             <Container
//                 sx={{
//                     position: "static",
//                     top: "0",
//                     right: "0",
//                     display: "flex",
//                     flexDirection: "row",
//                     width: "100%",
//                     height: "auto",
//                     alignItems: "center",
//                     boxSizing: " border-box"
//                 }}
//             >
//                 <NavBar />
//             </Container>

//             <Container sx={{ width: '100%', position: "sticky", display: "flex" }}>
//                 <SideBar />
//                 {children}
//             </Box>
//         </div>
//     );
// }

// export default PanelLayout;

import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import SideBar from "./components/SideBar";
import NavBar from "../../NavBar/newNavBar";

export default function PanelLayout({ children }) {
  return (
    <div>
      <CssBaseline />
      <Box
        mt = {10}
        sx={{
          position: "static",
          top: "0",
          right: "0",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
          alignItems: "center",
          boxSizing: " border-box",
        }}
      >
        <NavBar />
      </Box>

      <Box  sx={{ width: "100%", position: "sticky", display: "flex", justifyContent: "center"}}>
        <SideBar />
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {children}
        </Box>
      </Box>
      <br/><br/><br/>
    </div>
  );
}
