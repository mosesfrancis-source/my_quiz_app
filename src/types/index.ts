export interface Topic {
  id: string;
  chapter: string;
  title: string;
  color: string;
  icon: string;
  summary: string;
}

export interface Question {
  topic: string;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Answer {
  selected: number;
  correct: number;
}

export interface TopicScore {
  correct: number;
  total: number;
}

export interface QuizResult {
  id?: string;
  userId: string;
  topics: string[];
  numQuestions: number;
  difficulty: string;
  score: number;
  percentage: number;
  grade: string;
  topicScores: Record<string, TopicScore>;
  answers: Answer[];
  questions: Question[];
  createdAt: Date;
}

export type Difficulty = "easy" | "mixed" | "hard";
export type Screen = "home" | "setup" | "loading" | "quiz" | "result";
