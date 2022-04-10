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
import treeStatusIcon from "_assets/icons/big-tree-status.svg";
import treeStatusCircleIcon from "../../../assets/icons/big-tree-status-circle.svg";
import leaveStatusIcon from "../../../assets/icons/leave-staus.svg";
import leaveStatusSelectedIcon from "../../../assets/icons/leave-staus-selected.svg";
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
    // errors = {}
    // if (!location) {
    //   errors.location = true
    //   return
    // }

    dispatch(attemptSendReport(status)).catch(R.identity);
  };

  return (
    <PageLayout className="homePage" titleStyle={false} title="עדכון על עץ">
      <div className="ReportTreePage">
        <label className="form-label">מיקום העץ לפי</label>
        <Buttons align="center" addons>
          <Button
            id="left"
            selected={locationBy === "id"}
            onClick={() => setLocationBy("id")}
          >
            מספר מזהה
          </Button>
          <Button
            id="right"
            selected={locationBy === "description"}
            onClick={() => setLocationBy("description")}
          >
            {" "}
            תיאור מקום
          </Button>
        </Buttons>
        {locationBy === "description" && <label>תיאור של המקום המשוער*</label>}
        {locationBy === "description" && (
          <Textarea
            placeholder="בכניסה ימינה, העץ השלישי משמאל"
            maxLength={240}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        )}
        {locationBy === "id" && (
          <label>מספר העץ (כפי שמופיע על התגית שלו)</label>
        )}
        {locationBy === "id" && (
          <Input
            placeholder="1235"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        )}

        <Title size="4" className="header">
          פרטים על מצב העץ
        </Title>

        <label className="form-label">גובה העץ ביחס לשאר העצים</label>
        <div className="slider-container">
          <div className="slider-edge">
            <div>
              <img src={treeStatusIcon} style={{ height: 13 }} />
            </div>
            נמוך
          </div>
          <input
            type="range"
            min="1"
            max="5"
            className="slider"
            id="height"
            value={height}
            onChange={(event) => setHeight(parseInt(event.target.value))}
          ></input>
          <div className="slider-edge">
            <div>
              <img src={treeStatusIcon} />
            </div>
            גבוה
          </div>
        </div>

        <label className="form-label">קוטר העץ ביחס לשאר העצים</label>
        <div className="slider-container">
          <div className="slider-edge">
            <div>
              <img src={treeStatusCircleIcon} style={{ height: 13 }} />
            </div>
            נמוך
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={diameter}
            onChange={(event) => setDiameter(parseInt(event.target.value))}
            class="slider"
            id="diameter"
          ></input>
          <div className="slider-edge">
            <div>
              <img src={treeStatusCircleIcon} />
            </div>
            גבוה
          </div>
        </div>

        <label className="form-label">מצב העלווה</label>
        <Select
          fullwidth
          value={leaves}
          onChange={(event) => setLeaves(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">בחירה</Select.Option>
            <Select.Option>יש עלים</Select.Option>
            <Select.Option>בשלכת</Select.Option>
            <Select.Option>יש ניצנים של עלים חדשים</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">מצב הפריחה</label>
        <Select
          fullwidth
          value={flowers}
          onChange={(event) => setFlowers(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">בחירה</Select.Option>
            <Select.Option>יש פרחים</Select.Option>
            <Select.Option>אין פרחים</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">מצב הפירות</label>
        <Select
          fullwidth
          value={fruits}
          onChange={(event) => setFruits(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">בחירה</Select.Option>
            <Select.Option>יש פירות</Select.Option>
            <Select.Option>אין פירות</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">מצב כללי של העץ</label>
        <div className="rate">
          <img
            src={leaveStatusSelectedIcon}
            className="rate-item"
            onClick={() => {
              setStatus(1);
            }}
          />
          <img
            src={generalStatus >= 2 ? leaveStatusSelectedIcon : leaveStatusIcon}
            className="rate-item"
            onClick={() => {
              setStatus(2);
            }}
          />
          <img
            src={generalStatus >= 3 ? leaveStatusSelectedIcon : leaveStatusIcon}
            className="rate-item"
            onClick={() => {
              setStatus(3);
            }}
          />
          <img
            src={generalStatus >= 4 ? leaveStatusSelectedIcon : leaveStatusIcon}
            className="rate-item"
            onClick={() => {
              setStatus(4);
            }}
          />
          <img
            src={generalStatus >= 5 ? leaveStatusSelectedIcon : leaveStatusIcon}
            className="rate-item"
            onClick={() => {
              setStatus(5);
            }}
          />
        </div>
        <div className="rate-text">
          <div>לא טוב</div>
          <div>מצוין</div>
        </div>

        <Textarea
          placeholder="העץ נראה חולה, אחד העלים פגומים"
          maxLength={240}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
          <Button onClick={sendReport}>המשך</Button>
        </div>
        <input
          id="filePicker"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={(e) => upload(e.target.files[0])}
        ></input>

        <div className="adopt-tree">
          <img src={treeIcon} />
          <a
            className="link"
            href="https://www.goodforest.org/plantatree"
            target="_blank"
          >
            אני רוצה לאמץ את העץ הזה
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
