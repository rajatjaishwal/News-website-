import React from "react";

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-20 w-full">

            {/* Spinner */}
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>

            {/* Text */}
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Loading latest news...
            </p>
        </div>
    );
}

export default Loader;