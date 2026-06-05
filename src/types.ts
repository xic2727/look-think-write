export interface ObservationPoint {
  x: number; // Percent from left (0 to 100)
  y: number; // Percent from top (0 to 100)
  label: string; // What are we looking at? e.g. "人物 (丁丁)"
  details: string; // Child-friendly hint, e.g. "他哼着歌，高高兴兴走在路上，红领巾随风飘。他的神态真可爱！"
}

export interface WritingScene {
  id: string; // e.g. "01", "02", "03", "12"
  title: string;
  scenario: string;
  lookTips: string[]; // 看一看
  thinkTips: string[]; // 想一想
  writeTips: string[]; // 常用词句提示
  observationPoints: ObservationPoint[];
  defaultModelStory: string;
}

export interface ModelEssayHighlight {
  text: string;
  type: "time" | "location" | "character" | "action" | "good-word";
}

export interface ModelEssay {
  id: string;
  title: string;
  category: "冬天雪景" | "爱劳动" | "助人为乐" | "保护环境" | "小动物故事" | "快乐日常" | "安全警示";
  content: string;
  highlights: ModelEssayHighlight[];
}

export interface AIEvaluation {
  stars: {
    observation: number; // 观察星
    sentence: number; // 句子星
    punctuation: number; // 标点星
    imagination: number; // 想象星
  };
  reasons: string;
  encouragements: string[];
  suggestions: string[];
  correctedText: string;
}
