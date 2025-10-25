import { z } from "zod";

export const TranscriptLineSchema = z.object({
  id: z.string(),
  start: z.number().min(0), // seconds
  end: z.number().min(0),
  text: z.string().min(1),
  speaker: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TranscriptLine = z.infer<typeof TranscriptLineSchema>;
