import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {
  faHourglass,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SleepRec = ({ logged }) => {
  const userInfo = useSelector((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://sleep-tracker2020.herokuapp.com/api/users/")
      .then((res) => setData(res.data.sessions))
      .catch((err) => console.log(err));
  }, [userInfo.id]);
  return (
    <div className="sleepRec">
      {data.length > 10 ? (
        <div className="sleep-icon">
          <p style={{ margin: "10px" }}>Analyzer</p>
          {userInfo.loggedIn ? (
            <FontAwesomeIcon icon={faCheckCircle} className="grin" />
          ) : (
            <FontAwesomeIcon icon={faHourglass} className="frown" />
          )}
        </div>
      ) : (
        <div className="sleep-icon">
          <p style={{ marginRight: "10px", textDecoration: "none" }}>
            Analyzer
          </p>
          <FontAwesomeIcon icon={faHourglass} className="frown" />
        </div>
      )}
    </div>
  );
};

export default SleepRec;
