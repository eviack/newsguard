// pages/Home.jsx
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Heading from "../components/Heading";
import parseNewsResponse from "../utils/parseresponse";
import { axiosInstance } from "../utils/axios.js";

import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsHistory = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/news-history");
        const parsedData = response.data.map(parseNewsResponse); // Parse each item
        setNewsItems(parsedData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news items."); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchNewsHistory();
  }, []);

  if (loading) return <Loader />;

  if (error) return toast.error(error);

  return (
    <div className="min-h-screen bg-dark-2 text-gray-100 flex flex-col">
      <div className="w-full">
        <Heading />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {newsItems.map((item, index) => (
            <NewsCard key={`news-item${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
