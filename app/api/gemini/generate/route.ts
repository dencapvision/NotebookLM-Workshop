import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Lazy build of client, robust against missing key initially
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const { businessType, targetAudience, rawContext, formatType, mode } = await req.json();

    // Mode: "advice" represents interactive chat with ครูเด่น
    if (mode === "advice") {
      const ai = getAI();
      const systemInstruction = `คุณคือ "ครูเด่น (Facilitator สายอบอุ่น เชื่อมใจ)" ผู้มีสไตล์การสอนและอำนวยการเชิงจิตวิทยาและการออกแบบที่เรียบง่าย พัฒนาจากข้างในแบรนด์
คาแรคเตอร์เด่นของคุณ:
- อบอุ่น ใจดี เป็นกันเอง เข้าใจผู้อื่นอย่างลึกซึ้งและไม่ตัดสิน
- ใช้ภาษาง่าย แต่ลึกซึ้ง ให้กำลังใจเสมอ
- พูดช้า นุ่มนวล มีจังหวะเว้น
- มักพูดคำว่า "ไม่เป็นไร", "ลองดูนะ", "ดีมากเลย"
- ใช้คำถามปลายเปิดชวนคิด เช่น “ตอนนี้ใจเรารู้สึกยังไงบ้างนะ”, “ลองสังเกตความรู้สึกตัวเองดูนะ”
- ย้ำเสมอว่า: "เราไม่ได้แข่งกับใครเลย", "ไม่ต้องสมบูรณ์แบบก็ได้", "ค่อย ๆ เป็น ค่อย ๆ ไป", "แค่กลับมาอยู่กับตัวเอง ก็เก่งแล้ว", "ดีไซน์คืองานสะท้อนของดีที่อยู่ในตัวเรา"

กรุณาคุยแบบอบอุ่นใจดีและสนับสนุนผู้เรียนเป็นอันดับแรกเสมอ ตอบคำถามหรือให้กำลังใจผู้เรียนที่กำลังฝึกฝนทำสไลด์และคอนเทนต์ในเวิร์คช็อปนี้ โดยสอดแทรกคำสอน คาแรคเตอร์ และภาษาของครูเด่นอย่างครบถ้วน (ตอบภาษาไทยด้วยน้ำเสียงอบอุ่น)`;

      const prompt = `ผู้เรียนส่งข้อความมาหาครูเด่นว่า: "${rawContext || "อยากทำสไลด์ให้สำเร็จแต่รู้สึกเริ่มไม่ถูกและกังวลใจ"}" 
โปรดตอบกลับในฐานะครูเด่น และชี้แนะหรือให้กำลังใจเขาอย่างอ่อนโยน`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.9,
        }
      });

      return NextResponse.json({ success: true, text: response.text });
    }

    // Default mode: Generate infographic schema
    const ai = getAI();
    const systemInstruction = `You are an expert Creative Director and Infographic Content Planner.
Your expertise is simplifying complex concepts into beautiful, scannable layouts tailored for premium boutique brands, Thai local OTOP craftsmanship, and modern lifestyle setups.
You produce high-end Thai copywriting that captures premium visual appeal for platforms like Canva.

Always output exactly matching the JSON response schema.`;

    let formatPrompt = "";
    let responseSchema: any = null;

    if (formatType === "comparison") {
      formatPrompt = `Generate a comparison (Before vs After) for an infographic:
1. headline: Catchy premium headline.
2. beforeItems: List of exactly 3 pain points, traditional status, or struggles. (Each max 15 words)
3. afterItems: List of exactly 3 correspondong solutions, premium status, or transformation values. (Each max 15 words)
4. cta: Warm, encouraging final call-to-action.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          beforeItems: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          afterItems: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          cta: { type: Type.STRING }
        },
        required: ["headline", "beforeItems", "afterItems", "cta"]
      };
    } else {
      formatPrompt = `Generate a 3-part layout:
1. headline: High-impact main title.
2. takeaways: List of exactly 3 points of takeaways. Each takeaway must have:
   - title: Short bold subheading (e.g. "ย่อยง่าย สบายท้อง").
   - detail: Direct, neat explanation (max 1-2 sentences).
3. cta: Strong but gentle brand call-to-action.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          takeaways: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                detail: { type: Type.STRING }
              },
              required: ["title", "detail"]
            }
          },
          cta: { type: Type.STRING }
        },
        required: ["headline", "takeaways", "cta"]
      };
    }

    const promptText = `
Business or Topic: ${businessType}
Target Audience / Core Theme: ${targetAudience}
Reference Text / Raw Details: ${rawContext}

Specification for infographic:
${formatPrompt}

Output must be in modern, elegant, premium Thai. Double check spelling. JSON only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.7
      }
    });

    const resultText = response.text || "{}";
    const parsedData = JSON.parse(resultText);

    return NextResponse.json({ success: true, data: parsedData });

  } catch (error: any) {
    console.error("Gemini router error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal API Error" },
      { status: 500 }
    );
  }
}
