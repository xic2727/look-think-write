import React, { useState } from "react";
import { Smile, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PuzzleElement {
  id: string;
  type: "time" | "character" | "location" | "action" | "feeling";
  text: string;
  colorClass: string;
  label: string;
}

const WHEN_PUZZLES: PuzzleElement[] = [
  { id: "t1", type: "time", text: "星期六上午，", colorClass: "bg-red-100 text-red-700 border-red-300", label: "什么时候 (时间)" },
  { id: "t2", type: "time", text: "冬天到了，", colorClass: "bg-red-100 text-red-700 border-red-300", label: "什么时候 (时间)" },
  { id: "t3", type: "time", text: "放学回家的路上，", colorClass: "bg-red-100 text-red-700 border-red-300", label: "什么时候 (时间)" },
  { id: "t4", type: "time", text: "一天下午，", colorClass: "bg-red-100 text-red-700 border-red-300", label: "什么时候 (时间)" }
];

const WHO_PUZZLES: PuzzleElement[] = [
  { id: "w1", type: "character", text: "小丽", colorClass: "bg-blue-100 text-blue-700 border-blue-300", label: "谁 (人物)" },
  { id: "w2", type: "character", text: "小朋友们", colorClass: "bg-blue-100 text-blue-700 border-blue-300", label: "谁 (人物)" },
  { id: "w3", type: "character", text: "丁丁", colorClass: "bg-blue-100 text-blue-700 border-blue-300", label: "谁 (人物)" },
  { id: "w4", type: "character", text: "小白兔和小鸟", colorClass: "bg-blue-100 text-blue-700 border-blue-300", label: "谁 (人物)" }
];

const WHERE_PUZZLES: PuzzleElement[] = [
  { id: "wh1", type: "location", text: "等在院子里支起的木盆前", colorClass: "bg-green-100 text-green-700 border-green-300", label: "在哪儿 (地点)" },
  { id: "wh2", type: "location", text: "在铺满厚雪的大地上", colorClass: "bg-green-100 text-green-700 border-green-300", label: "在哪儿 (地点)" },
  { id: "wh3", type: "location", text: "在森林清幽的小路上", colorClass: "bg-green-100 text-green-700 border-green-300", label: "在哪儿 (地点)" },
  { id: "wh4", type: "location", text: "在艰难的斜坡上", colorClass: "bg-green-100 text-green-700 border-green-300", label: "在哪儿 (地点)" }
];

const WHAT_PUZZLES: PuzzleElement[] = [
  { id: "a1", type: "action", text: "一下一下使劲地洗着手帕，", colorClass: "bg-purple-100 text-purple-700 border-purple-300", label: "干什么 (动作)" },
  { id: "a2", type: "action", text: "开心地推雪人、打雪仗，", colorClass: "bg-purple-100 text-purple-700 border-purple-300", label: "干什么 (动作)" },
  { id: "a3", type: "action", text: "齐心协力地要把飞走的气球衔回来，", colorClass: "bg-purple-100 text-purple-700 border-purple-300", label: "干什么 (动作)" },
  { id: "a4", type: "action", text: "使出九牛二虎之气帮叔叔推货车，", colorClass: "bg-purple-100 text-purple-700 border-purple-300", label: "干什么 (动作)" }
];

const FEELING_PUZZLES: PuzzleElement[] = [
  { id: "f1", type: "feeling", text: "心里美滋滋的。", colorClass: "bg-amber-100 text-amber-700 border-amber-300", label: "心情如何 / 结果怎样" },
  { id: "f2", type: "feeling", text: "高兴得手舞足蹈。", colorClass: "bg-amber-100 text-amber-700 border-amber-300", label: "心情如何 / 结果怎样" },
  { id: "f3", type: "feeling", text: "欢快的笑声在雪地里回荡。", colorClass: "bg-amber-100 text-amber-700 border-amber-300", label: "心情如何 / 结果怎样" },
  { id: "f4", type: "feeling", text: "累得满头大汗也毫不在乎。", colorClass: "bg-amber-100 text-amber-700 border-amber-300", label: "心情如何 / 结果怎样" }
];

export const SentenceBuilder: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<PuzzleElement | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<PuzzleElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<PuzzleElement | null>(null);
  const [selectedAction, setSelectedAction] = useState<PuzzleElement | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<PuzzleElement | null>(null);

  const [formulaType, setFormulaType] = useState<"three" | "four" | "five">("four");
  const [showStatus, setShowStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleReset = () => {
    setSelectedTime(null);
    setSelectedCharacter(null);
    setSelectedLocation(null);
    setSelectedAction(null);
    setSelectedFeeling(null);
    setShowStatus(null);
  };

  const handleCheck = () => {
    // Check if the current elements form an aligned logical context story!
    // Story pairs:
    // Story 1 (洗手帕): Saturday, Xiaoli, Washbasin/Stool, Wash handkerchief, Heart sweet.
    // Story 2 (下雪了): Winter, Children, Snowy ground, Build snowman/snowball fight, laughter echo.
    // Story 3 (气球回来了): Sometime/Day afternoon, Rabbit & Bird, Forest path, Get back balloon, Hand dance hands play.
    // Story 4 (推车): Day afternoon/Saturday, Dingding, Hard slope, Help uncle push cart, Sweating but happy.

    let completeness = false;
    let storyMatch = "";

    if (formulaType === "three") {
      completeness = !!(selectedCharacter && selectedLocation && selectedAction);
    } else if (formulaType === "four") {
      completeness = !!(selectedTime && selectedCharacter && selectedLocation && selectedAction);
    } else {
      completeness = !!(selectedTime && selectedCharacter && selectedLocation && selectedAction && selectedFeeling);
    }

    if (!completeness) {
      setShowStatus({
        success: false,
        message: "句子还没有组装完整哦！快点击下面的彩色卡片，把空位子填满吧！"
      });
      return;
    }

    // Determine aligning pairings
    const cId = selectedCharacter?.id;
    const lId = selectedLocation?.id;
    const aId = selectedAction?.id;

    const isWashing = cId === "w1" && lId === "wh1" && aId === "a1";
    const isSnowing = cId === "w2" && lId === "wh2" && aId === "a2";
    const isBalloon = cId === "w4" && lId === "wh3" && aId === "a3";
    const isPushing = cId === "w3" && lId === "wh4" && aId === "a4";

    if (isWashing) {
      storyMatch = "小丽洗手帕的故事";
    } else if (isSnowing) {
      storyMatch = "快乐下雪堆雪人的故事";
    } else if (isBalloon) {
      storyMatch = "小白兔和小鸟气球飞回的故事";
    } else if (isPushing) {
      storyMatch = "丁丁助人为乐推车的故事";
    }

    if (storyMatch) {
      setShowStatus({
        success: true,
        message: `🎉 太了不起啦！你成功拼装成了一个完美的【${storyMatch}】！句式通顺、要素齐全，你是个真正的写话小天才！`
      });
    } else {
      setShowStatus({
        success: true,
        message: "🌟 组装成功！虽然你把不同的故事串在了一起（比如让小丽跑去雪地上洗手帕了，哈哈！），但你的句子格式还是非常完整有条理的哦！给你点赞！"
      });
    }
  };

  return (
    <div id="sentence-builder-box" className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-orange-200 rounded-3xl p-6 shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" /> 句式大闯关
          </span>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">拼字游戏：组装属于你的“素句”</h3>
          <p className="text-sm text-gray-500 mt-1">
            写话入门魔法：通过添加时间、地点、人物、动作、结果等彩色积木，拼出完美的词句！
          </p>
        </div>

        {/* Level Toggler */}
        <div className="bg-white p-1 rounded-2xl border-2 border-orange-100 flex gap-1 self-start">
          <button
            onClick={() => { setFormulaType("three"); handleReset(); }}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              formulaType === "three" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-slate-50"
            }`}
          >
            三素句 (谁在哪里干什么)
          </button>
          <button
            onClick={() => { setFormulaType("four"); handleReset(); }}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              formulaType === "four" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-slate-50"
            }`}
          >
            四素句 (什么时候谁在哪里干什么)
          </button>
          <button
            onClick={() => { setFormulaType("five"); handleReset(); }}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              formulaType === "five" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-slate-50"
            }`}
          >
            五素句 (加上心情/结果)
          </button>
        </div>
      </div>

      {/* Interactive Desktop Board */}
      <div className="bg-white/80 border-2 border-orange-100 rounded-2xl p-5 mb-6 min-h-[140px] flex flex-col justify-between">
        {/* Placeholder Rails */}
        <div className="flex flex-wrap items-center gap-3 justify-center py-4">
          {/* 1. Time Component (optional in 3-素) */}
          {(formulaType === "four" || formulaType === "five") && (
            <div
              onClick={() => setSelectedTime(null)}
              className={`min-w-[120px] h-14 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                selectedTime
                  ? "bg-red-50 border-red-400 font-medium text-red-800 shadow-sm"
                  : "bg-red-50/20 border-red-200 text-red-300"
              }`}
            >
              {selectedTime ? (
                <>
                  <span className="text-[10px] text-red-400 font-bold">1. 什么时候</span>
                  <span className="text-sm font-bold text-red-600">{selectedTime.text}</span>
                </>
              ) : (
                <span className="text-xs text-red-400 font-medium">+ 时候 (时间)</span>
              )}
            </div>
          )}

          {/* 2. Character Component */}
          <div
            onClick={() => setSelectedCharacter(null)}
            className={`min-w-[120px] h-14 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
              selectedCharacter
                ? "bg-blue-50 border-blue-400 font-medium text-blue-800 shadow-sm"
                : "bg-blue-50/20 border-blue-200 text-blue-300"
            }`}
          >
            {selectedCharacter ? (
              <>
                <span className="text-[10px] text-blue-400 font-bold">{formulaType === "three" ? "1. 谁" : "2. 谁"}</span>
                <span className="text-sm font-bold text-blue-600">{selectedCharacter.text}</span>
              </>
            ) : (
              <span className="text-xs text-blue-400 font-medium">+ 谁 (人物)</span>
            )}
          </div>

          {/* 3. Location Component */}
          <div
            onClick={() => setSelectedLocation(null)}
            className={`min-w-[120px] h-14 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
              selectedLocation
                ? "bg-green-50 border-green-400 font-medium text-green-800 shadow-sm"
                : "bg-green-50/20 border-green-200 text-green-300"
            }`}
          >
            {selectedLocation ? (
              <>
                <span className="text-[10px] text-green-400 font-bold">{formulaType === "three" ? "2. 在哪儿" : "3. 在哪儿"}</span>
                <span className="text-sm font-bold text-green-600">{selectedLocation.text}</span>
              </>
            ) : (
              <span className="text-xs text-green-400 font-medium">+ 在哪儿 (地点)</span>
            )}
          </div>

          {/* 4. Action Component */}
          <div
            onClick={() => setSelectedAction(null)}
            className={`min-w-[120px] h-14 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
              selectedAction
                ? "bg-purple-50 border-purple-400 font-medium text-purple-800 shadow-sm"
                : "bg-purple-50/20 border-purple-200 text-purple-300"
            }`}
          >
            {selectedAction ? (
              <>
                <span className="text-[10px] text-purple-400 font-bold">{formulaType === "three" ? "3. 干什么" : "4. 干什么"}</span>
                <span className="text-sm font-bold text-purple-600">{selectedAction.text}</span>
              </>
            ) : (
              <span className="text-xs text-purple-400 font-medium">+ 干什么 (动作)</span>
            )}
          </div>

          {/* 5. Feeling Component (only in 5-素) */}
          {formulaType === "five" && (
            <div
              onClick={() => setSelectedFeeling(null)}
              className={`min-w-[120px] h-14 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                selectedFeeling
                  ? "bg-amber-50 border-amber-400 font-medium text-amber-800 shadow-sm"
                  : "bg-amber-50/20 border-amber-200 text-amber-300"
              }`}
            >
              {selectedFeeling ? (
                <>
                  <span className="text-[10px] text-amber-400 font-bold">5. 结果/心情</span>
                  <span className="text-sm font-bold text-amber-600">{selectedFeeling.text}</span>
                </>
              ) : (
                <span className="text-xs text-amber-400 font-medium">+ 结果 / 心情</span>
              )}
            </div>
          )}
        </div>

        {/* Display Complete Sentence */}
        <div className="border-t border-dashed border-orange-100 pt-3 flex items-center justify-between text-center mt-2 flex-col gap-2">
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span className="text-sm font-bold text-gray-400">大声读：</span>
            <span id="final-sentence-puzzles" className="text-base md:text-lg font-bold text-gray-800">
              {formulaType === "three" ? "" : selectedTime?.text || "【____】"}
              {selectedCharacter?.text || "【____】"}
              {selectedLocation?.text || "【____】"}
              {selectedAction?.text || "【____】"}
              {formulaType === "five" ? selectedFeeling?.text || "【____】" : ""}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleCheck}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 active:transform active:scale-95 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Smile className="w-4 h-4" /> 拼好了！写话对不对？
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-orange-200 hover:bg-orange-50 text-orange-600 text-xs font-bold rounded-xl cursor-pointer"
            >
              全部擦掉
            </button>
          </div>
        </div>
      </div>

      {/* Validation Message Banner */}
      <AnimatePresence mode="wait">
        {showStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-2xl mb-6 border flex items-start gap-3 ${
              showStatus.success
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {showStatus.success ? (
              <Sparkles className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs md:text-sm font-medium leading-relaxed">
              {showStatus.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PUZZLE CARDS BOX */}
      <div className="space-y-4">
        {/* TIME ROW */}
        {(formulaType === "four" || formulaType === "five") && (
          <div>
            <h4 className="text-xs font-black text-gray-400 tracking-wider mb-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400"></span> 什么时候 (时间积木)
            </h4>
            <div className="flex flex-wrap gap-2">
              {WHEN_PUZZLES.map((puzzle) => (
                <button
                  key={puzzle.id}
                  onClick={() => setSelectedTime(puzzle)}
                  className={`px-3 py-2 border-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    selectedTime?.id === puzzle.id
                      ? "ring-2 ring-red-500 scale-95 opacity-50 " + puzzle.colorClass
                      : "hover:translate-y-[-1px] hover:shadow-sm bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  {puzzle.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHARACTER ROW */}
        <div>
          <h4 className="text-xs font-black text-gray-400 tracking-wider mb-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span> 谁 (人物积木)
          </h4>
          <div className="flex flex-wrap gap-2">
            {WHO_PUZZLES.map((puzzle) => (
              <button
                key={puzzle.id}
                onClick={() => setSelectedCharacter(puzzle)}
                className={`px-3 py-2 border-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  selectedCharacter?.id === puzzle.id
                    ? "ring-2 ring-blue-500 scale-95 opacity-50 " + puzzle.colorClass
                    : "hover:translate-y-[-1px] hover:shadow-sm bg-white border-slate-200 text-slate-700"
                }`}
              >
                {puzzle.text}
              </button>
            ))}
          </div>
        </div>

        {/* LOCATION ROW */}
        <div>
          <h4 className="text-xs font-black text-gray-400 tracking-wider mb-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400"></span> 在哪儿 (地点积木)
          </h4>
          <div className="flex flex-wrap gap-2">
            {WHERE_PUZZLES.map((puzzle) => (
              <button
                key={puzzle.id}
                onClick={() => setSelectedLocation(puzzle)}
                className={`px-3 py-2 border-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  selectedLocation?.id === puzzle.id
                    ? "ring-2 ring-green-500 scale-95 opacity-50 " + puzzle.colorClass
                    : "hover:translate-y-[-1px] hover:shadow-sm bg-white border-slate-200 text-slate-700"
                }`}
              >
                {puzzle.text}
              </button>
            ))}
          </div>
        </div>

        {/* ACTION ROW */}
        <div>
          <h4 className="text-xs font-black text-gray-400 tracking-wider mb-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span> 干什么 (动作积木)
          </h4>
          <div className="flex flex-wrap gap-2">
            {WHAT_PUZZLES.map((puzzle) => (
              <button
                key={puzzle.id}
                onClick={() => setSelectedAction(puzzle)}
                className={`px-3 py-2 border-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  selectedAction?.id === puzzle.id
                    ? "ring-2 ring-purple-500 scale-95 opacity-50 " + puzzle.colorClass
                    : "hover:translate-y-[-1px] hover:shadow-sm bg-white border-slate-200 text-slate-700"
                }`}
              >
                {puzzle.text}
              </button>
            ))}
          </div>
        </div>

        {/* FEELING ROW */}
        {formulaType === "five" && (
          <div>
            <h4 className="text-xs font-black text-gray-400 tracking-wider mb-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> 结果/心情 (心情积木)
            </h4>
            <div className="flex flex-wrap gap-2">
              {FEELING_PUZZLES.map((puzzle) => (
                <button
                  key={puzzle.id}
                  onClick={() => setSelectedFeeling(puzzle)}
                  className={`px-3 py-2 border-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    selectedFeeling?.id === puzzle.id
                      ? "ring-2 ring-amber-500 scale-95 opacity-50 " + puzzle.colorClass
                      : "hover:translate-y-[-1px] hover:shadow-sm bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  {puzzle.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
