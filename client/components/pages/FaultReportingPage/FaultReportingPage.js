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
import faultrepoting from "/client/assets/images/faultrepoting.svg";
import treeIcon from "_assets/icons/tree02.svg";
import { attemptSendReport } from "_thunks/report";
import { Buffer } from "buffer";
import Input from "react-bulma-companion/lib/Input";

window.Buffer = Buffer;

const config = {
  bucketName: "good-forest-static",
  dirName: "imgs",
  region: "us-east-2",
  accessKeyId: process.env.S3_KEY || "",
  secretAccessKey: process.env.S3_SECRET || "",
};
const ReactS3Client = new S3(config);

export default function ReportTreePage() {
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
      <div className="FaultRepotingPage">
        <div>
          <img id="faultTree" src={faultrepoting} style={{ height: 120 }} />
        </div>
        <Title id="titleReporting" size="6" className="header">
          השלט נפל? הטפטפת דולפת?
          <br></br>
          נשמח לדעת על כל בעיה!
        </Title>

        <label className="form-label">באיזה שטח יש תקלה?</label>
        <Select
          fullwidth
          value={flowers}
          onChange={(event) => setFlowers(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">בחירה</Select.Option>
            <Select.Option>הגן הזאולוגי כפר הנוער בן שמן</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">נושא התקלה</label>
        <Select
          fullwidth
          value={fruits}
          onChange={(event) => setFruits(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">בחירה</Select.Option>
            <Select.Option>השקייה</Select.Option>
            <Select.Option>ניקיון וטיפוח</Select.Option>
            <Select.Option>עצים</Select.Option>
            <Select.Option>קהילה</Select.Option>
            <Select.Option>רשות</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">תיאור התקלה</label>
        <Textarea
          maxLength={240}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <div className="form-footer">
          <div>
            <div>
              <Button id="addPicture">
                <label htmlFor="filePicker">צרף תמונה</label>
              </Button>
            </div>
            <div style={{ marginTop: 5 }}>{picName}</div>
            <div className="error">{errors}</div>
          </div>
          <Button id="continue" onClick={sendReport}>
            המשך
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
