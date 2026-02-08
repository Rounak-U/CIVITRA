import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// In-Memory Storage for Mock Mode
const store: any = {
    users: [],
    complaints: [],
    tasks: [],
    notifications: [],
    policies: [],
    logs: []
};

// ... (existing Mock classes) ...
class MockCollection {
    name: string;
    constructor(name: string) { this.name = name; }
    doc(id: string) { return new MockDoc(this.name, id); }
    async add(data: any) {
        const id = 'mock_' + Math.random().toString(36).substr(2, 9);
        const doc = { id, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        store[this.name].push(doc);
        return { id, get: async () => ({ data: () => doc, exists: true }) };
    }
    where(field: string, op: string, value: any) { return new MockQuery(this.name, field, op, value); }
    orderBy(field: string, direction: string) { return new MockQuery(this.name, null, null, null).orderBy(field, direction); }
    async get() { return { empty: store[this.name].length === 0, docs: store[this.name].map((d: any) => ({ id: d.id, data: () => d })) }; }
}

class MockDoc {
    name: string; id: string;
    constructor(name: string, id: string) { this.name = name; this.id = id; }
    async get() { const doc = store[this.name].find((d: any) => d.id === this.id); return { exists: !!doc, data: () => doc }; }
    async set(data: any) {
        const idx = store[this.name].findIndex((d: any) => d.id === this.id);
        if (idx >= 0) store[this.name][idx] = { ...store[this.name][idx], ...data };
        else store[this.name].push({ id: this.id, ...data });
    }
    async update(data: any) {
        const idx = store[this.name].findIndex((d: any) => d.id === this.id);
        if (idx >= 0) store[this.name][idx] = { ...store[this.name][idx], ...data };
    }
}

class MockQuery {
    name: string; filters: any[] = [];
    constructor(name: string, field: string | null, op: string | null, value: any | null) {
        this.name = name; if (field) this.filters.push({ field, op, value });
    }
    where(field: string, op: string, value: any) { this.filters.push({ field, op, value }); return this; }
    orderBy(field: string, direction: string) { return this; }
    limit(n: number) { this.limitVal = n; return this; }
    private limitVal: number = 100;

    async get() {
        let res = store[this.name] || [];
        for (const f of this.filters) {
            res = res.filter((d: any) => f.op === '==' ? d[f.field] === f.value : true);
        }
        if (this.limitVal) res = res.slice(0, this.limitVal);
        return { empty: res.length === 0, docs: res.map((d: any) => ({ id: d.id, data: () => d })) };
    }
}

const mockDb = {
    collection: (name: string) => new MockCollection(name),
    batch: () => ({
        update: (ref: any, data: any) => ref.update(data),
        commit: async () => console.log('Mock Batch Commit')
    })
};

const mockAuth = {
    createCustomToken: async (uid: string) => `mock_token_${uid}`,
    verifyIdToken: async (token: string) => ({ uid: token.replace('mock_token_', '') }),
    getUser: async (uid: string) => ({ uid, email: 'mock@example.com' })
};

// Singleton to avoid multiple initializations
let isInitialized = false;

export const initializeFirebase = () => {
    if (isInitialized || admin.apps.length > 0) return true;

    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const hasServiceAccount = serviceAccountPath && fs.existsSync(path.resolve(process.cwd(), serviceAccountPath));

    try {
        if (hasServiceAccount) {
            admin.initializeApp({
                credential: admin.credential.cert(path.resolve(process.cwd(), serviceAccountPath!)),
                projectId: process.env.FIREBASE_PROJECT_ID
            });
            console.log('✅ Firebase Admin initialized with Service Account');
        } else {
            console.warn('⚠️ No service-account.json found. Running in simulation mode.');
            // We still "initialize" with a dummy if possible to avoid some lib errors, 
            // but we'll manually return mocks for db/auth
        }
        isInitialized = true;
        return true;
    } catch (e) {
        console.error('❌ Firebase Init Failed', e);
        return false;
    }
};

export const getDb = () => {
    initializeFirebase();
    if (admin.apps.length > 0) {
        try {
            return admin.firestore();
        } catch (e) {
            return mockDb as any;
        }
    }
    return mockDb as any;
};

export const getAuth = () => {
    initializeFirebase();
    if (admin.apps.length > 0) {
        try {
            return admin.auth();
        } catch (e) {
            return mockAuth as any;
        }
    }
    return mockAuth as any;
};

const mockStorage = {
    bucket: () => ({
        name: 'mock-bucket',
        file: (name: string) => ({
            save: async (data: any, options: any) => console.log(`Mock File Save: ${name}`),
            publicUrl: () => `https://storage.googleapis.com/mock-bucket/${name}`
        })
    })
};

export const getStorage = () => {
    initializeFirebase();
    if (admin.apps.length > 0) {
        try {
            return admin.storage();
        } catch (e) {
            return mockStorage as any;
        }
    }
    return mockStorage as any;
};

export const db = getDb();
export const authAdmin = getAuth();
export const storageAdmin = getStorage();
