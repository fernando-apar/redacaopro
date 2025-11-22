import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, FileText, TrendingUp, Calendar } from 'lucide-react';
import { Button } from './Button';
import { mockFetchHistory } from '../services/api';
import { MOCK_THEMES } from '../constants';

interface DashboardHomeProps {
  onNewEssay: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNewEssay }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockFetchHistory().then(data => {
      setHistory(data);
      setLoading(false);
    });
  }, []);

  const lastScore = history.length > 0 ? history[history.length - 1].score : 0;
  const avgScore = history.length > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, Aluno!</h1>
          <p className="text-slate-500">Vamos em busca do 1000 hoje?</p>
        </div>
        <Button onClick={onNewEssay} size="lg" className="shadow-lg shadow-brand-500/20">
          <Plus size={20} className="mr-2" />
          Nova Redação
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium text-sm">Última Nota</h3>
            <FileText className="text-brand-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{loading ? '...' : lastScore}</div>
          <div className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp size={12} className="mr-1" /> +40pts vs anterior
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium text-sm">Média Geral</h3>
            <TrendingUp className="text-teal-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{loading ? '...' : avgScore}</div>
          <div className="text-xs text-slate-400 mt-1">Baseado em 5 redações</div>
        </div>

        <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-6 rounded-xl shadow-sm text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-brand-100 font-medium text-sm">Meta da Semana</h3>
            <Calendar className="text-brand-100" size={20} />
          </div>
          <div className="text-3xl font-bold">1/2</div>
          <div className="text-xs text-brand-100 mt-1">Redações entregues</div>
          <div className="mt-3 h-1.5 bg-brand-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-white/90 w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Sua Evolução</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 1000]} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  dot={{fill: '#4f46e5', strokeWidth: 2, r: 4}} 
                  activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Themes */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Temas em Alta</h3>
          <div className="space-y-4">
            {MOCK_THEMES.map(theme => (
              <div key={theme.id} className="group cursor-pointer">
                <div className="text-sm font-medium text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {theme.title}
                </div>
                <div className="text-xs text-slate-400 mt-1">Adicionado em {theme.date}</div>
                <div className="mt-2 border-b border-slate-100"></div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-brand-600">Ver todos os temas</Button>
        </div>
      </div>
    </div>
  );
};