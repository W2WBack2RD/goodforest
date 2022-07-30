import React from "react";
const Gallery = (props) => {
  return (
    <div className="gallery">
      <div className="titleBox">
        <p className="galleryTitle">גלריית תמונות</p>
        {/* <p className="addImgBtn">הוספת תמונה</p> */}
      </div>

      {props.pic && (<img src={props.pic} />)}

      {!props.pic && (<div className="emptyGallery">
        <p className="emptyGalleryTxt">ריק פה בינתיים</p>
        {/* <p className="addImgInsideBtn">הוספת תמונה</p> */}
      </div>)}
    </div>
  );
};

export default Gallery;
