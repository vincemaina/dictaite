// utils/indexedDB.js
import { openDB } from 'idb';

const dbPromise = openDB('voice-notes', 1, {
    upgrade(db) {
        db.createObjectStore('audio', {
            keyPath: 'id',
            autoIncrement: true,
        });
    },
});

export const saveAudioBlob = async (blob) => {
    const db = await dbPromise;
    const id = await db.add('audio', { blob });
    return id;
};

export const getAllAudioBlobs = async () => {
    const db = await dbPromise;
    return await db.getAll('audio');
};

export const deleteAudioBlob = async (id) => {
    const db = await dbPromise;
    return await db.delete('audio', id);
};
