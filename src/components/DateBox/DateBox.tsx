import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./DateBox.css";
import { useState } from "react";
import SportEvent from "../SportEvent/SportEvent";

const DateBox = () => {

  const [date, setDate] = useState<Date | null>();

  return (
    <>
      <div className="date-picker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Select a Date" value={date} onChange={(date) => setDate(date)}/>
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </>
  );
};

export default DateBox;
