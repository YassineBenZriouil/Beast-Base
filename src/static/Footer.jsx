import React from "react";
import { Link } from "react-router-dom";
import Brand from "../static/Brand";

const currentDate = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="bg-black text-white py-2 px-8 border-t-2 border-white shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Brand Logo */}
                <Link
                    to="/"
                    className="flex items-center text-lg font-semibold transition duration-200 cursor-pointer"
                >
                    <Brand />{" "}
                </Link>

                <p className="text-sm mt-2 md:mt-0">
                    © {currentDate} Beast Base. All rights reserved.
                </p>

                {/* Creator Credit */}
                <p className="text-sm mt-2 md:mt-0">
                    Made by{" "}
                    <a
                        href="https://ybz.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold transition duration-200 text-blue-500 underline hover:text-blue-400"
                    >
                        Yassine Ben Zriouil
                    </a>
                </p>
            </div>
        </footer>
    );
}
