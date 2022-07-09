import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import R from "ramda";
import InputCircle from "../../atoms/InputCircle";
import ArrowInput from "../../atoms/ArrowInput";
import EventBoard from "../../molecules/EventsBoard/EventsBoard";
import Button from "../../atoms/Button/Button";
import PageLayout from "../../organisms/PageLayout";
import { request } from "_api/request";
import { Link, useParams } from "react-router-dom";
import AdminMenuSearch from "_organisms/AdminMenuSearch";

const HomePage = () => {
  const { user } = useSelector(R.pick(["user"]));
  const { forest: queryParamForest } = useParams();
  const forestId = user.forest || queryParamForest;
  const [responseData, setResponseData] = React.useState([]);

  const [arrowData, setArrowData] = useState("");
  const [open, setOpen] = useState(false);
  const [nameLeft, setNameLeft] = useState("מידע נוסף");
  const [nameCenter, setNameCenter] = useState("שיתוף חברים");
  const [nameRight, setNameRight] = useState("ספרו לי עוד");

  const handleRightClick = (e) => {
    setOpen(!open);
    setArrowData("bla bla");
  };
  const handleCenterClick = (e) => {
    setOpen(!open);
    setArrowData("bla bla 2");
  };
  const handleLeftClick = (e) => {
    setOpen(!open);
    setArrowData("bla bla 3");
  };

  useEffect(() => {
    getUserForest();
    getAllUsers();
  }, [forestId]);

  const getUserForest = () => {
    request
      .get("/api/forest/" + forestId)
      .send()
      .then((result) => {
        setResponseData({ ...result.body.forest, usersCount: result.body.usersCount });
      })
      .catch();
  };

  const getAllUsers = () => {
    request
      .get("/api/user/")
      .send()
      .then((result) => {
        setUserResponseData(result.body.user);
        setUserResponse(result.body.message);
      })
      .catch();
  };

  if (!forestId) {
    return (
      <PageLayout
        className="homePage"
        treeeIcon={false}
        innerPage={false}
        titleStyle={false}
        title="חיפוש חורשה"
      >
        <AdminMenuSearch />
      </PageLayout>)
  }


  return (
    <PageLayout
      className="homePage"
      treeeIcon={false}
      titleStyle={false}
      title={responseData.forest_name}
    >
      <Link to='/home' id="submitSearch">
      חזרה לחיפוש חורשות >
      </Link>

      <InputCircle
        className="inputCircle"
        inputLeft={responseData.treesCount ? parseInt(responseData.treesCount) * 0.896 : 0}
        inputCenter={responseData.usersCount ? responseData.usersCount : 0}
        inputRight={responseData.treesCount ? responseData.treesCount : 0}
      />
      <ArrowInput
        nameLeft={nameLeft}
        nameCenter={nameCenter}
        nameRight={nameRight}
        functionR={handleRightClick}
        functionL={handleCenterClick}
        functionC={handleLeftClick}
        open={open}
        data={arrowData}
        setOpen={setOpen}
      />
      <EventBoard />
      <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
        <Link to="/faultReporting">
          <Button className="reportBtn" value="דווח על תקלה" />
        </Link>
        <Link to="/reportTree">
          <Button className="reportBtn" value="עדכון סטטוס עץ" />
        </Link>
      </div>
    </PageLayout>
  );
};

export default HomePage;
