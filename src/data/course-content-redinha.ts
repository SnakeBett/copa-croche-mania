export interface Lesson {
  id: string;
  title: string;
  type: "video" | "pdf";
  duration?: string;
  videoUrl?: string;
  pdfUrl?: string;
  description?: string;
}

export interface CourseModule {
  id: string;
  icon: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const courseModulesRedinha: CourseModule[] = [
  {
    id: "redinha-01",
    icon: "🧶",
    title: "Aula 01 - Redinha tradicional",
    description: "Do início ao fim da redinha clássica",
    lessons: [
      { id: "r1-1", title: "Boas Vindas - Materiais Necessário", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/4b115e78-dcb1-403b-a1f7-1ee7d71c0688/play_1080p.mp4" },
      { id: "r1-2", title: "Primeira Parte - Base da redinha - Inicio", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/28000549-9f5d-42d8-be4e-5526463e8ee8/play_1080p.mp4" },
      { id: "r1-3", title: "Segunda Parte: Fazendo os punhos e argolas da nossa Redinha", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/9ca68912-75c8-4fad-8430-5690acf54d13/play_1080p.mp4" },
      { id: "r1-4", title: "Terceira parte: Fazendo o Barradinho da Rede", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/115655e4-d58c-4ad6-bf23-2cb88b423122/play_1080p.mp4" },
      { id: "r1-5", title: "Finalização: Colocando as Franjas", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/21e4f39d-0233-4c23-9d0b-468786015cf3/play_1080p.mp4" },
      { id: "r1-6", title: "Costurando a Etiqueta na peça", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/3422e677-a73e-4031-81f7-4932d2773f3f/play_1080p.mp4" },
      { id: "r1-7", title: "Instruções finais: Pesos e medidas", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/12921b86-5077-428c-9f1e-8fee67dc1e0d/play_1080p.mp4" },
    ],
  },
  {
    id: "redinha-02",
    icon: "🌈",
    title: "Aula 02 - Redinha Arco Íris",
    description: "Redinha colorida com barbante fio 6 e agulha 3,5mm",
    lessons: [
      { id: "r2-1", title: "Instruções iniciais, cores usadas", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/12921b86-5077-428c-9f1e-8fee67dc1e0d/play_1080p.mp4", description: "Cores: Vermelho, laranja, azul, azul royal, verde jade, amarelo, roxo" },
      { id: "r2-2", title: "Base da Redinha - Retângulo", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/a1349c5f-8a89-4370-b4da-02401c40877a/play_1080p.mp4", description: "90 correntinhas. Carreiras com pontos altos, vai e vem 30 vezes. 5 vermelho, 4 laranja, 4 azul bebê, 4 azul royal, 4 amarelo, 4 verde, 5 roxo." },
      { id: "r2-3", title: "Punhos da rede", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/8cab07ed-a176-4ff0-8dff-68e1998fe6a3/play_1080p.mp4", description: "Quantidade de correntinhas pode ser alterada (ex: 65 para 80 ou 100)." },
      { id: "r2-4", title: "Finalização com pontos baixos e franjas", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/b082d744-a079-4077-aab7-aaee41f7b8cc/play_1080p.mp4" },
      { id: "r2-5", title: "Medidas e peso da Rede arco-íris", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/b082d744-a079-4077-aab7-aaee41f7b8cc/play_1080p.mp4", description: "103×47 cm, peso ~450g" },
    ],
  },
  {
    id: "redinha-03",
    icon: "🥕",
    title: "Aula 03 - Rede Cenourinha",
    description: "Rede com detalhes em formato de cenoura",
    lessons: [
      { id: "r3-1", title: "Instruções Iniciais - Materiais usados", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/e4028f3c-b6bd-40e6-8c90-eb504a9fc7fd/play_1080p.mp4" },
      { id: "r3-2", title: "Base da Rede Cenourinha", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/392c9b54-d5d1-4724-ab6d-7207f1a9ba3a/play_1080p.mp4" },
      { id: "r3-3", title: "Cenourinhas + Punhos da rede", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/3371e9f4-5ed6-4aba-8912-8bf87d8323c0/play_1080p.mp4" },
      { id: "r3-4", title: "Barradinho e franjas", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/5685e9ce-7ba3-45d7-bfe0-2c192a8c7d9d/play_1080p.mp4" },
      { id: "r3-5", title: "Finalização + Informações sobre pesos e medidas", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/63308daf-d5e5-479d-968e-f3211b5b86fc/play_1080p.mp4", description: "105 cm comprimento × 46 cm largura" },
    ],
  },
  {
    id: "redinha-04",
    icon: "🔧",
    title: "Aula 04 - Passo a Passo Suporte de Cano PVC",
    description: "Suporte para redinha de gatos",
    lessons: [
      { id: "r4-1", title: "Suporte de cano 20mm para redinha de gatos", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/04a8068b-e3bc-45a1-8568-5df399af25a1/play_1080p.mp4" },
    ],
  },
  {
    id: "redinha-bonus1",
    icon: "❤️",
    title: "Bônus 1 - Tapete Coração",
    description: "Tapete em formato de coração",
    lessons: [
      { id: "rb1-1", title: "Instruções iniciais para reproduzir o tapete Coração", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/04a8068b-e3bc-45a1-8568-5df399af25a1/play_1080p.mp4" },
      { id: "rb1-2", title: "AULA TAPETE CORAÇÃO", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/7ee8f2aa-b86a-43ee-8a09-6238484dda8d/play_1080p.mp4" },
      { id: "rb1-3", title: "Medidas tapete coração", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/614c261c-10f9-4001-b08c-adf44240a337/play_1080p.mp4" },
    ],
  },
  {
    id: "redinha-bonus2",
    icon: "🎀",
    title: "Bônus 2 - Atualização punhos",
    description: "Punhos versão 2",
    lessons: [
      { id: "rb2-1", title: "Punhos 2", type: "video", videoUrl: "https://vz-bcd8a9ce-220.b-cdn.net/b968a682-1dbe-49a9-97f4-65b74c9facf5/play_1080p.mp4" },
    ],
  },
];

export const totalLessonsRedinha = courseModulesRedinha.reduce((acc, m) => acc + m.lessons.length, 0);
export const totalVideosRedinha = courseModulesRedinha.reduce(
  (acc, m) => acc + m.lessons.filter((l) => l.type === "video").length,
  0,
);
export const totalPdfsRedinha = courseModulesRedinha.reduce(
  (acc, m) => acc + m.lessons.filter((l) => l.type === "pdf").length,
  0,
);
