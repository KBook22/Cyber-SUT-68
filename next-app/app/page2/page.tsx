'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

// Components
import TypingOverlay from './components/TypingOverlay';
import DialogSequence from './components/DialogSequence';
import SystemAlert from './components/SystemAlert';
import Particles from './components/Particles';

const introDialogs = [
  // Scene 1: The Crash (System Error mixed with Fantasy)
  "FATAL ERROR: Decryption Successful...",
  "Warning: The Forbidden Knowledge has been accessed.",
  "Integrity breach detected... Reality buffer overflow...",
  "NO! You fool! You've broken the seal!",
  
  // Scene 2: The Shattering
  "System Critical... Segmentation Fault... Dimensions Shattered.",
  
  // Scene 3: Waking up in the Ruins (SUT Context)
  "...",
  "You open your eyes amidst the ruins. The sky is a bruised violet.\nThis is SUT... but not the SUT you know.",
  "Floating debris of the 'Technopolis' surrounds you.\nAhead, a flickering figure stands guarding the path.",
  
  // Scene 4: Meeting the Maiden (The NPC)
  "Unknown Maiden: 'Halt, Tarnished Student... or are you merely a glitch in the code?'",
  "Unknown Maiden: 'The realm is broken. Phantoms and corrupted packets roam these lands.'",
  "Unknown Maiden: 'I cannot let you pass without proof. If you are truly of this world... prove your existence.'",
  "Unknown Maiden: 'Show me your coordinates. Anchor your soul to this reality.'"
];

const postSuccessDialogs = [
  // Scene 1: Acceptance
  "Maiden: 'The coordinates match... You stand on solid ground.'",
  "Maiden: 'Forgive me. You are no glitch. You are a survivor.'",
  
  // Scene 2: The Path Forward (Hinting Part 3)
  "Maiden: 'Listen closely. The shattering can be reversed.'",
  "Maiden: 'Deep within the Instrument Building (F1), the Great Engine awaits restoration.'",
  
  // Scene 3: THE KEY HINT (Vital for Part 3)
  "Maiden: 'But the Engine requires an Administrator's touch... an 'Elden Lord's' authority.'",
  "Maiden: 'You possess the key, do you not? The same secret code that broke this world...'",
  "Maiden: 'Use that forbidden secret to forge your new identity. Only the cause of the destruction can bring about the cure.'",
  
  // Scene 4: Departure
  "Maiden: 'Go now. Become the Admin this system needs.'"
];

export default function Page2() {
    const router = useRouter();
    const [phase, setPhase] = useState<'INTRO_TEXT' | 'INTRO_DIALOG' | 'MFA_LOCATION' | 'MFA_KNOWLEDGE' | 'OUTRO'>('INTRO_TEXT');
    const [glitchActive, setGlitchActive] = useState(false);

    return (
        <div className="elden-quiz-page">
            <div style={{ display: 'none' }} id="secret-store">Token: SUT_GENESIS_2026</div>

            <Particles />
            {glitchActive && <div className="glitch-overlay"></div>}

            {phase === 'INTRO_TEXT' && (
                <TypingOverlay 
                    texts={introDialogs.slice(0, 8)}
                    onComplete={() => {
                        setGlitchActive(true);
                        setTimeout(() => {
                            setGlitchActive(false);
                            setPhase('INTRO_DIALOG');
                        }, 800);
                    }}
                />
            )}

            {phase === 'INTRO_DIALOG' && (
                <DialogSequence 
                    dialogs={introDialogs.slice(8)}
                    onComplete={() => setPhase('MFA_LOCATION')}
                />
            )}

            {phase === 'MFA_LOCATION' && (
                <SystemAlert 
                    authStep="AUTH: 1/2"
                    message="Your soul drifts... Prove your physical anchor."
                    hint="Broadcast a signal from the Heart of Faith (Star Plaza)..."
                    submitLabel="[ Broadcast Location Signal ]"
                    onVerify={async () => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve({ success: true, message: "Signal Verified. Location Sync Complete: Star Plaza (Ruins)." });
                            }, 1500);
                        });
                    }}
                    onSuccess={() => setPhase('MFA_KNOWLEDGE')}
                />
            )}

            {phase === 'MFA_KNOWLEDGE' && (
                <SystemAlert 
                    authStep="AUTH: 2/2"
                    message="Coordinates valid. Now, verify your essence."
                    hint="Speak the Hidden Code lurking in the shadows of this world (Source)..."
                    submitLabel="Verify Token"
                    hasInput
                    inputPlaceholder="ENTER_KNOWLEDGE_TOKEN"
                    npcClass="npc-image-large red-eyes"
                    onVerify={async (val) => {
                        if (val.trim() === "SUT_GENESIS_2026" || val.trim() === "admin") {
                            return { success: true, message: "Identity Confirmed. Access Granted." };
                        }
                        return { success: false, message: "Error 403: Invalid Token. You are but a hollow shell." };
                    }}
                    onSuccess={() => setPhase('OUTRO')}
                />
            )}

            {phase === 'OUTRO' && (
                <DialogSequence 
                    dialogs={postSuccessDialogs}
                    finishLabel="[ Proceed to the Machine Core ]"
                    onComplete={() => router.push('/page3')}
                />
            )}
        </div>
    );
}
