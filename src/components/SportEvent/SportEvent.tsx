import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./SportEvent.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// homeSpread: data.events[0].lines.spread.point_spread_home_delta,
// awaySpread: data.events[0].lines.spread.point_spread_away_delta,
// total: data.events[0].lines.total.total_over_delta

interface IsportsEvent {
  id: string;
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
  const [date, setDate] = useState<Date | null>(null);
  const [sportsEvent, setSportsEvent] = useState<IsportsEvent[] | null>(null)
    // id: "",
    // homeScore: 0,
    // awayScore: 0,
    // homeMascot: "home mascot",
    // awayMascot: "away mascot",
    // homeCity: "home city",
    // awayCity: "away city",
    // date: "",
    // homeRecord: "0-0",
    // awayRecord: "0-0",
    // homeSpread: 0,
    // awaySpread: 0,
    // total: 0,

  const getEvent = async () => {
    // this pulls NFL data
    let eventList = [];
    const url = `https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/${date?.toISOString()}?include=scores&affiliate_ids=1%2C2%2C3&offset=0`;
    const options = {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': '8dcef3812amsh772ee3abdaedb47p13806djsndba56be22ddb',
        'X-RapidAPI-Host': 'therundown-therundown-v1.p.rapidapi.com'
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      for (let sEvent of data.events){
        const newEvent = {
          id: sEvent.event_id,
          homeScore: sEvent.score.score_home,
          awayScore: sEvent.score.score_away,
          homeMascot: sEvent.teams_normalized[1].mascot,
          awayMascot: sEvent.teams_normalized[0].mascot,
          homeCity: sEvent.teams_normalized[1].name,
          awayCity: sEvent.teams_normalized[0].name,
          date: sEvent.event_date.toLocaleString(),
          homeRecord: sEvent.teams_normalized[1].record,
          awayRecord: sEvent.teams_normalized[0].record
        }

        eventList.push(newEvent);

      }

      setSportsEvent(eventList);
    } catch (error) {
      console.error(error);
    }
  };

  // const addEvent = async () => {
  //   if (typeof auth.currentUser !== null) {
  //     const user = auth?.currentUser?.uid;
  //     if (user) {
  //       await setDoc(doc(db, "users", user, "watchList"), {
  //         id: sportsEvent.id,
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    getEvent();
  }, [date]);

  return (
    <>
      <div className="date-picker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Select a Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      {sportsEvent?(sportsEvent).map(sEvent => {
        return (
        <div className="scorecard">
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <div className="home">
                <span className="city">
                  <h4>{sEvent.homeCity}</h4>
                </span>
                <span className="name">
                  <h4>{sEvent.homeMascot}</h4>
                </span>
                <span className="record">
                  <p>{sEvent.homeRecord}</p>
                </span>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="score">
                {sEvent.homeScore} - {sEvent.awayScore}
              </div>
              <div className="event-date">{sEvent.date}</div>
              <div className="follow">
                <button>Add to Watch List</button>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="away">
                <span className="city">
                  <h4>{sEvent.awayCity}</h4>
                </span>
                <span className="name">
                  <h4>{sEvent.awayMascot}</h4>
                </span>
                <span className="record">
                  <p>{sEvent.awayRecord}</p>
                </span>
              </div>
            </Grid>
          </Grid>
        </div>
        )
      }):null}
    </>
  );
};

export default SportEvent;
