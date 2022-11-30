import http from "./httpServices";

function postDoctorRegister(doctor) {
  return http.post("/api/doctor/new/", doctor);
}

export default postDoctorRegister;
