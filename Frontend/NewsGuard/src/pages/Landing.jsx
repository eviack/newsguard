import React from "react";
import {
  ChevronRight,
  Github,
  Newspaper,
  Search,
  CheckCircle,
  BarChart,
} from "lucide-react";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DarkLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visible when entering viewport
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset when leaving viewport
            setTimeout(() => {
              setIsVisible(false);
            }, 200); // Small delay to ensure animation resets after leaving viewport
          }
        });
      },
      {
        root: null,
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    const element = document.getElementById("how-it-works");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-dark-2 text-light-2">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="flex items-center space-x-3 mb-8">
          <Logo />
        </div>

        <div className="flex space-x-8">
          <a href="#how-it-works" className="text-gray-400 hover:text-white">
            Workflow
          </a>
          <a href="#pricing" className="text-gray-400 hover:text-white">
            Pricing
          </a>
          <a href="#blog" className="text-gray-400 hover:text-white">
            Blog
          </a>
          <a href="#contact" className="text-gray-400 hover:text-white">
            Contact
          </a>
        </div>

        <button className="bg-white text-black px-6 py-2 rounded-lg font-medium">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-20 px-4">
        <div className="inline-flex items-center bg-[#101012] rounded-full px-6 py-2 mb-8">
          <span className="text-gray-400">How does it work ?</span>
          <span className="ml-2 text-[#5865F2]">Read More</span>
          <ChevronRight className="w-4 h-4 text-[#5865F2]" />
        </div>

        <h1 className="text-6xl font-bold mb-6 max-w-4xl mx-auto">
          Check the authenticity
          <br />
          of news floating around
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Get a detailed analysis report with facts based on the news you heard
          somewhere
        </p>

        <div className="flex justify-center space-x-4 mb-16">
          <button
            className="bg-white text-black px-8 py-3 rounded-lg font-medium cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Start for free
          </button>
          <button className="bg-[#101012] text-white px-8 py-3 rounded-lg font-medium flex items-center">
            <Github className="w-4 h-4 mr-2" /> Github
          </button>
        </div>

        {/* Dashboard Image Placeholder */}
        <div className="max-w-6xl mx-auto px-8 perspective-[2000px] group">
          <div className="relative">
            {/* Glowing Background Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5865F2] to-[#5865F2]/50 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

            {/* Screenshot Container */}
            <div className="relative transform-gpu group-hover:-rotate-x-12 group-hover:rotate-y-6 group-hover:scale-105 transition duration-700 ease-out will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#5865F2]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 rounded-xl"></div>

              {/* Screenshot */}
              <img
                src="/ss1.png"
                alt="Dashboard Preview"
                className="w-full rounded-xl shadow-2xl brightness-90 group-hover:brightness-110 transition duration-700"
              />

              {/* Reflection Effect */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white/10 rounded-b-xl transform translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Stepper */}

      <div
        id="how-it-works"
        className="min-h-screen flex flex-col items-center justify-center px-8 py-20 bg-[#09090A]"
      >
        <h2 className="text-5xl font-bold text-center mb-20">How it works</h2>

        <div className="relative max-w-5xl w-full">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#1F1F22] -translate-y-1/2">
            <div
              className="h-full bg-[#5865F2] rounded-full transition-all duration-1000"
              style={{
                width: isVisible ? "75%" : "0%",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {[
              {
                title: "Reads News",
                icon: <Newspaper className="w-6 h-6" />,
                status: "completed",
                description: "Reads your news and summarises it",
              },
              {
                title: "Researches Articles",
                icon: <Search className="w-6 h-6" />,
                status: "completed",
                description:
                  "Deep analysis of related articles and cross-referencing data",
              },
              {
                title: "Fact Checks",
                icon: <CheckCircle className="w-6 h-6" />,
                status: "active",
                description: "Validates information across trusted sources",
              },
              {
                title: "Generates Report",
                icon: <BarChart className="w-6 h-6" />,
                status: "upcoming",
                description: "Creates comprehensive analysis with key insights",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center transform transition-all duration-700"
                style={{
                  transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 150}ms`,
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 
                    ${
                      step.status === "completed"
                        ? "bg-[#5865F2] text-white"
                        : step.status === "active"
                        ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/20"
                        : "bg-[#1F1F22] text-gray-400"
                    }`}
                >
                  {step.icon}
                  {step.status === "completed" && (
                    <div className="absolute -right-1 -top-1 w-4 h-4 bg-[#5865F2] rounded-full border-2 border-black" />
                  )}
                </div>
                <div className="text-lg font-semibold p-3 mb-2">
                  {step.title}
                </div>
                <div className="text-sm text-gray-400 text-center max-w-[200px] min-h-[60px]">
                  {step.description}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    step.status === "completed" || step.status === "active"
                      ? "text-[#5865F2]"
                      : "text-gray-400"
                  }`}
                >
                  {step.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkLandingPage;
