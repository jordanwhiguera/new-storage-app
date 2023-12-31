"use client";
import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";
import Checkbox from "../inputs/Checkbox";
import { FaInfinity } from "react-icons/fa6";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabledDates: Date[];
  disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  disabled,
}) => {
  const [isMonthToMonth, setIsMonthToMonth] = React.useState(false);
  const handleCheckboxChange = () => {
    setIsMonthToMonth(!isMonthToMonth);
  };
  const handleDateChange = (item: any) => {
    if (isMonthToMonth) {
      // Update your date state to reflect a single date
      const newRange = {
        ...dateRange,
        startDate: item.selection.startDate,
        endDate: item.selection.startDate, // End date is the same for single day selection
      };
      onChangeDate(newRange);
    } else {
      // Handle as a range
      onChangeDate(item.selection);
    }
  };
  return (
    <div className="bg-white rounded-md border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${price}</div>
        <div className="font-light text-neutral-600">day</div>
      </div>
      <hr />
      <div className="relative">
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={handleDateChange}
          isSingleDateSelection={isMonthToMonth}
        />
        {isMonthToMonth && (
          <div className=" absolute top-4 right-4 w-52 md:w-28 lg:w-36 lg:right-10 h-9 bg-white flex justify-center items-center custom-right-md custom-right-md-two custom-right-lg custom-right-sm custom-right-sm-two custom-right-sm-three">
            <FaInfinity size={32} />
          </div>
        )}
      </div>

      <hr />
      <Checkbox onChange={handleCheckboxChange} />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
