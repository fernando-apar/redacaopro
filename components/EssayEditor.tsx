import React, { useState } from 'react';
import { Save, Send, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { mockGenerateCorrection } from '../services/api';
import { CompetencyScore } from '../types';

interface EssayEditorProps {
  onCorrectionComplete: (data: { score: CompetencyScore; feedback: string; content: string; title: string }) => void;
}

export const EssayEditor: React.FC<EssayEditorProps> = ({ onCorrectionComplete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await mockGenerateCorrection(content);
      onCorrectionComplete({
        ...result,
        content,
        title: title || 'Sem título'
      });
    } catch (error) {
      console.error("Error correcting essay", error);
      alert("Erro ao corrigir redação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nova Redação</h1>
          <p className="text-slate-500">Escreva sua redação com foco no modelo ENEM.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="hidden sm:flex">
            <Save size={18} className="mr-2" />
            Salvar Rascunho
          </Button>
          <Button onClick={handleSubmit} isLoading={isSubmitting}>
            <Send size={18} className="mr-2" />
            Enviar para Correção
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <input
          type="text"
          placeholder="Título da Redação (Opcional)"
          className="w-full text-lg font-medium placeholder-slate-400 border-none focus:ring-0 px-0 border-b border-slate-200 pb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="relative">
          <textarea
            className="w-full h-[60vh] resize-none p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-slate-700 leading-relaxed text-base"
            placeholder="Comece a escrever aqui..."
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <div className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
            {wordCount} palavras
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-sm font-semibold text-blue-900">Dica Turbo</h4>
          <p className="text-sm text-blue-700 mt-1">
            Lembre-se de estruturar seu texto em 4 parágrafos: Introdução, Desenvolvimento 1, Desenvolvimento 2 e Conclusão com Proposta de Intervenção.
          </p>
        </div>
      </div>
      
      {/* Mobile Only Save Button */}
      <div className="sm:hidden pb-8">
        <Button variant="outline" className="w-full">
          <Save size={18} className="mr-2" />
          Salvar Rascunho
        </Button>
      </div>
    </div>
  );
};