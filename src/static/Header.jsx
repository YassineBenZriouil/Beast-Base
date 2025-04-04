import React, { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "../static/Brand";

const navElems = ["home", "discover", "about", "search"];

export default function Header() {
    const [showNavMenu, setShowNavMenu] = useState(false);

    return (
        <>
            <div className="flex justify-between items-center bg-black text-white py-1 px-8 border-b-1 border-white  shadow-lg ">
                <Link to="/">
                    <Brand />{" "}
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navElems.map((navElem) => (
                        <Link
                            to={navElem === "home" ? "/" : `/${navElem}`}
                            key={navElem}
                            className="font-semibold uppercase tracking-wide hover:scale-105 transition duration-200 cursor-pointer relative"
                        >
                            <span className="hover:text-red-700">
                                {navElem}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setShowNavMenu((prev) => !prev)}
                    className="md:hidden text-xl cursor-pointer hover:scale-110 transition duration-200"
                >
                    <i
                        className={`fa-solid ${
                            showNavMenu ? "fa-times" : "fa-bars"
                        }`}
                    ></i>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {showNavMenu && (
                <div className="md:hidden flex flex-col items-center p-4 text-center bg-black text-white  shadow-lg">
                    {navElems.map((navElem) => (
                        <Link
                            to={navElem === "home" ? "/" : `/${navElem}`}
                            key={navElem}
                            onClick={() => setShowNavMenu(false)}
                            className="font-semibold uppercase tracking-wide hover:scale-105 transition duration-200 cursor-pointer py-2 w-full border-t border-white "
                        >
                            {navElem}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
