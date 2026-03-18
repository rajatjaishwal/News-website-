import React, { useState } from "react";
import { Link } from "react-router-dom";
import countries from "./countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCircleArrowDown,
    faMoon,
    faSun,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Header({ theme, setTheme }) {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const categories = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
        "politics",
    ];

    function closeAllMenus() {
        setActive(false);
        setShowCountryDropdown(false);
        setShowCategoryDropdown(false);
    }
    
    function toggleTheme() {
        setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
    }

    const isDark = theme === "dark-theme";
    const headerBg = isDark ? "bg-[#0f172a]/95 border-gray-800" : "bg-white/95 border-gray-200";
    const textColor = isDark ? "text-white" : "text-slate-900";
    const dropdownBg = isDark ? "bg-[#1e293b] border-slate-700" : "bg-white border-gray-200";
    const hoverBg = isDark ? "hover:bg-slate-800" : "hover:bg-slate-100";
    const accentColor = "text-[#8b5cf6]";

    return (
        <header className={`sticky top-0 z-50 border-b backdrop-blur shadow-md ${headerBg}`}>
            <nav className="mx-auto flex h-[70px] w-full max-w-7xl items-center justify-between px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2" onClick={closeAllMenus}>
                    <img src="https://cdn-icons-png.flaticon.com/512/21/21601.png" alt="logo" className="h-[28px] w-[28px] rounded-full bg-slate-900 p-0.5" />
                    <h1 className={`text-[22px] font-bold tracking-wide ${textColor}`} style={{fontFamily: "'Freeman', sans-serif"}}>
                        News Aggregator
                    </h1>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <Link
                        to="/"
                        className={`${textColor} font-bold hover:text-violet-500 transition-colors`}
                    >
                        All News
                    </Link>

                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowCategoryDropdown(!showCategoryDropdown);
                                setShowCountryDropdown(false);
                            }}
                            className={`flex items-center gap-1.5 ${textColor} font-bold hover:text-violet-500 transition-colors`}
                        >
                            Top-Headlines
                            <FontAwesomeIcon icon={faCircleArrowDown} className={`${isDark ? 'text-[#8b5cf6] bg-white' : 'text-white bg-[#8b5cf6]'} rounded-full text-sm`} />
                        </button>

                        {showCategoryDropdown && (
                            <div className={`absolute left-0 mt-4 w-56 rounded-md border shadow-xl overflow-hidden py-2 z-50 ${dropdownBg}`}>
                                {categories.map((element, index) => (
                                    <Link
                                        key={index}
                                        to={`/top-headlines/${element}`}
                                        onClick={closeAllMenus}
                                        className={`block px-4 py-2.5 text-sm font-semibold capitalize ${textColor} hover:border-l-4 hover:border-violet-500 ${hoverBg} transition-all`}
                                    >
                                        {element}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowCountryDropdown(!showCountryDropdown);
                                setShowCategoryDropdown(false);
                            }}
                            className={`flex items-center gap-1.5 ${textColor} font-bold hover:text-violet-500 transition-colors`}
                        >
                            Country
                            <FontAwesomeIcon icon={faCircleArrowDown} className={`${isDark ? 'text-[#8b5cf6] bg-white' : 'text-white bg-[#8b5cf6]'} rounded-full text-sm`} />
                        </button>

                        {showCountryDropdown && (
                            <div className={`absolute left-0 mt-4 w-64 rounded-md border shadow-xl overflow-hidden py-2 z-50 ${dropdownBg}`}>
                                <div className="max-h-96 overflow-y-auto">
                                    {countries.map((element, index) => (
                                        <Link
                                            key={index}
                                            to={`/country/${element?.iso_2_alpha}`}
                                            onClick={closeAllMenus}
                                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold ${textColor} hover:border-l-4 hover:border-violet-500 ${hoverBg} transition-all`}
                                        >
                                            <img
                                                className="h-[20px] w-[30px] object-cover rounded-sm border border-gray-300"
                                                src={element?.png}
                                                alt={element?.countryName}
                                            />
                                            <span>{element?.countryName}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Toggle Switch */}
                    <div 
                        className={`relative flex items-center justify-between w-[50px] h-[26px] rounded-full p-1 cursor-pointer ring-1 ${isDark ? 'bg-[#111] ring-gray-800' : 'bg-gray-200 ring-gray-300'}`}
                        onClick={toggleTheme}
                    >
                        <FontAwesomeIcon icon={faMoon} className="text-[#f1c40f] text-[11px] ml-0.5" />
                        <FontAwesomeIcon icon={faSun} className="text-[#f39c12] text-[11px] mr-0.5" />
                        <div 
                            className={`absolute top-[2px] w-[22px] h-[22px] rounded-full bg-white shadow transition-all duration-200 ${
                                isDark ? "left-[2px]" : "left-[26px]"
                            }`}
                        ></div>
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <div 
                        className={`relative flex items-center justify-between w-[50px] h-[26px] rounded-full p-1 cursor-pointer ring-1 ${isDark ? 'bg-[#111] ring-gray-800' : 'bg-gray-200 ring-gray-300'}`}
                        onClick={toggleTheme}
                    >
                        <FontAwesomeIcon icon={faMoon} className="text-[#f1c40f] text-[11px] ml-0.5" />
                        <FontAwesomeIcon icon={faSun} className="text-[#f39c12] text-[11px] mr-0.5" />
                        <div 
                            className={`absolute top-[2px] w-[22px] h-[22px] rounded-full bg-white shadow transition-all duration-200 ${
                                isDark ? "left-[2px]" : "left-[26px]"
                            }`}
                        ></div>
                    </div>

                    <button
                        onClick={() => setActive(!active)}
                        className={`${textColor} text-xl`}
                    >
                        <FontAwesomeIcon icon={active ? faXmark : faBars} />
                    </button>
                </div>
            </nav>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 absolute w-full top-[70px] left-0 shadow-lg ${isDark ? 'bg-[#0f172a]' : 'bg-white'} ${
                    active ? `max-h-screen border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}` : "max-h-0"
                }`}
            >
                <div className="px-6 py-6 space-y-6">
                    <Link to="/" onClick={closeAllMenus} className={`block font-bold text-lg ${textColor}`}>
                        All News
                    </Link>

                    <div>
                        <p className="mb-3 text-sm font-semibold text-gray-400">CATEGORIES</p>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((element, index) => (
                                <Link
                                    key={index}
                                    to={`/top-headlines/${element}`}
                                    onClick={closeAllMenus}
                                    className={`block p-3 rounded-lg border text-sm capitalize font-bold text-center ${
                                        isDark 
                                        ? 'border-slate-700 bg-slate-800 text-white hover:bg-slate-700' 
                                        : 'border-gray-200 bg-gray-50 text-slate-800 hover:bg-gray-100'
                                    }`}
                                >
                                    {element}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;