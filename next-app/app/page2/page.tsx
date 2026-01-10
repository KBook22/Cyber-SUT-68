'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function Page2() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/page3');
    };

    return (
        <div className="elden-quiz-page">
            {/* Ember Particles */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`small-${i}`}
                        className="particle ember-small"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                        }}
                    />
                ))}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`medium-${i}`}
                        className="particle ember-medium"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                        }}
                    />
                ))}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`large-${i}`}
                        className="particle ember-large"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    />
                ))}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={`spark-${i}`}
                        className="particle ember-spark"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* NPC - Left side, cropped at bottom */}
            <div className="page2-npc-left">
                <Image
                    src="/elden-ring-quiz/npc.png"
                    alt="Mysterious NPC"
                    width={700}
                    height={1050}
                    className="npc-image-large"
                    priority
                />
            </div>

            {/* Dialog Box - Right side, large */}
            <div className="page2-dialog-right">
                <div className="dialog-box-large">
                    <h2 className="dialog-title">✦ The Sage Speaks ✦</h2>
                    <p className="dialog-text-large">
                        Ah... A Tarnished, are we?
                    </p>
                    <p className="dialog-text-large">
                        I sense the flame of ambition within thee... Very well, I shall guide thy path through the Lands Between.
                    </p>
                    <p className="dialog-text-large">
                        The Elden Ring awaits those who are worthy. Proceed, and prove thy worth.
                    </p>
                </div>
            </div>

            {/* Next Button - Right bottom */}
            <button className="page2-next-btn" onClick={handleNext}>
                <span>Next →</span>
            </button>
        </div>
    );
}
