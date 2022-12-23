import http from "./httpServices";

export function postDoctorRegister(doctor) {
    return http.post("/api/doctor/new/", doctor);
}