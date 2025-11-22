import { Theme } from './types';

export const APP_NAME = "Redação Turbo ENEM";

export const PLANS = {
  MONTHLY: {
    price: "R$ 9,90",
    period: "/mês",
    features: [
      "Correções ilimitadas via IA",
      "Feedback detalhado por competência",
      "Banco de temas atualizado",
      "Histórico de evolução",
      "Modelos Nota 1000"
    ]
  }
};

export const MOCK_THEMES: Theme[] = [
  { id: 1, title: "Desafios para a valorização de comunidades e povos tradicionais no Brasil", date: "2023-10-15" },
  { id: 2, title: "Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil", date: "2023-10-08" },
  { id: 3, title: "O estigma associado às doenças mentais na sociedade brasileira", date: "2023-10-01" },
  { id: 4, title: "Democratização do acesso ao cinema no Brasil", date: "2023-09-24" },
];

export const COPY_SNIPPETS = {
  socialProof: "Mais de 3.000 redações corrigidas por alunos que queriam 900+.",
  authority: "Correções baseadas nos critérios oficiais do INEP e em modelos nota 1000.",
  transformation: "Em 30 dias você verá melhora real na estrutura e argumentação.",
  speed: "Envie sua redação e receba correção em segundos."
};