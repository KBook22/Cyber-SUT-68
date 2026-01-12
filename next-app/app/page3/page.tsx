'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SplashScreen from '../components/SplashScreen'; // Import SplashScreen

export default function Page3() {
    const router = useRouter();
    const [showSplash, setShowSplash] = useState(true);

    const handleNext = () => {
        router.push('/page1');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '24px'
        }}>
           {showSplash && (
                <SplashScreen 
                  chapter="CHAPTER 3"
                  title="The Engine of Restoration"
                  subtitle="Authorization System Recovery"
                  onComplete={() => setShowSplash(false)}
                />
            )}
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Page 3</h1>

            <button
                onClick={handleNext}
                style={{
                    padding: '12px 32px',
                    fontSize: '1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
                Next → (กลับไป Page 1)
            </button>
        </div>
    );
}
