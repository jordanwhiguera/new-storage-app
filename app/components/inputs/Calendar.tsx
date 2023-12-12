"use client";
import React from "react";
// import "./custom-date-range-styles.css";
// import "./custom-date-range-theme.css";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#475569"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      disabledDates={disabledDates}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
    />
  );
};

export default Calendar;
