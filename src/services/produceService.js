import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const PRODUCE_COLLECTION = 'produce';

// Add new produce
export const addProduce = async (produceData, userId) => {
    try {
        const docRef = await addDoc(collection(db, PRODUCE_COLLECTION), {
            ...produceData,
            userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            status: produceData.status || 'Active',
        });
        return { id: docRef.id, ...produceData };
    } catch (error) {
        console.error('Error adding produce:', error);
        throw error;
    }
};

// Update produce
export const updateProduce = async (produceId, updates) => {
    try {
        const produceRef = doc(db, PRODUCE_COLLECTION, produceId);
        await updateDoc(produceRef, {
            ...updates,
            updatedAt: serverTimestamp(),
        });
        return { id: produceId, ...updates };
    } catch (error) {
        console.error('Error updating produce:', error);
        throw error;
    }
};

// Delete produce
export const deleteProduce = async (produceId) => {
    try {
        await deleteDoc(doc(db, PRODUCE_COLLECTION, produceId));
        return produceId;
    } catch (error) {
        console.error('Error deleting produce:', error);
        throw error;
    }
};

// Get all produce for a user
export const getUserProduce = async (userId) => {
    try {
        const q = query(
            collection(db, PRODUCE_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            expiryTime: doc.data().expiryTime?.toDate?.() || doc.data().expiryTime,
            harvestTime: doc.data().harvestTime?.toDate?.() || doc.data().harvestTime,
        }));
    } catch (error) {
        console.error('Error getting produce:', error);
        throw error;
    }
};

// Real-time listener for produce
export const subscribeToUserProduce = (userId, callback) => {
    const q = query(
        collection(db, PRODUCE_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const produce = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            expiryTime: doc.data().expiryTime?.toDate?.() || doc.data().expiryTime,
            harvestTime: doc.data().harvestTime?.toDate?.() || doc.data().harvestTime,
        }));
        callback(produce);
    }, (error) => {
        console.error('Error in produce subscription:', error);
    });
};

// Cancel produce (mark as cancelled)
export const cancelProduce = async (produceId) => {
    return updateProduce(produceId, { status: 'Cancelled' });
};

// Get at-risk produce (expiring soon)
export const getAtRiskProduce = async (userId, hoursThreshold = 6) => {
    try {
        const allProduce = await getUserProduce(userId);
        const now = new Date();
        const threshold = new Date(now.getTime() + hoursThreshold * 60 * 60 * 1000);

        return allProduce.filter(p => {
            const expiryDate = new Date(p.expiryTime);
            return expiryDate <= threshold && expiryDate > now;
        });
    } catch (error) {
        console.error('Error getting at-risk produce:', error);
        throw error;
    }
};
