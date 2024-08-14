import React from "react";

const NotFound = () => {
 return (
   <div className="d-flex justify-content-center align-items-center vh-100">
     <div className="d-flex justify-content-center align-items-center gap-4 flex-column">
       <i className={`bi bi-search fs-1 text-danger`}></i>
       <h3 className="text-danger text-4xl font-bold">NOT-FOUND</h3>
       <a
         href={"/"}
         className="text-color-primary hover:text-color-accent transition-all underline"
       >
         kembali
       </a>
     </div>
   </div>
 );
};

export default NotFound;
