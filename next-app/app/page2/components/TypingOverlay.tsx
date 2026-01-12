import React, { useState, useEffect, useRef } from 'react';

interface TypingOverlayProps {
    texts: string[];
    onComplete: () => void;
}

export default function TypingOverlay({ texts, onComplete }: TypingOverlayProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fullText = texts[currentIndex];

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        let i = 0;
        
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayedText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setIsTyping(false);
            }
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [currentIndex, fullText]);

    const handleInteraction = () => {
        if (isTyping) {
            // Instant finish
            if (intervalRef.current) clearInterval(intervalRef.current);
            setDisplayedText(fullText);
            setIsTyping(false);
        } else {
            // Next
            if (currentIndex < texts.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onComplete();
            }
        }
    };

    return (
        <div className="scene-overlay" onClick={handleInteraction}>
            <div className="typing-container">
                <div className="typing-text" style={{ whiteSpace: 'pre-line' }}>{displayedText}</div>
                {!isTyping && (
                    <div className="investigate-btn" style={{ marginTop: '20px', cursor: 'pointer', textAlign: 'center' }}>
                        [ Click to continue ]
                    </div>
                )}
            </div>
        </div>
    );
}
