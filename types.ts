export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
}

export interface CompetencyScore {
  c1: number; // Norm culta
  c2: number; // Compreensão/Estrutura
  c3: number; // Argumentação
  c4: number; // Coesão
  c5: number; // Proposta de Intervenção
}

export interface Essay {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'corrected';
  score?: CompetencyScore;
  totalScore?: number;
  feedback?: string;
  createdAt: string;
}

export interface Theme {
  id: number;
  title: string;
  date: string;
}

export type ViewState = 'landing' | 'dashboard' | 'editor' | 'correction' | 'plans';