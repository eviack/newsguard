// function parseNewsResponse(apiResponse) {
//   // Extract the report string from final_state
//   const report = apiResponse?.final_state?.report || "";

//   const date = apiResponse?.created_at

//   // Split the report by lines to isolate verdict and explanation
//   const lines = report.split("\n");

  
//   // Extract the explanation only
//   const explanationLine = lines.find(line => line.startsWith("Explanation:"));
//   const content = explanationLine ? explanationLine.replace("Explanation:", "").trim() : "";

//   return {
//     id: apiResponse._id || null, // Assuming the API provides an ID
//     entered_news: apiResponse.input_data || "",
//     content: content, // Now contains only the explanation
//     urls: apiResponse.final_state?.relevant_metadata || [], // URLs remain unchanged
//     verdict: lines[0]?.replace("Verdict: ", "").trim() || "Unknown", // Extracts the verdict
//     date: date, // Default to today's date
//   };
// }

// export default parseNewsResponse
function parseNewsResponse(apiResponse) {
  // Extract the report string from final_state
  const report = apiResponse?.final_state?.report || "";

  const date = apiResponse?.created_at;

  // Split the report by lines to isolate verdict, confidence level, and analysis
  const lines = report.split("\n").filter(line => line.trim() !== "");

  // Extract the verdict and confidence level
  const verdictLine = lines[0]?.replace("**Verdict:** ", "").trim() || "Unknown";
  const confidenceLevelLine = lines[1]?.replace("**Confidence Level:** ", "").trim() || "Unknown";

  // Extract analysis
  const analysis = {};
  let currentSection = "";
  lines.forEach(line => {
    if (line.startsWith("1.")) {
      currentSection = "verifiedElements";
      analysis[currentSection] = [];
    } else if (line.startsWith("2.")) {
      currentSection = "unverifiedElements";
      analysis[currentSection] = [];
    } else if (line.startsWith("3.")) {
      currentSection = "contradictions";
      analysis[currentSection] = [];
    } else if (currentSection) {
      analysis[currentSection].push(line.trim().replace(/^\s*-\s*/, "").trim());
    }
  });

  return { // Assuming the API provides an ID
    entered_news: apiResponse?.input_data || "",
    content: "", // You may want to add a summary or explanation here if needed
    urls: apiResponse?.final_state?.relevant_metadata || [], // URLs remain unchanged
    verdict: verdictLine, // Extracted verdict
    confidenceLevel: confidenceLevelLine, // Extracted confidence level
    analysis: analysis, // Now contains structured analysis
    date: date, // Default to today's date
  };
}

export default parseNewsResponse;
