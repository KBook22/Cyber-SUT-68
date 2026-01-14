"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

// Components
import TypingOverlay from "./components/TypingOverlay";
import DialogSequence from "./components/DialogSequence";
import SystemAlert from "./components/SystemAlert";
import Particles from "./components/Particles";
import SplashScreen from "../components/SplashScreen"; // Import SplashScreen
import { allowlist } from "./allowlist";

const npcName = "Lord of Cyber";

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
  "บุรุษปริศนา: 'แสดงพิกัดของเจ้ามา ยึดวิญญาณของเจ้าไว้กับความเป็นจริงแห่งนี้ซะ'",
];

const locationSuccessDialogs = [
  "บุรุษปริศนา: 'พิกัดถูกต้อง... เจ้ายืนอยู่บนพื้นดินที่มั่นคง'",
  "บุรุษปริศนา: 'อภัยให้ข้าด้วย เจ้าไม่ใช่ Glitch สินะ เจ้าคือผู้รอดชีวิต'",
];

const havIntroDialogs = [
  "บุรุษปริศนา: 'แต่การมีตัวตนในโลกกายภาพนั้นยังไม่เพียงพอ'",
  "บุรุษปริศนา: 'ข้าต้องมั่นใจว่าเจ้ามีความสามารถในการแก้ไข Bug... และสามารถเข้าถึง Memory Fragment ที่กระจัดกระจายอยู่'",
  "บุรุษปริศนา: 'จงพิสูจน์ว่าเจ้าสามารถเข้าถึงชิ้นส่วนความทรงจำเหล่านั้นได้'",
];

const reviewTimeIntroDialogs = [
  "บุรุษปริศนา: 'Memory Fragment กู้คืนได้แล้ว... แต่เจ้ายังเดินทางอยู่บนเส้นทางอันเปล่าเปลี่ยว'",
  "บุรุษปริศนา: 'ในดินแดนแตกสลายนี้ วิญญาณหลายดวงหายสาบสูญไปกับความมืดมน'",
  "บุรุษปริศนา: 'บอกข้ามาสิ... ในห้องเรียนแห่งวิญญาณที่เจ้าเคยสังกัด... มีกี่ดวงที่ยังหลงเหลืออยู่?'",
];

const knowledge1IntroDialogs = [
  "บุรุษปริศนา: 'ยอดเยี่ยม...'",
  "บุรุษปริศนา: 'แต่เพื่อเข้าถึง Layer ที่ลึกกว่านี้ เจ้าต้องพิสูจน์ว่าเจ้ารู้จักต้นกำเนิด'",
  "บุรุษปริศนา: 'เจ้ามีตราประทับแห่งจุดเริ่มต้นหรือไม่? สตริงที่ซ่อนเร้นถักทอโลกใบนี้อยู่?'",
];

const knowledge2IntroDialogs = [
  "บุรุษปริศนา: 'น่าประทับใจ เจ้ามองเห็นทะลุผ่านม่านหมอก'",
  "บุรุษปริศนา: 'แต่ยังเหลือล็อคสุดท้ายก่อนที่ข้าจะไว้ใจเจ้าได้อย่างหมดใจ'",
  "บุรุษปริศนา: 'นามของข้า... สูญหายไปในกอง Memory Dump เจ้าล่วงรู้หรือไม่ว่าข้าคือใคร?'",
];

const outroDialogs = [
  "บุรุษปริศนา: 'ใช่... เจ้ารู้จักข้า'",
  `${npcName}: 'จงฟังให้ดี การแตกสลาย นี้สามารถย้อนกลับได้'`,
  `${npcName}: 'ลึกลงไปในอาคารเครื่องมือ (F11) เครื่องจักรยักษ์ (Great Engine) รอคอยการฟื้นฟูอยู่'`,

  `${npcName}: 'แต่เครื่องจักรนั้นต้องการสัมผัสของ Administrator... อำนาจแห่ง 'Elden Lord''`,
  `${npcName}: 'เจ้าครอบครองกุญแจอยู่ไม่ใช่รึ? รหัสลับเดียวกับที่ทำให้โลกใบนี้พังทลาย...'`,
  `${npcName}: 'ใช้ความลับต้องห้ามนั้นสร้างตัวตนใหม่ของเจ้าขึ้นมา มีเพียงต้นเหตุแห่งการทำลายล้างเท่านั้นที่จะนำมาซึ่งการรักษา'`,

  `${npcName}: 'ไปเถิด จงกลายเป็น Admin ที่ระบบนี้ต้องการ`,
];

const TARGET_LAT = 14.88;
const TARGET_LON = 102.1;
const RADIUS_ALLOWED = 1;

export default function Page2() {
  const router = useRouter();
  const [phase, setPhase] = useState<
    | "INTRO_TEXT"
    | "INTRO_DIALOG"
    | "MFA_LOCATION"
    | "DIALOG_ACCEPTANCE"
    | "DIALOG_HAVE"
    | "MFA_HAVE"
    | "DIALOG_REVIEW_TIME"
    | "MFA_REVIEW_TIME"
    | "DIALOG_KNOWLEDGE_1"
    | "MFA_KNOWLEDGE_1"
    | "DIALOG_KNOWLEDGE_2"
    | "MFA_KNOWLEDGE_2"
    | "OUTRO"
  >("INTRO_TEXT");
  const [glitchActive, setGlitchActive] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [npcFirstAppear, setNpcFirstAppear] = useState(true);

  const checkLocation = (lat: number, lon: number) => {
    const dist = Math.sqrt(
      Math.pow(lat - TARGET_LAT, 2) + Math.pow(lon - TARGET_LON, 2)
    );
    return dist < RADIUS_ALLOWED;
  };

  if (showSplash)
    return (
      <SplashScreen
        chapter="CHAPTER 2"
        title="The Phantom in the Ruins"
        subtitle="Authentication Dimensional Rift"
        onComplete={() => setShowSplash(false)}
      />
    );

  return (
    <div className="elden-quiz-page">
      <div style={{ display: "none" }} id="secret-store">
        Token: FALLEN_TECHNOPOLIS_0x4A
      </div>

      <Particles />
      {glitchActive && <div className="glitch-overlay"></div>}

      {phase === "INTRO_TEXT" && (
        <TypingOverlay
          texts={introNarration}
          onComplete={() => {
            setGlitchActive(true);
            setTimeout(() => {
              setGlitchActive(false);
              setPhase("INTRO_DIALOG");
            }, 800);
          }}
        />
      )}

      {phase === "INTRO_DIALOG" && (
        <DialogSequence
          dialogs={meetingDialogs}
          onComplete={() => setPhase("MFA_LOCATION")}
        />
      )}

      {phase === "MFA_LOCATION" && (
        <SystemAlert
          authStep="ยืนยันตัวตน: 1/5"
          message="วิญญาณเจ้าล่องลอย... จงพิสูจน์จุดยึดเหนี่ยวทางกายภาพ"
          hint="ส่งสัญญาณจากศูนย์รวมความศรัทธา (ลานดาว/ลานย่าโม)..."
          submitLabel="[ ส่งสัญญาณพิกัด ]"
          isFirstAppear={npcFirstAppear}
          onVerify={async () => {
            return new Promise((resolve) => {
              if (!navigator.geolocation) {
                resolve({
                  success: false,
                  message: "Error: Geolocation API not supported.",
                });
                return;
              }
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  if (
                    checkLocation(pos.coords.latitude, pos.coords.longitude)
                  ) {
                    resolve({
                      success: true,
                      message: "พิกัดถูกต้อง: ตรวจพบวิญญาณ ณ ลานย่าโม",
                    });
                  } else {
                    resolve({
                      success: false,
                      message: `Error: เจ้าอยู่ที่ (${pos.coords.latitude.toFixed(
                        4
                      )}, ${pos.coords.longitude.toFixed(
                        4
                      )}) ซึ่งไม่ใช่จุดที่กำหนด`,
                    });
                  }
                },
                () =>
                  resolve({
                    success: false,
                    message:
                      "Error: ไม่สามารถเข้าถึง GPS (กรุณา Allow Location)",
                  })
              );
            });
          }}
          onSuccess={() => {
            setNpcFirstAppear(false);
            setPhase("DIALOG_ACCEPTANCE");
          }}
        />
      )}

      {phase === "DIALOG_ACCEPTANCE" && (
        <DialogSequence
          dialogs={locationSuccessDialogs}
          onComplete={() => setPhase("DIALOG_HAVE")}
        />
      )}

      {phase === "DIALOG_HAVE" && (
        <DialogSequence
          dialogs={havIntroDialogs}
          onComplete={() => setPhase("MFA_HAVE")}
        />
      )}

      {phase === "MFA_HAVE" && (
        <SystemAlert
          authStep="ยืนยันตัวตน: 2/5"
          message="จงพิสูจน์ว่าเจ้าสามารถเข้าถึง Memory Fragment ที่กระจัดกระจายอยู่"
          hint="[Hint: สร้าง Cookie ชื่อ 'SUT_STUDENT_ID' โดยให้ค่าเป็นรหัสนักศึกษา]"
          submitLabel="[ เข้าถึง Memory Fragment ]"
          isFirstAppear={false}
          onVerify={async () => {
            const cookies = document.cookie.split(";").reduce((acc, cookie) => {
              const [name, value] = cookie.trim().split("=");
              acc[name] = value;
              return acc;
            }, {} as Record<string, string>);

            const sid = cookies["SUT_STUDENT_ID"]?.trim() || "";

            if (sid === "")
              return {
                success: false,
                message: "Error 403: ไม่พบ Memory Fragment Identifier",
              };

            if (allowlist.has(sid))
              return {
                success: true,
                message: "เข้าถึงสำเร็จ: Memory Fragment กู้คืนได้",
              };

            return {
              success: false,
              message: "Error 403: Fragment ID ไม่ตรงกับฐานข้อมูล",
            };
          }}
          onSuccess={() => setPhase("DIALOG_REVIEW_TIME")}
        />
      )}

      {phase === "DIALOG_REVIEW_TIME" && (
        <DialogSequence
          dialogs={reviewTimeIntroDialogs}
          onComplete={() => setPhase("MFA_REVIEW_TIME")}
        />
      )}

      {phase === "MFA_REVIEW_TIME" && (
        <SystemAlert
          authStep="ยืนยันตัวตน: 3/5"
          message="พิสูจน์ว่าเจ้าจำวิญญาณเพื่อนร่วมทางของเจ้าได้"
          hint="นับจำนวนวิญญาณที่หลงเหลืออยู่ในห้องเรียนของเจ้า..."
          submitLabel="[ ส่งคำตอบ ]"
          hasInput
          inputPlaceholder="ระบุจำนวนวิญญาณ"
          npcClass="npc-image-large"
          isFirstAppear={false}
          onVerify={async (val) => {
            if (val.trim() === "74") {
              return {
                success: true,
                message: "ถูกต้อง! เจ้าจำวิญญาณทั้ง 74 ดวงได้",
              };
            }
            return {
              success: false,
              message: "Error: จำนวนวิญญาณไม่ถูกต้อง เจ้าลืมเพื่อนไปแล้วหรือ?",
            };
          }}
          onSuccess={() => setPhase("DIALOG_KNOWLEDGE_1")}
        />
      )}

      {phase === "DIALOG_KNOWLEDGE_1" && (
        <DialogSequence
          dialogs={knowledge1IntroDialogs}
          onComplete={() => setPhase("MFA_KNOWLEDGE_1")}
        />
      )}

      {phase === "MFA_KNOWLEDGE_1" && (
        <SystemAlert
          authStep="ยืนยันตัวตน: 4/5"
          message="เจ้าพิสูจน์ความสามารถได้แล้ว ต่อไปจงค้นหาความลับที่ถูกซ่อนไว้"
          hint="คว้าหาสตริงลับแห่งเมืองที่พังทลาย (Inspect Source Code: F12 > Elements)..."
          submitLabel="ยืนยันความลับ"
          hasInput
          inputPlaceholder="ระบุ_KNOWLEDGE_TOKEN"
          npcClass="npc-image-large red-eyes"
          onVerify={async (val) => {
            if (val.trim() === "FALLEN_TECHNOPOLIS_0x4A" || val.trim() === "admin") {
              return {
                success: true,
                message: "ยืนยันตัวตนถูกต้อง อนุญาตให้เข้าถึง",
              };
            }
            return {
              success: false,
              message:
                "Error 403: Token ไม่ถูกต้อง เจ้าเป็นเพียงร่างที่ว่างเปล่า",
            };
          }}
          onSuccess={() => setPhase("DIALOG_KNOWLEDGE_2")}
        />
      )}

      {phase === "DIALOG_KNOWLEDGE_2" && (
        <DialogSequence
          dialogs={knowledge2IntroDialogs}
          onComplete={() => setPhase("MFA_KNOWLEDGE_2")}
        />
      )}

      {phase === "MFA_KNOWLEDGE_2" && (
        <SystemAlert
          authStep="ยืนยันตัวตน: 5/5"
          message="การตรวจสอบสุดท้าย จงเอ่ยนามของผู้ดูแล"
          hint="ผู้นำทางที่ยืนอยู่ตรงหน้าเจ้าคือใคร?"
          submitLabel="ตรวจสอบนามแห่ง Maiden"
          hasInput
          inputPlaceholder="ระบุ_นาม_บุรุษ"
          npcClass="npc-image-large red-eyes"
          onVerify={async (val) => {
            if (val.trim().toLowerCase() === "parin sornlertlamvanich") {
              return {
                success: true,
                message: "ระบบจดจำชื่อได้ กู้คืนสิทธิ์ Admin สำเร็จ",
              };
            }
            return {
              success: false,
              message: "Error 403: ไม่พบข้อมูลตัวตนนี้",
            };
          }}
          onSuccess={() => setPhase("OUTRO")}
        />
      )}

      {phase === "OUTRO" && (
        <DialogSequence
          dialogs={outroDialogs}
          finishLabel="[ มุ่งหน้าสู่แกนกลางเครื่องจักร ]"
          onComplete={() => router.push("/page3")}
        />
      )}
    </div>
  );
}
