import React from "react";
import Animations from "../utility/animations";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Animations>
                <div className="container mx-auto p-8 space-y-8">
                    <h1 className="text-4xl font-bold mb-6">
                        About{" "}
                        <strong className="text-red-700">BEAST BASE</strong>
                    </h1>

                    <div className="space-y-6">
                        <p className="text-xl">
                            Beast Base is your ultimate animal showcase - where
                            every creature gets its moment in the spotlight with
                            stunning visuals and key stats.
                        </p>

                        <h2 className="text-2xl font-bold mt-8">What We Do</h2>
                        <p className="text-lg">
                            We transform animals into interactive cards packed
                            with essential details. No databases, no complexity
                            - just pure animal fascination.
                        </p>

                        <h2 className="text-2xl font-bold mt-8">
                            Animal Spotlight
                        </h2>
                        <p className="text-lg">Each animal profile reveals:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-amber-500 mb-2">
                                    Physical Traits
                                </h3>
                                <p>
                                    Weight, height, lifespan, and other
                                    biological specifics
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-red-700 mb-2">
                                    Performance
                                </h3>
                                <p>
                                    Speed metrics, offspring count, and survival
                                    traits
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-green-500 mb-2">
                                    Ecology
                                </h3>
                                <p>
                                    Habitat, diet, conservation status, and
                                    social structure
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-blue-500 mb-2">
                                    Geography
                                </h3>
                                <p>Countries where the animal can be found</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8">
                            Simple Exploration
                        </h2>
                        <p className="text-lg">
                            Browse our animal collection or use the search to
                            find specific creatures. Each card is a gateway to
                            fascinating facts presented in an easy-to-digest
                            format.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            {" "}
                            <Link to="/discover">
                                <button className="text-black font-bold capitalize px-4 py-2 bg-red-600  rounded-md  transition-all duration-300 shadow-md hover:scale-105  cursor-pointer">
                                    Browse Animals
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
