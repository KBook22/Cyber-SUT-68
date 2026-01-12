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
  "คุณลืมตาตื่นขึ้นท่ามกลางซากปรักหักพัง ท้องฟ้าเป็นสีม่วงช้ำ...\nนี่คือ มทส. ...แต่มันไม่ใช่ มทส. ที่คุณรู้จัก",
  "อากาศสั่นไหวด้วยเสียงสะท้อนของ Session นับพันที่ขาดการเชื่อมต่อ",
  "คุณเห็นเศษเสี้ยวของ Code ลอยคว้างกลางอากาศ Assignment ที่ยังทำไม่เสร็จและข้อมูลที่สูญหาย",
  "ซากปรักหักพังของ 'Technopolis' ลอยอยู่รอบตัว\nเบื้องหน้ามีเงาร่างหนึ่งยืนขวางทางอยู่",
];

const meetingDialogs = [
  // Scene 4: Meeting the Maiden (The NPC)
  "บุรุษปริศนา: 'หยุดก่อน นักศึกษาผู้มัวหมอง... หรือเจ้าเป็นเพียงแค่ Glitch ในโค้ดกันแน่?'",
  "บุรุษปริศนา: 'ดินแดนนี้แตกสลายไปแล้ว ภูตผีและ Packet ที่เสียหายเดินเพ่นพ่านไปทั่ว'",
  "บุรุษปริศนา: 'ข้าให้เจ้าผ่านไปไม่ได้หากไร้ซึ่งข้อพิสูจน์ หากเจ้าเป็นคนของโลกใบนี้จริง... จงพิสูจน์ตัวตนของเจ้ามา'",
  "บุรุษปริศนา: 'แสดงพิกัดของเจ้ามา ยึดวิญญาณของเจ้าไว้กับความเป็นจริงแห่งนี้ซะ'"
];

const locationSuccessDialogs = [
  "บุรุษปริศนา: 'พิกัดถูกต้อง... เจ้ายืนอยู่บนพื้นดินที่มั่นคง'",
  "บุรุษปริศนา: 'อภัยให้ข้าด้วย เจ้าไม่ใช่ Glitch สินะ เจ้าคือผู้รอดชีวิต'"
];

const knowledge1IntroDialogs = [
  "บุรุษปริศนา: 'แต่การมีตัวตนในโลกกายภาพนั้นยังไม่เพียงพอ'",
  "บุรุษปริศนา: 'เพื่อเข้าถึง Layer ที่ลึกกว่านี้ เจ้าต้องพิสูจน์ว่าเจ้ารู้จักต้นกำเนิด (Source)'",
  "บุรุษปริศนา: 'เจ้ามีตราประทับแห่งจุดเริ่มต้นหรือไม่? สตริงที่ซ่อนเร้นถักทอโลกใบนี้อยู่ (Hidden String)?'"
];

const knowledge2IntroDialogs = [
  "บุรุษปริศนา: 'น่าประทับใจ เจ้ามองเห็นทะลุผ่านม่านหมอก'",
  "บุรุษปริศนา: 'แต่ยังเหลือล็อคสุดท้ายก่อนที่ข้าจะไว้ใจเจ้าได้อย่างหมดใจ'",
  "บุรุษปริศนา: 'นามของข้า... สูญหายไปในกอง Memory Dump เจ้าล่วงรู้หรือไม่ว่าข้าคือใคร?'"
];

const outroDialogs = [
  "บุรุษปริศนา: 'ใช่... เจ้ารู้จักข้า'",
  "ผู้พิทักษ์บิตนิรันดร์: 'จงฟังให้ดี การแตกสลาย นี้สามารถย้อนกลับได้'",
  "ผู้พิทักษ์บิตนิรันดร์: 'ลึกลงไปในอาคารเครื่องมือ (F11) เครื่องจักรยักษ์ (Great Engine) รอคอยการฟื้นฟูอยู่'",
  
  "ผู้พิทักษ์บิตนิรันดร์: 'แต่เครื่องจักรนั้นต้องการสัมผัสของ Administrator... อำนาจแห่ง 'Elden Lord''",
  "ผู้พิทักษ์บิตนิรันดร์: 'เจ้าครอบครองกุญแจอยู่ไม่ใช่รึ? รหัสลับเดียวกับที่ทำให้โลกใบนี้พังทลาย...'",
  "ผู้พิทักษ์บิตนิรันดร์: 'ใช้ความลับต้องห้ามนั้นสร้างตัวตนใหม่ของเจ้าขึ้นมา มีเพียงต้นเหตุแห่งการทำลายล้างเท่านั้นที่จะนำมาซึ่งการรักษา'",
  
  "ผู้พิทักษ์บิตนิรันดร์: 'ไปเถิด จงกลายเป็น Admin ที่ระบบนี้ต้องการ'"
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
                    authStep="ยืนยันตัวตน: 1/3"
                    message="วิญญาณเจ้าล่องลอย... จงพิสูจน์จุดยึดเหนี่ยวทางกายภาพ"
                    hint="ส่งสัญญาณจากศูนย์รวมความศรัทธา (ลานดาว/ลานย่าโม)..."
                    submitLabel="[ ส่งสัญญาณพิกัด ]"
                    onVerify={async () => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve({ success: true, message: "ยืนยันสัญญาณสำเร็จ ซิงค์พิกัดเรียบร้อย: ลานดาว (Ruins)" });
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
                    authStep="ยืนยันตัวตน: 2/3"
                    message="พิกัดถูกต้อง ต่อไปจงยืนยันแก่นแท้ของเจ้า"
                    hint="เอ่ยนามรหัสที่ซ่อนอยู่ในเงามืดของโลกนี้ (Source)..."
                    submitLabel="ตรวจสอบ Token"
                    hasInput
                    inputPlaceholder="ระบุ_KNOWLEDGE_TOKEN"
                    npcClass="npc-image-large red-eyes"
                    onVerify={async (val) => {
                        if (val.trim() === "SUT_GENESIS_2026" || val.trim() === "admin") {
                            return { success: true, message: "ยืนยันตัวตนถูกต้อง อนุญาตให้เข้าถึง" };
                        }
                        return { success: false, message: "Error 403: Token ไม่ถูกต้อง เจ้าเป็นเพียงร่างที่ว่างเปล่า" };
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
                    authStep="ยืนยันตัวตน: 3/3"
                    message="การตรวจสอบสุดท้าย จงเอ่ยนามของผู้ดูแล"
                    hint="ผู้นำทางที่ยืนอยู่ตรงหน้าเจ้าคือใคร?"
                    submitLabel="ตรวจสอบนามแห่ง Maiden"
                    hasInput
                    inputPlaceholder="ระบุ_นาม_บุรุษ"
                    npcClass="npc-image-large red-eyes"
                    onVerify={async (val) => {
                         // Placeholder validation - accepting any non-empty input for now
                        if (val.trim().length > 0) {
                            return { success: true, message: "ระบบจดจำชื่อได้ กู้คืนสิทธิ์ Admin สำเร็จ" };
                        }
                        return { success: false, message: "Error 403: ไม่พบข้อมูลตัวตนนี้" };
                    }}
                    onSuccess={() => setPhase('OUTRO')}
                />
            )}

            {phase === 'OUTRO' && (
                <DialogSequence 
                    dialogs={outroDialogs}
                    finishLabel="[ มุ่งหน้าสู่แกนกลางเครื่องจักร ]"
                    onComplete={() => router.push('/page3')}
                />
            )}
        </div>
    );
}