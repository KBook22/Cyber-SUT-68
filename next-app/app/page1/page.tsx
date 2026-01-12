'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

// Shared Components
import TypingOverlay from '../page2/components/TypingOverlay';

// Import รูปภาพ
import Npc_1 from './picture/Npc_1.png';
import Number1 from './picture/Number1.jpg';
import Number3 from './picture/Number3.jpg';
import Number4 from './picture/Number4.jpg';
import Number5 from './picture/Number5.jpg';
import Number6 from './picture/Number6.jpg';
import Orb2 from './picture/Orb2.png';

interface Challenge {
  id: number;
  title: string;
  description: string;
  hints: { title: string; content: string }[];
  downloadFile?: string;
  flag: string;
  backgroundImage: string;
  npcDialogue: string[];
  preTask?: {
    question: string;
    answer: string;
    lockedContentTitle: string;
    lockedContent: string;
    lockedFile?: string;
  };
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "ด่านที่  1  :  ไม่ว่าจะเกิดอะไรขึ้น จงเดินหน้าต่อไป",
    description:
      "--  เลขท้ายของปีพุทธศักราชของวันที่มหาวิทยาลัยเทคโนโลยีสุรนารีให้ความสำคัญ",
    hints: [
      {
        title: "ข้อความเข้ารหัส",
        content: "cipher = EbiilPrOxKxobB_rKfsbopfQvDl_qlQbzekl",
      },
      {
        title: "Hint",
        content:
          "Caesar Cipher\n27 กรกฎาคม 253..\nต้องตอบในรูปแบบ FLAG{cipher}",
      },
    ],
    flag: "FLAG{HelloSuRaNareE_uNiversiTyGo_toTechno}",
    backgroundImage: Number1.src,
    npcDialogue: [
      "ในที่สุดก็มาถึง มหาวิทยาลัยเทคโนโลยีสุรนารี ได้สักที",
      "ปิดเทอมแบบนี้เงียบเหงาจังแฮะ",
      "ฉันดันต้องมาเอาของที่อาจารย์สั่ง",
      "แต่อาจารย์ดันไม่บอกสถานที่ที่ต้องไปไว้น่ะสิ",
      "เหมือนฉันต้องแก้ปริศนาเพื่อหาทางไปต่อแล้วล่ะ !",
    ],
  },
  {
    id: 2,
    title: "ด่านที่ 2: ตั๋วรถบัสปริศนา",
    description: "มหาลัยกว้างเกินกว่าจะเดินไหว คุณต้องหาตั๋วรถบัส",
    hints: [
      {
        title: "รหัสรับตั๋ว",
        content: "cipher = V3BuTnBPbkt6WGR2Z09keEZ6Tw==",
      },
      {
        title: "Hint",
        content:
          "Base64 + Caesar Cipher +5  (ไปข้างหน้า)\nต้องตอบในรูปแบบ FLAG{cipher}",
      },
    ],
    flag: "FLAG{BusSuTsPeCialTicKeT}",
    backgroundImage: Number3.src,
    npcDialogue: [
      "ฟู่ว มาถึงสักที",
      "อ๊ะ! นั่นมันรถบัส EV นี่นา",
      'แต่ดูเหมือนระบบจะล็อคอยู่ ต้องใช้ "ตั๋วรถบัส" ถึงจะขึ้นได้',
      "ช่วยฉันถอดรหัสเพื่อออกตั๋วรถบัสหน่อยสิ!",
    ],
  },
  {
    id: 3,
    title: "ด่านที่ 3: ภาพลับ AES",
    description:
      "เราสกัดกั้นไฟล์ภาพที่ถูกเข้ารหัสได้ ใช้คำใบ้เพื่อถอดรหัสและหา flag ที่ซ่อนอยู่ใน metadata ของภาพ",
    hints: [
      {
        title: "Hint 1: ข้อมูลพื้นฐาน",
        content: `key = lnwzaCyber

ไฟล์นี้ไม่สามารถเปิดเป็นรูปได้โดยตรง
แต่โครงสร้างของข้อมูลมีความสม่ำเสมอผิดปกติ

ลองดูขนาดของข้อมูลและรูปแบบการจัดเรียง
อาจมีบางส่วนของไฟล์ที่ไม่ได้ถูกซ่อนเอาไว้

กุญแจที่ใช้ไม่ได้เป็นค่าที่สุ่มขึ้นมา
แต่เกิดจากการแปลงข้อความเดิมให้อยู่ในรูปแบบอื่น

เมื่อได้ไฟล์ภาพแล้ว
ลองไปดู comments ที่ซ่อนไว้ในภาพ`,
      },
      {
        title: "Hint 2: รายละเอียดทางเทคนิค",
        content: `ไฟล์นี้ถูกเข้ารหัสด้วยอัลกอริทึม AES แบบ 256-bit
โดยใช้โหมด CBC

กุญแจถูกสร้างจากข้อความ
นำไปผ่านฟังก์ชัน SHA-256 เพื่อสร้าง key ขนาด 32 bytes

ค่า IV มีขนาด 16 bytes
และถูกเก็บไว้ที่ส่วนต้นของไฟล์เข้ารหัส

หลังจากถอดรหัสแล้วจะได้ไฟล์รูป PNG
อย่าลืมดูไฟล์ที่ถูกซ่อนอยู่ใน metadata ของรูปภาพ`,
      },
    ],
    downloadFile: "/challenges/flag.png.enc",
    flag: "FLAG{ThisIsThePlaceYouNeedToGoHurryUp67}",
    backgroundImage: Number4.src,
    npcDialogue: [
      "เยี่ยม! ได้ขึ้นรถสักที แอร์เย็นฉ่ำเลย~",
      'ทีนี้... ปัญหาคือ "ของ" ที่ต้องไปเอา มันอยู่ที่อาคารไหนนะ?',
      "อาจารย์ส่งไฟล์ภาพที่บันทึกพิกัดมาให้ แต่มันถูกเข้ารหัส AES ไว้ !",
      "ถ้าแก้รหัสนี้ได้ เราก็จะรู้อาคารเป้าหมาย !!",
    ],
  },
  {
    id: 4,
    title: "ด่านที่ 4: ยืนยันตัวตนหน้าประตู",
    description: "RSA + Base64",
    hints: [
      {
        title: "คำแนะนำ",
        content:
          "Key = 67 72 69 69 82 76 69 65 68 69 82 \n32 79 78 69 84 87 79 79 78 69 84 87 79 84 72 82 69 \n69 79 78 69 84 87 79 79 78 69 84 87 79 79 78 69",
      },
    ],
    // --- ส่วนที่เพิ่มใหม่สำหรับด่าน 4 ---
    preTask: {
      question: "ถอดรหัส ASCII ออกมาเป็น..",
      answer: "1212312121", // คำตอบคือ ADMIN
      lockedContentTitle: "CRITICAL DATA: Private Key",
      lockedContent: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDYcsUSuvnrgvGzw8UXfrZbqEAvj1amsEK8S8ey2SouwDE+gi+b
lUC5+e8uiMiarpiJmaSbhEtzUttC9xC6T9QK3zINHK5xdikReKrEeXZhtKIXINlH
tj3YI5qY/pOSg+bDmlIN4bYADe/AgiiYmxBf2aNICqzpvRPDulNjFB49bwIDAQAB
AoGBALp5HhmF5jwlArCZj5ovO1H5wNp4hfFzVvs72h7WAwZl48bzh6plSm8uyQXx
J8pDcvzQ1kR5FDuVfXrSuaGZlpX0vKirolUfVPxmmaRX2l1SN1PmeIG0M2rJWIIP
lXK+Jev1zXhH03hSnsvXjqYXmRwqdEsqXdfNxIIW0QSqWjShAkEA+2H/F4xsuWP5
Cb/N0ByJ2JWDDodz8WxPNzNmQ7SzeEjJ9IfZEGBCBH4oLjO0kSBYJ86C6oairx1U
C/eZ11jE3wJBANxsgt8jGBz13Y9QVS1c2TjBR6+6bscMeUXWQ4KglI1I7ty7cDjh
oeEz+XcI5G15T2dJ1CTiEf050XZLOtnsiXECQHOg2tY5GFWaH5YVbJTaW6mM9BB9
y53z5OgOM27XMmoUiRh6WCTJMfShFthRni/XAdWljuBTd4c25U7v4AqG4V8CQQC5
q53Bn6ocGu56Xcyh3WgMaqKb34qYmGU+8nEDg4geSqUJwcmR4F2feUxVfGQN4vWD
p6jPOK62gxFxd4UnNBvBAkBYRd4bDkZcnVqmDXhnUn9f8LdUzFNfyM6U3yePA77X
tsLBoD17446C+W89gAip89MZlAJdPEXhBqKCThLuZJiw
-----END RSA PRIVATE KEY-----`,
      lockedFile: "/challenges/cipher.bin", // ไฟล์ที่จะปรากฏเมื่อตอบถูก
    },
    // --------------------------------
    flag: "UNAME{DyNaMiTE007}",
    backgroundImage: Number5.src,
    npcDialogue: [
      "ถึงแล้วอาคาร F11 ที่เรารัก",
      "อ..เอ๊ะ... ประตูล็อคระบบนิรภัย",
      "มันบอกว่าต้องยืนยันตัวตนด้วยการแก้รหัส",
      "นี่มันระบบรักษาความปลอดภัยหรือข้อสอบเนี่ย...",
      "สิ่งศักดิ์สิทธิ์ สิ่งศักดิ์สิทธิ์ สิ่งศักดิ์สิทธิ์ !!!!",
    ],
  },
  {
    id: 5,
    title: "ด่านที่ 5: ทำลาย RSA",
    description:
      "ทำลายการเข้ารหัส RSA นี้! modulus มีขนาดเล็กพอที่จะแยกตัวประกอบได้",
    hints: [
      {
        title: "พารามิเตอร์ RSA",
        content: `n = 3233\ne = 17\nciphertext = [604, 624, 2412, 690, 3000, 529, 2412, 1773, 538]`,
      },
      {
        title: "Hint",
        content: `แยกตัวประกอบ n ได้
p และ q เป็นจำนวนเฉพาะที่เล็กพอจะหาได้

คำนวณ φ(n) = (p-1)(q-1)
หา private key d จาก: d ≡ e^(-1) mod φ(n)
จากนั้นถอดรหัส: m = c^d mod n

แปลงตัวเลขที่ได้เป็น ASCII characters`,
      },
    ],
    flag: "PASS{W0rkH4rd2}",
    backgroundImage: Number6.src,
    npcDialogue: [
      "เอ๊ะ ยังต้องกรอก Password อีกหรอเนี่ย !!",
      "ดูเหมือนจะเป็นระบบ RSA แต่ตัวเลขดูไม่เยอะมาก",
      "ไหวชิล เราทำได้!",
    ],
  },
  {
    id: 6,
    title: "ด่านสุดท้าย: ของเล่นต้องห้าม?",
    description:
      'ด้วยความซนและมือบอล คุณเจอวัตถุหน้าตาเหมือนรูบิคผสมลูกแก้ว เลยลอง "หมุนย้อนกลับ" ดูเล่นๆ...',
    hints: [
      {
        title: "Action",
        content: 'คุณลอง "หมุนกลับหลัง" (Reverse) วัตถุชิ้นนั้น...',
      },
      {
        title: "Hologram Message",
        content:
          "ข้อความที่ลอยออกมา:\n}niraP.TsInioctiBfOretropmIdnAraiLaeRehT{GALF",
      },
    ],
    flag: "FLAG{TheRealLiarAndImporterOfBitcoinIsT.Parin}",
    backgroundImage: Orb2.src,
    npcDialogue: [
      "เย้! เข้ามาได้แล้ววว",
      "เอ๊ะ! ไอ้ลูกกลมๆ สีม่วงตรงมุมห้องนั่นมันอะไรน่ะ?",
      "ดูมีวงแหวนหมุนได้เหมือนของเล่นเลยแฮะ... สวยจัง",
      'ไหนขอลอง "บิด" เล่นดูหน่อยซิ... กริ๊ก!',
      "เฮ้ย! มีข้อความโฮโลแกรมเด้งออกมาแฮะ แต่ทำไมมันอ่านไม่รู้เรื่องเลย",
      "niraP... GALF? ...",
    ],
  },
];

const crashDialogs = [
  "FATAL ERROR: Decryption Successful...",
  "Warning: The Forbidden Knowledge has been accessed.",
  "Integrity breach detected... Reality buffer overflow...",
  "NO! You fool! You've broken the seal!",
  "System Critical... Segmentation Fault... Dimensions Shattered."
];

export default function Page1() {
  const router = useRouter();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(5);
  const [expandedHints, setExpandedHints] = useState<{ [key: number]: boolean }>({});
  const [flagInput, setFlagInput] = useState('');
  const [submission, setSubmission] = useState<'success' | 'error' | null>(null);
  
  // เก็บ ID ด่านที่ผ่านแล้ว
  const [solvedChallenges, setSolvedChallenges] = useState<Set<number>>(new Set());

  // States
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);
  
  // Explosion States (0=None, 1=Alarm, 2=Glitch/Shake, 3=Critical, 4=Whiteout, 5=Blackout)
  const [explosionStage, setExplosionStage] = useState(0);

  // Pre-Task States
  const [preTaskInput, setPreTaskInput] = useState('');
  const [isPreTaskSolved, setIsPreTaskSolved] = useState(false);
  const [preTaskStatus, setPreTaskStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const currentChallenge = challenges[currentChallengeIndex];

  // Handlers
  const toggleHint = (hintIndex: number) => {
    setExpandedHints(prev => ({ ...prev, [hintIndex]: !prev[hintIndex] }));
  };

  const changeLevel = (newIndex: number) => {
    setCurrentChallengeIndex(newIndex);
    setFlagInput('');
    setSubmission(null);
    setExpandedHints({});
    setDialogueIndex(0);
    setShowDialogue(true);
    // Reset Pre-task
    setPreTaskInput('');
    setIsPreTaskSolved(false);
    setPreTaskStatus('idle');
  };

  const handlePreTaskSubmit = () => {
    if (currentChallenge.preTask && preTaskInput.trim() === currentChallenge.preTask.answer) {
      setPreTaskStatus('success');
      setTimeout(() => setIsPreTaskSolved(true), 1000);
    } else {
      setPreTaskStatus('error');
      setTimeout(() => setPreTaskStatus('idle'), 1500);
    }
  };

  // ลำดับการระเบิด (Cinematic Sequence)
  const runExplosionSequence = () => {
    // Stage 1: Alarm (Red Pulse) - 0s
    setExplosionStage(1);

    // Stage 2: Glitch & Shake - 2s
    setTimeout(() => setExplosionStage(2), 2000);

    // Stage 3: Critical (Color Invert + Heavy Shake) - 5s
    setTimeout(() => setExplosionStage(3), 5000);

    // Stage 4: Whiteout - 7s
    setTimeout(() => setExplosionStage(4), 7000);

    // Stage 5: Blackout - 8.5s
    setTimeout(() => setExplosionStage(5), 8500);
  };

  const handleSubmit = () => {
    const input = flagInput.trim();
    if (input === currentChallenge.flag) {
      setSubmission('success');
      setSolvedChallenges(prev => new Set(prev).add(currentChallenge.id));

      if (currentChallenge.id === 6) {
        // --- ด่านสุดท้าย: เริ่มระเบิด ---
        setTimeout(() => {
          runExplosionSequence();
        }, 1000);
      } else {
        // --- ด่านทั่วไป: ไปต่ออัตโนมัติ (Auto Advance) ---
        setTimeout(() => {
          changeLevel(currentChallengeIndex + 1);
        }, 1500); // รอ 1.5 วินาทีให้เห็นคำว่า ACCESS GRANTED
      }
    } else {
      setSubmission('error');
      setTimeout(() => setSubmission(null), 2000);
    }
  };

  const nextDialogue = () => {
    if (dialogueIndex < currentChallenge.npcDialogue.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setShowDialogue(false);
    }
  };

  return (
    <div className={`app-container 
      ${explosionStage === 1 ? 'stage-alarm' : ''} 
      ${explosionStage === 2 ? 'stage-glitch' : ''}
      ${explosionStage === 3 ? 'stage-critical' : ''}
    `}>

      {/* Background */}
      <div
        className="bg-layer"
        style={{ backgroundImage: `url(${currentChallenge.backgroundImage})` }}
      />
      <div className="bg-overlay" />

      {/* Special Overlays for Effects */}
      {explosionStage >= 1 && <div className="alarm-overlay"></div>}
      {explosionStage === 4 && <div className="whiteout-overlay"></div>}

      {/* Black Screen Ending with Crash Text */}
      {explosionStage === 5 && (
        <TypingOverlay 
          texts={crashDialogs}
          onComplete={() => router.push('/page2')}
        />
      )}

      {/* Main Layout (ซ่อนเมื่อจบเกม) */}
      {explosionStage !== 5 && (
        <>
          {/* Top Bar / Navigation */}
          <div className="top-nav">
            <div className="level-indicators">
              {challenges.map((c, i) => (
                <div
                  key={c.id}
                  className={`level-dot ${i === currentChallengeIndex ? 'active' : ''} ${solvedChallenges.has(c.id) ? 'solved' : ''}`}
                  // เอา onClick ออกทั้งหมด เพื่อห้ามย้อนหลังหรือกดข้าม
                  style={{ cursor: 'default' }} 
                />
              ))}
            </div>
          </div>

          {/* Dialogue */}
          {showDialogue ? (
            <div className="novel-overlay" onClick={nextDialogue}>
              <div className="character-sprite">
                <img src={Npc_1.src} alt="NPC" />
              </div>
              <div className="dialogue-box">
                <div className="dialogue-name">Someone</div>
                <p className="typing-text">{currentChallenge.npcDialogue[dialogueIndex]}</p>
                <div className="dialogue-next">
                  {dialogueIndex < currentChallenge.npcDialogue.length - 1 ? '▼' : 'START MISSION ►'}
                </div>
              </div>
            </div>
          ) : (
            /* Console */
            <div className="console-wrapper">
              <div className="console-card">
                <div className="console-header"></div>
                <div className="console-body">
                  <div className="mission-tag">STORY_MISSION_0{currentChallenge.id}</div>
                  <h1 className="mission-title">{currentChallenge.title}</h1>
                  <p className="mission-desc">{currentChallenge.description}</p>

                  {/* Hints */}
                  <div className="hints-container">
                    {currentChallenge.hints.map((hint, i) => (
                      <div key={i} className="hint-block">
                        <button
                          className={`hint-btn ${expandedHints[i] ? 'open' : ''}`}
                          onClick={() => toggleHint(i)}
                        >
                          <span className="icon">💡</span>
                          {expandedHints[i] ? hint.title : `HINT ${i + 1}`}
                          <span className="arrow">▼</span>
                        </button>
                        {expandedHints[i] && (
                          <div className="hint-content"><pre>{hint.content}</pre></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Pre-Task (ด่าน 4) */}
                  {currentChallenge.preTask && (
                    <div className="pre-task-section" style={{ marginTop: '20px', border: '1px solid #4ade80', padding: '15px', borderRadius: '8px', background: 'rgba(0, 20, 0, 0.6)' }}>
                      {!isPreTaskSolved ? (
                        <div className="locked-state">
                          <h3 style={{ color: '#4ade80', fontSize: '1rem', marginBottom: '10px' }}>🔒 RESTRICTED AREA</h3>
                          <p style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#ccc' }}>{currentChallenge.preTask.question}</p>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                              type="text"
                              value={preTaskInput}
                              onChange={(e) => setPreTaskInput(e.target.value.toUpperCase())}
                              placeholder="TYPE ANSWER..."
                              style={{ flex: 1, background: '#111', border: '1px solid #333', color: '#fff', padding: '8px' }}
                            />
                            <button
                              onClick={handlePreTaskSubmit}
                              style={{ background: preTaskStatus === 'error' ? '#ef4444' : '#22c55e', border: 'none', color: '#000', fontWeight: 'bold', padding: '0 15px', cursor: 'pointer' }}
                            >
                              {preTaskStatus === 'error' ? 'WRONG' : 'UNLOCK'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="unlocked-state">
                          <h3 style={{ color: '#22c55e', fontSize: '1rem', marginBottom: '10px' }}>🔓 ACCESS GRANTED</h3>
                          <div style={{ background: '#000', padding: '10px', marginBottom: '10px', fontSize: '0.85rem' }}>
                            <div style={{ color: '#aaa', marginBottom: '5px' }}>{currentChallenge.preTask.lockedContentTitle}:</div>
                            <pre style={{ color: '#fff', whiteSpace: 'pre-wrap' }}>{currentChallenge.preTask.lockedContent}</pre>
                          </div>
                          {currentChallenge.preTask.lockedFile && (
                            <a href={currentChallenge.preTask.lockedFile} download className="download-link" style={{ display: 'inline-block', width: '100%' }}>
                              💾 Download: cipher.bin
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Download */}
                  {currentChallenge.downloadFile && (
                    <a href={currentChallenge.downloadFile} download className="download-link">
                      📂 Download Evidence File
                    </a>
                  )}

                  {/* Input */}
                  <div className="input-section" style={{ marginTop: '30px' }}>
                    <label>ENTER FINAL FLAG</label>
                    <div className="input-row">
                      <input
                        type="text"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        disabled={submission === 'success'}
                      />
                      <button className="confirm-btn" onClick={handleSubmit} disabled={submission === 'success'}>
                        CONFIRM &gt;
                      </button>
                    </div>
                    {submission === 'success' && <div className="status-msg success">ACCESS GRANTED... PROCEEDING</div>}
                    {submission === 'error' && <div className="status-msg error">ACCESS DENIED</div>}
                  </div>
                </div>
                <div className="console-footer"></div>
              </div>

              {/* เอาปุ่มลูกศรออก (Remove Navigation Arrows) */}
            </div>
          )}
        </>
      )}
    </div>
  );
}