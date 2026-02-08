import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { db, authAdmin } from '../lib/db';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password, role = 'citizen', phone, wardId, location } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 1. Create user in Firebase Auth using Admin SDK
        // This is more reliable for backend operations
        const userRecord = await authAdmin.createUser({
            email,
            password,
            displayName: name,
            phoneNumber: phone && phone.startsWith('+') ? phone : undefined // Firebase Admin expects E.164 format
        });

        const uid = userRecord.uid;

        // 2. Prepare user metadata
        const newUser: User = {
            id: uid,
            name,
            email,
            phone,
            role,
            wardId: wardId || 'ward-001', // Default ward for MVP
            location,
            reputationScore: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // 3. Store in Firestore
        await db.collection('users').doc(uid).set(newUser);

        // 4. Generate custom token for frontend
        const customToken = await authAdmin.createCustomToken(uid);

        res.status(201).json({ user: newUser, token: customToken });
    } catch (error: any) {
        console.error('Signup error:', error);
        res.status(400).json({ error: error.message || 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email: identifier, password, role } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ error: 'Missing identifier or password' });
    }

    try {
        let email = identifier;

        // 1. Resolve identifier to Email if it's a Phone/ID
        if (!identifier.includes('@')) {
            const userSnapshot = await db.collection('users')
                .where('phone', '==', identifier)
                .limit(1)
                .get();

            if (userSnapshot.empty) {
                return res.status(404).json({ error: 'User with this ID/Phone not found' });
            }
            const userDoc = userSnapshot.docs[0];
            email = userDoc.data().email;
        }

        // 2. Sign in with Firebase Auth client
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { uid } = userCredential.user;

        // 3. Fetch full profile and verify Role
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        const userData = userDoc.data();

        // Enforce Role consistency
        if (role && userData.role !== role) {
            return res.status(403).json({ error: `Unauthorized. Account is registered as ${userData.role}` });
        }

        const user: User = {
            id: uid,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
            wardId: userData.wardId,
            location: userData.location,
            reputationScore: userData.reputationScore,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt
        };

        // 4. Generate custom token
        const customToken = await authAdmin.createCustomToken(uid);

        res.status(200).json({ user, token: customToken });
    } catch (error: any) {
        console.error('Login error:', error);

        // Map specific Firebase errors for better UX
        let message = 'Authentication failed';
        if (error.code === 'auth/configuration-not-found') {
            message = 'Security Protocol Error: Email/Password provider is not enabled in Firebase Console.';
        } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            message = 'Invalid credentials. Please check your identifier and password.';
        } else if (error.message) {
            message = error.message;
        }

        res.status(401).json({ error: message });
    }
};
