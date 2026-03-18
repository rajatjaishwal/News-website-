import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function CountryNews({ theme }) {
    const { iso } = useParams();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const pageSize = 6;
    const totalPages = Math.ceil(totalResults / pageSize);

    const isDark = theme === "dark-theme";
    const textColor = isDark ? "text-white" : "text-slate-900";
    const mutedText = isDark ? "text-slate-400" : "text-slate-500";
    const accentColor = "text-violet-500";
    const highlightColor = isDark ? "text-white" : "text-violet-600";

    function handlePrev() {
        if (page > 1) {
            setPage((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function handleNext() {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    useEffect(() => {
        setPage(1);
    }, [iso]);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetch(
            `https://news-aggregator-dusky.vercel.app/country/${iso}?page=${page}&pageSize=${pageSize}`
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok");
            })
            .then((myJson) => {
                if (myJson.success) {
                    setTotalResults(myJson.data.totalResults);
                    setData(myJson.data.articles || []);
                } else {
                    setError(myJson.message || "Something went wrong while fetching news.");
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError("Failed to fetch news. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page, iso]);

    return (
        <section className={`min-h-screen py-10 ${textColor}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-10 text-center">
                    <h1 className={`text-3xl md:text-4xl font-extrabold ${accentColor}`}>
                        Top News for <span className={`uppercase tracking-wide ${highlightColor}`}>{iso}</span>
                    </h1>
                </div>

                {error && (
                    <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-500 font-medium">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader />
                    </div>
                ) : data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data.map((element, index) => (
                                <EverythingCard
                                    key={index}
                                    title={element.title}
                                    description={element.description}
                                    imgUrl={element.urlToImage}
                                    publishedAt={element.publishedAt}
                                    url={element.url}
                                    author={element.author}
                                    source={element.source?.name}
                                    theme={theme}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-6 mt-14">
                            <button
                                disabled={page <= 1}
                                className={`px-8 py-3 rounded-full text-sm font-bold transition-colors shadow-md ${page <= 1
                                        ? `${isDark ? 'bg-slate-800 text-slate-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                                        : `bg-violet-500 text-white hover:bg-violet-600`
                                    }`}
                                onClick={handlePrev}
                            >
                                &larr; Prev
                            </button>

                            <div className={`font-semibold ${textColor}`}>
                                Page {page} of {totalPages || 1}
                            </div>

                            <button
                                disabled={page >= totalPages}
                                className={`px-8 py-3 rounded-full text-sm font-bold transition-colors shadow-md ${page >= totalPages
                                        ? `${isDark ? 'bg-slate-800 text-slate-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                                        : `bg-violet-500 text-white hover:bg-violet-600`
                                    }`}
                                onClick={handleNext}
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold">
                            No news articles found
                        </h2>
                        <p className={`mt-2 ${mutedText}`}>
                            Try another country or check again later.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CountryNews;