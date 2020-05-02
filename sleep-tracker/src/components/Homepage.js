import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Graph from "./Graph";
import {
  formatDate,
  getWeek,
  getTotalWeeks,
  getHours,
  helper,
} from "../utils/helpers";
import { setData, getWeeks, loginSuccess } from "../redux/actions/authActions";
import {
  HomeContainer,
  Paper,
  PaperContainer,
  Holder,
  GraphContainer,
  TimeContainer,
} from "../styles/authStyles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Container,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ModalForm from "../components/ModalForm";
import DeleteModal from "./DeleteModal";
import MoodScore from "./MoodScore";
import SleepRec from "../components/SleepRec";

const Homepage = () => {
  const userInfo = useSelector((state) => state);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [weeks, setWeeks] = useState(userInfo.weeks);
  const [open, setOpen] = useState(false);

  useMemo(() => {
    setWeeks(userInfo.weeks);
  }, [userInfo.weeks]);

  useEffect(() => {
    if (userInfo.data) {
      const token = localStorage.getItem("token");
      let [start, end] = getWeek(new Date());
      start = formatDate(start);
      end = formatDate(end);

      Axios.get(
        `https://sleep-tracker2020.herokuapp.com/api/users/dates/?start=${start}&end=${end}`,
        {
          headers: { Authorization: token },
        }
      )
        .then((res) => {
          dispatch(setData(res.data));
          dispatch(getWeeks(getTotalWeeks()));
          dispatch(loginSuccess());
        })
        .catch((err) => console.log(err));
    }
  }, [userInfo.id]);

  const handleWeekChange = (week) => {
    console.log(week, "^^^^");
    axiosWithAuth()
      .get(
        `https://sleep-tracker2020.herokuapp.com/api/users/dates?start=${formatDate(
          week[0]
        )}&end=${formatDate(week[1])}`
      )
      .then((res) => {
        console.log(res);
        dispatch(setData(res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleFormat = (date) => {
    console.log(new Date(date[0]).getTime());
    const total = weeks
      .filter((elem) => elem != date)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
    const single = weeks.filter((elem) => elem == date);

    setWeeks(single.concat(total));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="home-wrapper">
      <Holder>
        <GraphContainer>
          <Graph />
        </GraphContainer>

        <HomeContainer>
          <PaperContainer>
            {weeks.length > 0 && (
              <ExpansionPanel
                expanded={expanded ? expanded : false}
                style={{
                  backgroundColor: " #121212",
                  color: "#e0e0e0",
                  margin: "24px auto",
                  width: "600px",
                }}
              >
                <ExpansionPanelSummary
                  style={{}}
                  onClick={() => setExpanded(!expanded)}
                  expandIcon={<ExpandMoreIcon style={{ color: "#e0e0e0" }} />}
                >
                  <Typography
                    style={{ marginLeft: "35%" }}
                  >{`${weeks[0][0]
                    .toString()
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")} - ${weeks[0][1]
                    .toString()
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</Typography>
                </ExpansionPanelSummary>
                {weeks.length > 0 && (
                  <>
                    <ExpansionPanelDetails>
                      <Typography
                        onClick={() => {
                          handleWeekChange(weeks[1]);
                          handleFormat(weeks[1]);
                          setExpanded(!expanded);
                        }}
                      >{`${weeks[1][0]
                        .toString()
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")} - ${weeks[1][1]
                        .toString()
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")}`}</Typography>
                    </ExpansionPanelDetails>
                    {weeks.length > 1 && (
                      <ExpansionPanelDetails>
                        <Typography
                          onClick={() => {
                            handleWeekChange(weeks[2]);
                            handleFormat(weeks[2]);
                            setExpanded(!expanded);
                          }}
                        >{`${weeks[2][0]
                          .toString()
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")} - ${weeks[2][1]
                          .toString()
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}`}</Typography>
                      </ExpansionPanelDetails>
                    )}
                    {weeks.length > 2 && (
                      <ExpansionPanelDetails>
                        <Typography
                          onClick={() => {
                            handleWeekChange(weeks[3]);
                            handleFormat(weeks[3]);
                            setExpanded(!expanded);
                          }}
                        >{`${weeks[3][0]
                          .toString()
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")} - ${weeks[3][1]
                          .toString()
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}`}</Typography>
                      </ExpansionPanelDetails>
                    )}
                    {weeks.length > 3 && (
                      <ExpansionPanelDetails>
                        <Typography
                          onClick={() => {
                            handleWeekChange(weeks[4]);
                            handleFormat(weeks[4]);
                            setExpanded(!expanded);
                          }}
                        >{`${weeks[4][0]
                          .toString()
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")} - ${weeks[4][1]
                          .toString()
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}`}</Typography>
                      </ExpansionPanelDetails>
                    )}
                  </>
                )}
              </ExpansionPanel>
            )}
            {userInfo.data &&
              userInfo.data.length > 0 &&
              userInfo.data.map((elem) => {
                const hours = getHours(elem.sleep_start, elem.sleep_end);
                const h1 = new Date(elem.sleep_start);
                const helped1 = helper(h1);

                return (
                  <Paper style={{ color: "white" }} key={elem.id}>
                    <TimeContainer>
                      <p className="p_container">
                        {new Date(elem.sleep_start)
                          .toString()
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}
                      </p>

                      <p className="p_container">{`${helped1} - ${helper(
                        new Date(elem.sleep_end)
                      )}`}</p>
                    </TimeContainer>
                    <p className="h_container">
                      Total Slept:{" "}
                      {`${Math.floor(hours.hours)}hr ${hours.min}min`}
                    </p>
                    <div className="icons-supplier">
                      <div className="icon-spacer">
                        <EditIcon id="edit-icon" onClick={handleOpen} />
                        <Dialog
                          className="modal"
                          maxWidth="lg"
                          PaperComponent={ModalForm}
                          PaperProps={{ id: elem.id }}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="edit-icon"
                        >
                          <DialogContent style={{ width: "1000px" }}>
                            <Container>
                              <ModalForm />
                            </Container>
                          </DialogContent>
                        </Dialog>
                        <DeleteModal
                          id={elem.id}
                          sleep_start={elem.sleep_start}
                        />
                      </div>
                      <MoodScore overall_score={elem.overall_score} />
                    </div>
                  </Paper>
                );
              })}
          </PaperContainer>
        </HomeContainer>
      </Holder>
    </div>
  );
};

export default Homepage;
