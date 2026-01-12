import React from 'react';

export default function Particles() {
    return (
        <div className="particles">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={`s-${i}`} 
                    className="particle ember-small" 
                    style={{ 
                        left: `${Math.random() * 100}%`, 
                        animationDelay: `${Math.random() * 5}s` 
                    }} 
                />
            ))}
            {[...Array(10)].map((_, i) => (
                <div 
                    key={`m-${i}`} 
                    className="particle ember-medium" 
                    style={{ 
                        left: `${Math.random() * 100}%`, 
                        animationDelay: `${Math.random() * 7}s` 
                    }} 
                />
            ))}
        </div>
    );
}
