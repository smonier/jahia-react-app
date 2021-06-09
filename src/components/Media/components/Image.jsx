import React from "react";

const Image = ({path,alt}) =>{
    const {files_endpoint} = process.env.REACT_APP_JCONTENT_FILES_ENDPOINT;
    return(
        <img className="d-block w-100"
             src={`${files_endpoint}${encodeURI(path)}`}
             alt={alt}/>
    )
}
export default Image;