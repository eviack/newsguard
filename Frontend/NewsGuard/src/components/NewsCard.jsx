
import { Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsCard({ item }) {
  const isYouTube = (url) =>
    url.includes("youtube.com/watch") || url.includes("youtu.be/");

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  // Get color classes based on verdict
  const verdictColor = () => {
    const verdict = item.verdict.toLowerCase();
    if (verdict.includes('real')) return 'bg-green-800 text-light-1';
    if (verdict.includes('false')) return 'bg-red-800 text-light-1';
    if (verdict.includes('partially')) return 'bg-yellow-600 text-light-1';
    return 'bg-dark-4 text-light-1';
  };

  return (
    <div className="bg-dark-3 p-6 rounded-lg transition-colors shadow-lg border border-dark-4">
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${verdictColor()}`}>
              {item.verdict} ({item.confidenceLevel})
            </span>
          </div>
          <p className="text-light-4 text-sm">{item.date}</p>
        </div>
        <h3 className="text-lg mt-3 font-medium text-light-2 line-clamp-2">
          {item.entered_news}
        </h3>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-4">
        {/* Verified Elements */}
        {item.analysis.verifiedElements?.length > 0 && (
          <div className="bg-dark-4 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="text-sm font-semibold text-light-2 mb-2">Verified Facts</h4>
            <ul className="space-y-2">
              {item.analysis.verifiedElements.map((fact, index) => (
                <li key={index} className="text-light-3 text-sm flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Unverified Elements */}
        {item.analysis.unverifiedElements?.length > 0 && (
          <div className="bg-dark-4 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="text-sm font-semibold text-light-2 mb-2">Unverified Claims</h4>
            <ul className="space-y-2">
              {item.analysis.unverifiedElements.map((claim, index) => (
                <li key={index} className="text-light-3 text-sm flex items-start">
                  <span className="text-yellow-500 mr-2">?</span>
                  {claim}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contradictions */}
        {item.analysis.contradictions?.length > 0 && (
          <div className="bg-dark-4 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="text-sm font-semibold text-light-2 mb-2">Contradictions</h4>
            <ul className="space-y-2">
              {item.analysis.contradictions.map((contra, index) => (
                <li key={index} className="text-light-3 text-sm flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  {contra}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Relevant Resources */}
      {item.urls?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-light-2 mb-3">Relevant Resources</h3>
          <div className="space-y-2">
            {item.urls.map((url, index) => (
              <div key={index} className="group">
                {isYouTube(url) ? (
                  <div className="w-full aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getYouTubeEmbedUrl(url)}
                      title="YouTube video"
                      allowFullScreen
                      className="w-full h-full rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 hover:bg-dark-4 p-2 rounded transition-colors">
                    <Link
                      to={url}
                      target="_blank"
                      className="text-primary-500 hover:text-primary-400 break-words text-sm flex-1"
                    >
                      {new URL(url).hostname}
                    </Link>
                    <Link2 className="text-light-4 group-hover:text-light-3" size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}