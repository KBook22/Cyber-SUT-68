import React, { useState } from 'react';
import Image from 'next/image';
import Pnpc from '../picture/Pnpc.png';

interface DialogSequenceProps {
    dialogs: string[];
    onComplete: () => void;
    npcImageClass?: string;
    actionLabel?: string;
    finishLabel?: string;
}

export default function DialogSequence({ 
    dialogs, 
    onComplete, 
    npcImageClass = "npc-image-large",
    actionLabel = "Next \u25B6",
    finishLabel
}: DialogSequenceProps) {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < dialogs.length - 1) {
            setIndex(index + 1);
        } else {
            onComplete();
        }
    };

    const isLast = index === dialogs.length - 1;
    const buttonLabel = isLast && finishLabel ? finishLabel : actionLabel;

    const rawText = dialogs[index];
    let title = "Unknown Maiden";
    let body = rawText;

    // Simple parsing for "Name: 'Message'" format
    if (rawText.includes(":")) {
        const parts = rawText.split(":");
        // Check if the split looks like a name prefix
        if (parts[0].length < 30) {
            title = parts[0].trim();
            body = parts.slice(1).join(":").trim();
            // Remove quotes if present
            if (body.startsWith("'") && body.endsWith("'")) body = body.slice(1, -1);
            if (body.startsWith('"') && body.endsWith('"')) body = body.slice(1, -1);
        }
    }

    return (
        <>
            <div className="page2-npc-center">
                <Image
                    src={Pnpc}
                    alt="NPC"
                    width={800}
                    height={1200}
                    className={npcImageClass}
                    priority
                />
            </div>
            <div className="page2-dialog-right">
                <div className="dialog-box-large">
                    <h2 className="dialog-title">{title}</h2>
                    <p className="dialog-text-large">{body}</p>
                    <button className={isLast && finishLabel ? "proceed-btn" : "page2-next-btn"} onClick={handleNext}>
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </>
    );
}
