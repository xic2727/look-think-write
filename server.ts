import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(process.cwd(), "images")));

const PORT = 3000;

// Lazy initialization of Gemini client to avoid crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured or still at placeholder. Please configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Map of reference story prompts or content for AI to understand context
const REFERENCE_SCENES: Record<string, { title: string; scenario: string; defaultModelStory: string }> = {
  "01": {
    title: "下雪了",
    scenario: "冬天到了，鹅毛大雪下了一天一夜，大地一片雪白，树上、房顶都是积雪，地上厚厚的白地毯。小朋友们在雪地玩耍堆雪人、打雪仗、滚雪球、辣椒嘴巴、萝卜鼻子、插冰糖葫芦双手、戴紫色帽子，笑声回荡。",
    defaultModelStory: "冬天到了，鹅毛大雪整整下了一天一夜。早上，风停了，雪止了，大地一片雪白。树上、房顶上到处都是积雪，地上像是铺了一层厚厚的白地毯。\n小朋友们兴高采烈地出来了，在雪地里尽情地玩耍。他们有的在打雪仗，有的在滚雪球，还有的在堆雪人......瞧！那个雪人堆得多有创意啊！深红的辣椒做嘴巴，橘红色的萝卜当鼻子。身上还插了两串冰糖葫芦，你们猜猜那是什么？对了，那是雪人的双手。头上再戴一顶紫色的帽子，别提有多酷了。\n小朋友们欢笑着，奔跑着，那清脆的笑声久久地在雪地里回荡。"
  },
  "02": {
    title: "推车",
    scenario: "下午放学路上，丁丁看见一位叔叔拉着载满货物的车子走在前面，他满头大汗、气喘吁吁，还不时停下。丁丁跑上前帮叔叔推车，叔叔回头说谢谢你、好孩子，丁丁说不用谢这是少先队员该做的，红领巾飞扬随风点赞。",
    defaultModelStory: "一天下午，丁丁哼着歌儿，欢快地走在放学回家的路上。忽然，他看见一位叔叔拉着一辆载满货物的车子，艰难地走在前面。他满头大汗，气喘吁吁，还不时地停下来休息休息。\n丁丁看到这个情景，连忙跑上前去，使出全身的力气，帮叔叔推车。叔叔感觉一下子轻松了，他回头一看，原来是丁丁在帮他推车。叔叔激动地说：“谢谢你帮我，好孩子！”丁丁连忙说：“不用谢，这是我们少先队员应该做的。”\n此时，丁丁胸前的红领巾随风飘扬，好像在为他助人为乐的精神点赞。"
  },
  "03": {
    title: "洗手帕",
    scenario: "小丽阳光明媚的周六发现手帕脏了，自己动手，拿脸盆装水、放脸盆里、抹肥皂、搓搓、清水冲掉泡沫拧干。手帕雪白雪白，挂起来晒太阳，微风吹拂荡秋千好像对着她笑。",
    defaultModelStory: "星期六，阳光明媚，小丽发现自己的手帕脏了，她想：妈妈这么忙，干脆我自己动手洗洗吧。\n于是，小丽先去拿了个脸盆，装了一些水，接着把她的小手帕放在脸盆里，然后抹了一点肥皂，开始上搓搓，下搓搓。过了好一会儿，终于搓干净了。她再用清水把小手帕上的泡沫冲掉，最后拧干。\n小丽把洗好的小手帕张开一看，小手帕雪白雪白的，漂亮极了！小丽把手帕挂起来晒太阳。这时，一阵微风吹来，小手帕在风的怀抱里荡秋千，好像在对着小丽笑呢。"
  },
  "12": {
    title: "气球又回来了",
    scenario: "小白兔拿着心爱的气球兴高采烈走在路林小路上。风吹飞气球，兔快急哭了，双手抓不到。小鸟飞来帮忙，拍打翅膀飞上天叼着气球线回来。小白兔红红的眼睛像红宝石闪亮，大声道谢，一起玩耍。",
    defaultModelStory: "一天，阳光明媚，小白兔手里拿着心爱的气球，兴高采烈地走在森林的小路上。它一边蹦蹦跳跳地走着，一边手舞足蹈，嘴里还哼着欢快的歌儿。\n忽然，一阵大风吹来，小白兔没有握紧手中的绳子，气球飞走了。小白兔看着气球越飞越高，急得快哭了。它伸长了双手想去抓，却怎么也抓不到。\n这时，飞来一只小鸟，它听到小白兔的哭声，就问:“小白兔，你怎么啦？”小白兔把事情的原因告诉了小鸟，小鸟说：“我可以帮你。”说完，小鸟拍打着翅膀，箭一般飞上了天空。\n过了一会儿，小鸟叼着气球的线回来了。小白兔看见它心爱的气球失而复得，它那红红的眼睛像晶莹的红宝石般闪闪发亮。它大声地对小鸟说：“谢谢你，小鸟姐姐。”小鸟连忙说：“不客气”。于是，它们在树林里高兴地一起玩着气球。"
  }
};

// API Endpoint to check if API key exists
app.get("/api/check-config", (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isOk = apiKey && apiKey !== "MY_GEMINI_API_KEY";
  res.json({ ok: isOk });
});

// API Endpoint for AI writing evaluation
app.post("/api/evaluate", async (req, res) => {
  const { text, sceneId } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "评估的文字不能为空哦！" });
  }

  const scene = REFERENCE_SCENES[sceneId] || { title: "主题练习", scenario: "学生自主看图或自主创意写话", defaultModelStory: "" };

  try {
    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `小朋友写的作文是：\n"""\n${text}\n"""\n\n这幅画的主题是：【${scene.title}】\n画面描述是：${scene.scenario}\n如果是标准范文，我们会这样写：\n"""\n${scene.defaultModelStory}\n"""`,
      config: {
        systemInstruction: `你是一位极具耐心、特别喜欢鼓励小朋友、语气充满童趣的【一年级下学期语文老师（智能小天使老师）】。你的点评对象是刚刚学会写话的6-7岁小一新生。
你必须遵守以下规范：
1. 语言必须极其温柔、可爱、口语化。用叠字和拟人化的口吻评价孩子，多使用“太棒啦！”、“好厉害呀！”、“小侦探”等。千万不要用深奥的成人、学术学术字眼（如“语法结构错乱”、“冗余”、“缺乏逻辑连贯性”），这些会让孩子难过和看不懂！
2. 评价指标：
   - 观察星（是否观察到了画里的关键要素，如时间、人物、动作、主要事物）。
   - 句子星（句子是否连贯，有没有写清“谁在哪儿干什么”或“什么时候谁在哪儿做什么”）。
   - 标点星（是否有标点符号，特别是一年级下学期常教的“逗号，”、“句号。”，有没有乱用或一逗到底）。
   - 想象星（有没有写出画面背后没有画出来的心情、声音、说话声或心里想什么）。
3. 如果小朋友写的文中有拼音代表的字（例如：wo tou tou xie (我偷偷写)），你在修改版中要贴心帮他转成汉字，并写出来，还要夸奖他拼音学得很好。
4. 返回的内容必须是如下 JSON 格式。请配置 responseSchema 来严格产生以下格式：`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["stars", "encouragements", "suggestions", "correctedText", "reasons"],
          properties: {
            stars: {
              type: Type.OBJECT,
              description: "各点评维度星数（1-5颗星）",
              required: ["observation", "sentence", "punctuation", "imagination"],
              properties: {
                observation: { type: Type.INTEGER, description: "观察星（1到5星）" },
                sentence: { type: Type.INTEGER, description: "句子星（1到5星）" },
                punctuation: { type: Type.INTEGER, description: "标点星（1到5星）" },
                imagination: { type: Type.INTEGER, description: "想象星（1到5星）" }
              }
            },
            reasons: { type: Type.STRING, description: "评委老师的整体温温和耳语，夸赞和鼓励" },
            encouragements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "闪光点（小朋友这次写话特别棒的细节，比如用了什么好词，什么句式，写清了什么）"
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "温和建议（用童趣的声音告诉它，怎么再改改就更好玩了，不要说‘错误’）"
            },
            correctedText: {
              type: Type.STRING,
              description: "老师的抱抱修改版（在小朋友原文的基础上润色、修复标点或拼音后的完美小作文，供小朋友朗读朗读）"
            }
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("AI 评估返回内容为空");
    }

    const evaluation = JSON.parse(resultText);
    res.json({ evaluation });
  } catch (error: any) {
    console.error("AI Evaluation error:", error);
    res.status(500).json({ error: error.message || "小老师今天有点困，没能成功看你的作文哦，再试一次吧！" });
  }
});

// Configure Vite or Serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}`);
  });
}

startServer();
