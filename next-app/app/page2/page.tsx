'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function Page2() {
    const router = useRouter();

    // State for Scene Management (1-5)
    // 1: The Awakening (Black screen, text)
    // 2: The Phantom Encounter (NPC appears)
    // 3: First Factor (Location)
    // 4: Second Factor (Knowledge)
    // 5: The Revelation (Link to next page)
    const [scene, setScene] = useState(1);

    // UI States
    const [glitchActive, setGlitchActive] = useState(false);
    const [typedText, setTypedText] = useState('');
    const fullText = "System Critical... Segmentation Fault... Dimensions Shattered.\n\nYou open your eyes amidst the ruins... This is SUT, but not the SUT you know.";
    const [showInvestigateBtn, setShowInvestigateBtn] = useState(false);

    // NPC Dialog States
    const [dialogIndex, setDialogIndex] = useState(0);
    const npcDialogs = [
        // Scene 2 Dialogs
        "Unknown Maiden: \"You... are you still conscious? I thought you had become a Null Pointer by now.\"",
        "Unknown Maiden: \"This dimension rejects undefined entities. If you wish to proceed and fix what you have broken... you must prove you 'exist'.\""
    ];

    // MFA States
    const [locationInput, setLocationInput] = useState(''); // Mock GPS or text input
    const [knowledgeInput, setKnowledgeInput] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [feedbackType, setFeedbackType] = useState(''); // 'error' or 'success'

    // Typing Effect Logic
    useEffect(() => {
        if (scene === 1) {
            let index = 0;
            const timer = setInterval(() => {
                setTypedText((prev) => prev + fullText.charAt(index));
                index++;
                if (index === fullText.length) {
                    clearInterval(timer);
                    setTimeout(() => setShowInvestigateBtn(true), 1000);
                }
            }, 50); // Typing speed
            return () => clearInterval(timer);
        }
    }, [scene]);

    // Handlers
    const handleInvestigate = () => {
        // Trigger glitch and move to Scene 2
        setGlitchActive(true);
        setTimeout(() => {
            setGlitchActive(false);
            setScene(2);
        }, 800);
    };

    const handleDialogNext = () => {
        if (dialogIndex < npcDialogs.length - 1) {
            setDialogIndex(prev => prev + 1);
        } else {
            // End of initial dialog, move to Scene 3 (MFA 1)
            setScene(3);
        }
    };

    const handleLocationSubmit = () => {
        // Mock verification logic
        // Any input or just clicking button simulates "Broadcast"
        setFeedbackMsg("Scanning coordinates...");
        setFeedbackType("");
        setTimeout(() => {
            setFeedbackMsg("Signal Verified. Location Sync Complete: Star Plaza (Ruins).");
            setFeedbackType("success");
            setTimeout(() => {
                setFeedbackMsg("");
                setScene(4); // Move to Knowledge Factor
            }, 2000);
        }, 1500);
    };

    const handleKnowledgeSubmit = () => {
        // Check for specific secret code
        // Hint: hidden in HTML comment
        if (knowledgeInput.trim() === "SUT_GENESIS_2026" || knowledgeInput.trim() === "admin") {
            setFeedbackMsg("Identity Confirmed. Access Granted.");
            setFeedbackType("success");
            setTimeout(() => {
                setFeedbackMsg("");
                setScene(5); // Revelation
            }, 1500);
        } else {
            setFeedbackMsg("Error 403: Invalid Token. You are but a hollow shell.");
            setFeedbackType("error");
        }
    };

    const handleProceed = () => {
        router.push('/page3');
    };

    return (
        <div className="elden-quiz-page">
            {/* Secret Hint for Scene 4 */}
            {/* <!-- SECRET KNOWLEDGE TOKEN: SUT_GENESIS_2026 --> */}
            <div style={{ display: 'none' }} id="secret-store">Token: SUT_GENESIS_2026</div>

            {/* Ember Particles (Always present in bg) */}
            <div className="particles">
                {[...Array(20)].map((_, i) => <div key={`s-${i}`} className="particle ember-small" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />)}
                {[...Array(10)].map((_, i) => <div key={`m-${i}`} className="particle ember-medium" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 7}s` }} />)}
            </div>

            {/* Glitch Overlay */}
            {glitchActive && <div className="glitch-overlay"></div>}

            {/* --- SCENE 1: THE AWAKENING --- */}
            {scene === 1 && (
                <div className="scene-overlay">
                    <div className="typing-container">
                        <div className="typing-text">{typedText}</div>
                    </div>
                    {showInvestigateBtn && (
                        <button className="investigate-btn" onClick={handleInvestigate}>
                            [ Investigate the Ruins ]
                        </button>
                    )}
                </div>
            )}

            {/* --- SCENE 2: THE PHANTOM ENCOUNTER --- */}
            {scene === 2 && (
                <>
                    {/* NPC */}
                    <div className="page2-npc-left">
                        <Image
                            src="/elden-ring-quiz/npc.png"
                            alt="Unknown Maiden"
                            width={500}
                            height={750}
                            className="npc-image-large"
                            priority
                        />
                    </div>
                    {/* Dialog */}
                    <div className="page2-dialog-right">
                        <div className="dialog-box-large">
                            <h2 className="dialog-title">Unknown Maiden</h2>
                            <p className="dialog-text-large">{npcDialogs[dialogIndex]}</p>
                            <button className="page2-next-btn" onClick={handleDialogNext}>
                                Next &#9654;
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* --- SCENE 3: FACTOR 1 - LOCATION --- */}
            {scene === 3 && (
                <>
                    {/* Background NPC visible but dimmed/passive */}
                    <div className="page2-npc-left">
                        <Image src="/elden-ring-quiz/npc.png" alt="NPC" width={500} height={750} className="npc-image-large" />
                    </div>

                    <div className="system-alert-overlay">
                        <div className="system-alert">
                            <div className="system-header">
                                <span>SYSTEM ALERT</span>
                                <span>AUTH: 1/2</span>
                            </div>
                            <p className="mfa-label">"Your soul drifts... Prove your physical anchor."</p>
                            <p style={{ color: '#ccc', marginBottom: '15px', fontStyle: 'italic' }}>"Broadcast a signal from the Heart of Faith (Star Plaza)..."</p>

                            <div className="mfa-input-group">
                                <button className="mfa-btn" onClick={handleLocationSubmit}>
                                    [ Broadcast Location Signal ]
                                </button>
                                {feedbackMsg && <div className={`feedback-msg ${feedbackType}`}>{feedbackMsg}</div>}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* --- SCENE 4: FACTOR 2 - KNOWLEDGE --- */}
            {scene === 4 && (
                <>
                    <div className="page2-npc-left">
                        {/* Red Eyes Effect */}
                        <Image
                            src="/elden-ring-quiz/npc.png"
                            alt="NPC"
                            width={500}
                            height={750}
                            className="npc-image-large red-eyes"
                        />
                    </div>

                    <div className="system-alert-overlay">
                        <div className="system-alert">
                            <div className="system-header">
                                <span>SYSTEM ALERT</span>
                                <span>AUTH: 2/2</span>
                            </div>
                            <p className="mfa-label">"Coordinates valid. Now, verify your essence."</p>
                            <p style={{ color: '#ccc', marginBottom: '15px', fontStyle: 'italic' }}>"Speak the Hidden Code lurking in the shadows of this world (Source)..."</p>

                            <div className="mfa-input-group">
                                <input
                                    type="text"
                                    placeholder="ENTER_KNOWLEDGE_TOKEN"
                                    value={knowledgeInput}
                                    onChange={(e) => setKnowledgeInput(e.target.value)}
                                />
                                <button className="mfa-btn" onClick={handleKnowledgeSubmit}>
                                    Verify Token
                                </button>
                                {feedbackMsg && <div className={`feedback-msg ${feedbackType}`}>{feedbackMsg}</div>}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* --- SCENE 5: THE REVELATION --- */}
            {scene === 5 && (
                <>
                    <div className="page2-npc-left">
                        <Image src="/elden-ring-quiz/npc.png" alt="NPC" width={500} height={750} className="npc-image-large" />
                    </div>

                    <div className="page2-dialog-right">
                        <div className="dialog-box-large">
                            <h2 className="dialog-title" style={{ color: '#e8d174' }}>✦ Authentication Complete ✦</h2>
                            <p className="dialog-text-large">
                                "The Ancient Engine at the Instrument Building awaits. Only you, with the 'World-Breaking Key', can deceive it."
                            </p>
                            <p className="dialog-text-large">
                                Go now. Restore the dimension.
                            </p>
                            <button className="proceed-btn" onClick={handleProceed} style={{ width: '100%', marginTop: '20px' }}>
                                [ Proceed to the Machine Core ]
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
