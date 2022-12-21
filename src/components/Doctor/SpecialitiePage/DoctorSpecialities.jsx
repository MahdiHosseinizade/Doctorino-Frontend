import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

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
    

    return (
        <div>
            {findDoctor.map((item) => {
                return (
                    <div>
                        <h1>{item.user.first_name}</h1>
                    </div>
                )
            })}
        </div>
    );
}
 
export default DoctorSpecialitie;