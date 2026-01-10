import React, { useState } from 'react';
import { auth, db } from '../firebase';
import {
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     GoogleAuthProvider,
     signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthScreenProps {
     onAuthSuccess: (userData: any) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isRegister, setIsRegister] = useState(false);

     // საწყისი მონაცემები ახალი მომხმარებლისთვის
     const initialStats = {
          coins: 200,
          completedRounds: 0,
          completedTours: [],
          unlockedVip: false,
          language: 'ka',
          hasSeenIntro: false
     };

     // --- Google-ით შესვლის ფუნქცია ---
     const handleGoogleAuth = async () => {
          const provider = new GoogleAuthProvider();
          try {
               const result = await signInWithPopup(auth, provider);
               const user = result.user;

               const userDoc = await getDoc(doc(db, "users", user.uid));

               if (!userDoc.exists()) {
                    // თუ პირველად შედის Google-ით, ვუქმნით პროფილს
                    await setDoc(doc(db, "users", user.uid), initialStats);
                    onAuthSuccess(initialStats);
               } else {
                    // თუ უკვე არსებობს, მოგვაქვს მისი მონაცემები
                    onAuthSuccess(userDoc.data());
               }
          } catch (error: any) {
               alert("Google-ით შესვლა ვერ მოხერხდა: " + error.message);
          }
     };

     // --- იმეილით რეგისტრაცია/შესვლა ---
     const handleAuth = async () => {
          if (!email || !password) {
               alert("გთხოვთ შეავსოთ ყველა ველი");
               return;
          }

          try {
               let userCredential;
               if (isRegister) {
                    // რეგისტრაცია
                    userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    await setDoc(doc(db, "users", userCredential.user.uid), initialStats);
               } else {
                    // შესვლა
                    userCredential = await signInWithEmailAndPassword(auth, email, password);
               }

               const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
               onAuthSuccess(userDoc.data());

          } catch (error: any) {
               let message = "მოხდა შეცდომა";
               if (error.code === 'auth/wrong-password') message = "პაროლი არასწორია";
               if (error.code === 'auth/user-not-found') message = "მომხმარებელი ვერ მოიძებნა";
               alert(message + ": " + error.message);
          }
     };

     return (
          <div style={{
               padding: '30px',
               textAlign: 'center',
               background: '#2c3e50',
               color: 'white',
               borderRadius: '20px',
               width: '320px',
               boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
               <h2 style={{ marginBottom: '20px' }}>{isRegister ? 'რეგისტრაცია' : 'შესვლა'}</h2>

               <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '12px', borderRadius: '8px', border: 'none', boxSizing: 'border-box' }}
               />

               <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '20px', padding: '12px', borderRadius: '8px', border: 'none', boxSizing: 'border-box' }}
               />

               <button
                    onClick={handleAuth}
                    style={{
                         width: '100%',
                         padding: '12px',
                         background: '#27ae60',
                         color: 'white',
                         border: 'none',
                         borderRadius: '8px',
                         cursor: 'pointer',
                         fontWeight: 'bold',
                         fontSize: '16px',
                         marginBottom: '15px'
                    }}
               >
                    {isRegister ? 'შექმენი ექაუნთი' : 'შესვლა'}
               </button>

               <div style={{ margin: '15px 0', opacity: '0.6', fontSize: '14px' }}>ან</div>

               {/* Google Button */}
               <button
                    onClick={handleGoogleAuth}
                    style={{
                         width: '100%',
                         padding: '12px',
                         background: 'white',
                         color: '#444',
                         border: 'none',
                         borderRadius: '8px',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         fontWeight: 'bold',
                         gap: '10px'
                    }}
               >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '18px' }} />
                    Google-ით შესვლა
               </button>

               <p
                    onClick={() => setIsRegister(!isRegister)}
                    style={{ cursor: 'pointer', marginTop: '20px', textDecoration: 'underline', fontSize: '14px', opacity: '0.8' }}
               >
                    {isRegister ? 'უკვე გაქვს ექაუნთი? შედი' : 'არ გაქვს ექაუნთი? დარეგისტრირდი'}
               </p>
          </div>
     );
};