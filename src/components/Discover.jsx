import React, { useEffect, useState, useCallback } from "react";
import { getAnimals } from "../data/fetcher";
import AnimalCard from "./ui/AnimalCard";
import Animations from "../utility/animations";
import { Link } from "react-router-dom";
import Loading from "../utility/loading";

export default function Discover() {
    const [data, setData] = useState({
        animals: [],
        lastDoc: null, // Track last document for pagination
        loading: false,
    });

    const fetchAnimals = useCallback(async () => {
        if (data.loading) return; // Prevent multiple calls

        setData((prev) => ({ ...prev, loading: true }));

        const { animals, lastDoc } = await getAnimals(data.lastDoc);

        setData((prev) => ({
            animals: [...prev.animals, ...animals],
            lastDoc, // Update last document
            loading: false,
        }));
    }, [data.lastDoc]);

    useEffect(() => {
        fetchAnimals();
    }, []); // Initial load

    // Infinite scroll trigger
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 100 &&
                !data.loading
            ) {
                fetchAnimals();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [data.loading, fetchAnimals]);

    return (
        <div className="bg-black text-white">
            <Animations>
                <div className="flex align-middle justify-center flex-col text-center gap-5 min-h-screen px-10 py-5">
                    <h1 className="text-4xl font-extrabold uppercase bg-gradient-to-r from-red-600 via-green-600 to-amber-700 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
                        Discover a New World of Creatures & Animals
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {data.animals.map((animal) => (
                            <Link to={`/animal/${animal.id}`} key={animal.id}>
                                <AnimalCard
                                    image={animal.imageUrl}
                                    title={animal.Animal}
                                    lifeSpan={animal["Lifespan (years)"]}
                                    diet={animal.Diet}
                                    id={animal.id}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </Animations>

            {data.loading && (
                <div className="flex justify-center align-middle p-10">
                    <Loading />
                </div>
            )}
        </div>
    );
}
