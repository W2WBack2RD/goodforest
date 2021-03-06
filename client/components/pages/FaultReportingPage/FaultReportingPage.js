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
import UpdatingFaultReportingPage from "_pages/UpdatingFaultReportingPage";
import faultreporting from "_assets/images/faultreporting.svg";
import treeIcon from "_assets/icons/tree02.svg";
import { attemptSendReport } from "_thunks/reporterProblem";
import { Buffer } from "buffer";
import Input from "react-bulma-companion/lib/Input";
import { Link } from "react-router-dom";
import { request } from "_api/request";

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
  const [forest, setForest] = useState("");
  const [subject, setSubject] = useState("");
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
    forest,
    subject,
    description,
  };
  const login = () => {
    const userCredentials = { username, password };

    dispatch(attemptLogin(userCredentials)).catch(R.identity);
  };
  const upload = (file) => {
    console.log(file);
    if (file.size > 1000000) {
      setErrors("?????? ???????????? ?????????? ???????????? ??1MB");
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
    <PageLayout className="homePage" titleStyle={false} title="?????????? ???? ????????">
      <div className="FaultReportingPage">
        <div>
          <img id="faultTree" src={faultreporting} style={{ height: 120 }} />
        </div>
        <Title id="titleReporting" size="6" className="header">
          ???????? ??????? ???????????? ???????????
          <br></br>
          ???????? ???????? ???? ???? ????????!
        </Title>

        <label className="form-label">?????????? ?????? ???? ?????????</label>
        <Select
          fullwidth
          value={forest}
          onChange={(event) => setForest(event.target.value)}
          required
        >
          <Select.Content>
            <Select.Option className="placeholder">??????????</Select.Option>
            {forests.map((forestOption) =>
              (<option value={forestOption._id}>{forestOption.forest_name}</option>))}
          </Select.Content>
        </Select>

        <label className="form-label">???????? ??????????</label>
        <Select
          fullwidth
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">??????????</Select.Option>
            <Select.Option>????????????</Select.Option>
            <Select.Option>???????????? ????????????</Select.Option>
            <Select.Option>????????</Select.Option>
            <Select.Option>??????????</Select.Option>
            <Select.Option>????????</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">?????????? ??????????</label>
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
                <label htmlFor="filePicker">?????? ??????????</label>
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
              ????????
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
