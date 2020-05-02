import React, { useState, useMemo } from "react";
import img from "../images/sleep-tracker-analyzer.png";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useSelector } from "react-redux";
import { getHours } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrin, faFrown } from "@fortawesome/free-regular-svg-icons";
import { StyledButton } from "../styles/authStyles";

const Analyzer = () => {
  const info = useSelector((state) => state);
  const [data, setData] = useState([]);

  const sleepCalculator =
    data.length > 0
      ? data
          .filter((elem) => elem.overall_score >= 3)
          .reduce((a, b) => a + getHours(b.sleep_start, b.sleep_end).hours, 0) /
        data.length
      : 0;

  useMemo(() => {
    axiosWithAuth()
      .get("https://sleep-tracker2020.herokuapp.com/api/users/")
      .then((res) => {
        res.data.sessions.length > 10
          ? setData(res.data.sessions)
          : setData([]);
      })
      .catch((err) => console.log(err));
  }, [info.id]);

  console.log(data);
  return (
    <div className="analyzer-wrapper">
      <div className="hours-wrapper">
        <div className="happy-wrapper">
          <div>
            {data.length > 0 ? (
              <p style={{ color: "#e0e0e0" }}>{`${sleepCalculator.toFixed(
                2
              )} hours`}</p>
            ) : (
              <p style={{ color: "#e0e0e0" }}>Uh Oh...</p>
            )}
          </div>
          <div className="happy">
            {data.length > 0 ? (
              <FontAwesomeIcon icon={faGrin} />
            ) : (
              <FontAwesomeIcon icon={faFrown} />
            )}
          </div>
        </div>
        <div
          style={{ color: "#e0e0e0", fontSize: "1.7rem", textAlign: "center" }}
        >
          {data.length > 0
            ? `you're at your best when you get ${sleepCalculator.toFixed(
                2
              )} hours of sleep`
            : "We need more entries before we can make a reccomendation"}
        </div>
        <div className="continue-tracking">
          <StyledButton>Continue Tracking</StyledButton>
        </div>
      </div>
      <img className="analyzer-img" src={img}></img>
    </div>
  );
};

export default Analyzer;
