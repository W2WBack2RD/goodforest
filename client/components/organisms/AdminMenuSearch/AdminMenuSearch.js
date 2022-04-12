import React, { useState } from "react";
import Button from "../../atoms/Button/Button";
import rightArrow from "../../../assets/icons/icon_chevron-right-white.svg";
import Select from "react-bulma-companion/lib/Select";

const AdminMenuSearch = ({ moreForests, fn }) => {
  return (
    <div className="menuBG">
      <div className="searchStart">
        <img src={rightArrow} className="backArrow" onClick={fn} />
        <span className="searchName">חיפוש חורשה</span>
      </div>
      <div className="searchForest">
        <form action="#" className="searchForestForm">
          {/* <div className="selectBox">
            <label className="labelSearch">עיר</label>
            <Select
              className="has-background-success-dark	"
              name="city"
              fullwidth
              value={null}
              onChange={(event) => {}}
            >
              <Select.Content>
                <Select.Option className="placeholder">בחירה</Select.Option>
                <Select.Option>יש עלים</Select.Option>
                <Select.Option>בשלכת</Select.Option>
                <Select.Option>יש ניצנים של עלים חדשים</Select.Option>
              </Select.Content>
            </Select>
          </div>*/}

          <div className="selectBox">
            <label className="labelSearch">עיר</label>
            <select className="selectSearch" name="city" id="">
              <option value="">בחירה</option>
              <option value="">תל אביב - יפו</option>
              <option value="">הרצליה</option>
            </select>
          </div>
          <div className="selectBox">
            <label className="labelSearch forestLabel">חורשה</label>
            <select className="selectSearch" name="forest" id="">
              <option value="">בחירה</option>
              <option value="">רקפות</option>
              <option value="">אלונים</option>
            </select>
          </div>

          <div className="selectBox">
            <button id="submitSearch" value="הצג חורשה">
              הצג חורשה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminMenuSearch;
