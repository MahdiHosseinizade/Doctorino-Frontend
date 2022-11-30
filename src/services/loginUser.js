import http from "./httpServices";

export function loginUser(user) {
    return http.post("/api/auth/token/",user,{Headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}});
}