import React from "react";
import Carousel from "../static/Carousel";
import Animations from "../utility/animations";

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            <Animations>
                <div className="flex flex-col md:flex-row w-full h-screen">
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 overflow-y-auto p-8 space-y-8 flex flex-col justify-center">
                        <h2 className="text-4xl font-bold text-center md:text-left leading-tight">
                            Welcome to{" "}
                            <strong className="text-red-700">BEAST BASE</strong>
                        </h2>
                        <p className="text-lg text-center md:text-left">
                            Discover animals in their full glory through our
                            visual card collection. Each card unlocks a world of
                            stats and facts.
                        </p>

                        <div className="text-lg text-center md:text-left">
                            Every animal profile includes :
                            <ul className="mt-4 space-y-2 list-inside list-none">
                                <li className="text-red-600 ml-10">
                                    Physical measurements
                                </li>
                                <li className="text-green-600 ml-10">
                                    Speed and performance stats
                                </li>
                                <li className="text-amber-600 ml-10">
                                    Ecological information
                                </li>
                                <li className="text-blue-600 ml-10">
                                    Geographical distribution
                                </li>
                            </ul>
                        </div>

                        <p className="text-lg text-center md:text-left">
                            From massive whales to tiny insects, Beast Base
                            presents wildlife in a fresh, card-based format.
                        </p>

                        <div className="text-center pt-4">
                            {/* <Link to></Link> */}
                            <button className="text-black font-bold capitalize px-4 py-2 bg-red-600  rounded-md  transition-all duration-300 shadow-md hover:scale-105  cursor-pointer">
                                View Animal Collection
                            </button>
                        </div>
                    </div>

                    {/* Carousel Section */}
                    <div className="w-full md:w-1/2 h-96 md:h-screen">
                        <Carousel />
                    </div>
                </div>
            </Animations>
        </div>
    );
};

export default Home;
