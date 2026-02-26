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

const embed = (id: string) =>
  `https://iframe.mediadelivery.net/embed/405336/${id}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;

/** URL do PDF informativo (Boas-vindas). Uso em /areademembros/copabrasil */
export const PDF_INFORMATIVO_URL = "/images/pdf-informativo-croche.pdf";

export const WELCOME_LESSON_ID = "copa-welcome-1";

export const courseModulesCopa: CourseModule[] = [
  {
    id: "copa-welcome",
    icon: "👋",
    title: "Boas-vindas",
    description: "Acesso ao curso",
    lessons: [
      {
        id: WELCOME_LESSON_ID,
        title: "Aviso importante",
        type: "pdf",
        pdfUrl: PDF_INFORMATIVO_URL,
        description: "Baixe o PDF informativo para saber do acesso ao seu curso.",
      },
    ],
  },
  {
    id: "copa-mod1",
    icon: "👜",
    title: "Módulo 01 - Bolsas Temáticas",
    description: "Modelos exclusivos nas cores do Brasil",
    lessons: [
      { id: "c1-1", title: "Introdução às Bolsas Temáticas", type: "video", videoUrl: embed("6fb35b88-5ad5-47e0-8540-c9ca94decb19") },
      { id: "c1-2", title: "Bolsa Bandeira do Brasil", type: "video", videoUrl: embed("a8c8aea6-8e71-4511-a8a9-b9b35c24e0ea") },
      { id: "c1-3", title: "Bolsa Torcedora Verde e Amarelo", type: "video", videoUrl: embed("fa732ea3-cff3-4e9b-9623-92f66f04f18e") },
      { id: "c1-4", title: "Acabamento e Detalhes Finais", type: "video", videoUrl: embed("1464a199-6ac1-4845-aa75-e69135811825") },
    ],
  },
  {
    id: "copa-mod2",
    icon: "🍽️",
    title: "Módulo 02 - Sousplats Decorativos",
    description: "Peças para mesas de jogos e confraternizações",
    lessons: [
      { id: "c2-1", title: "Sousplat Redondo Copa", type: "video", videoUrl: embed("1fcaa02d-82bb-46a6-a498-14737b006147") },
      { id: "c2-2", title: "Sousplat Estrela do Brasil", type: "video", videoUrl: embed("55c7575e-0aaf-4a21-babc-e58ecbc4dd77") },
      { id: "c2-3", title: "Variações de Cores e Tamanhos", type: "video", videoUrl: embed("548f3878-0590-4014-8175-10a8d8f4f1ca") },
      { id: "c2-4", title: "Acabamento e Montagem Final", type: "video", videoUrl: embed("70c1fbd8-8034-4e51-8e61-8848a57e8e35") },
    ],
  },
  {
    id: "copa-mod3",
    icon: "🧶",
    title: "Módulo 03 - Acessórios Variados",
    description: "Faixas, porta-copos e muito mais",
    lessons: [
      { id: "c3-1", title: "Porta-copos Temáticos", type: "video", videoUrl: embed("5d4c9bd9-be42-4d49-b7a8-58156a88f245") },
      { id: "c3-2", title: "Faixa de Cabelo Copa", type: "video", videoUrl: embed("822ed207-6445-492b-a855-29daf582d4f3") },
      { id: "c3-3", title: "Chaveiros e Mini Peças", type: "video", videoUrl: embed("bdae75be-2795-4993-800a-27b8cf893a9f") },
    ],
  },
  {
    id: "copa-mod4",
    icon: "🇧🇷",
    title: "Módulo 04 - Linha Brasil da Copa",
    description: "Curso especial linha Brasil em crochê",
    lessons: [
      { id: "c4-1", title: "Curso Linha Brasil da Copa em Crochê", type: "video", videoUrl: embed("af571f7d-194b-4d1d-be17-595cbc52eb60") },
    ],
  },
];

export const totalLessonsCopa = courseModulesCopa.reduce((a, m) => a + m.lessons.length, 0);
export const totalVideosCopa = courseModulesCopa.reduce((a, m) => a + m.lessons.filter((l) => l.type === "video").length, 0);
