import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MummaBirthday() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState('page-0');

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  // Envelope State
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Note Jar State
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [isJarJiggling, setIsJarJiggling] = useState(false);

  // Easter Egg State
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [teddyClicks, setTeddyClicks] = useState(0);

  const notesList = [
    "For every hour-long call that somehow turns into a 3-hour call. 🩷",
    "For every time your voice notes have made everything feel a little less heavy.",
    "For all the random things we somehow NEED to tell each other.",
    "For being my bestie first… and my Mumma somewhere along the way. 🧸",
    "For all the days we haven't met yet, but somehow still managed to make so many memories.",
    "For all the conversations that start with ‘just 5 minutes’ and absolutely never end in 5 minutes. 🤭",
    "For being one of my safest people.",
    "For all the little moments that somehow became really important ones."
  ];

  const finalSpecialNote = "This jar has only a few notes because if I wrote down everything I love about you, we'd need a whole website just for that. 🤭🎀";

  // Handle Audio Play/Pause
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Audio play blocked:", err));
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  // Start App from Page 0
  const startApp = () => {
    toggleAudio();
    navigateToPage('page-1');
  };

  // Navigation Logic
  const navigateToPage = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pageId === 'page-5') {
      triggerConfetti();
    }
  };

  // Note Jar Interaction
  const drawNote = () => {
    setIsJarJiggling(true);
    setTimeout(() => setIsJarJiggling(false), 500);
    setCurrentNoteIndex((prev) => prev + 1);
  };

  // Easter Egg Toast
  const handleTeddyClick = () => {
    const count = teddyClicks + 1;
    setTeddyClicks(count);
    let msg = "Teddy says: You found me! 🧸";
    if (count === 3) msg = "Teddy says: Stop poking me! 🤭";
    if (count > 5) msg = "Teddy loves Mumma too! 💕";

    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Trigger Confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFE4E8', '#E8A5B8', '#FFF0F3', '#C96B85']
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-[#5A4A42] font-sans relative selection:bg-pink-200 overflow-x-hidden flex flex-col justify-between">
      
      {/* Background Scrapbook Dots Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(#E8A5B8 0.7px, transparent 0.7px), radial-gradient(#E8A5B8 0.7px, #FFFDF9 0.7px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />

      {/* Embedded Font Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');
        .font-handwritten { font-family: 'Caveat', cursive; }
        .font-serif-title { font-family: 'Playfair Display', serif; }
        .washi-tape {
          background: rgba(255, 228, 232, 0.85);
          border-left: 2px dashed rgba(232, 165, 184, 0.5);
          border-right: 2px dashed rgba(232, 165, 184, 0.5);
        }
        @keyframes jiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        .animate-jiggle { animation: jiggle 0.5s ease-in-out; }
      `}</style>

      {/* Global Audio Element */}
      <audio ref={audioRef} loop src="public/media/Vachindamma.mp3" />

      {/* Scrapbook Navigation Bar */}
      {currentPage !== 'page-0' && (
        <nav className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-300">
          <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-full border border-pink-200/80 shadow-lg flex items-center gap-1 sm:gap-2">
            {[
              { id: 'page-0', label: 'hello', icon: '🎀' },
              { id: 'page-1', label: 'intro', icon: '🎂' },
              { id: 'page-2', label: 'us', icon: '📸' },
              { id: 'page-3', label: 'surprise', icon: '🎁' },
              { id: 'page-4', label: 'letter', icon: '💌' },
              { id: 'page-5', label: 'wishes', icon: '🌷' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateToPage(tab.id)}
                className={`px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 ${
                  currentPage === tab.id
                    ? 'bg-pink-200 text-pink-900 shadow-sm'
                    : 'text-pink-700 hover:bg-pink-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 border border-pink-300 text-pink-800 px-4 py-2 rounded-full shadow-md text-sm font-bold flex items-center gap-2 animate-bounce">
          <span>🧸</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN SCRAPBOOK CONTENT VIEWS */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 w-full max-w-4xl mx-auto z-10 pt-16 sm:pt-20">

        {/* PAGE 0 — THE LITTLE INTRO */}
        {currentPage === 'page-0' && (
          <section className="flex flex-col items-center justify-center text-center my-auto min-h-[70vh] w-full">
            <div className="bg-white/90 backdrop-blur-sm p-8 sm:p-12 max-w-md w-full rounded-3xl border border-pink-200 shadow-xl relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-3 left-4 text-2xl">✨</div>
              <div className="absolute top-4 right-4 text-2xl">🎀</div>
              <div className="absolute bottom-3 left-4 text-2xl">🧸</div>
              <div className="absolute bottom-3 right-4 text-2xl">🌸</div>

              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner border border-pink-200 animate-bounce">
                🎀
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-pink-900 mb-2 font-serif-title">
                A little something for my Mumma… 🎀
              </h1>

              <p className="font-handwritten text-2xl text-pink-600 mb-8">
                Come in, I made this just for you ♡
              </p>

              <button
                onClick={startApp}
                className="px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-base sm:text-lg"
              >
                <span>open my little surprise</span>
                <span>♡</span>
              </button>
            </div>
          </section>
        )}

        {/* PAGE 1 — HAPPY BIRTHDAY, MUMMA 🎂 */}
        {currentPage === 'page-1' && (
          <section className="w-full flex flex-col items-center text-center pb-20">
            <div className="inline-block bg-pink-100 border border-pink-200 px-4 py-1.5 rounded-full text-xs font-semibold text-pink-700 mb-4 shadow-sm">
              ✨ Special Day Corner ✨
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-pink-900 mb-6 font-serif-title leading-tight">
              Happy Birthday to my prettiest Mumma 🎀💗
            </h1>

            {/* Video Container */}
            <div className="relative w-full max-w-2xl my-2">
              <div className="washi-tape absolute -top-3 left-8 w-24 h-6 -rotate-6 z-10"></div>
              <div className="washi-tape absolute -bottom-3 right-8 w-24 h-6 rotate-3 z-10"></div>

              <button
                onClick={handleTeddyClick}
                className="absolute -bottom-5 -left-4 z-20 text-4xl sm:text-5xl hover:scale-110 transition-transform cursor-pointer"
                title="Click me!"
              >
                🧸
              </button>

              <div className="bg-white p-3 sm:p-5 rounded-3xl border border-pink-200 shadow-xl relative overflow-hidden">
                <video
                  controls
                  className="w-full h-auto rounded-2xl border border-pink-100 shadow-inner bg-pink-50 object-cover max-h-[420px]"
                  poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FFF0F3'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='6' fill='%23E8A5B8'>▶ Click to watch our memories 🎂</text></svg>"
                >
                  <source src="public\media\birthday.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="mt-8 max-w-lg space-y-2">
              <p className="font-serif-title text-xl sm:text-2xl font-semibold text-pink-900">
                Today is all about youuu 🥹💕
              </p>
              <p className="font-handwritten text-2xl text-pink-700">
                so here's a tiny corner of the internet dedicated entirely to the prettiest, sweetest Mumma ever.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigateToPage('page-2')}
                className="px-6 py-2.5 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-full shadow transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>next</span> <span>→ 🎀</span>
              </button>
            </div>
          </section>
        )}

        {/* PAGE 2 — JUST US BEING US 📸 */}
        {currentPage === 'page-2' && (
          <section className="w-full flex flex-col items-center text-center pb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-900 mb-8 font-serif-title">
              Just us being us ♡
            </h2>

            {/* Polaroids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 w-full max-w-2xl mb-8">
              <div className="relative group">
                <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 -rotate-2 z-10"></div>
                <div className="bg-white p-4 pb-6 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 border border-gray-100">
                  <div className="w-full h-64 sm:h-72 bg-pink-50 rounded-sm overflow-hidden flex items-center justify-center border border-pink-100">
                    <img
                      src="public/media/image.png"
                      alt="Us Photo 1"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FFF0F3'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='8' fill='%23E8A5B8'>📸 Us Photo 1</text></svg>";
                      }}
                    />
                  </div>
                  <p className="font-handwritten text-xl text-gray-700 mt-3">Late night calls & endless talks 🌸</p>
                </div>
              </div>

              <div className="relative group">
                <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rotate-3 z-10"></div>
                <div className="bg-white p-4 pb-6 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 transform rotate-2 group-hover:rotate-0 group-hover:scale-105 border border-gray-100">
                  <div className="w-full h-64 sm:h-72 bg-pink-50 rounded-sm overflow-hidden flex items-center justify-center border border-pink-100">
                    <img
                      src="public/media/image2.png"
                      alt="Us Photo 2"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FFF0F3'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='8' fill='%23E8A5B8'>📸 Us Photo 2</text></svg>";
                      }}
                    />
                  </div>
                  <p className="font-handwritten text-xl text-gray-700 mt-3">47 topics later… 🤭</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-md max-w-xl text-center space-y-4 mb-8">
              <p className="font-handwritten text-2xl sm:text-3xl font-bold text-pink-700">
                “How do we talk THIS much??” 😭
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                Our ‘little calls’ are never actually little. Somehow we can spend hours and hours talking about absolutely everything — random things, serious things, things that make absolutely no sense whatsoever and just when we think we've run out of things to say, we somehow find another 47 topics. 😭
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                And honestly, I think that's one of my favourite things about us. We never really run out of conversation.
              </p>
              <div className="pt-2">
                <span className="inline-block bg-pink-100 text-pink-800 font-bold px-4 py-2 rounded-full text-sm sm:text-base border border-pink-200">
                  Besties first. Mumma & kid somewhere along the way. 🎀
                </span>
              </div>
            </div>

            {/* Interactive Envelope */}
            <div className="w-full max-w-sm flex flex-col items-center mb-8">
              <div
                onClick={() => setIsEnvelopeOpen(true)}
                className="cursor-pointer bg-white p-5 rounded-2xl w-full hover:border-pink-400 transition-all text-center group border-2 border-dashed border-pink-300 shadow-sm"
              >
                {!isEnvelopeOpen ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl group-hover:scale-110 transition-transform">💌</span>
                    <span className="font-handwritten text-xl font-bold text-pink-700">one more little note ♡</span>
                    <span className="text-xs text-pink-400">(tap to open)</span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <span className="text-2xl">✨</span>
                    <p className="font-handwritten text-2xl text-pink-800 leading-snug">
                      “No matter how old we get, I hope we always have moments like these to look back on.”
                    </p>
                    <span className="text-xs text-pink-400">🎀</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigateToPage('page-1')}
                className="px-5 py-2 bg-pink-200 hover:bg-pink-300 text-pink-800 font-bold rounded-full transition-all"
              >
                ← back
              </button>
              <button
                onClick={() => navigateToPage('page-3')}
                className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-full shadow transition-all hover:scale-105"
              >
                next → 🎁
              </button>
            </div>
          </section>
        )}

        {/* PAGE 3 — THE LITTLE GIFT 🎁 */}
        {currentPage === 'page-3' && (
          <section className="w-full flex flex-col items-center text-center pb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 mb-2 font-serif-title max-w-lg">
              I couldn't exactly wrap you a present through a website… so I made you this instead 🎀
            </h2>
            <p className="font-handwritten text-xl text-pink-600 mb-6">Open a little note ♡</p>

            <div className="relative my-4 flex flex-col items-center">
              {/* Glass Jar Element */}
              <div
                onClick={drawNote}
                className={`cursor-pointer select-none transition-transform active:scale-95 ${
                  isJarJiggling ? 'animate-jiggle' : ''
                }`}
              >
                <div className="w-44 h-56 sm:w-52 sm:h-64 bg-white/40 backdrop-blur-md rounded-3xl border-4 border-white/80 shadow-xl flex flex-col items-center justify-between p-4 relative overflow-hidden">
                  <div className="absolute -top-1 w-32 h-6 bg-pink-200 rounded-md border-2 border-pink-300 shadow-sm flex items-center justify-center">
                    <div className="w-24 h-1 bg-pink-300 rounded"></div>
                  </div>
                  <div className="absolute top-6 w-full flex justify-center items-center z-10">
                    <div className="w-full h-2 bg-pink-400"></div>
                    <div className="absolute text-xl">🎀</div>
                  </div>
                  <div className="mt-8 flex-grow w-full flex flex-wrap gap-2 items-end justify-center p-2 opacity-80">
                    <span className="text-lg rotate-12">🩷</span>
                    <span className="text-base -rotate-12">💌</span>
                    <span className="text-xl rotate-45">🎀</span>
                    <span className="text-sm -rotate-6">🌸</span>
                    <span className="text-lg rotate-12">✨</span>
                  </div>
                  <div className="text-xs font-bold text-pink-600 bg-white/90 px-3 py-1 rounded-full shadow-sm border border-pink-200 z-10">
                    Tap the Jar! 🫙
                  </div>
                </div>
              </div>

              {/* Revealed Note Display */}
              {currentNoteIndex >= 0 && (
                <div className="mt-6 bg-white p-6 max-w-md w-full rounded-2xl border-2 border-pink-300 shadow-xl relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-400 text-white text-xs px-3 py-0.5 rounded-full font-bold">
                    Little Note 💕
                  </div>
                  <p className="font-handwritten text-2xl sm:text-3xl text-pink-900 my-4 leading-snug">
                    {currentNoteIndex < notesList.length
                      ? notesList[currentNoteIndex]
                      : finalSpecialNote}
                  </p>
                  <button
                    onClick={drawNote}
                    className="mt-2 px-4 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold rounded-full text-sm transition-all flex items-center gap-1 mx-auto"
                  >
                    <span>another note</span> <span>♡</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigateToPage('page-2')}
                className="px-5 py-2 bg-pink-200 hover:bg-pink-300 text-pink-800 font-bold rounded-full transition-all"
              >
                ← back
              </button>
              <button
                onClick={() => navigateToPage('page-4')}
                className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-full shadow transition-all hover:scale-105"
              >
                next → 💌
              </button>
            </div>
          </section>
        )}

        {/* PAGE 4 — FROM TWO STRANGERS… 💌 */}
        {currentPage === 'page-4' && (
          <section className="w-full flex flex-col items-center pb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-900 mb-6 font-serif-title text-center">
              Okay… now for the thing I actually wanted to say.
            </h2>

            <div className="relative w-full max-w-2xl mb-8">
              <div className="washi-tape absolute -top-3 left-10 w-28 h-6 -rotate-1 z-10"></div>
              
              <div className="bg-[#FFFDF9] p-6 sm:p-10 rounded-2xl shadow-xl border border-pink-200 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-3xl opacity-80">🧸</div>
                <div className="absolute bottom-4 left-4 text-2xl opacity-80">🌸</div>

                <div className="font-handwritten text-2xl sm:text-3xl text-gray-800 space-y-4 leading-relaxed">
                  <p className="text-3xl sm:text-4xl font-bold text-pink-900 mb-4">Mumma,</p>
                  <p>
                    sometimes I genuinely think about how funny it is that we were literally two strangers once. Like… how did we go from not knowing each other at all to somehow becoming people who can't imagine going a whole day without talking to each other? 😭
                  </p>
                  <p>
                    Somewhere along the way, you just became such a normal and important part of my everyday life that not talking to you feels weird now. Our little calls are obviously never little. We can spend hours talking to each other and still somehow have another hundred things to say. And honestly, I don't think I'll ever get tired of that.
                  </p>
                  <p>
                    I wish we could meet more often. I wish we could just randomly decide to meet, sit together, talk for hours in person, annoy each other and then go home after probably still having ten more things to say. I miss you more than I probably say, and I really, really want the day when we can actually meet and make all these silly little memories in person. 🥹
                  </p>
                  <p className="bg-pink-50 p-3 rounded-xl border-l-4 border-pink-300 text-pink-950 font-sans text-base sm:text-lg">
                    And obviously, I cannot write this without mentioning our shared enemy, Harshini. 🤭 The one thing that truly brought me and Pa together: having a common enemy to discuss. Hehehe. Our little team against her will forever be one of my favourite unnecessary alliances. 😭
                  </p>
                  <p>
                    But jokes aside, I hope you know how much your presence means to me. Your voice notes especially have become such a safe little space for me. Sometimes just hearing your voice is enough to make things feel a little more okay. I don't know if you realise how comforting that is, but it really is.
                  </p>
                  <p>
                    You started out as someone I didn't know at all, and somehow became my bestie, my Mumma, my person to call, my person to tell random things to, and someone I genuinely can't imagine not having in my life anymore.
                  </p>
                  <p className="font-bold text-pink-800">
                    I'm really, really grateful that somehow our paths crossed.
                  </p>
                  <p>
                    And I hope we get so many more hours of calls, so many more ridiculous conversations, so many more inside jokes, and most importantly, so many more days where we actually get to be together.
                  </p>
                  <p className="pt-2 text-pink-900 font-bold">
                    Love you loads, Mumma. 🩷🎀
                  </p>
                  <div className="text-right pt-4">
                    <span className="font-handwritten text-3xl sm:text-4xl text-pink-700 block">
                      love youuu, always 🩷
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigateToPage('page-3')}
                className="px-5 py-2 bg-pink-200 hover:bg-pink-300 text-pink-800 font-bold rounded-full transition-all"
              >
                ← back
              </button>
              <button
                onClick={() => navigateToPage('page-5')}
                className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-full shadow transition-all hover:scale-105"
              >
                next → 🌷
              </button>
            </div>
          </section>
        )}

        {/* PAGE 5 — ONE LAST THING 🌷 */}
        {currentPage === 'page-5' && (
          <section className="flex flex-col items-center text-center my-auto w-full pb-20">
            <div className="bg-white p-8 sm:p-12 max-w-xl w-full rounded-3xl border border-pink-200 shadow-xl relative overflow-hidden flex flex-col items-center">
              <div className="text-5xl mb-3">🧸🎀</div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-900 mb-6 font-serif-title leading-tight">
                Happy Birthday, my prettiest Mumma 🎀
              </h1>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg max-w-md">
                <p>
                  I hope this year brings you so many reasons to smile,<br />
                  lots of happiness,<br />
                  lots of love,<br />
                  lots of little moments that make you feel lucky,<br />
                  and hopefully lots of time for us to talk nonsense for hours. 🤭
                </p>

                <p className="font-semibold text-pink-800">
                  I hope we get to make many, many more memories together.
                </p>

                <p className="text-xl sm:text-2xl font-bold text-pink-900 font-serif-title pt-2">
                  You deserve all the love, happiness and pretty little things in the world. 🩷
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-pink-200 w-full text-center space-y-2">
                <p className="font-handwritten text-2xl text-pink-600">
                  until our next 3-hour ‘little call’… 🧸💗
                </p>
                <p className="text-sm font-bold text-pink-800 tracking-wide">
                  Happy Birthday, Mumma 🎀
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={triggerConfetti}
                  className="px-5 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold rounded-full text-xs transition-all flex items-center gap-1"
                >
                  <span>✨ celebrate again! ✨</span>
                </button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* GLOBAL PERSISTENT MUSIC PLAYER */}
      <div className="fixed bottom-4 right-4 z-50 transition-all duration-300">
        <div className="bg-white/90 backdrop-blur-md border border-pink-200 shadow-xl rounded-full p-2 flex items-center gap-2 max-w-[200px] sm:max-w-[240px]">
          <button
            onClick={toggleAudio}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-pink-300 hover:bg-pink-400 text-white rounded-full flex items-center justify-center shrink-0 shadow transition-transform active:scale-95 relative"
            title="Play/Pause Music"
          >
            <span className={`text-xl inline-block transition-transform duration-1000 ${isPlaying ? 'animate-spin' : ''}`}>
              🌸
            </span>
            {isPlaying && (
              <div className="absolute inset-0 rounded-full bg-pink-300 -z-10 animate-ping opacity-75" />
            )}
          </button>

          <div className="flex flex-col pr-2 overflow-hidden">
            <span className="text-[10px] sm:text-xs font-bold text-pink-900 truncate">Our Song 🎵</span>
            <div className="flex items-center gap-1">
              <button onClick={toggleAudio} className="text-pink-700 hover:text-pink-900">
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-12 sm:w-16 h-1 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}