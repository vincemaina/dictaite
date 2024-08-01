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

export async function saveAudioBlob(blob, transcription, keyPhrases, keywords) {
    const db = await dbPromise;
    const id = await db.add('audio', { blob, transcription, keyPhrases, keywords });
    return id;
}

export async function getAllAudioBlobs() {
    const db = await dbPromise;
    return await db.getAll('audio');
}

export async function deleteAudioBlob(id) {
    const db = await dbPromise;
    return await db.delete('audio', id);
}
