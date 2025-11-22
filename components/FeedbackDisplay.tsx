import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';
import { Button } from './Button';
import { CompetencyScore } from '../types';
import ReactMarkdown from 'react-markdown'; // Note: in a real app we'd install this. For now I will just render text or simple map.

// Simplified Markdown renderer since we can't easily install packages in this instruction set without package.json
const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    return (
        <div className="prose prose-slate max-w-none">
            {lines.map((line, idx) => {
                if (line.startsWith('### ')) return <h3 key={idx} className="text-lg font-bold mt-4 mb-2 text-slate-900">{line.replace('### ', '')}</h3>;
                if (line.startsWith('**')) return <strong key={idx} className="block mt-2">{line.replace(/\*\*/g, '')}</strong>;
                if (line.trim() === '') return <br key={idx} />;
                return <p key={idx} className="text-slate-700 mb-1">{line}</p>;
            })}
        </div>
    )
}

interface FeedbackDisplayProps {
  score: CompetencyScore;
  feedback: string;
  title: string;
  content: string;
  onBack: () => void;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ score, feedback, title, content, onBack }) => {
  const totalScore = (Object.values(score) as number[]).reduce((a, b) => a + b, 0);
  
  const getScoreColor = (val: number) => {
    if (val >= 160) return 'text-green-600 bg-green-50 border-green-200';
    if (val >= 120) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Button variant="ghost" onClick={onBack} className="pl-0 hover:pl-2 transition-all">
        <ArrowLeft size={18} className="mr-2" />
        Voltar para Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Scores */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">Nota Total</h3>
            <div className="text-5xl font-extrabold text-brand-600 mb-2">{totalScore}</div>
            <div className="text-sm text-slate-400">de 1000 pontos</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900">Competências</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { id: 'c1', label: 'I. Norma Culta', val: score.c1 },
                { id: 'c2', label: 'II. Tema e Estrutura', val: score.c2 },
                { id: 'c3', label: 'III. Argumentação', val: score.c3 },
                { id: 'c4', label: 'IV. Coesão', val: score.c4 },
                { id: 'c5', label: 'V. Proposta', val: score.c5 },
              ].map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between">
                  <span className="text-sm text-slate-600">{c.label}</span>
                  <span className={`text-sm font-bold px-2.5 py-0.5 rounded border ${getScoreColor(c.val)}`}>
                    {c.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Feedback & Text */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center space-x-3 mb-4">
                <Award className="text-brand-500" size={24}/>
                <h2 className="text-xl font-bold text-slate-900">Análise da IA</h2>
             </div>
             <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                <SimpleMarkdownRenderer content={feedback} />
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Seu Texto: {title}</h3>
            <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};