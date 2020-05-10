import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { getHours } from "../utils/helpers";
import { TitleWrapper, StyledButton, ButtonHolder } from "../styles/authStyles";
import { useHistory } from "react-router-dom";

const Graph = () => {
  const data = useSelector((state) => state.data);
  const [formatted, setFormatted] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (data.length) {
      setFormatted(
        data.map((elem) => getHours(elem.sleep_start, elem.sleep_end))
      );
    } else {
      setFormatted([]);
    }
  }, [data]);

  return (
    <div className="graph_wrapper">
      <TitleWrapper>
        <p style={{ color: "#e0e0e0" }}>Hours slept</p>
      </TitleWrapper>
      <BarChart
        width={window.screen.width < 800 ? window.screen.availWidth : 700}
        height={window.screen.height / 2.5}
        data={formatted}
        margin={
          window.screen.availWidth > 768
            ? {
                top: 10,
                right: 60,
                left: 10,
                bottom: 10,
              }
            : { top: 0, left: 0, right: 50, bottom: 0 }
        }
      >
        <CartesianGrid strokeDasharray="3 3" fill="#121212" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="hours" fill="#39869d" />
      </BarChart>
      <ButtonHolder>
        <StyledButton onClick={() => history.push("/add-entry")}>
          Add session
        </StyledButton>
      </ButtonHolder>
    </div>
  );
};

export default Graph;
