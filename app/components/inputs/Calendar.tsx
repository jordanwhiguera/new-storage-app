"use client";

// import "./custom-date-range-styles.css";
// import "./custom-date-range-theme.css";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

import React from "react";
import { DateRange, Range } from "react-date-range";

interface CalendarProps {
  value: Range;
  onChange: (item: any) => void;
  disabledDates?: Date[];
  isSingleDateSelection?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
  isSingleDateSelection,
}) => {
  const handleSelect = (item: any) => {
    if (isSingleDateSelection) {
      // Restrict the selection to a single day
      const singleDaySelection = {
        ...item.selection,
        endDate: item.selection.startDate,
      };
      onChange({ selection: singleDaySelection });
    } else {
      // Allow the range selection
      onChange(item);
    }
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={[value]}
      disabledDates={disabledDates}
      rangeColors={["#475569"]}
      showMonthAndYearPickers={false}
      direction="horizontal"
    />
  );
};

export default Calendar;
