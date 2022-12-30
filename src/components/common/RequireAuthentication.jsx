import React from 'react';


export default function RequireAuthentication() {
  const loggedIn = localStorage.getItem('token');
  return loggedIn;
}