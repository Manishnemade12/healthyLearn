// import { useState, useEffect } from "react";
// import { User } from "lucide-react";
// import { Link } from "react-router-dom";
// import Ai from "./AiChatbot.jsx";
// import PinnedLinks from "./PinnedLinks.jsx";
// import Slogan from "./Slogan.jsx";

// function NavBar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [selectedId, setSelectedId] = useState(""); // for AI, do not remove

//   useEffect(() => {
//     if (selectedId) {
//       console.log("Selected ID:", selectedId);
//     }
//   }, [selectedId]);

//   useEffect(() => {
//     // Ensure localStorage is accessed only on the client side
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (token) setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <div className="flex justify-between items-center bg-transparent z-10 p-4">
//       {/* Pinned Links Section */}
//       <PinnedLinks />

//       {/* Slogan Section */}
//       <Slogan />

//       {/* Right Section: AI & Login */}
//       <div className="flex items-center gap-6">
//         {/* AI Chatbot Button */}
//         <Ai onShowId={setSelectedId} />

//         {/* Login Button (Only if not logged in) */}
//         {!isLoggedIn && (
//           <Link
//             to="/authenticate"
//             className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 text-white"
//           >
//             <User className="w-5 h-5" />
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default NavBar;
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import Ai from "./AiChatbot";
import PinnedLinks from "./PinnedLinks";
import Slogan from "./Slogan";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedId, setSelectedId] = useState(""); // For AI, do not remove

  useEffect(() => {
    if (selectedId) {
      console.log("Selected ID:", selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex justify-between items-center bg-transparent z-10 p-4">
      {/* Pinned Links Section */}
      <PinnedLinks />

      {/* Slogan Section */}
      <Slogan />

      {/* Right Section: AI & Login */}
      <div className="flex items-center gap-6">
        {/* AI Chatbot Button */}
        <Ai onShowId={setSelectedId} />

        {/* Login Button (Only if not logged in) */}
        {!isLoggedIn && (
          <Link
            to="/authenticate"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 text-white"
          >
            <User className="w-5 h-5" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;