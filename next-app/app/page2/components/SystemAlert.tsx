import React, { useState } from 'react';
import Image from 'next/image';
import Pnpc from '../picture/Pnpc.png';

interface SystemAlertProps {
    authStep: string; // "AUTH: 1/2"
    message: string;
    hint: string;
    npcClass?: string;
    isFirstAppear?: boolean;

    hasInput?: boolean;
    inputPlaceholder?: string;
    submitLabel: string;

    onVerify: (value: string) => Promise<{ success: boolean; message: string }>;
    onSuccess: () => void;
}

export default function SystemAlert({
    authStep,
    message,
    hint,
    npcClass = "npc-image-large",
    isFirstAppear = false,
    hasInput = false,
    inputPlaceholder = "",
    submitLabel,
    onVerify,
    onSuccess
}: SystemAlertProps) {
    const [inputValue, setInputValue] = useState("");
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const [feedbackType, setFeedbackType] = useState("");

    const handleSubmit = async () => {
        setFeedbackMsg("Verifying...");
        setFeedbackType("");

        // Simulate delay or async check
        const result = await onVerify(inputValue);

        setFeedbackMsg(result.message);
        setFeedbackType(result.success ? "success" : "error");

        if (result.success) {
            setTimeout(() => {
                setFeedbackMsg("");
                onSuccess();
            }, 1500);
        }
    };

    return (
        <>
            <div className={`page2-npc-center ${isFirstAppear ? 'first-appear' : ''}`}>
                <Image src={Pnpc} alt="NPC" width={800} height={1200} className={npcClass} />
            </div>

            <div className="system-alert-overlay">
                <div className="system-alert">
                    <div className="system-header">
                        <span>SYSTEM ALERT</span>
                        <span>{authStep}</span>
                    </div>
                    <p className="mfa-label">{message}</p>
                    <p style={{ color: '#ccc', marginBottom: '15px', fontStyle: 'italic' }}>{hint}</p>

                    <div className="mfa-input-group">
                        {hasInput && (
                            <input
                                type="text"
                                placeholder={inputPlaceholder}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        )}
                        <button className="mfa-btn" onClick={handleSubmit}>
                            {submitLabel}
                        </button>
                        {feedbackMsg && <div className={`feedback-msg ${feedbackType}`}>{feedbackMsg}</div>}
                    </div>
                </div>
            </div>
        </>
    );
}
