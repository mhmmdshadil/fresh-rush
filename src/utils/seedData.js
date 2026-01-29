import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const SAMPLE_BUYERS = [
    {
        name: "Metro Mart Logistics",
        distance: 4.2,
        pricePerKg: 45,
        rating: 4.8,
        pickupType: "Instant Pickup",
        availableSlots: ["Immediately", "In 1 hour"],
    },
    {
        name: "FreshConnect Hub",
        distance: 12.5,
        pricePerKg: 42,
        rating: 4.5,
        pickupType: "Scheduled",
        availableSlots: ["In 3 hours", "Tomorrow AM"],
    },
    {
        name: "EcoFarm Exports",
        distance: 28.1,
        pricePerKg: 48,
        rating: 4.9,
        pickupType: "Instant Pickup",
        availableSlots: ["Immediately"],
    },
    {
        name: "Local Community Coop",
        distance: 2.1,
        pricePerKg: 38,
        rating: 4.2,
        pickupType: "Scheduled",
        availableSlots: ["In 2 hours"],
    },
    {
        name: "Highland Greens",
        distance: 45.7,
        pricePerKg: 50,
        rating: 4.7,
        pickupType: "Instant Pickup",
        availableSlots: ["Immediately"],
    }
];

export const seedBuyers = async () => {
    try {
        // Check if buyers already exist
        const buyersSnapshot = await getDocs(collection(db, 'buyers'));

        if (buyersSnapshot.empty) {
            console.log('Seeding buyers...');

            for (const buyer of SAMPLE_BUYERS) {
                await addDoc(collection(db, 'buyers'), {
                    ...buyer,
                    createdAt: new Date().toISOString(),
                });
            }

            console.log('✅ Successfully seeded', SAMPLE_BUYERS.length, 'buyers');
            return { success: true, count: SAMPLE_BUYERS.length };
        } else {
            console.log('Buyers already exist, skipping seed');
            return { success: true, count: 0, message: 'Buyers already exist' };
        }
    } catch (error) {
        console.error('Error seeding buyers:', error);
        throw error;
    }
};
