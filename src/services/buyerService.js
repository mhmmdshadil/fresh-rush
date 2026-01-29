import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    doc
} from 'firebase/firestore';
import { db } from '../config/firebase';

const BUYERS_COLLECTION = 'buyers';
const OFFERS_COLLECTION = 'offers';

// Get all buyers
export const getAllBuyers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, BUYERS_COLLECTION));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error getting buyers:', error);
        throw error;
    }
};

// Get matched buyers for produce (based on distance, price, etc.)
export const getMatchedBuyers = async (produceId, maxDistance = 50) => {
    try {
        const q = query(
            collection(db, BUYERS_COLLECTION),
            where('distance', '<=', maxDistance),
            orderBy('distance', 'asc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error getting matched buyers:', error);
        // Fallback: get all buyers if query fails
        return getAllBuyers();
    }
};

// Create an offer from buyer
export const createOffer = async (offerData) => {
    try {
        const docRef = await addDoc(collection(db, OFFERS_COLLECTION), {
            ...offerData,
            createdAt: serverTimestamp(),
            status: 'pending',
        });
        return { id: docRef.id, ...offerData };
    } catch (error) {
        console.error('Error creating offer:', error);
        throw error;
    }
};

// Accept an offer
export const acceptOffer = async (offerId, produceId) => {
    try {
        const offerRef = doc(db, OFFERS_COLLECTION, offerId);
        await updateDoc(offerRef, {
            status: 'accepted',
            acceptedAt: serverTimestamp(),
        });

        // Update produce status
        const produceRef = doc(db, 'produce', produceId);
        await updateDoc(produceRef, {
            status: 'Sold',
            soldAt: serverTimestamp(),
        });

        return { offerId, produceId };
    } catch (error) {
        console.error('Error accepting offer:', error);
        throw error;
    }
};

// Subscribe to offers for a produce
export const subscribeToOffers = (produceId, callback) => {
    const q = query(
        collection(db, OFFERS_COLLECTION),
        where('produceId', '==', produceId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const offers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(offers);
    });
};

// Add a new buyer (for demo purposes)
export const addBuyer = async (buyerData) => {
    try {
        const docRef = await addDoc(collection(db, BUYERS_COLLECTION), {
            ...buyerData,
            createdAt: serverTimestamp(),
            rating: buyerData.rating || 4.5,
        });
        return { id: docRef.id, ...buyerData };
    } catch (error) {
        console.error('Error adding buyer:', error);
        throw error;
    }
};
