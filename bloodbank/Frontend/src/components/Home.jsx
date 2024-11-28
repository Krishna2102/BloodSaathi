import React from "react";
import Navbar from "./shared/Navbar";
import WaveTextAnimation from "./Animation/WaveTextAnimation";
import logo from '../images/above-h1.png';
import '../App.css';
import Sliding from "./Sliding";
import Stats from "./Stats";
import { Button } from "./ui/button";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate= useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4 bg-slate-100">
        <img src={logo} alt="Logo" className="mb-4 mt-16 w-64 h-auto" />
        <WaveTextAnimation text="Saving Lives, One Drop at a Time" />
        <p className="mt-4 text-center max-w-2xl">
          Welcome to BloodLink, We are dedicated to connecting people in need of
          life-saving blood with generous donors and trusted hospitals. Our
          mission is to ensure a steady and safe supply of blood for every
          emergency and planned medical procedure. Together, we can make a
          difference and save lives.
        </p>
        <div className="mt-3 flex">
          <Button onClick={()=>navigate('/signin')} className='mr-3 hover:bg-[#ef342d]'>Request Blood</Button>
          <Button onClick={()=>navigate('/signin')} className='ml-3 hover:bg-[#ef342d]'>Donate Blood</Button>
        </div>
      </div>
      <Stats />
      <Sliding />
      <Footer />
    </div>
  );
};

export default Home;
