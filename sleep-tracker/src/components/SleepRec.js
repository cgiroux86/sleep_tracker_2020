import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {
  faHourglass,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SleepRec = () => {
  const id = useSelector((state) => state.id);
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://sleep-tracker2020.herokuapp.com/api/users/")
      .then((res) => setData(res.data.sessions))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="sleepRec">
      {data.length > 25 ? (
        <div className="sleep-icon">
          <p style={{ margin: "10px" }}>Analyzer</p>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      ) : (
        <div className="sleep-icon">
          <p style={{ marginRight: "10px" }}>Analyzer</p>{" "}
          <FontAwesomeIcon icon={faHourglass} />
        </div>
      )}
    </div>
  );
};

export default SleepRec;
