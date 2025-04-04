import React, { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const dietThemes = {
    carnivore: {
        bg: "bg-red-600",
        icon: "fa-paw",
        label: "Carnivore",
    },
    scavenger: {
        bg: "bg-red-600",
        icon: "fa-paw",
        label: "Carnivore",
    },
    piscivore: {
        bg: "bg-red-600",
        icon: "fa-paw",
        label: "Carnivore",
    },
    herbivore: {
        bg: "bg-green-600",
        icon: "fa-leaf",
        label: "Herbivore",
    },
    nectarivore: {
        bg: "bg-green-600",
        icon: "fa-leaf",
        label: "Herbivore",
    },
    insectivore: {
        bg: "bg-amber-500",
        icon: "fa-bug",
        label: "Insectivore",
    },
    omnivore: {
        bg: "bg-amber-500",
        icon: "fa-utensils",
        label: "Omnivore",
    },
    "filter feeder": {
        bg: "bg-amber-500",
        icon: "fa-utensils",
        label: "Omnivore",
    },
    "nectar, insects": {
        bg: "bg-amber-500",
        icon: "fa-utensils",
        label: "Omnivore",
    },
    unknown: {
        bg: "bg-gray-500",
        icon: "fa-question",
        label: "Unknown",
    },
};

export default function AnimalResCard({ animal, onClick }) {
    const {
        Animal,
        ImgUrl,
        Diet,
        LifeSpan,
        "Countries Found": countriesFound,
    } = animal;

    const theme = useMemo(() => {
        const key = Diet?.trim().toLowerCase();
        return dietThemes[key] || dietThemes.unknown;
    }, [Diet]);

    return (
        <div
            className={`${theme.bg} rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group text-black font-bold`}
            onClick={onClick}
        >
            <div className="flex items-center p-3">
                <div className="w-16 h-16 flex-shrink-0">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                        <LazyLoadImage
                            src={ImgUrl || "/api/placeholder/64/64"}
                            alt={Animal}
                            className="w-full h-full object-cover transition-transform duration-500 "
                            effect="opacity"
                        />
                    </div>
                </div>
                <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-bold   transition-colors duration-300">
                        {Animal}
                    </h3>
                    <p className="text-sm mt-1">
                        <i className="fa-solid fa-map-marker-alt mr-2 "></i>
                        {countriesFound || "Various locations"}
                    </p>
                </div>
                <div className="ml-auto">
                    <i className="fa-solid fa-chevron-right   transition-colors duration-300"></i>
                </div>
            </div>
        </div>
    );
}
