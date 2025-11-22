import React from 'react';
import { CheckCircle, Lock, Zap, BookOpen } from 'lucide-react';
import { Button } from './Button';
import { COPY_SNIPPETS, PLANS } from '../constants';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-brand-600">Redação Turbo</span>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onLogin}>Entrar</Button>
            <Button onClick={onLogin}>Começar Agora</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            🚀 {COPY_SNIPPETS.socialProof}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Sua nota <span className="text-brand-600">1000 no ENEM</span> <br/>começa aqui.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Correção instantânea por IA baseada nas 5 competências oficiais. 
            Receba feedback detalhado e reescritas inteligentes por apenas <strong>R$ 9,90/mês</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={onLogin} className="w-full sm:w-auto h-14 text-lg shadow-xl shadow-brand-500/30">
              Quero corrigir minha redação
            </Button>
            <p className="text-sm text-slate-500 mt-2 sm:mt-0">
              <Lock className="inline w-4 h-4 mr-1" /> Cancelamento fácil a qualquer momento
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Correção em Segundos</h3>
              <p className="text-slate-600">{COPY_SNIPPETS.speed}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-6">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Critérios Oficiais</h3>
              <p className="text-slate-600">{COPY_SNIPPETS.authority}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Evolução Constante</h3>
              <p className="text-slate-600">{COPY_SNIPPETS.transformation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 px-4">
        <div className="max-w-lg mx-auto bg-slate-900 rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-teal-400"></div>
           <h2 className="text-3xl font-bold mb-2">Plano Turbo</h2>
           <div className="flex items-baseline justify-center my-6">
             <span className="text-5xl font-extrabold">{PLANS.MONTHLY.price}</span>
             <span className="text-slate-400 ml-2">{PLANS.MONTHLY.period}</span>
           </div>
           <ul className="space-y-4 text-left mb-8 max-w-xs mx-auto">
             {PLANS.MONTHLY.features.map((feat, i) => (
               <li key={i} className="flex items-center text-slate-300">
                 <CheckCircle className="text-brand-400 w-5 h-5 mr-3 flex-shrink-0" />
                 {feat}
               </li>
             ))}
           </ul>
           <Button size="lg" onClick={onLogin} className="w-full bg-white text-slate-900 hover:bg-brand-50">
             Assinar Agora
           </Button>
           <p className="text-xs text-slate-500 mt-4">Pagamento seguro via Stripe. 7 dias de garantia.</p>
        </div>
      </section>

      <footer className="bg-slate-50 py-12 text-center text-slate-400 text-sm border-t border-slate-200">
        <p>&copy; 2023 Redação Turbo. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};