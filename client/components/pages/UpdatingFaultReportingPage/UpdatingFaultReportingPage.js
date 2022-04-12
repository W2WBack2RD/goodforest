import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import S3 from "react-aws-s3";
import PageLayout from "../../organisms/PageLayout";
import Button from "react-bulma-companion/lib/Button";
import Select from "react-bulma-companion/lib/Select";
import Textarea from "react-bulma-companion/lib/Textarea";
import Buttons from "react-bulma-companion/lib/Buttons";
import Title from "react-bulma-companion/lib/Title";
import treeIcon from "_assets/icons/tree02.svg";
import updateFaultReporting from "_assets/images/updateFaultReporting.svg";
import { attemptSendReport } from "_thunks/report";
import { Buffer } from "buffer";
import Input from "react-bulma-companion/lib/Input";
import { Link } from "react-router-dom";

window.Buffer = Buffer;

const config = {
  bucketName: "good-forest-static",
  dirName: "imgs",
  region: "us-east-2",
  accessKeyId: process.env.S3_KEY || "",
  secretAccessKey: process.env.S3_SECRET || "",
};
const ReactS3Client = new S3(config);

export default function UpdatingFaultReportingPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  const [loading, setLoading] = useState(true);
  const [locationBy, setLocationBy] = useState("id");
  const [location, setLocation] = useState("");
  const [height, setHeight] = useState(3);
  const [diameter, setDiameter] = useState(3);
  const [leaves, setLeaves] = useState("");
  const [flowers, setFlowers] = useState("");
  const [fruits, setFruits] = useState("");
  const [generalStatus, setStatus] = useState(3);
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState(null);
  const [picName, setPicName] = useState(null);
  const [errors, setErrors] = useState(null);

  // useEffect(() => {
  //   if (R.isEmpty(user)) {
  //     dispatch(push('/login'));
  //   } else {
  //     dispatch(attemptGetTodos())
  //       .catch(R.identity)
  //       .then(() => setLoading(false));
  //   }
  // }, []);
  var status = {
    location,
    height,
    diameter,
    leaves,
    flowers,
    fruits,
    generalStatus,
    description,
    pic,
  };

  const upload = (file) => {
    console.log(file);
    if (file.size > 1000000) {
      setErrors("אין להעלות קבצים גדולים מ1MB");
      return;
    }

    ReactS3Client.uploadFile(file)
      .then((res) => {
        console.log(res);
        setPic(res.location);
        setPicName(file.name);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  console.log(pic);

  const sendReport = () => {
    dispatch(attemptSendReport(status)).catch(R.identity);
  };

  return (
    <PageLayout className="homePage" titleStyle={false} title="דיווח על תקלה">
      <div className="UpdateFaultReportingPage">
        <div>
          <img
            id="updateFaultTree"
            src={updateFaultReporting}
            style={{ height: 199, width: 179 }}
          />
        </div>
        <Title id="updateTitleReporting" size="6" className="header">
          תודה על העדכון!
        </Title>
        <Title id="paragrahUpdateReporting" size="6" className="header">
          דיווחים שוטפים על מצב העצים עוזרים לשמור על החלקה ולעודד את הצמיחה של
          העצים.
        </Title>

        <div className="form-footer">
          <Link to="/home">
            <Button id="home-page-navigation" onClick={sendReport}>
              לדף הבית
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
