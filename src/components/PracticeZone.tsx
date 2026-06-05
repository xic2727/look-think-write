import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, HelpCircle, PencilLine, CheckSquare, 
  MessageCircle, Sparkles, Award, PlayCircle, Loader2, BookOpen, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { INTERACTIVE_SCENES } from "../data";
import { WritingScene, AIEvaluation } from "../types";
import { SceneIllustration } from "./IllustrationSVGs";

export const PracticeZone: React.FC = () => {
  const [activeScene, setActiveScene] = useState<WritingScene>(INTERACTIVE_SCENES[0]);
  const [drafts, setDrafts] = useState<Record<string, string>>({
    "01": "",
    "02": "",
    "03": "",
    "12": ""
  });
  
  const [activeHotspot, setActiveHotspot] = useState<{ label: string; details: string } | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<"look" | "think" | "write">("look");
  
  // Evaluation state
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null);
  const [apiConfigured, setApiConfigured] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check API configuration on mount
  useEffect(() => {
    fetch("/api/check-config")
      .then(res => res.json())
      .then(data => {
        setApiConfigured(!!data.ok);
      })
      .catch(() => {
        setApiConfigured(false);
      });
  }, []);

  // Sync draft typing
  const handleDraftChange = (val: string) => {
    setDrafts(prev => ({
      ...prev,
      [activeScene.id]: val
    }));
  };

  const currentDraft = drafts[activeScene.id] || "";

  // Playful loading animation strings for children
  const loadingTexts = [
    "智能小老师正骑着粉色自行车飞奔而来……",
    "正在替你检查‘逗号’和‘句号’这两只小喜鹊……",
    "小老师正在戴上金色放大镜，仔细寻找你的‘闪光点’……",
    "拼音仙子正在帮你润色错别字哦……",
    "正在折叠一张专属于你的‘智慧挑战成绩单’……"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingText(loadingTexts[0]);
      let index = 1;
      interval = setInterval(() => {
        setLoadingText(loadingTexts[index % loadingTexts.length]);
        index++;
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  // Insert full-width Chinese punctuations
  const insertPunctuation = (punc: string) => {
    const text = currentDraft;
    const textarea = textareaRef.current;
    
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = text.substring(0, start);
      const after = text.substring(end);
      
      const newText = before + punc + after;
      handleDraftChange(newText);
      
      // Reset cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + punc.length, start + punc.length);
      }, 50);
    } else {
      handleDraftChange(text + punc);
    }
  };

  // Grading length categorization for first graders font styling
  const getDraftLengthCategory = () => {
    const len = currentDraft.length;
    if (len === 0) return { label: "🌱 刚埋下小种子", color: "text-gray-400", width: "w-0" };
    if (len < 15) return { label: "🌿 长出了嫩叶子（写得有点少，加油写写）", color: "text-amber-500", width: "w-1/4 bg-amber-400" };
    if (len < 40) return { label: "🌸 开出了小花朵（字数很合适，继续完整噢）", color: "text-teal-500", width: "w-2/4 bg-teal-400" };
    if (len < 80) return { label: "🌳 结出满满果实的绿大树（真丰满呀！）", color: "text-green-600", width: "w-3/4 bg-green-500" };
    return { label: "👑 森林写话国国王（太宏伟了，要注意规范分段段）", color: "text-indigo-600", width: "w-full bg-indigo-500" };
  };

  const draftLengthDetails = getDraftLengthCategory();

  // Evaluate the draft
  const handleEvaluate = async (simulate = false) => {
    const text = currentDraft.trim();
    if (!text) {
      alert("小朋友，不写字是不能叫小老师点评的哦！快写几句话试试看吧！");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setEvaluation(null);

    if (simulate || !apiConfigured) {
      // Simulate highly detailed cute response for playground demo when key not filled
      setTimeout(() => {
        const simulatedMock: AIEvaluation = {
          stars: {
            observation: 5,
            sentence: 4,
            punctuation: 3,
            imagination: 5
          },
          reasons: `嗨！我的小侦探小朋友！小老师刚刚看了你关于《${activeScene.title}》的写话草稿，看得太入神啦！简直像是在读一本精美的故事书！你的词汇量特别大，而且把主角的神态和小动物之间的互动写得生机勃勃。小老师特别喜欢你展开的想象力，简直是小作家再世呀！不过呀，我们还是有些可以微调的小妙招，能让你的文章在班级里夺冠哦。来，跟小老师一起看看挑战成绩单吧！`,
          encouragements: [
            `用词很传神！特别加入了生动活泼的生动词（你写到了特别有趣的细节）。`,
            `故事的讲述极其完整！清晰写明了“什么时间”、“谁”和“在哪儿”，构成了完美的四素句！`,
            `想象力给满分！写出了小白兔急得满脸通红、小花在草地上打秋千的可爱拟人句！`
          ],
          suggestions: [
            "要注意标点符号噢！小西施老师发现你全文好长的一段路才用了一两个‘。’句号小仙子，有的地方要分成几句话，多加两个逗号，句号来换换气哦，不然小鸟读起来都会喘不过气啦！",
            "有一些难懂的声调或者字词，例如‘shou pa’挂起来，你用拼音代替是非常聪明的办法，不过也可以让爸爸妈妈或者老师教你认一认‘手帕’这两个字，写成汉字就更棒棒啦！"
          ],
          correctedText: activeScene.defaultModelStory
        };
        setEvaluation(simulatedMock);
        setLoading(false);
      }, 2500);
      return;
    }

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, sceneId: activeScene.id })
      });

      if (!response.ok) {
        throw new Error("点评失败啦，服务器今天有些开小差……");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setEvaluation(data.evaluation);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "由于网络小精灵不通，智能点评失败了。不过不用气馁，你写的已经很棒了！建议点击‘模拟体验’看看老师会怎么奖赏你！");
    } finally {
      setLoading(false);
    }
  };

  // Preset quick sentences chunks to help children structure their drafts
  const handleInsertSentencePreset = (presetText: string) => {
    handleDraftChange(currentDraft + presetText);
  };

  return (
    <div className="flex flex-col gap-6" id="practice-playground">
      {/* 1. Theme Navigation Rail */}
      <div className="bg-white border-2 border-slate-100 p-2.5 rounded-3xl flex gap-2 overflow-x-auto shadow-sm">
        {INTERACTIVE_SCENES.map(scene => (
          <button
            key={scene.id}
            onClick={() => {
              setActiveScene(scene);
              setActiveHotspot(null);
              setEvaluation(null);
              setErrorMessage(null);
            }}
            className={`cursor-pointer px-4 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeScene.id === scene.id
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                : "bg-slate-50 text-gray-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-[10px] uppercase font-black bg-white/20 px-1.5 py-0.5 rounded-md">
              挑战 {scene.id}
            </span>
            {scene.title}
          </button>
        ))}
      </div>

      {/* 2. Main Practice Workspace splits to 2 columns on grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full items-start">
        {/* Left Column: Interactive Picture Observation & Guidance (7 columns) */}
        <div className="xl:col-span-7 flex flex-col gap-5">
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                <Compass className="w-4 h-4 animate-spin-slow text-amber-500" />
                第一步：瞧一瞧 —— 交互观察小雷达 (点击画里的闪光圆圈圈有宝贝提示噢！)
              </span>
            </div>

            {/* Illustration area with overlaid hotspots */}
            <div className="relative aspect-[390/260] w-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50 group">
              <SceneIllustration id={activeScene.id} />
              
              {/* Overlaid hotspots */}
              {activeScene.observationPoints.map((point, index) => {
                const isActive = activeHotspot?.label === point.label;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveHotspot({ label: point.label, details: point.details })}
                    style={{ top: `${point.y}%`, left: `${point.x}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 z-10 ${
                      isActive
                        ? "bg-amber-500 ring-4 ring-amber-200 text-white scale-125"
                        : "bg-white/90 shadow-lg text-amber-600 border border-amber-300 hover:bg-amber-100 hover:scale-110"
                    }`}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-30"></span>
                    <HelpCircle className="w-4 h-4" />
                  </button>
                );
              })}

              {/* Hotspot details bubble overlay */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border-2 border-amber-300 rounded-2xl p-4 shadow-xl z-20 flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center pb-1 border-b border-amber-100">
                      <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                        🔍 观察重点：{activeHotspot.label}
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="cursor-pointer text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
                      >
                        知道啦 ×
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 font-bold leading-relaxed pt-1.5">
                      {activeHotspot.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Guidelines Tab Section */}
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-5 shadow-sm">
            {/* Guide tabs */}
            <div className="border-b border-slate-100 flex gap-4 text-sm font-bold pb-2.5 mb-4">
              <button
                onClick={() => setActiveGuideTab("look")}
                className={`cursor-pointer pb-2 relative transition-all ${
                  activeGuideTab === "look" ? "text-amber-600" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                看一看 (观察问题)
                {activeGuideTab === "look" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setActiveGuideTab("think")}
                className={`cursor-pointer pb-2 relative transition-all ${
                  activeGuideTab === "think" ? "text-amber-600" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                想一想 (脑洞想象力)
                {activeGuideTab === "think" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setActiveGuideTab("write")}
                className={`cursor-pointer pb-2 relative transition-all ${
                  activeGuideTab === "write" ? "text-amber-600" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                写一写 (常用魔法词)
                {activeGuideTab === "write" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></span>
                )}
              </button>
            </div>

            {/* Guides Tab content renderer */}
            <div className="min-h-[140px]">
              {activeGuideTab === "look" && (
                <div className="space-y-3 text-sm md:text-base text-gray-800 font-bold">
                  {activeScene.lookTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckSquare className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeGuideTab === "think" && (
                <div className="space-y-4 text-sm md:text-base text-indigo-800 font-extrabold bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/60">
                  {activeScene.thinkTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="bg-indigo-205 text-indigo-800 text-[11px] px-2 py-0.5 rounded-full shrink-0">
                        脑洞 {idx + 1}
                      </span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeGuideTab === "write" && (
                <div className="space-y-3.5">
                  <p className="text-sm text-slate-400 mb-2 font-black select-none">
                    点击可以直接插入下方拼装积木块：
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {activeScene.writeTips.map((tip, idx) => {
                      const splitParts = tip.split("：");
                      const header = splitParts[0];
                      const words = splitParts[1] || "";
                      return (
                        <div key={idx} className="flex flex-wrap items-center gap-2.5 border-b border-dashed border-slate-100 pb-2.5">
                          <span className="text-xs md:text-sm font-black text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-md">
                            {header}
                          </span>
                          <button
                            onClick={() => handleInsertSentencePreset(words)}
                            className="cursor-pointer text-sm md:text-base text-slate-700 bg-slate-50 border hover:bg-slate-100 px-3.5 py-2 rounded-xl text-left font-bold"
                          >
                            {words} (⬅ 点击直接采用)
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Writing Sandbox & AI Evaluation Certificate (5 columns) */}
        <div className="xl:col-span-5 flex flex-col gap-5">
          {/* Writing Drafting Area Paper Card */}
          <div className="bg-gradient-to-br from-indigo-50/20 to-teal-50/10 border-4 border-indigo-100 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2.5">
              <PencilLine className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-black text-gray-800">
                写一写：我的《{activeScene.title}》作文稿纸
              </h3>
            </div>

            {/* Punctuation helpers on screen */}
            <div className="bg-white border border-indigo-100 rounded-2xl p-2.5 mb-3 flex flex-wrap items-center justify-between gap-1.5 shadow-sm">
              <span className="text-[10px] font-black text-indigo-400 select-none">快捷标点符号</span>
              <div className="flex flex-wrap gap-1">
                {["，", "。", "！", "？", "：", "、", "“", "”"].map(p => (
                  <button
                    key={p}
                    onClick={() => insertPunctuation(p)}
                    className="cursor-pointer w-7 h-7 bg-indigo-50 text-indigo-800 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 text-xs font-black rounded-lg flex items-center justify-center transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Editing field */}
            <textarea
              ref={textareaRef}
              rows={8}
              value={currentDraft}
              onChange={e => handleDraftChange(e.target.value)}
              placeholder={`在这里写写一两句好听的话吧。例如：
冬天到了，白皑皑鹅毛大雪......
或者是：
周末，天气特别晴朗，小丽......`}
              className="w-full bg-white border-2 border-indigo-100 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 outline-none rounded-2xl p-4 text-slate-800 placeholder-slate-400 font-bold tracking-wide text-base md:text-lg leading-relaxed shadow-inner"
            />

            {/* Length indicators and tools */}
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className={draftLengthDetails.color}>{draftLengthDetails.label}</span>
                <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full select-all">
                  字数：{currentDraft.length}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-300 ${draftLengthDetails.width}`} />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={() => handleEvaluate(false)}
                disabled={loading}
                className="cursor-pointer w-full py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-indigo-300 disabled:to-indigo-300 active:scale-95 transition-all text-white text-sm font-black rounded-2xl shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-1.5"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
                写好啦，让智能小老师评价！
              </button>

              {/* Show simulated action when the user hasn't set up API keys */}
              {!apiConfigured && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex flex-col gap-1.5 mt-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-700 font-bold leading-normal">
                      未配置 API 密钥（可前往 **设置 &gt; 密钥管理** 绑定 GEMINI_API_KEY），但在下方我们为你贴心地准备了【模拟批改效果体验】，快来一键尝鲜吧！
                    </p>
                  </div>
                  <button
                    onClick={() => handleEvaluate(true)}
                    disabled={loading}
                    className="cursor-pointer py-1.5 bg-red-100 hover:bg-red-200 border border-red-300 text-red-800 text-[10px] font-black rounded-lg text-center"
                  >
                    一键模拟体验：【AI智能点评成绩单】
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AI grading dynamic loader indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-indigo-900 text-white border border-indigo-800 rounded-3xl p-6 text-center shadow-lg flex flex-col items-center gap-3"
              >
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
                  <Sparkles className="w-6 h-6 text-yellow-400 absolute top-3 left-3 animate-pulse" />
                </div>
                <h4 className="font-bold text-sm">小老师正在认真阅读中……</h4>
                <p className="text-xs text-indigo-200 italic px-4 font-bold">{loadingText}</p>
              </motion.div>
            )}

            {/* Error Message Box */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl p-4 flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <p className="font-bold leading-relaxed">{errorMessage}</p>
                </div>
                {!apiConfigured && (
                  <button
                    onClick={() => handleEvaluate(true)}
                    className="cursor-pointer py-1 bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-800 text-[10px] font-bold rounded-lg"
                  >
                    🚀 点击一键使用本地沙盒【模拟体验】点评！
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE GOLDEN REPORT CARD CERTIFICATE (写话荣誉勋章与智能点评单) */}
          <AnimatePresence>
            {evaluation && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-yellow-400 rounded-3xl p-5 shadow-xl relative overflow-hidden"
              >
                {/* Shiny star decoration backgrounds in corner */}
                <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-yellow-400/25 blur-xl pointer-events-none rounded-full" />
                <div className="absolute top-1 right-2 text-[8px] font-black text-amber-500/50 tracking-widest bg-yellow-200 px-2 py-0.5 rounded-full select-none">
                  🌟 AI 智能小老师亲笔批改单
                </div>

                <div className="flex items-center gap-1.5 pb-2 mb-4 border-b-2 border-yellow-200/50">
                  <Award className="w-5 h-5 text-amber-500 animate-bounce" />
                  <h3 className="text-base font-black text-amber-900">恭喜！获得写话大挑战勋章勋章</h3>
                </div>

                {/* 4 STATIONS STAR RATING CHART */}
                <div className="bg-white border-2 border-yellow-200/50 rounded-2xl p-3.5 mb-4 grid grid-cols-2 gap-3 shadow-inner">
                  {/* Rating item: Observe */}
                  <div className="flex flex-col gap-0.5 text-center p-1 rounded-xl bg-orange-50/50">
                    <span className="text-[10px] font-black text-amber-800">观察星 🔍</span>
                    <div className="flex justify-center gap-0.5 my-1 text-yellow-400 select-none">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-base font-bold ${i < evaluation.stars.observation ? "" : "opacity-20"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating item: Sentence */}
                  <div className="flex flex-col gap-0.5 text-center p-1 rounded-xl bg-orange-50/50">
                    <span className="text-[10px] font-black text-amber-800">句子星 ✍️</span>
                    <div className="flex justify-center gap-0.5 my-1 text-yellow-400 select-none">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-base font-bold ${i < evaluation.stars.sentence ? "" : "opacity-20"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating item: Punctuation */}
                  <div className="flex flex-col gap-0.5 text-center p-1 rounded-xl bg-orange-50/50">
                    <span className="text-[10px] font-black text-amber-800">标点星 💡</span>
                    <div className="flex justify-center gap-0.5 my-1 text-yellow-400 select-none">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-base font-bold ${i < evaluation.stars.punctuation ? "" : "opacity-20"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating item: Imagination */}
                  <div className="flex flex-col gap-0.5 text-center p-1 rounded-xl bg-orange-50/50">
                    <span className="text-[10px] font-black text-amber-800">想象星 🚀</span>
                    <div className="flex justify-center gap-0.5 my-1 text-yellow-400 select-none">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-base font-bold ${i < evaluation.stars.imagination ? "" : "opacity-20"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overall Teacher reasons */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-amber-800 pb-1 flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> 智能小老师悄悄话：
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-bold italic bg-white p-3 rounded-2xl border border-yellow-100 shadow-sm">
                      “ {evaluation.reasons} ”
                    </p>
                  </div>

                  {/* Encouragements */}
                  {evaluation.encouragements?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black text-emerald-800 pb-1 flex items-center gap-1">
                        ✨ 甜甜夸奖（闪光点）：
                      </h4>
                      <ul className="space-y-1 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-xs text-slate-700 font-medium">
                        {evaluation.encouragements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-normal">
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✔</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {evaluation.suggestions?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black text-indigo-800 pb-1 flex items-center gap-1">
                        🌈 加油小妙招：
                      </h4>
                      <ul className="space-y-1 bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-xs text-slate-700 font-medium">
                        {evaluation.suggestions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-normal">
                            <span className="text-indigo-500 font-bold shrink-0 mt-0.5">★</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Splendid Corrected Version */}
                  <div className="border-t border-dashed border-amber-300 pt-3 mt-3">
                    <h4 className="text-xs font-black text-amber-800 pb-1 flex items-center gap-1">
                      👑 老师的抱抱修改版（大声跟着读一遍吧！）：
                    </h4>
                    <div className="bg-amber-100/40 p-4 border-2 border-dashed border-amber-200 rounded-2xl text-xs md:text-sm text-slate-800 font-bold leading-relaxed shadow-sm min-h-[100px]">
                      {evaluation.correctedText.split("\n").map((para, i) => (
                        <p key={i} className="mb-2 indent-6">
                          {para}
                        </p>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        handleDraftChange(evaluation.correctedText);
                        setEvaluation(null);
                      }}
                      className="cursor-pointer w-full text-center mt-3 py-1.5 bg-yellow-200 hover:bg-yellow-300 border border-yellow-300 text-yellow-900 text-[10px] font-black rounded-lg transition-colors"
                    >
                      🌟 一键复制修改版：直接贴到我的稿稿里
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
