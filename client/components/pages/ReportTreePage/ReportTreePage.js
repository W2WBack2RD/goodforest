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

  const sendReport = () => {
    // errors = {}
    // if (!location) {
    //   errors.location = true
    //   return
    // }

    dispatch(attemptSendReport(status)).catch(R.identity);
  };

  return (
    <PageLayout className="homePage" titleStyle={false} title="?????????? ???? ????">
      <div className="ReportTreePage">
        <label className="form-label">?????????? ?????? ??????</label>
        <Buttons align="center" addons>
          <Button
            id="left"
            selected={locationBy === "id"}
            onClick={() => setLocationBy("id")}
          >
            ???????? ????????
          </Button>
          <Button
            id="right"
            selected={locationBy === "description"}
            onClick={() => setLocationBy("description")}
          >
            {" "}
            ?????????? ????????
          </Button>
        </Buttons>
        {locationBy === "description" && <label>?????????? ???? ?????????? ????????????*</label>}
        {locationBy === "description" && (
          <Textarea
            placeholder="???????????? ??????????, ?????? ???????????? ??????????"
            maxLength={240}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        )}
        {locationBy === "id" && (
          <label>???????? ?????? (?????? ???????????? ???? ?????????? ??????)</label>
        )}
        {locationBy === "id" && (
          <Input
            placeholder="1235"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        )}

        <Title size="4" className="header">
          ?????????? ???? ?????? ??????
        </Title>

        <label className="form-label">???????? ?????? ???????? ???????? ??????????</label>
        <div className="slider-container">
          <div className="slider-edge">
            <div>
              <img src={treeStatusIcon} style={{ height: 13 }} />
            </div>
            ????????
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
            ????????
          </div>
        </div>

        <label className="form-label">???????? ?????? ???????? ???????? ??????????</label>
        <div className="slider-container">
          <div className="slider-edge">
            <div>
              <img src={treeStatusCircleIcon} style={{ height: 13 }} />
            </div>
            ????????
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
            ????????
          </div>
        </div>

        <label className="form-label">?????? ????????????</label>
        <Select
          fullwidth
          value={leaves}
          onChange={(event) => setLeaves(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">??????????</Select.Option>
            <Select.Option>???? ????????</Select.Option>
            <Select.Option>??????????</Select.Option>
            <Select.Option>???? ???????????? ???? ???????? ??????????</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">?????? ????????????</label>
        <Select
          fullwidth
          value={flowers}
          onChange={(event) => setFlowers(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">??????????</Select.Option>
            <Select.Option>???? ??????????</Select.Option>
            <Select.Option>?????? ??????????</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">?????? ????????????</label>
        <Select
          fullwidth
          value={fruits}
          onChange={(event) => setFruits(event.target.value)}
        >
          <Select.Content>
            <Select.Option className="placeholder">??????????</Select.Option>
            <Select.Option>???? ??????????</Select.Option>
            <Select.Option>?????? ??????????</Select.Option>
          </Select.Content>
        </Select>

        <label className="form-label">?????? ???????? ???? ??????</label>
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
          <div>???? ??????</div>
          <div>??????????</div>
        </div>

        <Textarea
          placeholder="?????? ???????? ????????, ?????? ?????????? ????????????"
          maxLength={240}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
          <Button onClick={sendReport}>????????</Button>
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
            ?????? ???????? ???????? ???? ?????? ??????
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
