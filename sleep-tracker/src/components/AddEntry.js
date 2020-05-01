import React, { useState } from "react";
import { withStyles, TextField } from "@material-ui/core";
import {
  faSmile,
  faFrown,
  faGrin,
  faMeh,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../styles/authStyles";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

const WhiteTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "#e0e0e0", // Text color
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#e0e0e0", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#e0e0e0", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e0e0e0", // Solid underline on focus
    },
  },
})(TextField);

const AddEntry = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    sleep_start_date: new Date("2020-04-29"),
    sleep_start_time: "",
    start_score: null,
    sleep_end_date: "",
    sleep_end_time: "",
    end_score: null,
    overall_mood: null,
  });

  const [overall, setOverall] = useState({
    excellent: false,
    good: false,
    ok: false,
    bad: false,
  });

  const [startMood, setSetMood] = useState({
    excellent: false,
    good: false,
    ok: false,
    bad: false,
  });

  const [endMood, setEndMood] = useState({
    excellent: false,
    good: false,
    ok: false,
    bad: false,
  });

  const [startDate, setStartDate] = useState({ date: new Date() });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  const hanldeDateCahnge = (date) => {
    console.log(date);
    setStartDate({ ...date, date: date });
  };

  const [endDate, setEndDate] = useState({ date: new Date() });

  const handleEndDate = (date) => {
    setEndDate({ ...date, date: date });
    console.log(endDate);
  };

  const handleStartScore = () => {
    return startMood.excellent
      ? 4
      : startMood.good
      ? 3
      : startMood.ok
      ? 2
      : startMood.bad
      ? 1
      : null;
  };

  const handleEndScore = () => {
    return endMood.excellent
      ? 4
      : endMood.good
      ? 3
      : endMood.ok
      ? 2
      : endMood.bad
      ? 1
      : null;
  };

  const handleOverallScore = () => {
    console.log(overall);
    return overall.excellent
      ? 4
      : overall.good
      ? 3
      : overall.ok
      ? 2
      : overall.bad
      ? 1
      : 10;
  };
  let err = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      sleep_start: new Date(`${startDate.date}`),
      start_score: handleStartScore(),
      sleep_end: new Date(`${endDate.date}`),
      end_score: handleEndScore(),
      overall_score: handleOverallScore(),
    };
    console.log(startDate, endDate);
    axiosWithAuth()
      .post("https://sleep-tracker2020.herokuapp.com/api/users/", user)
      .then((res) => {
        console.log(user);
        history.push("/homepage");
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="add-wrapper">
      <div className="input-holder">
        <h1 style={{ color: "#e0e0e0", textAlign: "center" }}>Sleep start</h1>
        <form className="form">
          <DateTimePicker
            className="react-datetimepicker"
            onChange={hanldeDateCahnge}
            value={startDate.date}
          />
        </form>
        <div className="icon-container">
          <div
            onClick={() =>
              setSetMood({
                ...startMood,
                excellent: false,
                good: false,
                ok: false,
                bad: true,
              })
            }
          >
            <FontAwesomeIcon
              icon={faFrown}
              className={startMood.bad ? "happy" : "off"}
            />
          </div>
          <div
            onClick={() =>
              setSetMood({
                ...startMood,
                excellent: false,
                good: false,
                ok: true,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              icon={faMeh}
              className={startMood.ok ? "happy" : "off"}
            />
          </div>
          <div
            onClick={() =>
              setSetMood({
                ...startMood,
                excellent: false,
                good: true,
                ok: false,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              className={startMood.good ? "happy" : "off"}
              icon={faSmile}
            />
          </div>
          <div
            onClick={() =>
              setSetMood({
                ...startMood,
                excellent: true,
                good: false,
                ok: false,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              className={startMood.excellent ? "happy" : "off"}
              icon={faGrin}
            />
          </div>
        </div>
      </div>
      <div className="input-holder">
        <h1 style={{ color: "#e0e0e0", textAlign: "center" }}>Sleep End</h1>
        <form className="form">
          <DateTimePicker
            className="react-datetimepicker"
            onChange={handleEndDate}
            value={endDate.date}
          />
        </form>
        <div className="icon-container">
          <div
            onClick={() =>
              setEndMood({
                ...endMood,
                excellent: false,
                good: false,
                ok: false,
                bad: true,
              })
            }
          >
            <FontAwesomeIcon
              icon={faFrown}
              className={endMood.bad ? "happy" : "off"}
            />
          </div>
          <div
            onClick={() =>
              setEndMood({
                ...endMood,
                excellent: false,
                good: false,
                ok: true,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              icon={faMeh}
              className={endMood.ok ? "happy" : "off"}
            />
          </div>
          <div
            onClick={() =>
              setEndMood({
                ...endMood,
                excellent: false,
                good: true,
                ok: false,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              className={endMood.good ? "happy" : "off"}
              icon={faSmile}
            />
          </div>
          <div
            onClick={() =>
              setEndMood({
                ...endMood,
                excellent: true,
                good: false,
                ok: false,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              className={endMood.excellent ? "happy" : "off"}
              icon={faGrin}
            />
          </div>
        </div>
      </div>
      <div className="input-holder">
        <h1 style={{ color: "#e0e0e0", textAlign: "center" }}>Daily Mood</h1>
        <form className="form">
          <DateTimePicker
            className="react-datetimepicker"
            onChange={handleEndDate}
            value={endDate.date}
          />
        </form>
        <div className="icon-container">
          <div
            onClick={() =>
              setOverall({
                ...overall,
                excellent: false,
                good: false,
                ok: false,
                bad: true,
              })
            }
          >
            <FontAwesomeIcon
              icon={faFrown}
              className={overall.bad ? "happy" : "off"}
            />
          </div>
          <div
            onClick={() =>
              setOverall({
                ...overall,
                excellent: false,
                good: false,
                ok: true,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              icon={faMeh}
              className={overall.ok ? "happy" : "off"}
            />
          </div>
          <div
            onClick={() =>
              setOverall({
                ...overall,
                excellent: false,
                good: true,
                ok: false,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              className={overall.good ? "happy" : "off"}
              icon={faSmile}
            />
          </div>
          <div
            onClick={() =>
              setOverall({
                ...overall,
                excellent: true,
                good: false,
                ok: false,
                bad: false,
              })
            }
          >
            <FontAwesomeIcon
              className={overall.excellent ? "happy" : "off"}
              icon={faGrin}
            />
          </div>
        </div>
      </div>
      <div className="button-holder">
        <Button className="entry" onClick={handleSubmit}>
          Add entry
        </Button>
      </div>
    </div>
  );
};

export default AddEntry;
