import React from "react";

function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-black/20 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-white/60">
                © {new Date().getFullYear()} News Aggregator. Built for modern news reading.
            </div>
        </footer>
    );
}

export default Footer;