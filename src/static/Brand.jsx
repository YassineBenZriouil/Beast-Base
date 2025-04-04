import React from "react";
import Logo from "../assets/BB.jpg";
import FAV from "../assets/fav.png";

export default function Brand() {
    return (
        <div className="flex items-center cursor-pointer">
            <img className="w-10 mr-[-7px]" src={FAV} alt="Beast Base Logo" />
            <img className="w-16" src={Logo} alt="Beast Base Logo" />
        </div>
    );
}
