import { CONTENT_DB } from "../utils/contentDB";

export default function EmotionResult({
  emotion,
  confidence,
}: {
  emotion: string;
  confidence: number;
}) {
  if (confidence < 40) return <p>Analyzing...</p>;

  const data = CONTENT_DB[emotion] || CONTENT_DB.neutral;

  return (
    <div className="glass-card p-6 rounded-3xl">
      <h2 className="text-3xl font-bold text-cyan-400">
        You seem {emotion}
      </h2>
      <p className="mt-4">{data.advice}</p>
      <p className="mt-2">🧘 {data.yoga}</p>
      <p className="mt-2">🎵 {data.music}</p>
    </div>
  );
}
