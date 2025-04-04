import React, { useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Consolidated diet categories
const DIET_CATEGORIES = {
    CARNIVORE: {
        types: ["carnivore", "scavenger", "piscivore"],
        theme: {
            bg: "from-red-800 to-red-600",
            icon: "fa-paw",
            label: "Carnivore",
        },
    },
    HERBIVORE: {
        types: ["herbivore", "nectarivore"],
        theme: {
            bg: "from-green-800 to-green-600",
            icon: "fa-leaf",
            label: "Herbivore",
        },
    },
    OMNIVORE: {
        types: ["omnivore", "filter feeder", "nectar, insects", "insectivore"],
        theme: {
            bg: "from-amber-700 to-amber-500",
            icon: "fa-utensils",
            label: "Omnivore",
        },
    },
    UNKNOWN: {
        types: ["unknown"],
        theme: {
            bg: "from-gray-700 to-gray-500",
            icon: "fa-question",
            label: "Unknown",
        },
    },
};

// Lookup map for diet themes
const DIET_THEME_MAP = Object.entries(DIET_CATEGORIES).reduce(
    (map, [_, category]) => {
        category.types.forEach((type) => {
            map[type] = category.theme;
        });
        return map;
    },
    {}
);

const AnimalCard = ({ title, image, lifeSpan, diet, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Memoize the diet theme calculation
    const theme = useMemo(() => {
        const key = diet?.trim().toLowerCase() || "unknown";
        return DIET_THEME_MAP[key] || DIET_CATEGORIES.UNKNOWN.theme;
    }, [diet]);

    return (
        <div
            className="group cursor-pointer perspective-1000 text-white font-bold transition-all duration-300 hover:shadow-xl"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div
                className={`bg-gradient-to-br ${
                    theme.bg
                } relative rounded-xl shadow-lg transition-all duration-300 
          ${isExpanded ? "scale-102" : "hover:rotate-y-6"}`}
            >
                {/* Image Container - All loading logic removed */}
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <LazyLoadImage
                        src={image}
                        alt={title || "Animal"}
                        className="w-full h-full object-cover"
                        threshold={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Title overlay on image */}
                    <h3 className="absolute bottom-2 left-4 text-xl font-bold truncate max-w-3/4 drop-shadow-lg">
                        {title}
                    </h3>
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/20 text-sm">
                            <i
                                className={`fa-solid ${theme.icon} mr-2`}
                                aria-hidden="true"
                            ></i>
                            <span>{theme.label}</span>
                        </div>
                        <div className="flex items-center">
                            <i
                                className="fa-regular fa-clock mr-1 text-sm"
                                aria-hidden="true"
                            ></i>
                            <span className="text-sm">
                                {lifeSpan || "Unknown"} Years
                            </span>
                        </div>
                    </div>

                    {diet && diet !== theme.label.toLowerCase() && (
                        <p className="text-sm mb-2 opacity-90">
                            <i
                                className="fa-solid fa-bowl-food mr-2"
                                aria-hidden="true"
                            ></i>
                            <span>{diet}</span>
                        </p>
                    )}

                    {/* Expandable description */}
                    {description && (
                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                isExpanded ? "max-h-32" : "max-h-0"
                            }`}
                        >
                            <div className="mt-3 pt-3 border-t border-white/20">
                                <p className="text-sm font-normal">
                                    {description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Expand indicator */}
                    {description && (
                        <div className="flex justify-center mt-2">
                            <i
                                className={`fa-solid fa-chevron-${
                                    isExpanded ? "up" : "down"
                                } text-xs opacity-80 transition-transform duration-300`}
                                aria-hidden="true"
                            ></i>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(AnimalCard);
