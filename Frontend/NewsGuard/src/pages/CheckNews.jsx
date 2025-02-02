

import { useState, useEffect } from "react"
import { Link2, ArrowUpCircle, CheckCircle } from "lucide-react"
import toast from "react-hot-toast"
import { axiosInstance } from "../utils/axios"
import NewsCard from "../components/NewsCard"
import parseNewsResponse from "../utils/parseresponse"

const steps = ["Reading your news", "Reading articles", "Calling the fact checking agent", "Collecting reports"]

export default function CheckNews() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  const [newsItem, setNewsItem] = useState(null)

  const staticText = "Say"; // This part stays constant
  const dynamicText = " the news you heard..."; // This part types and deletes
  const [displayText, setDisplayText] = useState(staticText);
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isDeleting && index < dynamicText.length) {
      // Typing effect
      timeout = setTimeout(() => {
        setDisplayText(staticText + dynamicText.slice(0, index + 1));
        setIndex(index + 1);
      }, 100);
    } else if (isDeleting && index > 0) {
      // Deleting effect (only dynamic part)
      timeout = setTimeout(() => {
        setDisplayText(staticText + dynamicText.slice(0, index - 1));
        setIndex(index - 1);
      }, 50);
    } else if (index === dynamicText.length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (index === 0 && isDeleting) {
      // Restart loop
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  useEffect(() => {
    if (isProcessing && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1)
      }, 3000) // Change step every 3 seconds

      return () => clearTimeout(timer)
    }
  }, [isProcessing, currentStep])

  const handleSubmit = async () => {
    if (!input.trim()) return

    
    setCurrentStep(0)

    try {
      // Simulating API call
        setIsProcessing(true)
      const response = await axiosInstance.post("/news-check", {
        input_data: input
      })

      setNewsItem(parseNewsResponse(response.data))
      setIsProcessing(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error occurred while processing the news")
    } finally {
      setIsProcessing(false)
      
    }
  }

  return (
    <div className="min-h-screen bg-dark-2 text-gray-100 p-6">
      <div className="flex mt-10 flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-light-1 mb-6 flex items-center">
      {displayText}
      <span className="inline-block w-[3px] h-8 bg-primary-500 animate-blink ml-2"></span>
    </h1>
        <p className="text-light-3 max-w-2xl text-center mb-10">
          Paste the news below to get the authenticity report. It takes some time to generate the report.
        </p>

        <div className="w-full max-w-[600px] bg-dark-4 rounded-lg border border-[#232323] mb-6">
          <div className="relative flex items-center p-4">
            <input
              type="text"
              placeholder="Type in the news..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent px-3 text-[15px] text-light-1 placeholder:text-muted-foreground/50 focus:outline-none"
            />
            <ArrowUpCircle className="text-muted-foreground/50 cursor-pointer" size={25} onClick={handleSubmit} />
          </div>
          <Link2 className="text-light-3 m-3" size={20} />
        </div>

        {isProcessing && (
          <div className="w-full max-w-[600px] mt-8">
            <div className="relative">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center mb-6">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                      index <= currentStep ? "border-primary-500 text-primary-500" : "border-gray-500 text-gray-500"
                    } ${index === currentStep ? "animate-pulse" : ""}`}
                  >
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
                  </div>
                  <div className={`ml-4 ${index <= currentStep ? "text-light-1" : "text-gray-500"}`}>{step}</div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-[15px] w-[2px] h-[30px] bg-gray-500 ${
                        index < currentStep ? "bg-primary-500" : ""
                      }`}
                      style={{ top: `${index * 48 + 32}px` }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {newsItem && !isProcessing && (
          <div className="bg-dark-3 p-6 rounded-lg max-w-[600px] w-full mt-8">
            <h2 className="text-xl font-semibold mb-4 text-light-1">Result:</h2>

            <NewsCard item ={newsItem} />
          </div>
        )}
      </div>
    </div>
  )
}

