import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Play,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Video,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  courseModulesRedinha,
  totalLessonsRedinha,
  totalVideosRedinha,
  type Lesson,
  type CourseModule,
} from "@/data/course-content-redinha";

const STORAGE_KEY = "redinha-croche-progress";
const modules = courseModulesRedinha;
const allLessons = modules.flatMap((m) => m.lessons.map((l) => ({ lesson: l, module: m })));

function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}
function saveProgress(s: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
}

const ProgressRing = ({ percent, size = 44 }: { percent: number; size?: number }) => {
  const r = (size - 5) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={3} className="text-rose-200" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={3} strokeDasharray={c} strokeDashoffset={c - (percent / 100) * c} strokeLinecap="round" className="text-rose-500 transition-all duration-700" />
    </svg>
  );
};

const LessonRow = ({
  lesson,
  isActive,
  isDone,
  onSelect,
  onToggle,
  variant,
}: {
  lesson: Lesson;
  isActive: boolean;
  isDone: boolean;
  onSelect: () => void;
  onToggle: () => void;
  variant: "mobile" | "desktop";
}) => {
  const mob = variant === "mobile";
  return (
    <div
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      role="button"
      tabIndex={0}
      className={`group flex items-center gap-3 cursor-pointer transition-colors touch-manipulation ${
        mob ? "px-4 min-h-[56px] py-3" : "px-3 py-2"
      } ${isActive ? "bg-rose-50" : "hover:bg-gray-50 active:bg-gray-100"}`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="shrink-0 touch-manipulation"
        aria-label={isDone ? "Desmarcar" : "Marcar como concluída"}
      >
        <CheckCircle2 className={`transition-colors ${mob ? "w-5 h-5" : "w-4 h-4"} ${isDone ? "text-rose-500 fill-rose-100" : "text-gray-300"}`} />
      </button>
      <div className={`shrink-0 rounded-lg flex items-center justify-center ${mob ? "w-9 h-9" : "w-7 h-7"} ${isActive ? "bg-rose-100" : "bg-gray-100"}`}>
        {lesson.type === "video"
          ? <Play className={`${mob ? "w-4 h-4" : "w-3.5 h-3.5"} ${isActive ? "text-rose-600" : "text-gray-400"}`} />
          : <FileText className={`${mob ? "w-4 h-4" : "w-3.5 h-3.5"} ${isActive ? "text-rose-600" : "text-gray-400"}`} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`leading-snug truncate ${mob ? "text-sm" : "text-xs"} ${isActive ? "text-rose-700 font-semibold" : "text-gray-700"}`}>
          {lesson.title}
        </p>
        {lesson.duration && <p className="text-[11px] text-gray-400 mt-0.5">{lesson.duration}</p>}
      </div>
      {isActive && <div className={`shrink-0 rounded-full bg-rose-500 ${mob ? "w-1.5 h-8" : "w-1 h-6"}`} />}
    </div>
  );
};

const ModuleCard = ({
  mod,
  isOpen,
  onToggle,
  completed,
  toggleCompleted,
  activeLesson,
  selectLesson,
  variant,
}: {
  mod: CourseModule;
  isOpen: boolean;
  onToggle: () => void;
  completed: Set<string>;
  toggleCompleted: (id: string) => void;
  activeLesson: Lesson;
  selectLesson: (mod: CourseModule, lesson: Lesson) => void;
  variant: "mobile" | "desktop";
}) => {
  const done = mod.lessons.filter((l) => completed.has(l.id)).length;
  const pct = mod.lessons.length > 0 ? (done / mod.lessons.length) * 100 : 0;
  const allDone = done === mod.lessons.length;
  const mob = variant === "mobile";

  return (
    <div className={`bg-white border overflow-hidden transition-all ${mob ? "rounded-2xl shadow-sm" : "rounded-xl"} ${allDone ? "border-rose-200" : "border-gray-200"}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center text-left touch-manipulation transition-colors hover:bg-gray-50 active:bg-gray-100 ${mob ? "gap-4 px-4 py-4" : "gap-3 px-3 py-3"}`}
      >
        <div className="relative shrink-0">
          <ProgressRing percent={pct} size={mob ? 48 : 40} />
          <span className={`absolute inset-0 flex items-center justify-center ${mob ? "text-xl" : "text-lg"}`}>
            {allDone ? "✅" : mod.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-gray-800 leading-snug truncate ${mob ? "text-[15px]" : "text-sm"}`}>{mod.title}</p>
          {mob && <p className="text-xs text-gray-400 mt-0.5 truncate">{mod.description}</p>}
          <p className={`text-gray-400 mt-0.5 ${mob ? "text-[11px]" : "text-[10px]"}`}>{done}/{mod.lessons.length} concluídas</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
      </button>
      {isOpen && (
        <div className={`border-t divide-y ${mob ? "divide-gray-100 border-gray-100" : "divide-gray-50 border-gray-100"}`}>
          {mod.lessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              isActive={activeLesson.id === lesson.id}
              isDone={completed.has(lesson.id)}
              onSelect={() => selectLesson(mod, lesson)}
              onToggle={() => toggleCompleted(lesson.id)}
              variant={variant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const VideoPlayer = ({ lesson }: { lesson: Lesson }) => {
  if (lesson.type !== "video") {
    return (
      <div className="aspect-video bg-gradient-to-br from-amber-50 to-rose-50 flex flex-col items-center justify-center gap-3 p-6">
        <FileText className="w-10 h-10 text-rose-300" />
        <p className="font-semibold text-lg text-gray-700 text-center">{lesson.title}</p>
        {lesson.pdfUrl ? (
          <a href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold text-sm px-6 py-3 rounded-xl">
            Baixar PDF
          </a>
        ) : (
          <p className="text-sm text-gray-400">PDF será disponibilizado em breve</p>
        )}
      </div>
    );
  }
  if (!lesson.videoUrl) {
    return (
      <div className="aspect-video bg-gradient-to-br from-rose-900 to-amber-900 flex flex-col items-center justify-center text-white gap-3">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <Play className="w-8 h-8 ml-0.5" />
        </div>
        <p className="text-sm text-white/70">Vídeo será disponibilizado em breve</p>
      </div>
    );
  }
  return (
    <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
      <iframe
        key={lesson.id}
        src={lesson.videoUrl}
        title={lesson.title}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const LessonInfo = ({
  lesson,
  mod,
  isDone,
  onConclude,
  onUnconclude,
  mobile = false,
}: {
  lesson: Lesson;
  mod: CourseModule;
  isDone: boolean;
  onConclude: () => void;
  onUnconclude: () => void;
  mobile?: boolean;
}) => (
  <div className={`space-y-3 ${mobile ? "px-4 py-4" : "px-5 py-5"}`}>
    <div className={mobile ? "space-y-3" : "flex items-start justify-between gap-4"}>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-rose-500 mb-1">{mod.icon} {mod.title}</p>
        <h2 className={`font-bold text-gray-800 leading-snug ${mobile ? "text-lg" : "text-xl"}`}>{lesson.title}</h2>
        {lesson.description && <p className="text-sm text-gray-400 mt-1">{lesson.description}</p>}
      </div>
      <button
        onClick={isDone ? onUnconclude : onConclude}
        className={`flex items-center justify-center gap-2 font-semibold text-sm rounded-xl transition-all touch-manipulation ${
          mobile ? "w-full min-h-[48px] py-3" : "shrink-0 px-4 py-2.5"
        } ${isDone ? "bg-rose-50 text-rose-500" : "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md hover:shadow-lg"}`}
      >
        {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
        {isDone ? "Concluída" : "Concluir Aula"}
      </button>
    </div>
    {lesson.duration && (
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <Clock className="w-3.5 h-3.5" />
        Duração: {lesson.duration}
      </div>
    )}
  </div>
);

const NavButtons = ({
  prev,
  next,
  isDone,
  onPrev,
  onNext,
}: {
  prev: string | null;
  next: string | null;
  isDone: boolean;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="grid grid-cols-2 gap-3">
    <button
      onClick={onPrev}
      disabled={!prev}
      className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-3 min-h-[56px] text-left transition-all touch-manipulation disabled:opacity-40"
    >
      <ChevronLeft className="w-5 h-5 text-gray-400 shrink-0" />
      <div className="min-w-0 overflow-hidden">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Anterior</p>
        <p className="font-semibold text-xs text-gray-700 line-clamp-2 leading-tight">{prev ?? "---"}</p>
      </div>
    </button>
    <button
      onClick={onNext}
      disabled={!next}
      className={`flex items-center gap-2 rounded-xl px-3 py-3 min-h-[56px] text-right transition-all touch-manipulation disabled:opacity-40 ${
        isDone && next ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md" : "bg-white border border-gray-200"
      }`}
    >
      <div className="min-w-0 overflow-hidden flex-1">
        <p className={`text-[10px] uppercase tracking-wide ${isDone && next ? "text-white/70" : "text-gray-400"}`}>Próxima</p>
        <p className={`font-semibold text-xs line-clamp-2 leading-tight ${isDone && next ? "text-white" : "text-gray-700"}`}>{next ?? "---"}</p>
      </div>
      <ChevronRight className={`w-5 h-5 shrink-0 ${isDone && next ? "text-white/70" : "text-gray-400"}`} />
    </button>
  </div>
);

const ProgressBar = ({ percent, className = "" }: { percent: number; className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
      <div className="h-full bg-white/90 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
    </div>
    <span className="text-xs font-semibold tabular-nums">{percent}%</span>
  </div>
);

export default function Redinha() {
  const [openMods, setOpenMods] = useState<string[]>([modules[0].id]);
  const [active, setActive] = useState<Lesson>(modules[0].lessons[0]);
  const [activeMod, setActiveMod] = useState<CourseModule>(modules[0]);
  const [completed, setCompleted] = useState<Set<string>>(loadProgress);
  const [mobileTab, setMobileTab] = useState<string>("modulos");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => { saveProgress(completed); }, [completed]);

  const toggle = useCallback((id: string) => {
    setOpenMods((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  }, []);

  const pick = useCallback((mod: CourseModule, lesson: Lesson) => {
    setActive(lesson);
    setActiveMod(mod);
    setOpenMods((p) => p.includes(mod.id) ? p : [...p, mod.id]);
  }, []);

  const pickAndSwitch = useCallback((mod: CourseModule, lesson: Lesson) => {
    pick(mod, lesson);
    setMobileTab("aula");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pick]);

  const toggleDone = useCallback((id: string) => {
    setCompleted((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const idx = useMemo(() => allLessons.findIndex((l) => l.lesson.id === active.id), [active.id]);
  const prev = idx > 0 ? allLessons[idx - 1] : null;
  const next = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

  const conclude = useCallback(() => {
    setCompleted((p) => { const n = new Set(p); n.add(active.id); return n; });
    if (next) setTimeout(() => navRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
  }, [active.id, next]);

  const doneCount = completed.size;
  const pct = totalLessonsRedinha > 0 ? Math.round((doneCount / totalLessonsRedinha) * 100) : 0;
  const isDone = completed.has(active.id);

  const moduleList = (variant: "mobile" | "desktop") => (
    <div className={variant === "mobile" ? "space-y-3" : "space-y-2"}>
      {modules.map((mod) => (
        <ModuleCard
          key={mod.id}
          mod={mod}
          isOpen={openMods.includes(mod.id)}
          onToggle={() => toggle(mod.id)}
          completed={completed}
          toggleCompleted={toggleDone}
          activeLesson={active}
          selectLesson={variant === "mobile" ? pickAndSwitch : pick}
          variant={variant}
        />
      ))}
    </div>
  );

  const lessonContent = (mobile: boolean) => (
    <div className="space-y-4">
      <div className={`bg-white overflow-hidden shadow-sm ${mobile ? "rounded-xl border border-gray-200" : "rounded-2xl border border-gray-200"}`}>
        <VideoPlayer lesson={active} />
        <LessonInfo
          lesson={active}
          mod={activeMod}
          isDone={isDone}
          onConclude={conclude}
          onUnconclude={() => toggleDone(active.id)}
          mobile={mobile}
        />
      </div>
      <div ref={navRef}>
        <NavButtons
          prev={prev?.lesson.title ?? null}
          next={next?.lesson.title ?? null}
          isDone={isDone}
          onPrev={() => prev && (mobile ? pickAndSwitch : pick)(prev.module, prev.lesson)}
          onNext={() => next && (mobile ? pickAndSwitch : pick)(next.module, next.lesson)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Welcome popup */}
      <Dialog open={welcomeOpen} onOpenChange={setWelcomeOpen}>
        <DialogContent className="max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] p-0 gap-0 overflow-hidden border-0 shadow-2xl [&>button]:right-2 [&>button]:top-2 [&>button]:bg-black/40 [&>button]:text-white [&>button]:hover:bg-black/60 [&>button]:rounded-full [&>button]:z-10">
          <img src="/images/boasvindas.jpeg" alt="Bem-vinda!" className="w-full h-auto max-h-[85vh] object-contain" />
        </DialogContent>
      </Dialog>

      {/* ===== MOBILE (< lg) ===== */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <Tabs value={mobileTab} onValueChange={setMobileTab}>
          <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg pt-[env(safe-area-inset-top)]">
            <div className="px-4 pt-3 pb-3 space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-base leading-tight">Curso Redinha</h1>
                <ProgressBar percent={pct} className="w-28" />
              </div>
              <TabsList className="w-full grid grid-cols-2 h-11 bg-white/15 backdrop-blur-sm p-1 rounded-xl">
                <TabsTrigger value="modulos" className="rounded-lg text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm text-white/80">
                  Módulos
                </TabsTrigger>
                <TabsTrigger value="aula" className="rounded-lg text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm text-white/80">
                  Aula
                </TabsTrigger>
              </TabsList>
            </div>
          </header>

          <TabsContent value="modulos" className="flex-1 mt-0 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rose-500" />
                Módulos
              </h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">{doneCount} de {totalLessonsRedinha}</span>
            </div>
            {moduleList("mobile")}
          </TabsContent>

          <TabsContent value="aula" className="flex-1 mt-0 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {lessonContent(true)}
          </TabsContent>
        </Tabs>
      </div>

      {/* ===== DESKTOP (>= lg) ===== */}
      <div className="hidden lg:flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg">
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
            <div>
              <h1 className="font-bold text-xl leading-tight">Curso Redinha</h1>
              <p className="text-white/70 text-xs">Área de Membros</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-xs text-white/70">
                <Video className="w-4 h-4" /> {totalVideosRedinha} vídeos
              </span>
              <ProgressBar percent={pct} className="w-32" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex max-w-[1400px] mx-auto w-full">
          {/* Sidebar */}
          <aside className="w-80 shrink-0 border-r border-gray-200 bg-white overflow-y-auto" style={{ height: "calc(100vh - 3.5rem)", position: "sticky", top: "3.5rem" }}>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-rose-500" />
                  Módulos
                </h2>
                <span className="text-[11px] text-gray-400 font-medium">{doneCount}/{totalLessonsRedinha}</span>
              </div>
              {moduleList("desktop")}
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 p-6">
            {lessonContent(false)}
          </main>
        </div>
      </div>
    </div>
  );
}
