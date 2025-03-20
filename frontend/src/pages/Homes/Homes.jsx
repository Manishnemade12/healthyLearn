import { Headphones } from "lucide-react";

import { Link } from 'react-router-dom';
import "./Homes.css";
import TimerComponent from "./timerComponent/TimerComponent";
import StudyStats from "./timerComponent/TimerStats";
import NotesComponent from "./goalsAndNotes/NotesComponent";
import GoalsComponent from "./goalsAndNotes/GoalsComponent";
import Calendar from "./calenderComponent/CalendarComponent";
import NavBar from "./navBar/NavBar";

function StudyRoom() {
  return (
    <>
      <style>
        {`
          @media (max-width: 1200px) {
            .notes-goals-grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
      <div>
        <h1 className="studyroom-title">Welcome to the Study Dashboard</h1>
      </div>
      <div className="mt-80 m-6 space-y-4">
        <NavBar />
        <div className="flex gap-6 w-full h-auto flex-col [min-width:700px]:flex-col lg:flex-row z-0">
          <div className="flex-1 h-100 flex flex-col gap-6">
            <div className="flex bg-sec rounded-3xl shadow">
              <TimerComponent />
              <StudyStats />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 notes-goals-grid">
              <NotesComponent />
              <GoalsComponent />
            </div>
          </div>
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default StudyRoom;

// import React from "react";
// import "./Homes.css"; // Import the CSS file for styling
// import TimerComponent from "./timerComponent/TimerComponent";
// import StudyStats from "./timerComponent/TimerStats";
// import NotesComponent from "./goalsAndNotes/NotesComponent";
// import GoalsComponent from "./goalsAndNotes/GoalsComponent";
// import Calendar from "./calenderComponent/CalendarComponent";

// const StudyRoom = () => {
//   return (
//     <div className="studyroom-container">
//       <h1 className="studyroom-title">Welcome to the Study Dashboard</h1>
//       <p className="studyroom-description">
//         This is your personalized study space. Manage your tasks, track your progress, and stay productive!
//       </p>
//       {/* <TimerComponent/> */}
//       {/* <StudyStats /> */}
//       <NotesComponent />
//                <GoalsComponent />
//             <Calendar />
              

//     </div>
//   );
// };

// export default StudyRoom;
