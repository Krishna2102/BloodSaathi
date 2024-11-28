import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn';
import About from './components/About';
import UserDashboard from './components/UserDashboard/UserDashboard';
import HospitalDashboard from './components/HospitalDashboard/HospitalDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ChatbotPage from './components/ChatBotPage';
import FaqSection from './components/FaqSection';
import BloodRequestManager from './components/AdminDashboard/BloodRequestManager';
import InspirationalStory from './components/InspirationalStory';
import ProtectedRoute from './components/protected';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/faqs',
    element: <FaqSection />
  },
  {
    path: '/userdashboard',
    element: (
      <ProtectedRoute element={<UserDashboard />} allowedRoles={['User']} />
    )
  },
  {
    path: '/admindashboard',
    element: (
      <ProtectedRoute element={<AdminDashboard />} allowedRoles={['Admin']} />
    )
  },
  {
    path: '/hospitaldashboard',
    element: (
      <ProtectedRoute element={<HospitalDashboard />} allowedRoles={['Hospital']} />
    )
  },
  {
    path: '/chat',
    element: <ChatbotPage />
  },
  {
    path: '/blood-requests',
    element: (
      <ProtectedRoute element={<BloodRequestManager />} allowedRoles={['admin']} />
    )
  },
  {
    path: '/stories',
    element: <InspirationalStory />
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;