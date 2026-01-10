'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

interface Challenge {
  id: number;
  title: string;
  description: string;
  hints: { title: string; content: string }[];
  downloadFile?: string;
  flag: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'ด่านที่ 1: รหัสซีซาร์โบราณ',
    description: 'ชาวโรมันโบราณใช้รหัสลับง่ายๆ ในการส่งข่าวสาร คุณถอดรหัสข้อความนี้ได้ไหม?',
    hints: [
      { title: 'ข้อความเข้ารหัส', content: 'IODJ{Fdhvdu_Flskhu_Pdvwhu}' },
      { title: 'Hint 1', content: 'ลองเลื่อนตัวอักษรแต่ละตัวด้วยจำนวนคงที่' },
      { title: 'Hint 2', content: 'ค่า shift น้อยกว่า 5' }
    ],
    flag: 'FLAG{Caesar_Cipher_Master}'
  },
  {
    id: 2,
    title: 'ด่านที่ 2: ห้องสมุด',
    description: 'ความลับแห่งห้องสมุดถูกเข้ารหัสไว้ คุณจะช่วยถอดรหัสได้ไหม?',
    hints: [
      { title: 'ข้อความเข้ารหัส', content: 'RkxBR3tCYXNlNjRfSXNfTm90X0VuY3J5cHRpb259' },
      { title: 'Hint', content: 'นี่คือระบบการเข้ารหัสทั่วไปที่ใช้ในการส่งข้อมูล ไม่ใช่การเข้ารหัสจริงๆ' }
    ],
    flag: 'FLAG{Base64_Is_Not_Encryption}'
  },
  {
    id: 3,
    title: 'ด่านที่ 3: ภาพลับ AES',
    description: 'เราสกัดกั้นไฟล์ภาพที่ถูกเข้ารหัสได้ ใช้คำใบ้เพื่อถอดรหัสและหา flag ที่ซ่อนอยู่ใน metadata ของภาพ',
    hints: [
      {
        title: 'Hint 1: ข้อมูลพื้นฐาน',
        content: `key = lnwzaCyber

ไฟล์นี้ไม่สามารถเปิดเป็นรูปได้โดยตรง
แต่โครงสร้างของข้อมูลมีความสม่ำเสมอผิดปกติ

ลองดูขนาดของข้อมูลและรูปแบบการจัดเรียง
อาจมีบางส่วนของไฟล์ที่ไม่ได้ถูกซ่อนเอาไว้

กุญแจที่ใช้ไม่ได้เป็นค่าที่สุ่มขึ้นมา
แต่เกิดจากการแปลงข้อความเดิมให้อยู่ในรูปแบบอื่น

เมื่อได้ไฟล์ภาพแล้ว
ลองไปดู comments ที่ซ่อนไว้ในภาพ`
      },
      {
        title: 'Hint 2: รายละเอียดทางเทคนิค',
        content: `ไฟล์นี้ถูกเข้ารหัสด้วยอัลกอริทึม AES แบบ 256-bit
โดยใช้โหมด CBC

กุญแจถูกสร้างจากข้อความ
นำไปผ่านฟังก์ชัน SHA-256 เพื่อสร้าง key ขนาด 32 bytes

ค่า IV มีขนาด 16 bytes
และถูกเก็บไว้ที่ส่วนต้นของไฟล์เข้ารหัส

หลังจากถอดรหัสแล้วจะได้ไฟล์รูป PNG
อย่าลืมดูไฟล์ที่ถูกซ่อนอยู่ใน metadata ของรูปภาพ`
      }
    ],
    downloadFile: '/challenges/flag.png.enc',
    flag: 'FLAG{ThisIsThePlaceYouNeedToGoHurryUp67}'
  },
  {
    id: 4,
    title: 'ด่านที่ 4: ปริศนา XOR',
    description: 'ข้อความถูกเข้ารหัสด้วย XOR cipher คุณหาคีย์และถอดรหัสได้ไหม?',
    hints: [
      { title: 'Encrypted Hex', content: '1c0a1e5a0b1e1a5a1c1b1e5a0a1d' },
      { title: 'Hint', content: 'คีย์เป็นตัวอักษรตัวเดียว ลองตัวอักษรทั่วไป เช่น space, ตัวอักษร หรือตัวเลข' }
    ],
    flag: 'FLAG{XOR_Key_Found}'
  },
  {
    id: 5,
    title: 'ด่านที่ 5: ทำลาย RSA',
    description: 'ทำลายการเข้ารหัส RSA นี้! modulus มีขนาดเล็กพอที่จะแยกตัวประกอบได้',
    hints: [
      {
        title: 'พารามิเตอร์ RSA',
        content: `n = 3233
e = 17
ciphertext = [604, 624, 2412, 690, 3000, 529, 2412, 1773, 538]`
      },
      {
        title: 'Hint',
        content: `แยกตัวประกอบ n ได้
p และ q เป็นจำนวนเฉพาะที่เล็กพอจะหาได้

คำนวณ φ(n) = (p-1)(q-1)
หา private key d จาก: d ≡ e^(-1) mod φ(n)
จากนั้นถอดรหัส: m = c^d mod n

แปลงตัวเลขที่ได้เป็น ASCII characters`
      }
    ],
    flag: 'PASS{W0rkH4rd2}'
  },
  {
    id: 6,
    title: '⚠️ ด่านสุดท้าย: ประตูมิติมืด',
    description: '🔴 คำเตือน: คุณกำลังจะเข้าสู่อาณาจักรอันตราย นี่คือโอกาสสุดท้ายที่จะหันกลับ รหัสลับข้างหน้าเป็นผู้พิทักษ์ประตูระหว่างสองโลก เฉพาะผู้ที่สามารถถอดรหัส Vigenère ได้เท่านั้นที่จะผ่านไปได้...',
    hints: [
      {
        title: '⚠️ สัญญาณอันตราย',
        content: 'เบื้องหลังด่านนี้คืออาณาจักรแห่งความมืดและความลึกลับ ดำเนินต่อด้วยความระมัดระวัง\n\nประตูถูกปิดผนึกด้วยรหัสโบราณ...'
      },
      { title: 'ข้อความเข้ารหัส', content: 'JPCG{Omiirevm_Gmtliv_Xssp}' },
      { title: 'Hint 1', content: 'ความยาวของคีย์เวิร์ดคือ 4 ตัวอักษร' },
      { title: 'Hint 2', content: 'คีย์เวิร์ดอาจเกี่ยวข้องกับความปลอดภัยหรือการเข้ารหัส' }
    ],
    flag: 'FLAG{Vigenere_Cipher_Done}'
  }
];

export default function Page1() {
  const router = useRouter();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [expandedHints, setExpandedHints] = useState<{ [key: number]: boolean }>({});
  const [flagInput, setFlagInput] = useState('');
  const [submission, setSubmission] = useState<'success' | 'error' | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<Set<number>>(new Set());

  const currentChallenge = challenges[currentChallengeIndex];
  const isDangerTheme = currentChallenge.id === 6;

  const toggleHint = (hintIndex: number) => {
    setExpandedHints(prev => ({ ...prev, [hintIndex]: !prev[hintIndex] }));
  };

  const handleSubmit = () => {
    const input = flagInput.trim();
    if (input === currentChallenge.flag) {
      setSubmission('success');
      setSolvedChallenges(prev => new Set(prev).add(currentChallenge.id));
      setTimeout(() => {
        setSubmission(null);
      }, 3000);
    } else {
      setSubmission('error');
      setTimeout(() => {
        setSubmission(null);
      }, 2000);
    }
  };

  const goToNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setFlagInput('');
      setSubmission(null);
      setExpandedHints({});
    }
  };

  const goToPrevChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(prev => prev - 1);
      setFlagInput('');
      setSubmission(null);
      setExpandedHints({});
    }
  };

  const goToChallenge = (index: number) => {
    setCurrentChallengeIndex(index);
    setFlagInput('');
    setSubmission(null);
    setExpandedHints({});
  };

  return (
    <div className={`ctf-container-new ${isDangerTheme ? 'danger-theme' : ''}`}>
      {/* Challenge Navigation Dots */}
      <div className="challenge-nav-dots">
        {challenges.map((challenge, index) => (
          <button
            key={challenge.id}
            className={`nav-dot ${index === currentChallengeIndex ? 'active' : ''} ${solvedChallenges.has(challenge.id) ? 'solved' : ''}`}
            onClick={() => goToChallenge(index)}
            title={challenge.title}
          >
            {challenge.id}
          </button>
        ))}
      </div>

      {/* Main Challenge Card */}
      <div className="challenge-view-card">
        {/* Challenge Icon */}
        <div className="challenge-icon">
          {isDangerTheme ? '⚠️' : '👁️'}
        </div>

        {/* Challenge Title */}
        <h2 className="challenge-view-title">{currentChallenge.title}</h2>
        <p className="challenge-view-description">{currentChallenge.description}</p>

        {/* Hints Section */}
        <div className="hints-section-new">
          {currentChallenge.hints.map((hint, index) => (
            <div key={index} className="hint-item-new">
              <button
                className="hint-header-new"
                onClick={() => toggleHint(index)}
              >
                <span>💡 {hint.title}</span>
                <span className="hint-arrow">{expandedHints[index] ? '▼' : '▶'}</span>
              </button>
              {expandedHints[index] && (
                <div className="hint-content-new">
                  <pre>{hint.content}</pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download Button for Challenge 3 */}
        {currentChallenge.downloadFile && (
          <a
            href={currentChallenge.downloadFile}
            download="flag.png.enc"
            className="download-btn"
          >
            📥 ดาวน์โหลดไฟล์ flag.png.enc
          </a>
        )}

        {/* Flag Input */}
        <div className="flag-input-section">
          <input
            type="text"
            className={`flag-input-new ${submission || ''}`}
            placeholder="ใส่คำตอบ..."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button className="submit-btn-new" onClick={handleSubmit}>
            ส่งคำตอบ
          </button>
        </div>

        {/* Submission Feedback */}
        {submission === 'success' && (
          <div className="feedback-success">
            ✓ ถูกต้อง! ผ่านด่านนี้แล้ว!
            {currentChallenge.id === 6 && (
              <button
                className="next-realm-btn-new"
                onClick={() => router.push('/page2')}
              >
                🚪 เข้าสู่อาณาจักรมืด →
              </button>
            )}
          </div>
        )}
        {submission === 'error' && (
          <div className="feedback-error">
            ✗ คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง!
          </div>
        )}
      </div>

      {/* Progress Counter */}
      <div className="progress-counter">
        ด่านที่เคลียร์: {solvedChallenges.size} / {challenges.length}
      </div>

      {/* Navigation Arrows */}
      <button
        className="nav-arrow nav-arrow-left"
        onClick={goToPrevChallenge}
        disabled={currentChallengeIndex === 0}
      >
        ←
      </button>
      <button
        className="nav-arrow nav-arrow-right"
        onClick={goToNextChallenge}
        disabled={currentChallengeIndex === challenges.length - 1}
      >
        →
      </button>
    </div>
  );
}
