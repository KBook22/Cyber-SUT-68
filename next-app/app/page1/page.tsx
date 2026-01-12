'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

// Shared Components
import TypingOverlay from '../page2/components/TypingOverlay';

// Import รูปภาพ
import Npc_1 from './picture/Npc_1.png';

import { Challenge, challenges } from './challenge'
import SplashScreen from '../components/SplashScreen'; // Import SplashScreen

const crashDialogs = [
  "FATAL ERROR: Decryption Successful...",
  "Warning: The Forbidden Knowledge has been accessed.",
  "Integrity breach detected... Reality buffer overflow...",
  "NO! You fool! You've broken the seal!",
  "System Critical... Segmentation Fault... Dimensions Shattered."
];

export default function Page1() {
  const router = useRouter();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
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

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

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

  if (showSplash) 
    return (
      <SplashScreen
        chapter="CHAPTER 1"
        title="The Forbidden Knowledge"
        subtitle="Cryptography Protocol Override"
        onComplete={() => setShowSplash(false)}
      />
    );

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