import React from 'react'
import { Route, Routes, Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Page Not Found :/</h1>
      <h3>Click Here To Register</h3>
      <Link to="/registration">Register</Link>
    </div>
  )
}

export default PageNotFound
