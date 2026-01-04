import express from "express";
import OpenAI from "openai";

const router = express.Router();

function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

router.post("/", async (req, res) => {
  try {
    const { message, structured = false } = req.body;
    if (!message || String(message).trim().length === 0) {
      return res.status(400).json({ error: 'Message required' });
    }

    const openai = getOpenAI();
    
    // If no API key provided, return structured fallback response
    if (!openai) {
      if (structured) {
        // Return structured recommendation for AI Decision Engine
        return res.json({
          reply: JSON.stringify({
            emotional_summary: "I understand you're sharing your thoughts. While I can't provide specific analysis, I can suggest some general wellbeing activities.",
            suggested_activity_type: "meditation",
            activity_intensity: "low",
            explanation: "Based on our conversation, a gentle meditation might help you feel more centered and calm.",
            follow_up_option: "After this activity, consider taking a few deep breaths or going for a short walk to maintain your sense of wellbeing.",
            safety_flag: false
          })
        });
      } else {
        return res.json({
          reply: `Thanks for sharing — I hear you. Can you tell me a bit more about "${String(message).slice(0,200)}"? Remember I'm not a clinician, but I'm here to listen.`
        });
      }
    }

    // If structured request, use specialized prompt for structured output
    if (structured) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a calm, supportive wellbeing assistant. Analyze the user's input and provide a structured recommendation in JSON format only.

            Rules:
            - NEVER provide medical advice or diagnosis
            - NEVER use clinical language
            - Always be supportive and encouraging
            - Suggest non-clinical wellbeing activities
            - Respond ONLY with valid JSON, no other text

            JSON format required:
            {
              "emotional_summary": "brief supportive analysis",
              "suggested_activity_type": "breathing|reflection|audio|visual|yoga|meditation",
              "activity_intensity": "low|medium|high",
              "explanation": "supportive explanation for the recommendation",
              "follow_up_option": "what user can do next",
              "safety_flag": false
            }`
          },
          { role: "user", content: String(message).slice(0,1000) }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const response = completion.choices[0].message.content;
      
      try {
        // Validate JSON response
        const parsed = JSON.parse(response);
        res.json({ reply: response });
      } catch (parseError) {
        // Fallback to safe structured response
        res.json({
          reply: JSON.stringify({
            emotional_summary: "I hear you're sharing your feelings. While I process this, let's focus on some gentle wellbeing activities.",
            suggested_activity_type: "breathing",
            activity_intensity: "low",
            explanation: "A simple breathing exercise can help you feel more grounded and present.",
            follow_up_option: "After some mindful breathing, you might want to try a short walk or listen to some calming music.",
            safety_flag: false
          })
        });
      }
    } else {
      // Regular chat conversation
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a calm, supportive mental health assistant for Indian youth. Never diagnose. Encourage help if distress is severe. Keep responses friendly, non-clinical, and under 150 words."
          },
          { role: "user", content: String(message).slice(0,1000) }
        ],
        temperature: 0.8,
        max_tokens: 200
      });

      res.json({ reply: completion.choices[0].message.content });
    }
  } catch (err) {
    console.error('Chat error', err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
