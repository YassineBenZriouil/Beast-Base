import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../utility/loading";
import { getAnimalById } from "../../data/fetcher";
import Animations from "../../utility/animations";

export default function AnimalPage() {
    const { id } = useParams();
    const [animalData, setAnimalData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const maxValues = {
        Weight: 400,
        Gestation_Period_days: 500,
        Lifespan: 120,
        Average_Speed: 90,
        Offspring: 30,
        Top_Speed: 120,
        Height: 420,
    };

    useEffect(() => {
        const fetchAnimalData = async () => {
            if (!id) return;

            try {
                setIsLoading(true);
                const data = await getAnimalById(id);
                setAnimalData(data);
            } catch (err) {
                setError("Failed to load animal data. Please try again later.");
                console.error("Error fetching animal data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimalData();
    }, [id]);

    if (isLoading)
        return (
            <div className="bg-black text-white h-screen flex justify-center align-middle p-10">
                <Loading />
            </div>
        );
    if (error)
        return (
            <div className="bg-black text-white p-8 text-center text-xl">
                {error}
            </div>
        );
    if (!animalData)
        return (
            <div className="bg-black text-white p-8 text-center text-xl h-screen">
                Animal not found!
            </div>
        );

    // Calculate percentages for stat bars
    const calculatePercentage = (value, maxValue) => {
        return Math.min(Math.round((value / maxValue) * 100), 100);
    };

    // Get color based on percentage
    const getBarColor = (percentage) => {
        if (percentage < 25) return "bg-red-600";
        if (percentage < 50) return "bg-yellow-600";
        if (percentage < 75) return "bg-blue-600";
        return "bg-green-600";
    };

    // Stats for visualization
    const animalStats = [
        {
            label: "Weight",
            value: animalData["Weight (kg)"] || 0,
            maxValue: maxValues.Weight,
            unit: "kg",
        },
        {
            label: "Lifespan",
            value: animalData["Lifespan (years)"] || 0,
            maxValue: maxValues.Lifespan,
            unit: "years",
        },
        {
            label: "Gestation Period",
            value: animalData["Gestation Period (days)"] || 0,
            maxValue: maxValues.Gestation_Period_days,
            unit: "days",
        },
        {
            label: "Offspring",
            value: animalData["Offspring per Birth"] || 0,
            maxValue: maxValues.Offspring,
            unit: "",
        },
        {
            label: "Average Speed",
            value: animalData["Average Speed (km/h)"] || 0,
            maxValue: maxValues.Average_Speed,
            unit: "km/h",
        },
        {
            label: "Top Speed",
            value: animalData["Top Speed (km/h)"] || 0,
            maxValue: maxValues.Top_Speed,
            unit: "km/h",
        },
        {
            label: "Height",
            value: animalData["Height (cm)"] || 0,
            maxValue: maxValues.Height,
            unit: "cm",
        },
    ];

    // Other animal details (non-numeric)
    const animalDetails = [
        { label: "Diet", value: animalData.Diet },
        { label: "Habitat", value: animalData.Habitat },
        {
            label: "Conservation Status",
            value: animalData["Conservation Status"],
        },
        { label: "Predators", value: animalData.Predators },
        { label: "Countries Found", value: animalData["Countries Found"] },
        { label: "Social Structure", value: animalData["Social Structure"] },
    ];

    return (
        <div className="bg-black text-white min-h-screen py-8 px-4">
            <Animations>
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center">
                        {animalData.Animal}
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Image Section - Updated for landscape images */}
                        <div className="lg:w-1/2 w-full">
                            <div className="rounded-lg overflow-hidden shadow-xl">
                                <img
                                    src={animalData.imageUrl}
                                    alt={animalData.Animal}
                                    className="w-full object-contain h-64 lg:h-80 rounded-4xl"
                                />
                            </div>
                        </div>

                        {/* Stat Bars Section */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-gray-900 rounded-lg p-6 shadow-xl mb-8">
                                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
                                    Animal Stats
                                </h2>
                                <div className="space-y-4">
                                    {animalStats.map((stat, index) => {
                                        const percentage = calculatePercentage(
                                            stat.value,
                                            stat.maxValue
                                        );
                                        const barColor =
                                            getBarColor(percentage);

                                        return (
                                            <div key={index} className="mb-4">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-gray-300 font-medium">
                                                        {stat.label}
                                                    </span>
                                                    <span className="text-gray-400">
                                                        {stat.value} {stat.unit}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                                                    <div
                                                        className={`h-full ${barColor} rounded-full transition-all duration-500`}
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Other Animal Details */}
                            <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
                                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
                                    Animal Facts
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {animalDetails.map((detail, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="text-gray-400 text-sm font-medium">
                                                {detail.label}
                                            </p>
                                            <p className="text-lg">
                                                {detail.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
