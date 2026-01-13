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
            // ใช้ slice เพื่อป้องกัน index เกิน
            setDisplayedText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setIsTyping(false);
            }
        }, 30); // ความเร็วการพิมพ์

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [currentIndex, fullText]);

    const handleInteraction = () => {
        if (isTyping) {
            // Instant finish (แสดงข้อความทั้งหมดทันที)
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
        // แก้ไข CSS ตรงนี้:
        // 1. fixed inset-0: ให้เต็มหน้าจอ
        // 2. z-[999]: ให้มั่นใจว่าอยู่บนสุด เหนือรูปมังกร (z-20) แน่นอน
        // 3. bg-black: พื้นหลังดำทึบ (หรือใช้ bg-black/90 ถ้าอยากให้โปร่งแสงนิดหน่อย)
        <div 
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white font-mono"
            onClick={handleInteraction}
        >
            <div className="max-w-3xl p-8 text-center">
                <div className="text-2xl md:text-3xl leading-relaxed min-h-[100px]" style={{ whiteSpace: 'pre-line' }}>
                    {displayedText}
                    {/* Cursor effect (Optional) */}
                    {isTyping && <span className="animate-pulse">|</span>}
                </div>
                
                {!isTyping && (
                    <div className="investigate-btn mt-20 text-gray-500 text-sm animate-pulse">
                        [ Click to continue ]
                    </div>
                )}
            </div>
        </div>
    );
}