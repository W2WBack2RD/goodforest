import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";
import InputCircle from "../../atoms/InputCircle";
import ArrowInput from "../../atoms/ArrowInput";
import EventBoard from "../../molecules/EventsBoard/EventsBoard";
import Button from "../../atoms/Button/Button";
import PageLayout from "../../organisms/PageLayout";

const HomePage = () => {
  HomePage.treeImg = false;
  HomePage.title = "חורשה 80";
  const [inputLeft, setInputLeft] = useState("0.8");
  const [inputCenter, setInputCenter] = useState("12");
  const [inputRight, setInputRight] = useState("205");

  const [nameLeft, setNameLeft] = useState("מידע נוסף");
  const [nameCenter, setNameCenter] = useState("שיתוף חברים");
  const [nameRight, setNameRight] = useState("ספרו לי עוד");

  /*
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    }
  }, []);
*/
  return (
    <PageLayout treeeIcon={false}>
      {" "}
      <InputCircle
        input_left={inputLeft}
        input_center={inputCenter}
        input_right={inputRight}
      />
      <ArrowInput
        name_left={nameLeft}
        name_center={nameCenter}
        name_right={nameRight}
      />
      <EventBoard />
    </PageLayout>
  );
};

export default HomePage;
