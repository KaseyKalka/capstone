import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./SportEvent.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// homeSpread: data.events[0].lines.spread.point_spread_home_delta,
// awaySpread: data.events[0].lines.spread.point_spread_away_delta,
// total: data.events[0].lines.total.total_over_delta

interface sportsEvent {
  id: number;
  homeScore: number;
  awayScore: number;
  homeMascot: string;
  awayMascot: string;
  homeCity: string;
  awayCity: string;
  date: string;
  homeRecord: string;
  awayRecord: string;
  // homeSpread: number;
  // awaySpread: number;
  // total: number;
}

const SportEvent = () => {
  const [date, setDate] = useState<Date | null>();
  const [sportsEvent, setSportsEvent] = useState<sportsEvent>({
    id: 0,
    homeScore: 0,
    awayScore: 0,
    homeMascot: "home mascot",
    awayMascot: "away mascot",
    homeCity: "home city",
    awayCity: "away city",
    date: "",
    homeRecord: "0-0",
    awayRecord: "0-0",
    // homeSpread: 0,
    // awaySpread: 0,
    // total: 0,
  });

  const getEvent = async () => {
    // this pulls NFL data
    const url = `https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/${date?.toISOString()}?include=scores&affiliate_ids=1%2C2%2C3&offset=0`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fd91ce8997mshd0db9476817f658p129aa9jsn07647c216658",
        "X-RapidAPI-Host": "therundown-therundown-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      setSportsEvent({
        id: data.events[0].event_id,
        homeScore: data.events[0].score.score_home,
        awayScore: data.events[0].score.score_away,
        homeMascot: data.events[0].teams_normalized[1].mascot,
        awayMascot: data.events[0].teams_normalized[0].mascot,
        homeCity: data.events[0].teams_normalized[1].name,
        awayCity: data.events[0].teams_normalized[0].name,
        date: data.events[0].event_date,
        homeRecord: data.events[0].teams_normalized[1].record,
        awayRecord: data.events[0].teams_normalized[0].record,
        //Dont know how to index into lines becuase its an object that holds an object
        // homeSpread: data.events[0].lines.spread.point_spread_home_delta,
        // awaySpread: data.events[0].lines.spread.point_spread_away_delta,
        // total: data.events[0].lines.total.total_over_delta
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addEvent = async () => {
    if (typeof auth.currentUser !== null) {
      const user = auth?.currentUser?.uid;
      if (user) {
        await setDoc(doc(db, "users", user, "watchList"), {
          id: sportsEvent.id,
        });
      }
    }
  };

  useEffect(() => {
    //getEvent();
  }, []);

  return (
    <>
      <div className="date-picker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Select a Date"
              value={date}
              onChange={(date) => setDate(date)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      
      <div className="scorecard">
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <div className="home">
              <span className="city">
                <h4>{sportsEvent.homeCity}</h4>
              </span>
              <span className="name">
                <h4>{sportsEvent.homeMascot}</h4>
              </span>
              <span className="record">
                <p>{sportsEvent.homeRecord}</p>
              </span>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="score">
              {sportsEvent.homeScore} - {sportsEvent.awayScore}
            </div>
            <div className="event-date">{sportsEvent.date}</div>
          </Grid>
          <Grid item xs={4}>
            <div className="away">
              <span className="city">
                <h4>{sportsEvent.awayCity}</h4>
              </span>
              <span className="name">
                <h4>{sportsEvent.awayMascot}</h4>
              </span>
              <span className="record">
                <p>{sportsEvent.awayRecord}</p>
              </span>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SportEvent;
