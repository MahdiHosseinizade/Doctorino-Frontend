import http from "./httpServices";

export function getDoctorScale() {
    return http.get("/api/doctor/specialties/",{Headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}});
}