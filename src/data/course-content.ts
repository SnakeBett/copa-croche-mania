export interface Lesson {
  id: string;
  title: string;
  type: "video" | "pdf";
  duration?: string;
  videoUrl?: string;
  pdfUrl?: string;
  thumbnail?: string;
}

export interface CourseModule {
  id: string;
  icon: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const courseModules: CourseModule[] = [
  {
    id: "mod-1",
    icon: "👜",
    title: "Bolsas Temáticas",
    description: "Modelos exclusivos nas cores do Brasil",
    lessons: [
      { id: "1-1", title: "Introdução às Bolsas Temáticas", type: "video", duration: "12:30", videoUrl: "" },
      { id: "1-2", title: "Bolsa Bandeira do Brasil", type: "video", duration: "28:45", videoUrl: "" },
      { id: "1-3", title: "Bolsa Torcedora Verde e Amarelo", type: "video", duration: "35:10", videoUrl: "" },
      { id: "1-4", title: "Receitas Bolsas - PDF Completo", type: "pdf", pdfUrl: "" },
    ],
  },
  {
    id: "mod-2",
    icon: "🍽️",
    title: "Sousplats Decorativos",
    description: "Peças para mesas de jogos e confraternizações",
    lessons: [
      { id: "2-1", title: "Sousplat Redondo Copa", type: "video", duration: "22:15", videoUrl: "" },
      { id: "2-2", title: "Sousplat Estrela do Brasil", type: "video", duration: "30:00", videoUrl: "" },
      { id: "2-3", title: "Variações de Cores e Tamanhos", type: "video", duration: "18:20", videoUrl: "" },
      { id: "2-4", title: "Receitas Sousplats - PDF Completo", type: "pdf", pdfUrl: "" },
    ],
  },
  {
    id: "mod-3",
    icon: "🧶",
    title: "Acessórios Variados",
    description: "Faixas, porta-copos e muito mais",
    lessons: [
      { id: "3-1", title: "Porta-copos Temáticos", type: "video", duration: "15:40", videoUrl: "" },
      { id: "3-2", title: "Faixa de Cabelo Copa", type: "video", duration: "20:30", videoUrl: "" },
      { id: "3-3", title: "Chaveiros e Mini Peças", type: "video", duration: "25:10", videoUrl: "" },
      { id: "3-4", title: "Receitas Acessórios - PDF Completo", type: "pdf", pdfUrl: "" },
    ],
  },
  {
    id: "mod-4",
    icon: "🎨",
    title: "Combinações de Cores",
    description: "Paletas que valorizam cada peça",
    lessons: [
      { id: "4-1", title: "Paleta Verde e Amarelo", type: "video", duration: "14:00", videoUrl: "" },
      { id: "4-2", title: "Combinações com Azul e Branco", type: "video", duration: "16:30", videoUrl: "" },
      { id: "4-3", title: "Guia de Cores - PDF", type: "pdf", pdfUrl: "" },
    ],
  },
  {
    id: "mod-5",
    icon: "✨",
    title: "Acabamentos Profissionais",
    description: "Técnicas para um resultado impecável",
    lessons: [
      { id: "5-1", title: "Acabamento Invisível", type: "video", duration: "18:00", videoUrl: "" },
      { id: "5-2", title: "Costuras e Emendas Perfeitas", type: "video", duration: "22:45", videoUrl: "" },
      { id: "5-3", title: "Lavagem e Conservação", type: "video", duration: "10:15", videoUrl: "" },
      { id: "5-4", title: "Guia de Acabamentos - PDF", type: "pdf", pdfUrl: "" },
    ],
  },
  {
    id: "mod-6",
    icon: "🎁",
    title: "Bônus: Peças para Presente",
    description: "Itens ideais para vender como presente",
    lessons: [
      { id: "6-1", title: "Kit Presente Copa", type: "video", duration: "25:00", videoUrl: "" },
      { id: "6-2", title: "Embalagens Criativas", type: "video", duration: "12:00", videoUrl: "" },
      { id: "6-3", title: "Guia de Precificação e Vendas - PDF", type: "pdf", pdfUrl: "" },
    ],
  },
];

export const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);
export const totalVideos = courseModules.reduce(
  (acc, m) => acc + m.lessons.filter((l) => l.type === "video").length,
  0,
);
export const totalPdfs = courseModules.reduce(
  (acc, m) => acc + m.lessons.filter((l) => l.type === "pdf").length,
  0,
);
