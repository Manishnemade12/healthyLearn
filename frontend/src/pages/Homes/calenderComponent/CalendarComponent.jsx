import { useState, useEffect } from "react";
import { parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventPopup from "./eventPopup";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Store events locally
  const [selectedDay, setSelectedDay] = useState(null);
  const [time, setTime] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1);

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  useEffect(() => {
    // Update clock
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDayClick = (day) => {
    const date = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDay(date);
  };

  const handleClosePopup = () => {
    setSelectedDay(null);
  };

  const handleSaveEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const existingEventIndex = prevEvents.findIndex(
        (event) => event.date === newEvent.date
      );
      if (existingEventIndex !== -1) {
        // Update existing event
        const updatedEvents = [...prevEvents];
        updatedEvents[existingEventIndex] = newEvent;
        return updatedEvents;
      } else {
        // Add new event
        return [...prevEvents, newEvent];
      }
    });
  };

  const handleDeleteEvent = (date) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.date !== date));
  };

  const blankDays = Array(firstDayOfMonth).fill(null);
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const [timePart, period] = formattedTime.split(" ");

  return (
    <>
      <div className="bg-sec pt-6 w-[25%] min-w-fit rounded-3xl shadow flex flex-col max-h-[750px]">
        {/* Header: Time and Day */}
        <div className="px-6">
          <h1 className="text-5xl font-thin txt mb-2">
            {timePart} <span className="text-xl">{period}</span>
          </h1>
          <h2 className="text-md txt-dim">
            Today&apos;s{" "}
            {
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " "
              )[currentDate.getDay()]
            }
          </h2>
        </div>
        <hr className="my-4 opacity-10" />

        {/* Calendar View */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-lg font-semibold">
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-full hover:bg-ter"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-full hover:bg-ter"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-[0.4rem]">
            {"Su Mo Tu We Th Fr Sa".split(" ").map((day) => (
              <div key={day} className="text-center text-xs font-md txt-dim">
                {day}
              </div>
            ))}
            {blankDays.map((_, index) => (
              <div key={`blank-${index}`} className="p-3"></div>
            ))}
            {daysArray.map((day) => {
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();
              const hasEvent = events.some((event) => {
                const eventDate = parseISO(event.date);
                return (
                  eventDate.getDate() === day &&
                  eventDate.getMonth() === currentDate.getMonth() &&
                  eventDate.getFullYear() === currentDate.getFullYear()
                );
              });
              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`flex items-center justify-center p-2.5 text-sm rounded-full txt cursor-pointer transition-all duration-200 ease-in-out h-9 
                  ${isToday ? "bg-purple-600 hover:bg-purple-700" : ""}
                  ${hasEvent && !isToday ? "bg-ter hover:bg-ter" : ""}
                  ${!isToday && !hasEvent ? "hover:bg-ter" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Section */}
        <div className="p-6 rounded-3xl bg-ter flex-1 mt-6">
          <h3 className="text-lg font-semibold txt mb-4">Events:</h3>
          {events.length > 0 ? (
            <ul className="txt space-y-6 pl-2">
              {events.map((event, index) => (
                <li key={index} className="pl-3 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div className="text-sm txt-dim">{event.date}</div>
                    <div className="text-xs txt-dim">{event.time}</div>
                  </div>
                  <span className="block mt-1">{event.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="txt-dim text-sm">No events.</p>
          )}
        </div>
      </div>

      {selectedDay && (
        <EventPopup
          date={selectedDay}
          onClose={handleClosePopup}
          saveEvent={handleSaveEvent}
          deleteEvent={handleDeleteEvent}
        />
      )}
    </>
  );
}

export default Calendar;