import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForestsAndCities } from "_organisms/Register/Register";

const AdminMenuSearch = () => {
  const [mycity, setMyCity] = useState('');
  const [forest, setForest] = useState('');
  const [forests, cities] = useForestsAndCities()

  return (
    <div className="searchForest">

      <div className="selectBox">
        <label className="labelSearch">עיר</label>
        <select className="selectSearch"
          value={mycity}
          onChange={e => setMyCity(e.target.value)}
          required>

          <option value="">עיר</option>
          {cities.map((cityOption) =>
            (<option value={cityOption.id}>{cityOption.name}</option>))}
        </select>
      </div>
      <div className="selectBox">
        <label className="labelSearch forestLabel">חורשה</label>
        <select name="forest" onChange={e => setForest(e.target.value)} className="selectSearch" required >
          <option value="">חורשה</option>
          {forests.filter(forest => forest.city?.id === mycity).map((forestOption) =>
            (<option value={forestOption.id}>{forestOption.forest_name}</option>))}

        </select>
      </div>

      <div className="displayForestButton">
        <Link to={`/home/${forest}`} id="submitSearch">
          הצג חורשה
        </Link>
      </div>
    </div>
  );
};

export default AdminMenuSearch;
