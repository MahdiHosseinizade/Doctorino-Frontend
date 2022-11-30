import http from "./httpServices";

function getDoctorScale() {
  return http.get("/api/doctor/specialties/", {
    Headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

export default getDoctorScale;