import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

console.log('--- Firebase Diagnosis ---');
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
console.log('Credentials Path:', serviceAccountPath);

if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
    console.error('ERROR: service-account.json not found at', serviceAccountPath);
    process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
console.log('Project ID in JSON:', serviceAccount.project_id);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id
    });
    console.log('SUCCESS: Admin SDK Initialized');

    const db = admin.firestore();
    console.log('Testing Firestore Get...');

    db.collection('complaints').limit(1).get()
        .then(async snap => {
            console.log('SUCCESS: Firestore connection verified.');

            console.log('Testing Auth Service...');
            try {
                // Try to create a dummy user with a unique email to test if Auth is enabled
                const testEmail = `test_${Date.now()}@example.com`;
                await admin.auth().createUser({
                    email: testEmail,
                    password: 'temporaryPassword123'
                });
                console.log('SUCCESS: Auth service is ACTIVE. Test user created:', testEmail);

                // Cleanup
                const user = await admin.auth().getUserByEmail(testEmail);
                await admin.auth().deleteUser(user.uid);
                console.log('SUCCESS: Cleanup completed.');
                process.exit(0);
            } catch (authErr: any) {
                console.error('ERROR: Auth Service Test Failed');
                console.log('Error Code:', authErr.code);
                console.log('Error Message:', authErr.message);

                if (authErr.code === 'auth/configuration-not-found') {
                    console.log('\n--- CRITICAL ACTION REQUIRED ---');
                    console.log('1. Go to: https://console.firebase.google.com/project/civitra-3af34/authentication/providers');
                    console.log('2. Click "Get Started" (if visible).');
                    console.log('3. Click "Add new provider" > "Email/Password".');
                    console.log('4. TOGGLE "Email/Password" to ENABLED.');
                    console.log('5. Click "Save".');
                }
                process.exit(1);
            }
        })
        .catch(err => {
            console.error('ERROR: Firestore Query Failed');
            console.error('Code:', err.code);
            console.error('Details:', err.details);
            console.error('Full Error:', err);

            if (err.code === 5) {
                console.log('\n--- RECOMMENDATION ---');
                console.log('1. Ensure "Cloud Firestore" is enabled in the Firebase Console for project:', serviceAccount.project_id);
                console.log('2. Check if you have created the "(default)" database.');
                console.log('3. Ensure the project ID matches exactly.');
            }
            process.exit(1);
        });
} catch (e) {
    console.error('ERROR: Initialization Failed', e);
    process.exit(1);
}
