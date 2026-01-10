'use client';

import { useRouter } from 'next/navigation';

export default function Page1() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/page2');
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
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Page 1</h1>
      
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
        Next →
      </button>
    </div>
  );
}
