import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateBox.css"

const DateBox = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className="date-picker">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
    </>
  );
};

export default DateBox;
