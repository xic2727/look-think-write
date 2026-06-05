import React, { useState } from "react";
import { 
  Sparkles, Award, Puzzle, ScrollText, Volume2, VolumeX, Play, Square,
  ChevronDown, ChevronUp, BookOpen, Clock, Heart, Users 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PracticeZone } from "./components/PracticeZone";
import { SentenceBuilder } from "./components/SentenceBuilder";
import { ModelEssaysLibrary } from "./components/ModelEssaysLibrary";

export default function App() {
  const [activeTab, setActiveTab] = useState<"practice" | "sentence" | "essays">("practice");
  const [showRhyme, setShowRhyme] = useState<boolean>(true);

  // Playful Look-Think-Write Jingle
  const RHYME_LINES = [
    { text: "看图写话并不难，仔细观察放眼前。", tip: "眼睛是法宝！拿到图片不要急，先整体看一遍画的是什么。" },
    { text: "一看环境和人物，二看动作和表情。", tip: "找细节！注意看看周围天气怎么样、人物穿什么衣服、在做什么动作。" },
    { text: "一丝一毫看得准，融入生活来想象。", tip: "开动脑筋！想一想，如果我是画里的小人，我当时会说些什么？" },
    { text: "原因经过加结果，事情过程才完成。", tip: "故事要讲完！写清楚为什么会发生、发生了什么事、最后大家心情怎么样。" },
    { text: "口头说通莫忘记，时间地点要说清。", tip: "嘴巴读一读！写之前在心里大声说一遍，时间、地点一个字都不要少噢。" },
    { text: "记住看图写话歌，下笔流畅有神功！", tip: "写话魔法完成！跟着小老师一起，你就能写出最棒的小作文啦！" }
  ];

  // Speech synthesis states
  const [playingIdx, setPlayingIdx] = useState<number>(-1);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);

  // Stop current speech
  const handleStopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingIdx(-1);
    setIsPlayingAll(false);
  };

  // Play single verse with easy highlight
  const handlePlaySingle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering any container clicks
    
    if (!("speechSynthesis" in window)) {
      alert("小朋友，您的浏览器现在还不支持语音朗读噢！可以换个浏览器试试。");
      return;
    }

    if (playingIdx === index && !isPlayingAll) {
      handleStopSpeech();
      return;
    }

    handleStopSpeech();
    setPlayingIdx(index);
    setIsPlayingAll(false);

    const line = RHYME_LINES[index];
    const speechText = `${line.text}。魔法提示：${line.tip}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = "zh-CN";
    utterance.rate = 0.85; // Slower cadence for 1st graders
    utterance.pitch = 1.1; // Gentle, warmer child voice tone

    utterance.onend = () => {
      setPlayingIdx(-1);
    };
    utterance.onerror = () => {
      setPlayingIdx(-1);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Play the entire rhyme sequence recursively
  const handlePlayAllRhymes = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop collapsible click

    if (!("speechSynthesis" in window)) {
      alert("小朋友，您的浏览器现在还不支持语音朗读噢！");
      return;
    }

    if (isPlayingAll) {
      handleStopSpeech();
      return;
    }

    handleStopSpeech();
    setIsPlayingAll(true);

    const speakItem = (index: number) => {
      if (index >= RHYME_LINES.length) {
        setPlayingIdx(-1);
        setIsPlayingAll(false);
        return;
      }

      setPlayingIdx(index);
      const line = RHYME_LINES[index];
      const speechText = `${line.text}。魔法提示：${line.tip}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = "zh-CN";
      utterance.rate = 0.85;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        // Carry on to next verse
        speakItem(index + 1);
      };

      utterance.onerror = () => {
        setPlayingIdx(-1);
        setIsPlayingAll(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakItem(0);
  };

  // Clean up any speaking voice when changing active view or closing tab
  React.useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 flex flex-col pb-12">
      {/* 1. Playful Cute Ribbon Header */}
      <header className="bg-gradient-to-r from-teal-400 via-amber-300 to-indigo-400 p-1 text-center font-bold text-white text-[11px] tracking-wider select-none shadow-sm">
        ✨ 欢迎来到智能看图写话大本营！这里有可爱的插画、好玩的拼字和 AI 智能小老师悄悄话 ✨
      </header>

      {/* 2. Main Title Banner Layout */}
      <div className="bg-white border-b-2 border-slate-100 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-amber-400 flex items-center justify-center text-white text-3xl shadow-md rotate-[-3deg] select-none shrink-0 border-2 border-white">
              ✍️
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide font-kids">
                  看图写话教学互动教室
                </h1>
                <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-black select-none">
                  一年级下学期部编版专项
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium mt-1">
                小朋友，小老师在这儿！用最简单的“三、四、五素句”魔法口诀，轻松写出拿满分的好句子！
              </p>
            </div>
          </div>

          {/* Gamified counters or fun badges */}
          <div className="flex gap-3">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shrink-0">
              <span className="text-xl">🏆</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-amber-800 leading-none">勋章达成率</span>
                <span id="trophy-count-header" className="text-xs md:text-sm font-black text-amber-900 mt-1">100% 满星通过</span>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shrink-0">
              <span className="text-xl">🎒</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-indigo-800 leading-none">部编核心考点</span>
                <span className="text-xs md:text-sm font-black text-indigo-900 mt-1">口语表达+标点符号</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Body Content Area Container */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 mt-6 flex flex-col gap-6 flex-grow">
        
        {/* Playful jingle rhyme collapsible foldout */}
        <div className="bg-white border-2 border-slate-150 rounded-3xl overflow-hidden shadow-sm">
          <div 
            onClick={() => setShowRhyme(!showRhyme)}
            className="cursor-pointer w-full px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Volume2 className="w-4 h-4 text-indigo-600 animate-bounce" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800">
                  🔔 必背童谣：一年级看图写话魔法口诀
                </h3>
                <p className="text-[11px] text-slate-400 font-bold mt-0.5">听童谣，记口诀，写好作文顶呱呱 (点击可展开/收起卡片)</p>
              </div>
            </div>

            {/* Audio actions for nursery rhyme */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayAllRhymes(e);
                }}
                className={`cursor-pointer px-4.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-2xs border ${
                  isPlayingAll 
                    ? "bg-rose-500 hover:bg-rose-600 text-white border-rose-500 animate-pulse"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500"
                }`}
              >
                {isPlayingAll ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-white" />
                    ⏹️ 停止播放全部
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    🔊 播放全部童谣
                  </>
                )}
              </button>
              
              <div className="p-1">
                {showRhyme ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showRhyme && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-slate-100 bg-indigo-50/20"
              >
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {RHYME_LINES.map((line, idx) => {
                    const isLinePlaying = playingIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        onClick={(e) => handlePlaySingle(idx, e)}
                        className={`bg-white border-2 rounded-2xl p-4 shadow-sm hover:border-indigo-400 transition-all cursor-pointer group relative overflow-hidden ${
                          isLinePlaying 
                            ? "ring-2 ring-indigo-500 border-indigo-400 bg-indigo-50/10 scale-[1.01]" 
                            : "border-indigo-100"
                        }`}
                        title="点击听这段话"
                      >
                        {/* Audio wave pulse background effect when this card is speaking */}
                        {isLinePlaying && (
                          <div className="absolute top-2 right-2 flex items-center gap-0.5">
                            <span className="w-1 h-3.5 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1 h-5 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                            <span className="w-1 h-2.5 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
                          </div>
                        )}

                        <div className="flex items-start gap-2.5 pb-2 border-b border-indigo-50">
                          <span className={`w-6 h-6 rounded-lg font-black flex items-center justify-center text-xs ${
                            isLinePlaying 
                              ? "bg-indigo-600 text-white" 
                              : "bg-indigo-100 text-indigo-700"
                          }`}>
                            0{idx + 1}
                          </span>
                          <div className="flex-grow">
                            <p className="text-base font-black text-slate-900 leading-normal tracking-wide flex items-center gap-1.5">
                              {line.text}
                            </p>
                          </div>
                          
                          {/* Mini play-single speaker icon button */}
                          <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                            isLinePlaying 
                              ? "bg-rose-50 text-rose-600" 
                              : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                          }`}>
                            {isLinePlaying ? <VolumeX className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                          </div>
                        </div>

                        <p className="text-xs md:text-sm text-indigo-700 font-bold bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/45 mt-2.5 leading-relaxed">
                          💡 点拨：{line.tip}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. THREE MAIN INTERACTIVE TABS */}
        <div className="flex border-b-2 border-slate-100 gap-2 overflow-x-auto pb-1 select-none">
          {/* TAB 1: PRACTICE */}
          <button
            onClick={() => setActiveTab("practice")}
            className={`cursor-pointer px-5 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2 transition-all ${
              activeTab === "practice"
                ? "bg-slate-800 text-white shadow-md shadow-slate-800/15 scale-[1.02]"
                : "bg-white text-gray-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            🎡 写话超级挑战挑战（最主战场！）
          </button>

          {/* TAB 2: SENTENCE PUZZLES */}
          <button
            onClick={() => setActiveTab("sentence")}
            className={`cursor-pointer px-5 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2 transition-all ${
              activeTab === "sentence"
                ? "bg-slate-800 text-white shadow-md shadow-slate-800/15 scale-[1.02]"
                : "bg-white text-gray-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <Puzzle className="w-4 h-4 shrink-0" />
            🧩 拼句子魔法营 (彩拼闯关)
          </button>

          {/* TAB 3: ESSAY CATALOGUE */}
          <button
            onClick={() => setActiveTab("essays")}
            className={`cursor-pointer px-5 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2 transition-all ${
              activeTab === "essays"
                ? "bg-slate-800 text-white shadow-md shadow-slate-800/15 scale-[1.02]"
                : "bg-white text-gray-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <ScrollText className="w-4 h-4 shrink-0" />
            📚 20篇精选范文馆 (魔镜高亮高亮)
          </button>
        </div>

        {/* 5. ACTIVE TAB VIEWER RENDERING */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {activeTab === "practice" && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <PracticeZone />
              </motion.div>
            )}

            {activeTab === "sentence" && (
              <motion.div
                key="sentence"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <SentenceBuilder />
              </motion.div>
            )}

            {activeTab === "essays" && (
              <motion.div
                key="essays"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <ModelEssaysLibrary />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 6. Friendly Educational Child Footer */}
      <footer className="mt-16 bg-white border-t-2 border-slate-100 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-center flex-wrap gap-6 text-xs text-slate-400 font-bold tracking-wide select-none">
            <span className="flex items-center gap-1">📅 【时间要素】: 什么时候？</span>
            <span className="flex items-center gap-1">🌲 【环境/地点】: 在哪里发生的？</span>
            <span className="flex items-center gap-1">👦 【主角神态】: 谁在干什么？表情怎么样？</span>
            <span className="flex items-center gap-1">🎈 【想象妙招】: 他们会说什么？想什么？</span>
          </div>
          
          <div className="text-gray-300 font-black text-xs select-none">
            ───────────────── 💮 看图写话星乐园，写话原来真好玩 💮 ─────────────────
          </div>
          
          <p className="text-[11px] text-slate-400 font-medium">
            本互动平台专为小学一、二年级语文写话课设计。希望通过 AI 趣味鼓励，让每个孩子都敢于写下第一句话，乐于表达，不再害怕写作文！
          </p>
        </div>
      </footer>
    </div>
  );
}

