import { Route, Routes } from 'react-router-dom'
import ResponsiveNavbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import BottomBar from './components/BottomBar/BottomBar'
import ChatDashboard from './pages/ChatBotPage/ChatDashboard'
import CourseList from "./pages/Courses/CourseList/CourseList"
import CourseDetail from "./pages/Courses/CourseDetails/CourseDetails"
import InterestQuiz from "./pages/Courses/InterestQuiz/InterestQuiz"
import coursesData from "./data/CourseData"
import WellnessChatbot from './pages/WellnessQuiz/WellnessQuiz'
import VRSpeechTrainer from './components/VRSpeechTrainer.jsx/vr-speech-trainer'
import Streamlit from './components/streamlit/Streamlit'
import ProfilePage from './pages/Profile/profile'
import { CommunityDashboard } from './components/community/community-dashboard'
import { CommunityDetail } from './components/community/community-detail'
import Quizzes from './pages/Quizzes/Quizzes'
// import StudyRoom from './pages/Homes/Homes'
import StudyRoom from './pages/Homes/Homes';
import VideoCall from './pages/VideoCall/VideoCall'
// import Leaderboard from './pages/quizz/Leaderboard.jsx'
// import QuizPerformance from './pages/quizz/QuizPerformance.jsx'
// import Quiz from './pages/quizz/Quiz.jsx'

function App() {
 
  return (
    <>
      <ResponsiveNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai assistant" element={<ChatDashboard />} />
        <Route path="/courses" element={<CourseList courses={coursesData} />} />
        <Route path="/courses/:id" element={<CourseDetail courses={coursesData} />} />
        <Route path="/courseQuiz" element={<InterestQuiz courses={coursesData} />} />
        <Route path="/serene ai" element={<WellnessChatbot />} />
        <Route path="/meditation" element={<Streamlit />} />
        <Route path="/vr-speech" element={<VRSpeechTrainer />} />
        <Route path="/studydashboard" element={<StudyRoom />} />

        <Route path="/Quizzes" element={<Quizzes />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/communities" element={<CommunityDashboard />} />
        <Route path="/communities/:id" element={<CommunityDetail />} />
        <Route path="/communities/videomeet" element={<VideoCall />} />
      </Routes>
      <BottomBar />
    </>
  );
}

export default App;
