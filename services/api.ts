import { Essay, CompetencyScore } from '../types';

// Simulates network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockGenerateCorrection = async (content: string): Promise<{ score: CompetencyScore; feedback: string }> => {
  await delay(2500); // Simulate LLM processing time

  // Simple deterministic mock logic based on length just to vary results slightly
  const baseScore = content.length > 500 ? 160 : 120; 
  
  return {
    score: {
      c1: baseScore,
      c2: baseScore + 20,
      c3: baseScore,
      c4: baseScore + 20,
      c5: baseScore - 20,
    },
    feedback: `
      ### Análise Geral
      Sua redação apresenta uma boa estrutura dissertativa-argumentativa. Você compreendeu bem o tema e mobilizou repertório sociocultural produtivo.
      
      ### Pontos de Atenção
      1. **Competência 1 (Norma Culta):** Atenção ao uso da crase e concordância nominal no segundo parágrafo.
      2. **Competência 3 (Argumentação):** O argumento sobre a negligência estatal poderia ser mais aprofundado com dados estatísticos.
      3. **Competência 5 (Proposta):** Lembre-se de detalhar o AGENTE e o MEIO/MODO da sua proposta de intervenção.
      
      ### Sugestão de Reescrita para a Conclusão
      "Portanto, cabe ao Ministério da Educação, em parceria com as secretarias estaduais, promover palestras e debates nas escolas..."
    `
  };
};

export const mockFetchHistory = async (): Promise<any[]> => {
  await delay(500);
  return [
    { date: '01/10', score: 620 },
    { date: '08/10', score: 740 },
    { date: '15/10', score: 780 },
    { date: '22/10', score: 840 },
    { date: '29/10', score: 900 },
  ];
};