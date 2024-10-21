import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import TestLevel from "./pages/testLevel/TestLevel";
import Articles from "./pages/articles/Articles";
import OnlineSessions from "./pages/onlineSessions/OnlineSessions";
import AiChat from "./pages/aiChat/AiChat";
import ShowArticle from "./pages/articles/ShowArticle/ShowArticle";
import QuizContainer from "./pages/testLevel/QuizzContainer/QuizzContainer";
import AddArticle from "./pages/articles/AddArticle";
import AddQuestionForm from "./pages/testLevel/AddQuestionFrom";
import HandleSuccess from "./pages/login/HandleSuccess";
import CourseMap from './pages/course/courseMap/CourseMap';
import CourseDetail from './pages/course/courseDetail/CourseDetail';
import CourseQuiz from './pages/course/courseQuiz/CourseQuiz';
import {jsQuizz} from './courseQuiz'
import CourseCertf from './pages/course/courseCertf/CourseCertf';
import CourseLang from './pages/course/courseLang/CourseLang';

import ModifyQuestion from "./pages/testLevel/ModifyQuestion";
import { SelectedQuestionContext } from "./pages/testLevel/SelectedQuestionContext";
import { SelectedArticleContext } from "./pages/articles/SelectedArticleContext";
import ModifyArticle from "./pages/articles/ModifyArticle";
import { useState } from "react";
import Profile from "./pages/Profile/Profile";
import ManageMeet from "./pages/onlineSessions/ManageMeet";
import Admin from "./pages/admin/Admin";
import SidebarAdmin from "./pages/admin/SidebarAdmin";
import AdDeletemeet from "./pages/onlineSessions/AdDeletemeet";
const queryClient = new QueryClient();
function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="665917581452-of49hod1dv1s8a4oq0ep9rscm7q9llk0.apps.googleusercontent.com">
        <SelectedQuestionContext.Provider
          value={{ selectedQuestion, setSelectedQuestion }}
        >
          <SelectedArticleContext.Provider
            value={{ selectedArticle, setSelectedArticle }}
          >
            <Router>
              <div className="App">
                <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/AddArticle" element={<AddArticle />} />
                  <Route path="/ModifyArticle" element={<ModifyArticle />} />
                  <Route path="/AddQuestion" element={<AddQuestionForm />} />
                  <Route path="/ModifyQuestion" element={<ModifyQuestion />} />
                  <Route path="/course" element={<CourseLang/>}/>
                  <Route path="/course/coursemap" element={<CourseMap/>} />
                  <Route path="/course/coursedetail" element={<CourseDetail/>} />
                  <Route path="/course/coursequiz" element={<CourseQuiz questions={jsQuizz.questions} />} />
                  <Route path="/course/coursecertf" element={<CourseCertf/>} />
                  <Route
                    path="/quiz/:language/:level"
                    element={<QuizContainer />}
                  />
                  <Route path="/testlvl" element={<TestLevel />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id" element={<ShowArticle />} />
                  <Route path="/onlinesessions" element={<OnlineSessions />} />
                  <Route path="/onlinesessions" element={<OnlineSessions />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/meet" element={<ManageMeet />} />
                  <Route path="/editmeet" element={<AdDeletemeet />} />
                  <Route path="/aichat" element={<AiChat />} />
                  <Route exact path="/admin" element={<SidebarAdmin />} />
                </Routes>
                <Footer />

              </div>
              <Routes>
                  <Route path="/login" element={<HandleSuccess />} />
                  

                </Routes>
            </Router>
          </SelectedArticleContext.Provider>
        </SelectedQuestionContext.Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
    
  );
}

export default App;
