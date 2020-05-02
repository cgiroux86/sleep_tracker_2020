import React from "react";

import {
  faSmile,
  faFrown,
  faGrin,
  faMeh,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MoodScore = (props) => {
  return (
    <div className="mood-container">
      <p style={{ color: "#e0e0e0", fontSize: "1.1rem" }}>Daily Mood: </p>
      <p>
        {props.overall_score === 4 ? (
          <FontAwesomeIcon icon={faGrin} />
        ) : props.overall_score === 3 ? (
          <FontAwesomeIcon icon={faSmile} />
        ) : props.overall_score === 2 ? (
          <FontAwesomeIcon icon={faMeh} />
        ) : (
          <FontAwesomeIcon icon={faFrown} />
        )}
      </p>
    </div>
  );
};

export default MoodScore;
