'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TypingOverlay from "../page3/components/TypingOverlay";
import DialogSequence from '../page3/components/DialogSequence'; // นำเข้า Component เดิม
import SplashScreen from "../components/SplashScreen"; // Import SplashScreen
import dragon from './picture/dragon.png';
import "./styles.css";

// --- JWT Helper Function (Simulation for CTF) ---\

const SECRET_KEY = "IAmTheLordOfHackerOnTheLandsBetween";

// --- Helper Functions ---
const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const stringToBase64Url = (str: string): string => {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// --- Core JWT Functions ---

// 1. Create JWT
const createJWT = async (payload: any): Promise<string> => {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const payloadStr = JSON.stringify(payload);

  const encodedHeader = stringToBase64Url(header);
  const encodedPayload = stringToBase64Url(payloadStr);
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const encoder = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await window.crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(dataToSign)
  );

  const encodedSignature = arrayBufferToBase64Url(signatureBuffer);
  return `${dataToSign}.${encodedSignature}`;
};

// 2. Verify JWT
const verifyJWT = async (token: string) => {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    if (!headerB64 || !payloadB64 || !signatureB64) return { valid: false, reason: 'format' };

    const dataToVerify = `${headerB64}.${payloadB64}`;
    const encoder = new TextEncoder();

    const key = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET_KEY),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const checkSignatureBuffer = await window.crypto.subtle.sign("HMAC", key, encoder.encode(dataToVerify));
    const checkSignatureB64 = arrayBufferToBase64Url(checkSignatureBuffer);

    if (checkSignatureB64 !== signatureB64) {
      return { valid: false, reason: 'signature' };
    }

    // Decode Payload
    // แปลง Base64URL กลับเป็น Base64 ปกติเพื่อ parse JSON
    let base64 = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad) base64 += new Array(5 - pad).join("=");

    const payload = JSON.parse(atob(base64));
    return { valid: true, payload };

  } catch (e) {
    return { valid: false, reason: 'error' };
  }
}
// --- End JWT Helper ---

// --- Dialogs ---
const introNarration = [
  "ตอนนี้คุณได้เข้าสู่มิติรอยแยกแห่งการพิสูจน์ตัวตน.",
  "มังกร 'ผู้พิทักษ์ไฟร์วอลล์' ได้ตื่นขึ้นจากการหลับไหล.",
  "มันรับรู้ถึงความปั่นป่วนในอาณาจักร จากการแตกสลายของ session.",
  "เพื่อดำเนินการต่อ จำเป็นต้องพิสูจน์ความคู่ควรของเจ้าต่อผู้พิทักษ์ลึกลับนี้."
];

const introDialogs = [
  "Guardians of the Firewall: นานเท่านาน ข้าไม่เคยได้ตื่นจากการหลับไหล",
  "Guardians of the Firewall: ตอนนี้ วงแหวนแห่งรูน ที่ถูกสร้างขึ้นด้วย 'admin' ได้แตกสลาย",
  "Guardians of the Firewall: ข้าจึงตื่นขึ้นเพื่อเป็น Firewall แห่งสุดลึกของตึกนี้",
  "Guardians of the Firewall: และเจ้า คงจะเป็นผู้ที่ทำลายเจ้าวงแหวนนั้นสินะ"
];

const deniedDialogs = [
  "Guardians of the Firewall: ตราบใดที่เจ้ายังเป็นผู้มัวหมอง เจ้าก็ไม่มีวันคู่ควรกับที่แห่งนี้เสียหรอก!"
];

const judgingDialogs = [
  "Guardians of the Firewall: เจ้าเป็นผู้มัวหมองที่ฉลาดเสียจริง แต่เจ้าสบประมาทข้าเกินไป",
  "Guardians of the Firewall: คิดหรอว่าข้าไม่รู้ว่าเจ้าแอบเปลี่ยน JWT แล้วหลอกจะให้ข้าเปิดทางให้ง่ายๆ ฮึ!! ฝันไปเถอะ!!!"
];

const successDialogs = [
  "Guardians of the Firewall: โอ้ ท่าน ADMIN ข้าขออภัยที่สบประมาทท่านไปเมื่อครู่",
  "Guardians of the Firewall: ต่อนี้ไปข้าขอให้ท่านกอบกู้มทส.กลับมาเป็นเหมือนเดิมเถิด"
];

const endGameNarration = [
  "มังกรผู้พิทักษ์ไฟร์วอลล์ ได้ยอมรับท่านเป็นผู้คู่ควรแล้ว",
  "ด้วยพลังแห่ง 'admin' ท่านสามารถกอบกู้มทส.ให้กลับมาเป็นเหมือนเดิมได้สำเร็จ!",
  "ขอบคุณที่เล่นเกมนี้จนจบ! ท่านคือผู้พิทักษ์แห่งรูนตัวจริง!"
];
// --- Component Code ---

export default function Page3() {
  const router = useRouter();

  // State Management
  const [phase, setPhase] = useState<
    | 'intronarration'
    | 'intro'
    | 'interaction'
    | 'judging'
    | 'denied'
    | 'success'
    | 'end'
  >('intronarration');
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [isWhiteOut, setIsWhiteOut] = useState(false);
  const [showSplash, setShowSplash] = useState(true);


  // ฟังก์ชันจัดการ Cookie
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/;`;
  };

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  // เมื่อผู้ใช้กดตอบโต้
  const handleUserResponse = async () => {
    // 1. ตรวจสอบว่ามี Cookie RoleToken หรือไม่
    let token = getCookie('RoleToken');

    // ถ้าไม่มี ให้สร้าง Default Token (Role: tarnished)
    if (!token) {
      // [UPDATE] สร้าง payload และเรียกใช้ createJWT (ตัวใหม่)
      const defaultPayload = { role: 'tarnished', iat: Math.floor(Date.now() / 1000) };

      // เรียก createJWT แทน signJWT
      token = await createJWT(defaultPayload);

      setCookie('RoleToken', token);
      console.log("System: RoleToken cookie set to 'tarnished'.");
    }

    // 2. ตรวจสอบ Token
    if (!token) return;

    const verification = await verifyJWT(token);

    setTimeout(() => {
      if (!verification.valid) {
        // กรณี Signature ผิด หรือ Token พัง
        handleDenial("signature");
      } else {
        // กรณี Signature ถูก ต้องเช็ค Role
        if (verification.payload.role === 'admin') {
          handleSuccess();
        } else {
          // เป็น tarnished หรือ role อื่น
          handleDenial("role");
        }
      }
    }, 0);
  };

  const handleDenial = (reason: string) => {
    if (reason === 'role') {
      setPhase('denied');
    } else {
      setPhase('judging');
    }
  };

  const handleSuccess = () => {
    setPhase('success');
  };

  // Callback เมื่อ Dialog พูดจบ
  const onGameComplete = () => {
    // จบเกม ย้ายไปหน้า 4
    setTimeout(() => {
      setIsWhiteOut(true);
      setTimeout(() => {
        setPhase('end');
      }, 2000);
    }, 1000);
  };

  if (showSplash)
    return (
      <SplashScreen
        chapter="CHAPTER 2"
        title="The Engine of Restoration"
        subtitle="Authorization Dimensional Rift"
        onComplete={() => setShowSplash(false)}
      />
    );

  return (
    <div className="elden-quiz-page">
      {phase === 'intronarration' && (
        <TypingOverlay
          texts={introNarration}
          onComplete={() => {
            // TODO: เปลี่ยน CSS ให้แสดงผล animation สวยๆ 
            setTimeout(() => {
              setPhase("intro");
            }, 800);
          }}
        />
      )}
      {phase === 'end' && (
        <TypingOverlay
          texts={endGameNarration}
          onComplete={() => {
            // TODO: เปลี่ยน CSS ให้แสดงผล animation สวยๆ 
            setTimeout(() => {
              router.push('/page4');
            }, 800);
          }}
        />
      )}
      <div className="relative w-full h-screen overflow-hidden bg-black text-white font-mono">
        {/* Background Image: Dragon */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url(${dragon.src})`, // ใช้รูปมังกรที่คุณ Generate มา
            filter: phase === 'judging' ? 'brightness(1.2) sepia(0.5)' : 'brightness(0.7)'
          }}
        />

        {/* Overlay Gradient เพื่อให้อ่าน Text ง่ายขึ้น */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black opacity-80" />

        {/* Main Content Area */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20">

          {/* Dialog Box */}
          {phase === 'intro' && (
            <DialogSequence
              dialogs={introDialogs}
              onComplete={() => setPhase('interaction')}
            />
          )}


          {/* User Interaction Button */}
          {phase === 'interaction' && (
            <div className="animate-fade-in-up flex flex-col gap-4 items-center">
              <button
                onClick={handleUserResponse}
                className="hover:cursor-pointer px-8 py-4 bg-red-900/80 hover:bg-red-700 border-2 border-yellow-600 text-yellow-100 text-xl font-bold rounded shadow-[0_0_15px_rgba(220,38,38,0.7)] transition-all transform hover:scale-105"
              >
                "ข้ามาที่นี่เพื่อทำให้ทุกอย่างกลับมาเป็นเหมือนเดิม"
              </button>

              <div className="mt-4">
                <button
                  onClick={() => setShowHint(true)}
                  className="hover:cursor-pointer text-xs text-gray-500 hover:text-gray-300 underline"
                >
                  Need Hint?
                </button>
              </div>
            </div>
          )}

          {phase === 'denied' && (
            <DialogSequence
              dialogs={deniedDialogs}
              onComplete={() => setPhase('interaction')}
            />
          )}

          {phase === 'judging' && (
            <DialogSequence
              dialogs={judgingDialogs}
              onComplete={() => setPhase('interaction')}
            />
          )}

          {phase === 'success' && (
            <DialogSequence
              dialogs={successDialogs}
              onComplete={onGameComplete}
              finishLabel="จัดการกอบกู้มทส.ให้กลับมาเหมือนเดิม"
            />
          )}
        </div>

        {/* Hint Modal */}
        {showHint && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-gray-900 border border-gray-600 p-6 rounded max-w-sm text-center">
              <h3 className="text-yellow-500 font-bold mb-4">คำใบ้จากเศษเสี้ยวรูน</h3>
              <p className="text-gray-300 mb-4">
                {hintLevel === 0 ? "ตอนนี้ ท่านมี Role เป็น 'tarnished' ท่านจึงไม่คู่ควรกับที่แห่งนี้" : "JWT"}
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setHintLevel(prev => (prev === 0 ? 1 : 0))}
                  className="hover:cursor-pointer px-3 py-1 bg-blue-900 text-xs rounded hover:bg-blue-700"
                >
                  {hintLevel === 0 ? "Next Hint" : "Prev Hint"}
                </button>
                <button
                  onClick={() => setShowHint(false)}
                  className="hover:cursor-pointer px-3 py-1 bg-red-900 text-xs rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* White Out Effect for Transition */}
        <div
          className={`absolute inset-0 z-[100] bg-white pointer-events-none transition-opacity duration-2000 ${isWhiteOut ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  );
}