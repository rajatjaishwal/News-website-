import React, { useState } from "react";

function EverythingCard(props) {
    const [aiSummary, setAiSummary] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiError, setAiError] = useState(null);

    const rawDate = props.publishedAt || "Unknown date";
    const theme = props.theme || "dark-theme";

    const fallbackImage =
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80";

    const imgUrl = props.imgUrl || fallbackImage;

    const isDark = theme === "dark-theme";
    const cardBg = isDark ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-gray-200";
    const titleColor = isDark ? "text-white" : "text-slate-900";
    const descColor = isDark ? "text-gray-300" : "text-slate-600";
    const metaColor = isDark ? "text-gray-200" : "text-slate-700";
    const labelColor = isDark ? "text-gray-400" : "text-slate-500";
    const hoverBorder = isDark ? "hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]" : "hover:border-violet-400/50 hover:shadow-lg";

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (aiSummary) {
            setAiSummary(null);
            return;
        }
        setIsAnalyzing(true);
        setAiError(null);
        try {
            const response = await fetch("http://localhost:3000/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: props.title,
                    description: props.description
                })
            });
            const data = await response.json();
            if (data.success) {
                setAiSummary(data.data);
            } else {
                setAiError(data.message || "Failed to generate summary.");
            }
        } catch (err) {
            setAiError("Error connecting to AI service.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <article className={`flex flex-col overflow-hidden rounded-2xl border shadow-md transition-all duration-300 ${cardBg} ${hoverBorder}`}>
            {/* Title First */}
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none px-5 pt-5 mb-3">
                <h2 className={`text-xl font-bold leading-snug hover:text-violet-500 transition-colors ${titleColor}`}>
                    {props.title || "Untitled Article"}
                </h2>
            </a>

            {/* Image (inset) */}
            {props.imgUrl && (
                <div className="mb-4 overflow-hidden rounded-lg mx-5">
                    <img
                        src={imgUrl}
                        alt={props.title || "News image"}
                        className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                            e.target.src = fallbackImage;
                        }}
                    />
                </div>
            )}

            {/* Description */}
            <p className={`mb-4 px-5 text-sm leading-relaxed line-clamp-3 ${descColor}`}>
                {props.description || "Click below to read the full article."}
            </p>

            {/* AI Analyze Button */}
            <div className="px-5 mb-4">
                <button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition-all 
                        ${isDark ? 'bg-violet-500/20 text-violet-400 hover:bg-violet-500/30' : 'bg-violet-100 text-violet-600 hover:bg-violet-200'} 
                        ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isAnalyzing ? (
                        <>
                            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : aiSummary ? 'Hide AI Summary ✨' : 'Analyze with AI ✨'}
                </button>
            </div>

            {/* AI Summary Section */}
            {(aiSummary || aiError) && (
                <div className={`mx-5 mb-5 p-5 rounded-xl text-[14px] ${isDark ? 'bg-slate-800/80 text-gray-200' : 'bg-slate-50 text-slate-700'} border ${isDark ? 'border-amber-500/20' : 'border-amber-200'} shadow-inner`}>
                    {aiError ? (
                        <p className="text-red-500 font-medium text-center">{aiError}</p>
                    ) : (
                        <div className="leading-relaxed space-y-2">
                            {aiSummary.split('\\n').map((line, idx) => {
                                // Clean up generic markdown bolding from Gemini
                                let cleanLine = line.trim().replace(/\\*\\*/g, '');
                                if (!cleanLine) return null;
                                
                                // Headers (e.g. "Summary:", "Key Points:")
                                const knownHeaders = ["Summary:", "Key Points:", "Why It Matters:", "Category:", "Sentiment:"];
                                if (knownHeaders.includes(cleanLine)) {
                                    return (
                                        <div key={idx} className={`font-bold text-base mt-4 mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'} ${idx > 0 && 'pt-2'}`}>
                                            {cleanLine}
                                        </div>
                                    );
                                }
                                // Bullet points
                                if (cleanLine.startsWith('-') || cleanLine.startsWith('*')) {
                                    const textPart = cleanLine.substring(1).trim();
                                    return (
                                        <div key={idx} className="flex gap-2 items-start pl-2">
                                            <span>{textPart}</span>
                                        </div>
                                    );
                                }
                                // Regular text
                                return <div key={idx} className="pl-1 text-sm">{cleanLine}</div>;
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Footer with exact formatting */}
            <div className={`mt-auto px-5 pb-5 flex flex-col gap-1.5 text-[13px] ${metaColor}`}>
                <div className="flex gap-1.5"><span className={`font-bold ${labelColor}`}>Source:</span>{props.source || "Unknown"}</div>
                <div className="flex gap-1.5"><span className={`font-bold ${labelColor}`}>Author:</span>{props.author || "Unknown"}</div>
                <div className="flex gap-1.5"><span className={`font-bold ${labelColor}`}>Published At:</span>{rawDate}</div>
            </div>
        </article>
    );
}

export default EverythingCard;