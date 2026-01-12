'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

// Components
import TypingOverlay from './components/TypingOverlay';
import DialogSequence from './components/DialogSequence';
import SystemAlert from './components/SystemAlert';
import Particles from './components/Particles';

const introNarration = [
  // Scene 3: Waking up in the Ruins (SUT Context)
  "...",
  "You open your eyes amidst the ruins. The sky is a bruised violet.\nThis is SUT... but not the SUT you know.",
  "The air hums with the sound of a thousand disconnected sessions.",
  "You see fragments of code floating in the air, unfinished assignments and lost data.",
  "Floating debris of the 'Technopolis' surrounds you.\nAhead, a flickering figure stands guarding the path.",
];

const meetingDialogs = [
  // Scene 4: Meeting the Maiden (The NPC)
  "Unknown Maiden: 'Halt, Tarnished Student... or are you merely a glitch in the code?'",
  "Unknown Maiden: 'The realm is broken. Phantoms and corrupted packets roam these lands.'",
  "Unknown Maiden: 'I cannot let you pass without proof. If you are truly of this world... prove your existence.'",
  "Unknown Maiden: 'Show me your coordinates. Anchor your soul to this reality.'"
];

const locationSuccessDialogs = [
  "Unknown Maiden: 'The coordinates match... You stand on solid ground.'",
  "Unknown Maiden: 'Forgive me. You are no glitch. You are a survivor.'"
];

const knowledge1IntroDialogs = [
  "Unknown Maiden: 'But existence in the physical realm is not enough.'",
  "Unknown Maiden: 'To access the deeper layers, you must prove you know the source.'",
  "Unknown Maiden: 'Do you carry the mark of the Beginning? The hidden string that weaves this world?'"
];

const knowledge2IntroDialogs = [
  "Unknown Maiden: 'Impressive. You see beyond the veil.'",
  "Unknown Maiden: 'But one final lock remains before I can trust you completely.'",
  "Unknown Maiden: 'My name... lost to the compiled memory dumps. Do you know who I am?'"
];

const outroDialogs = [
  "Maiden: 'Yes... you know me.'",
  "Maiden: 'Listen closely. The shattering can be reversed.'",
  "Maiden: 'Deep within the Instrument Building (F1), the Great Engine awaits restoration.'",
  
  "Maiden: 'But the Engine requires an Administrator's touch... an 'Elden Lord's' authority.'",
  "Maiden: 'You possess the key, do you not? The same secret code that broke this world...'",
  "Maiden: 'Use that forbidden secret to forge your new identity. Only the cause of the destruction can bring about the cure.'",
  
  "Maiden: 'Go now. Become the Admin this system needs.'"
];

export default function Page2() {
    const router = useRouter();
    const [phase, setPhase] = useState<'INTRO_TEXT' | 'INTRO_DIALOG' | 'MFA_LOCATION' | 'DIALOG_ACCEPTANCE' | 'DIALOG_KNOWLEDGE_1' | 'MFA_KNOWLEDGE_1' | 'DIALOG_KNOWLEDGE_2' | 'MFA_KNOWLEDGE_2' | 'OUTRO'>('INTRO_TEXT');
    const [glitchActive, setGlitchActive] = useState(false);

    return (
        <div className="elden-quiz-page">
            <div style={{ display: 'none' }} id="secret-store">Token: SUT_GENESIS_2026</div>

            <Particles />
            {glitchActive && <div className="glitch-overlay"></div>}

            {phase === 'INTRO_TEXT' && (
                <TypingOverlay 
                    texts={introNarration}
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
                    dialogs={meetingDialogs}
                    onComplete={() => setPhase('MFA_LOCATION')}
                />
            )}

            {phase === 'MFA_LOCATION' && (
                <SystemAlert 
                    authStep="AUTH: 1/3"
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
                    onSuccess={() => setPhase('DIALOG_ACCEPTANCE')}
                />
            )}

            {phase === 'DIALOG_ACCEPTANCE' && (
                <DialogSequence 
                    dialogs={locationSuccessDialogs}
                    onComplete={() => setPhase('DIALOG_KNOWLEDGE_1')}
                />
            )}

            {phase === 'DIALOG_KNOWLEDGE_1' && (
                <DialogSequence 
                    dialogs={knowledge1IntroDialogs}
                    onComplete={() => setPhase('MFA_KNOWLEDGE_1')}
                />
            )}

            {phase === 'MFA_KNOWLEDGE_1' && (
                <SystemAlert 
                    authStep="AUTH: 2/3"
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
                    onSuccess={() => setPhase('DIALOG_KNOWLEDGE_2')}
                />
            )}

            {phase === 'DIALOG_KNOWLEDGE_2' && (
                <DialogSequence 
                    dialogs={knowledge2IntroDialogs}
                    onComplete={() => setPhase('MFA_KNOWLEDGE_2')}
                />
            )}

            {phase === 'MFA_KNOWLEDGE_2' && (
                <SystemAlert 
                    authStep="AUTH: 3/3"
                    message="One final verification. Name the administrator."
                    hint="Who is the guide standing before you?"
                    submitLabel="Verify Maiden Name"
                    hasInput
                    inputPlaceholder="ENTER_MAIDEN_NAME"
                    npcClass="npc-image-large red-eyes"
                    onVerify={async (val) => {
                         // Placeholder validation - accepting any non-empty input for now
                        if (val.trim().length > 0) {
                            return { success: true, message: "Name Recognized. Admin Privileges Restored." };
                        }
                        return { success: false, message: "Error 403: Unknown Entity." };
                    }}
                    onSuccess={() => setPhase('OUTRO')}
                />
            )}

            {phase === 'OUTRO' && (
                <DialogSequence 
                    dialogs={outroDialogs}
                    finishLabel="[ Proceed to the Machine Core ]"
                    onComplete={() => router.push('/page3')}
                />
            )}
        </div>
    );
}
