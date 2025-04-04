import React, { useState } from "react";
import { searchAnimals } from "../data/fetcher";
import { useNavigate } from "react-router-dom";
import AnimalResCard from "./ui/AnimalResCard";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) {
            console.log("No query entered");
            return;
        }

        setIsSearching(true);
        console.log("Searching for:", query);
        const data = await searchAnimals(query);
        console.log("Search Results:", data);
        setResults(data);
        setIsSearching(false);
    };

    const handleSelectAnimal = (id) => {
        console.log("Navigating to:", id);
        navigate(`/animal/${id}`);
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center py-12 px-4">
            {/* Hero Section */}
            <div className="w-full max-w-2xl text-center mb-8">
                <h1 className="text-4xl font-extrabold uppercase bg-gradient-to-r from-red-600 via-green-600 to-amber-700 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
                    Explore the Animal Kingdom
                </h1>
                <p className="text-gray-300 mb-6 capitalize">
                    <i className="fa-solid fa-paw mr-2"></i>
                    Discover fascinating creatures from across the world
                </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full max-w-lg">
                <div className="relative">
                    <input
                        type="search"
                        className="w-full px-5 py-3 text-gray-200 bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:ring-0 transition-all duration-300 shadow-lg placeholder-gray-500"
                        placeholder="Search for an animal..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2  text-white font-bold capitalize px-4 py-2 bg-red-600  rounded-md  transition-all duration-300 shadow-md hover:scale-105  cursor-pointer"
                        disabled={isSearching}
                    >
                        {isSearching ? (
                            <span className="flex items-center">
                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                <span className="hidden sm:inline">
                                    Searching
                                </span>
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span className="hidden sm:inline ml-2">
                                    Search
                                </span>
                            </span>
                        )}
                    </button>
                </div>
            </form>

            {/* Display Search Results */}
            {results.length > 0 ? (
                <div className="w-full max-w-4xl mt-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-200 border-b border-gray-700 pb-2">
                        <i className="fa-solid fa-list-ul mr-2"></i>
                        Search Results
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                        {results.map((animal) => (
                            <AnimalResCard
                                key={animal.id}
                                animal={animal}
                                onClick={() => handleSelectAnimal(animal.id)}
                            />
                        ))}
                    </div>
                </div>
            ) : query && !isSearching ? (
                <div className="mt-8 text-center">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md">
                        <i className="fa-solid fa-binoculars text-4xl text-gray-500 mb-3"></i>
                        <h3 className="text-xl font-bold text-gray-300">
                            No animals found
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Try searching with a different term
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
