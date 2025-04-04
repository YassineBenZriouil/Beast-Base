import {
    doc,
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    startAfter,
    limit,
    where,
} from "firebase/firestore";
import { db } from "./firebase";

export const getAnimals = async (lastDoc) => {
    try {
        let q;
        if (lastDoc) {
            q = query(
                collection(db, "animals"),
                orderBy("id"),
                startAfter(lastDoc),
                limit(10)
            );
        } else {
            q = query(collection(db, "animals"), orderBy("id"), limit(10));
        }

        const snapshot = await getDocs(q);
        if (snapshot.empty) return { animals: [], lastDoc: null };

        const animals = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            imageUrl: doc.data().ImgUrl,
        }));

        return { animals, lastDoc: snapshot.docs[snapshot.docs.length - 1] };
    } catch (error) {
        console.error("Error getting documents:", error);
        return { animals: [], lastDoc: null };
    }
};

export const getAnimalById = async (ID) => {
    try {
        const animalRef = doc(db, "animals", String(ID));
        const animalSnap = await getDoc(animalRef);

        if (!animalSnap.exists()) {
            console.error(`Animal with ID ${ID} not found.`);
            return null;
        }

        const animalData = animalSnap.data();
        return {
            ...animalData,
            imageUrl: animalData.ImgUrl,
        };
    } catch (error) {
        console.error("Error getting animal document:", error);
        return null;
    }
};

export const searchAnimals = async (queryText) => {
    try {
        const animalsRef = collection(db, "animals");
        const lowercaseQuery = queryText.toLowerCase();

        // Get all animals (not ideal for large collections)
        const snapshot = await getDocs(animalsRef);

        // Filter client-side
        const result = snapshot.docs
            .filter((doc) =>
                doc.data().Animal.toLowerCase().includes(lowercaseQuery)
            )
            .map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

        return result;
    } catch (error) {
        console.error("Error fetching animals:", error);
        return [];
    }
};
