import { makeStyles } from "@mui/styles";
import { Container,Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../../NavBar/newNavBar";
import DoctorCard from "../../LandingPage/DoctorCard";

const useStyles = makeStyles({
    container: {
      marginTop: "100px",
    },
    navBar: {
      marginBottom: "100px",
    },
  });

const DoctorSpecialitie = () => {
    const [specialities, setSpecialities] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [flag,setFlag] = useState([]);
    const [findDoctor, setFindDoctor] = useState([]);
    console.log('findDoctor' , findDoctor);
    // console.log('spec' , spec);
    const {id} = useParams();
    const IntId = +id;


    useEffect(() =>{
        getDoctor();
        getSpecialities();
        findSpecialitie(id );        
        // findDoctorWithfind();
    },[])
    // const flag = [] ;
    const getSpecialities = async () => {
        try {
            const {data} = await axios.get(`http://188.121.113.74/api/doctor/specialties/`)
            setSpecialities(data);
            console.log('data1' , data);
            // console.log('specialities' ,specialities);
            const findSpec = data.find((item) => item.id === IntId);
            setFlag(findSpec.id);
        }
        catch (error) {
            console.log(error);
        }
        
    }

    const getDoctor = async () => {
        try {
            const {data} = await axios.get(`http://188.121.113.74/api/doctor/`)
            setDoctor(data);
            console.log('doctor',data);
            // const findDoctor = data.map((doc) => doc.filter((item) => item.specialties.find((special) => special.id === flag) ) );
            // const findDoctor = data.filter((doc) => doc.specialities.id === IntId)
            // const findDoctor = data.find ((doc) => doc.specialities.id === IntId)
            const findDoctor = data.filter((doc) => doc.specialties.find((special) => special.id === IntId) )
            // console.log('findDoctor' , findDoctor);
            // console.log(findDoctor);
            setFindDoctor(findDoctor);
        }
        catch (error) {
            console.log(error);
        }

    }
    // console.log(id)

    
    const findSpecialitie = (id) => {
        // console.log(id , typeof id);

        // console.log(IntId , typeof IntId);
        console.log('doctor',doctor);
        
    }
    console.log('flag' , flag);
    
    const classes = useStyles();
    return (
        <Container>
            <Grid className={classes.navBar}>
                <NavBar />
            </Grid>
            <Grid container className={classes.container} sx={{ m: 3 }}>
            {findDoctor.map((doctor, index) => (
                <Grid item key={index} xs={12} md={12} lg={12} xl={12}>
                    <DoctorCard doctor={doctor} />
                </Grid>
            ))}
            </Grid>
        </Container>
    );
}
 
export default DoctorSpecialitie;