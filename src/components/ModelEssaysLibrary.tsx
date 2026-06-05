import React, { useState, useEffect } from "react";
import { BookOpen, Highlighter, Calendar, MapPin, User, Eye, Activity, Image, Palette, Play, Square, Volume2 } from "lucide-react";
import { MODEL_ESSAYS } from "../data";
import { ModelEssay } from "../types";
import { SceneIllustration } from "./IllustrationSVGs";

const essayImages: Record<string, string> = {
  "01": "/images/范文01.jpg",
  "02": "/images/范文02.png",
  "03": "/images/范文03.png",
  "04": "/images/范文04.jpg",
  "05": "/images/范文05.jpg",
  "06": "/images/范文06.jpg",
  "07": "/images/范文07.jpg",
  "08": "/images/范文08.jpg",
  "09": "/images/范文09.jpg",
  "10": "/images/范文10.jpg",
  "11": "/images/范文11.jpg",
  "12": "/images/范文12.jpg",
  "13": "/images/范文13.png",
};

export const ModelEssaysLibrary: React.FC = () => {
  const categories = [
    "全部",
    "冬天雪景",
    "爱劳动",
    "助人为乐",
    "保护环境",
    "小动物故事",
    "快乐日常",
    "安全警示"
  ];

  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const [selectedEssay, setSelectedEssay] = useState<ModelEssay>(MODEL_ESSAYS[0]);
  const [viewMode, setViewMode] = useState<"image" | "sketch">("image");

  // Magical highlight switch states
  const [highlightTime, setHighlightTime] = useState<boolean>(true);
  const [highlightLocation, setHighlightLocation] = useState<boolean>(true);
  const [highlightCharacter, setHighlightCharacter] = useState<boolean>(true);
  const [highlightAction, setHighlightAction] = useState<boolean>(true);
  const [highlightGoodWord, setHighlightGoodWord] = useState<boolean>(true);

  // Text-To-Speech (TTS) states for Selected Essay
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Stop essay reading
  const stopEssaySpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Play or pause essay reading
  const playEssaySpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("小朋友，您的浏览器目前还不支持语音朗读噢！可以换个浏览器（如谷歌 Chrome）试试！");
      return;
    }

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    stopEssaySpeech();
    setIsSpeaking(true);

    const speechText = `写话精选范文：《${selectedEssay.title}》。正文如下：${selectedEssay.content}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = "zh-CN";
    utterance.rate = 0.82; // Slower read speed for grade 1/2 children
    utterance.pitch = 1.05; // Bright gentle pitch

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Auto clean up speech when switching selected essay or leaving view
  useEffect(() => {
    stopEssaySpeech();
    return () => {
      stopEssaySpeech();
    };
  }, [selectedEssay]);

  // Filter essays
  const filteredEssays = activeCategory === "全部"
    ? MODEL_ESSAYS
    : MODEL_ESSAYS.filter(item => item.category === activeCategory);

  // Render text with interactive magic highlights and larger customizable fonts (text-lg md:text-xl)
  const renderHighlightedContent = (essay: ModelEssay) => {
    const text = essay.content;
    const highlights = essay.highlights;

    if (highlights.length === 0) {
      return text.split("\n").map((para, idx) => (
        <p key={idx} className="text-slate-800 leading-loose indent-10 mb-6 font-bold text-lg md:text-xl tracking-wide">
          {para}
        </p>
      ));
    }

    // Build a split list of words. To do the highlighting robustly: Let's find all highlights of active types,
    // sorting them by index, and splitting/extracting parts of speech!
    // An alternative simpler and robust method is finding occurrences, but split regex is easiest!
    // To match words precisely:
    // We can iterate the list of active highlights, replace them with styled elements or use simple string splitting.
    // Let's implement a robust split highlight renderer:
    const activeHighlightWords = highlights.filter(h => {
      if (h.type === "time" && !highlightTime) return false;
      if (h.type === "location" && !highlightLocation) return false;
      if (h.type === "character" && !highlightCharacter) return false;
      if (h.type === "action" && !highlightAction) return false;
      if (h.type === "good-word" && !highlightGoodWord) return false;
      return true;
    });

    if (activeHighlightWords.length === 0) {
      return text.split("\n").map((para, idx) => (
        <p key={idx} className="text-slate-800 leading-loose indent-10 mb-6 font-bold text-lg md:text-xl tracking-wide">
          {para}
        </p>
      ));
    }

    // Create a regular expression that matches any of these words
    // We sort the words by length descending to match longer strings first and escape special characters
    const sortedWords = [...activeHighlightWords].sort((a, b) => b.text.length - a.text.length);
    const escapedWords = sortedWords.map(w => w.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(`(${escapedWords.join("|")})`, "g");

    return text.split("\n").map((paragraph, pIdx) => {
      if (!paragraph.trim()) return null;
      
      const parts = paragraph.split(regex);
      
      return (
        <p key={pIdx} className="text-slate-800 leading-loose indent-10 mb-6 text-lg md:text-[21px] font-bold tracking-wide">
          {parts.map((part, partIdx) => {
            const highlightMatch = activeHighlightWords.find(h => h.text === part);
            if (highlightMatch) {
              let classNames = "";
              let titleText = "";
              switch (highlightMatch.type) {
                case "time":
                  classNames = "bg-rose-100 text-rose-800 border-b-2 border-rose-400 font-black px-1 rounded-sm";
                  titleText = "时间词";
                  break;
                case "location":
                  classNames = "bg-green-100 text-green-800 border-b-2 border-green-400 font-black px-1 rounded-sm";
                  titleText = "地点词";
                  break;
                case "character":
                  classNames = "bg-blue-100 text-blue-800 border-b-2 border-blue-400 font-black px-1 rounded-sm";
                  titleText = "人物词";
                  break;
                case "action":
                  classNames = "bg-purple-100 text-purple-800 border-b-2 border-purple-400 font-black px-1 rounded-sm";
                  titleText = "动作/神态描述";
                  break;
                case "good-word":
                  classNames = "bg-amber-100 text-amber-800 border-b-2 border-amber-400 font-black px-1 rounded-sm";
                  titleText = "好词佳句";
                  break;
              }
              return (
                <span key={partIdx} className={`${classNames} select-all mx-0.5 inline`} title={titleText}>
                  {part}
                </span>
              );
            }
            return <React.Fragment key={partIdx}>{part}</React.Fragment>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="model-essays-box">
      {/* Category selector & Essay list - 4 cols */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Category horizontal scroll bar */}
        <div className="flex xl:flex-wrap flex-nowrap overflow-x-auto gap-2 pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                // Auto reset selection if current not in filtered
                const isFound = cat === "全部" 
                  ? MODEL_ESSAYS
                  : MODEL_ESSAYS.filter(item => item.category === cat);
                if (isFound.length > 0) {
                  const targetEssay = isFound[0];
                  setSelectedEssay(targetEssay);
                  setViewMode(essayImages[targetEssay.id] ? "image" : "sketch");
                }
              }}
              className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-600 hover:bg-slate-50 border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Essay count list */}
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-3 max-h-[460px] overflow-y-auto space-y-1 shadow-sm">
          <div className="px-3 py-2 border-b border-slate-50 mb-2 flex items-center justify-between">
            <span className="text-xs font-black text-slate-400">精选范文目录 ({filteredEssays.length}篇)</span>
          </div>

          {filteredEssays.map(essay => (
            <button
              key={essay.id}
              onClick={() => {
                setSelectedEssay(essay);
                setViewMode(essayImages[essay.id] ? "image" : "sketch");
              }}
              className={`cursor-pointer w-full text-left px-3.5 py-3 rounded-2xl transition-all flex items-center justify-between group ${
                selectedEssay.id === essay.id
                  ? "bg-indigo-50 text-indigo-700 font-bold border-l-4 border-indigo-600"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <BookOpen className={`w-4 h-4 shrink-0 ${selectedEssay.id === essay.id ? "text-indigo-600" : "text-gray-400"}`} />
                <span className="text-sm truncate font-medium flex items-center gap-1.5">
                  {essay.title}
                  {essayImages[essay.id] && (
                    <span className="inline-flex items-center text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1 py-0.5 rounded font-bold scale-95 origin-left shadow-2xs">
                      📷 范文卡
                    </span>
                  )}
                </span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
                selectedEssay.id === essay.id
                  ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                  : "bg-gray-100 text-gray-500 border-gray-200 group-hover:bg-slate-100"
              }`}>
                {essay.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reader area - 8 cols */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        {/* Toggle Switches Panel */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 rounded-3xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Highlighter className="w-4 h-4 text-slate-500" />
            <h4 className="text-xs font-black text-slate-500 tracking-wider">词性高亮魔法棒（开启后，在文中会显示彩色斑纹哦！）</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            <button
              onClick={() => setHighlightTime(!highlightTime)}
              className={`cursor-pointer px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                highlightTime
                  ? "bg-rose-50 border-rose-300 text-rose-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              时间词 🔴
            </button>

            <button
              onClick={() => setHighlightCharacter(!highlightCharacter)}
              className={`cursor-pointer px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                highlightCharacter
                  ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              人物词 🔵
            </button>

            <button
              onClick={() => setHighlightLocation(!highlightLocation)}
              className={`cursor-pointer px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                highlightLocation
                  ? "bg-green-50 border-green-300 text-green-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              地点词 🟢
            </button>

            <button
              onClick={() => setHighlightAction(!highlightAction)}
              className={`cursor-pointer px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                highlightAction
                  ? "bg-purple-50 border-purple-300 text-purple-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <Activity className="w-3.5 h-3.5 shrink-0" />
              动作描述 🟣
            </button>

            <button
              onClick={() => setHighlightGoodWord(!highlightGoodWord)}
              className={`cursor-pointer px-2.5 py-1.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                highlightGoodWord
                  ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              好词佳句 🟡
            </button>
          </div>
        </div>

        {/* Story Book page paper container */}
        <div className="bg-amber-50/40 border-4 border-amber-100/60 rounded-3xl p-6 md:p-8 relative min-h-[340px] shadow-sm flex flex-col justify-between">
          <div className="absolute top-4 right-4 text-[10px] font-black text-amber-500/40 tracking-widest pointer-events-none">
            PAGE {selectedEssay.id}
          </div>

          <div>
            {/* Title */}
            <div className="text-center mb-4">
              <span className="px-3.5 py-1 bg-amber-100 text-amber-800 border-2 border-amber-200 rounded-full text-xs font-black">
                {activeCategory === "全部" ? selectedEssay.category : activeCategory}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide mt-2">
                {selectedEssay.title}
              </h2>
            </div>

            {/* AI Teacher TTS voice escort panel - newly introduced */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 bg-amber-100/35 border border-amber-200/40 p-2 md:p-3 rounded-2xl max-w-md mx-auto shadow-2xs">
              <button
                onClick={playEssaySpeech}
                className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-sm ${
                  isSpeaking
                    ? isPaused
                      ? "bg-amber-400 hover:bg-amber-500 text-white"
                      : "bg-rose-500 hover:bg-rose-600 text-white animate-pulse"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02]"
                }`}
              >
                {isSpeaking ? (
                  isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      ▶️ 继续听朗读
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-0.5 mr-0.5">
                        <span className="w-1 h-3 bg-white rounded-full animate-bounce delay-75"></span>
                        <span className="w-1 h-4 bg-white rounded-full animate-bounce delay-150"></span>
                        <span className="w-1 h-2 bg-white rounded-full animate-bounce delay-225"></span>
                      </div>
                      ⏸️ 暂停 (小老师声音伴读中...)
                    </>
                  )
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 fill-white" />
                    🔊 听小老师朗读本篇范文
                  </>
                )}
              </button>

              {isSpeaking && (
                <button
                  onClick={stopEssaySpeech}
                  className="cursor-pointer px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold border border-slate-200 transition-all flex items-center justify-center shadow-2xs"
                >
                  <Square className="w-3.5 h-3.5 text-slate-500 mr-1" />
                  停止
                </button>
              )}
            </div>

            {/* Toggle tabs for Real Image or sketch SVG */}
            {essayImages[selectedEssay.id] && (
              <div className="flex justify-center gap-2 mb-4 bg-slate-100/60 p-1.5 rounded-2xl max-w-sm mx-auto border border-slate-200">
                <button
                  onClick={() => setViewMode("image")}
                  className={`cursor-pointer px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === "image"
                      ? "bg-white text-emerald-700 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
                  }`}
                >
                  <Image className="w-3.5 h-3.5" />
                  📷 真实范文卡
                </button>
                <button
                  onClick={() => setViewMode("sketch")}
                  className={`cursor-pointer px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === "sketch"
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  🎨 动漫简笔画
                </button>
              </div>
            )}

            {/* Hand-drawn story illustration card / Real image card */}
            <div className="max-w-md mx-auto mb-6 aspect-[390/260] w-full rounded-3xl overflow-hidden shadow-md border-4 border-white ring-2 ring-amber-150 bg-white flex items-center justify-center">
              {viewMode === "image" && essayImages[selectedEssay.id] ? (
                <img
                  src={essayImages[selectedEssay.id]}
                  alt={selectedEssay.title}
                  className="w-full h-full object-contain bg-slate-50 rounded-2xl hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <SceneIllustration id={selectedEssay.id} />
              )}
            </div>

            {/* Essay Content */}
            <div className="prose max-w-none px-2 py-4 border-y border-dashed border-amber-200/50">
              {renderHighlightedContent(selectedEssay)}
            </div>
          </div>

          {/* Child educational footer guide */}
          <div className="mt-6 flex flex-wrap gap-2 items-center justify-between text-xs text-gray-400 italic">
            <span>💡 提示：开头一定要空两格，标点符号也要占一格哦。</span>
            <span className="font-bold text-indigo-500">
              三/四/五素句，多用叠字和比喻，写话真简单！
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
