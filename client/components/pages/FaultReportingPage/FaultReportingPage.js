import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import R from "ramda";
import PageLayout from "../../organisms/PageLayout";
import Button from "react-bulma-companion/lib/Button";
import Select from "react-bulma-companion/lib/Select";
import Textarea from "react-bulma-companion/lib/Textarea";
import Title from "react-bulma-companion/lib/Title";
import faultreporting from "_assets/images/faultreporting.svg";
import { attemptSendReport } from "_thunks/reporterProblem";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { request } from "_api/request";

window.Buffer = Buffer;

export default function ReportTreePage() {
  const dispatch = useDispatch();
  const [forest, setForest] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState(null);
  const [picName, setPicName] = useState(null);
  const [errors, setErrors] = useState(null);

  var status = {
    forest,
    subject,
    description,
    pic
  };
  const login = () => {
    const userCredentials = { username, password };

    dispatch(attemptLogin(userCredentials)).catch(R.identity);
  };
  const upload = (file) => {
    if (file.size > 1000000) {
      setErrors("אין להעלות קבצים גדולים מ1MB");
      return;
    }

    request.post('/api/report/upload').attach('file', file)
      .then((res) => {
        console.log(res);
        setPic(res.body.Location);
        setPicName(file.name);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const [forests, setForests] = useState([]);

  useEffect(() => {
    getAllForests();
  }, []);


  const getAllForests = () => {
    request
      .get("/api/forest/")
      .send()
      .then((result) => {
        setForests(result.body.forests)
      })
      .catch();
  };

  const sendReport = () => {
    dispatch(attemptSendReport(status)).catch(R.identity);
  };

  return (
    <PageLayout className="homePage" titleStyle={false} title="דיווח על תקלה">
      <div className="FaultReportingPage">
        <div>
          <img id="faultTree" src={faultreporting} style={{ height: 120 }} />
        </div>
        <Title id="titleReporting" size="6" className="header">
          השלט נפל? הטפטפת דולפת?
          <br></br>
          נשמח לדעת על כל בעיה!
        </Title>

        <label className="form-label">באיזה שטח יש תקלה?</label>
        <Select
          fullwidth
          value={forest}
          onChange={(event) => setForest(event.target.value)}
          required
        >
          <Select.Content>
            <Select.Option className="placeholder">בחירה</Select.Option>
            {forests.map((forestOption) =>
              (<option value={forestOption._id}>{forestOption.forest_name}</option>))}
          </Select.Content>
        </Select>

        <label className="form-label">נושא התקלה</label>
        <Select
          fullwidth
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
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
              <Button>
                <label htmlFor="filePicker">צרף תמונה</label>
              </Button>
            </div>
            <div style={{ marginTop: 5 }}>{picName}</div>
            <div className="error">{errors}</div>
          </div>
          <Link to="/updatingFaultReporting">
            <Button
              id="continue"
              onClick={sendReport}
              disabled={!description || !subject}
            >
              המשך
            </Button>
          </Link>
        </div>
        <input
          id="filePicker"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={(e) => upload(e.target.files[0])}
        ></input>
      </div>
    </PageLayout>
  );
}
