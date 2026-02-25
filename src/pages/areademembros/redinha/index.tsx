import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Play,
  FileText,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Clock,
  BookOpen,
  Video,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  courseModulesRedinha,
  totalLessonsRedinha,
  totalVideosRedinha,
  totalPdfsRedinha,
  type Lesson,
  type CourseModule,
} from "@/data/course-content-redinha";

const STORAGE_KEY = "redinha-croche-progress";
const courseModules = courseModulesRedinha;

const allLessons = courseModules.flatMap((mod) =>
  mod.lessons.map((lesson) => ({ lesson, module: mod })),
);

function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveProgress(completed: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
}

const ProgressRing = ({ percent, size = 40 }: { percent: number; size?: number }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={3} className="text-border/40" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={3} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="text-accent transition-all duration-700" />
    </svg>
  );
};

const MobileModuleList = ({
  openModules,
  toggleModule,
  completed,
  toggleCompleted,
  activeLesson,
  selectLesson,
}: {
  openModules: string[];
  toggleModule: (id: string) => void;
  completed: Set<string>;
  toggleCompleted: (id: string) => void;
  activeLesson: Lesson;
  selectLesson: (mod: CourseModule, lesson: Lesson) => void;
}) => (
  <div className="space-y-3">
    {courseModules.map((mod) => {
      const isOpen = openModules.includes(mod.id);
      const modCompleted = mod.lessons.filter((l) => completed.has(l.id)).length;
      const modProgress = mod.lessons.length > 0 ? (modCompleted / mod.lessons.length) * 100 : 0;
      const isModDone = modCompleted === mod.lessons.length;

      return (
        <div
          key={mod.id}
          className={`rounded-2xl border overflow-hidden shadow-sm transition-all ${
            isModDone ? "border-accent/40 bg-accent/5" : "border-border bg-card"
          }`}
        >
          <button
            onClick={() => toggleModule(mod.id)}
            className="w-full flex items-center gap-4 px-4 py-4 active:bg-muted/30 transition-colors text-left touch-manipulation"
          >
            <div className="relative shrink-0">
              <ProgressRing percent={modProgress} size={48} />
              <span className="absolute inset-0 flex items-center justify-center text-xl">
                {isModDone ? "✅" : mod.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-bold text-foreground text-[15px] leading-snug">
                {mod.title}
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5 truncate">{mod.description}</p>
              <p className="text-[11px] text-muted-foreground/70 font-body mt-1">
                {modCompleted}/{mod.lessons.length} aulas concluídas
              </p>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
          </button>

          {isOpen && (
            <div className="border-t border-border/60 bg-muted/20">
              {mod.lessons.map((lesson, idx) => {
                const isActive = activeLesson.id === lesson.id;
                const isDone = completed.has(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`flex items-center gap-3 px-4 min-h-[56px] py-3 transition-colors font-body cursor-pointer touch-manipulation ${
                      idx < mod.lessons.length - 1 ? "border-b border-border/30" : ""
                    } ${
                      isActive
                        ? "bg-accent/10"
                        : "active:bg-muted/40"
                    }`}
                    role="button"
                    tabIndex={0}
                    onClick={() => selectLesson(mod, lesson)}
                    onKeyDown={(e) => { if (e.key === "Enter") selectLesson(mod, lesson); }}
                  >
                    <span
                      role="checkbox"
                      aria-checked={isDone}
                      tabIndex={0}
                      className="shrink-0 touch-manipulation"
                      onClick={(e) => { e.stopPropagation(); toggleCompleted(lesson.id); }}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); toggleCompleted(lesson.id); } }}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 transition-colors ${
                          isDone ? "text-accent fill-accent/20" : "text-border"
                        }`}
                      />
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-accent/20" : "bg-muted/60"
                    }`}>
                      {lesson.type === "video" ? (
                        <Play className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                      ) : (
                        <FileText className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`block text-sm leading-snug ${isActive ? "text-accent font-semibold" : "text-foreground"}`}>
                        {lesson.title}
                      </span>
                      {lesson.duration && (
                        <span className="text-[11px] text-muted-foreground">{lesson.duration}</span>
                      )}
                    </div>
                    {isActive && <div className="w-1.5 h-8 bg-accent rounded-full shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    })}
  </div>
);

const DesktopModuleList = ({
  openModules,
  toggleModule,
  completed,
  toggleCompleted,
  activeLesson,
  selectLesson,
}: {
  openModules: string[];
  toggleModule: (id: string) => void;
  completed: Set<string>;
  toggleCompleted: (id: string) => void;
  activeLesson: Lesson;
  selectLesson: (mod: CourseModule, lesson: Lesson) => void;
}) => (
  <div className="space-y-2">
    {courseModules.map((mod) => {
      const isOpen = openModules.includes(mod.id);
      const modCompleted = mod.lessons.filter((l) => completed.has(l.id)).length;
      const modProgress = mod.lessons.length > 0 ? (modCompleted / mod.lessons.length) * 100 : 0;
      const isModDone = modCompleted === mod.lessons.length;

      return (
        <div
          key={mod.id}
          className={`bg-card rounded-xl border overflow-hidden shadow-sm transition-colors ${
            isModDone ? "border-accent/40" : "border-border"
          }`}
        >
          <button
            onClick={() => toggleModule(mod.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors text-left"
          >
            <span className="text-2xl shrink-0">{isModDone ? "✅" : mod.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-body font-semibold text-foreground text-sm truncate">{mod.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-border/50 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${modProgress}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground font-body shrink-0">{modCompleted}/{mod.lessons.length}</span>
              </div>
            </div>
            {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
          </button>
          {isOpen && (
            <div className="border-t border-border">
              {mod.lessons.map((lesson) => {
                const isActive = activeLesson.id === lesson.id;
                const isDone = completed.has(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`flex items-center gap-2 px-4 py-2.5 transition-colors text-sm font-body cursor-pointer ${
                      isActive ? "bg-accent/10 text-accent font-semibold" : "hover:bg-muted/30 text-foreground"
                    }`}
                    role="button"
                    tabIndex={0}
                    onClick={() => selectLesson(mod, lesson)}
                    onKeyDown={(e) => { if (e.key === "Enter") selectLesson(mod, lesson); }}
                  >
                    <span
                      role="checkbox"
                      aria-checked={isDone}
                      tabIndex={0}
                      className="shrink-0 cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); toggleCompleted(lesson.id); }}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); toggleCompleted(lesson.id); } }}
                    >
                      <CheckCircle2 className={`w-4 h-4 transition-colors ${isDone ? "text-accent fill-accent/20" : "text-border"}`} />
                    </span>
                    {lesson.type === "video" ? <Play className="w-3.5 h-3.5 shrink-0 text-muted-foreground" /> : <FileText className="w-3.5 h-3.5 shrink-0 text-secondary" />}
                    <span className="flex-1 truncate text-xs">{lesson.title}</span>
                    {lesson.duration && <span className="text-[10px] text-muted-foreground shrink-0">{lesson.duration}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    })}
  </div>
);

const Redinha = () => {
  const [openModules, setOpenModules] = useState<string[]>([courseModules[0].id]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(courseModules[0].lessons[0]);
  const [activeModule, setActiveModule] = useState<CourseModule>(courseModules[0]);
  const [completed, setCompleted] = useState<Set<string>>(loadProgress);
  const [mobileTab, setMobileTab] = useState<"modulos" | "aula">("modulos");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => { saveProgress(completed); }, [completed]);

  const toggleModule = useCallback((id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }, []);

  const selectLesson = useCallback((mod: CourseModule, lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveModule(mod);
    setOpenModules((prev) => prev.includes(mod.id) ? prev : [...prev, mod.id]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectLessonAndSwitchToAula = useCallback((mod: CourseModule, lesson: Lesson) => {
    selectLesson(mod, lesson);
    setMobileTab("aula");
  }, [selectLesson]);

  const toggleCompleted = useCallback((lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  }, []);

  const currentIndex = useMemo(
    () => allLessons.findIndex((l) => l.lesson.id === activeLesson.id),
    [activeLesson.id],
  );

  const prevEntry = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextEntry = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const markAndAdvance = useCallback(() => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(activeLesson.id);
      return next;
    });
    if (nextEntry) {
      setTimeout(() => {
        navRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  }, [activeLesson.id, nextEntry]);

  const completedCount = completed.size;
  const progress = totalLessonsRedinha > 0 ? Math.round((completedCount / totalLessonsRedinha) * 100) : 0;
  const isCurrentDone = completed.has(activeLesson.id);

  const totalLessons = totalLessonsRedinha;
  const totalVideos = totalVideosRedinha;
  const totalPdfs = totalPdfsRedinha;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden lg:pb-0 pb-[env(safe-area-inset-bottom)]">
      <Dialog open={welcomeOpen} onOpenChange={setWelcomeOpen}>
        <DialogContent className="max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] p-0 gap-0 overflow-hidden border-0 shadow-2xl [&>button]:right-2 [&>button]:top-2 [&>button]:bg-black/40 [&>button]:text-white [&>button]:hover:bg-black/60 [&>button]:rounded-full [&>button]:z-10">
          <img
            src="/images/boasvindas.jpeg"
            alt="Bem-vinda à comunidade Redinhas Pet!"
            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
          />
        </DialogContent>
      </Dialog>

      <Tabs value={mobileTab} onValueChange={(v) => setMobileTab(v as "modulos" | "aula")}>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          {/* Mobile: tabs + progress */}
          <div className="flex flex-col gap-3 lg:hidden">
            <h1 className="font-display font-bold text-base leading-tight truncate">
              Curso Redinha
            </h1>
            <div className="flex items-center gap-3">
              <TabsList className="flex-1 grid grid-cols-2 h-11 bg-white/20 p-1 rounded-lg">
                <TabsTrigger value="modulos" className="data-[state=active]:bg-white data-[state=active]:text-rose-700 data-[state=active]:shadow-sm rounded-md">
                  Módulos
                </TabsTrigger>
                <TabsTrigger value="aula" className="data-[state=active]:bg-white data-[state=active]:text-rose-700 data-[state=active]:shadow-sm rounded-md">
                  Aula
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-14 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/90 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold tabular-nums w-8">{progress}%</span>
              </div>
            </div>
          </div>
          {/* Desktop: original header */}
          <div className="hidden lg:flex items-center justify-between gap-2 min-h-0">
            <div className="flex items-center min-w-0 flex-1">
              <div className="min-w-0">
                <h1 className="font-display font-bold text-lg md:text-xl leading-tight truncate">
                  Curso Redinha
                </h1>
                <p className="text-white/70 text-xs font-body">
                  Área de Conteúdo
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-4 text-xs font-body text-white/70">
                <span className="flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 shrink-0" /> {totalVideos} vídeos
                </span>
                {totalPdfs > 0 && (
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 shrink-0" /> {totalPdfs} PDFs
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/90 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-body font-semibold tabular-nums">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: tab content */}
      <div className="lg:hidden">
          <TabsContent value="modulos" className="mt-0 px-3 py-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Módulos
              </h2>
              <span className="text-xs font-body text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                {completedCount} de {totalLessons}
              </span>
            </div>
            <MobileModuleList
              openModules={openModules}
              toggleModule={toggleModule}
              completed={completed}
              toggleCompleted={toggleCompleted}
              activeLesson={activeLesson}
              selectLesson={selectLessonAndSwitchToAula}
            />
          </TabsContent>
          <TabsContent value="aula" className="mt-0">
            <div className="px-3 py-4 space-y-4">
              <div className="bg-card rounded-xl border border-border shadow-md overflow-hidden">
                {activeLesson.type === "video" ? (
                  activeLesson.videoUrl ? (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        src={activeLesson.videoUrl}
                        title={activeLesson.title}
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-rose-900 to-amber-900 flex flex-col items-center justify-center text-white gap-4">
                      <Play className="w-10 h-10 ml-1" />
                      <p className="font-body text-sm text-white/70">Vídeo será disponibilizado em breve</p>
                    </div>
                  )
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-amber-50 to-rose-50 flex flex-col items-center justify-center gap-4 p-8">
                    <FileText className="w-10 h-10 text-secondary" />
                    <p className="font-display font-bold text-xl text-foreground text-center">{activeLesson.title}</p>
                    {activeLesson.pdfUrl ? (
                      <a href={activeLesson.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-semibold text-sm px-6 py-3 rounded-xl">
                        Baixar PDF
                      </a>
                    ) : (
                      <p className="font-body text-sm text-muted-foreground">PDF será disponibilizado em breve</p>
                    )}
                  </div>
                )}
                <div className="px-4 py-4 space-y-3">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs font-body text-accent font-semibold mb-1">{activeModule.icon} {activeModule.title}</p>
                      <h2 className="font-display font-bold text-lg text-foreground">{activeLesson.title}</h2>
                      {activeLesson.description && <p className="text-sm text-muted-foreground mt-1 font-body">{activeLesson.description}</p>}
                    </div>
                    <button
                      onClick={isCurrentDone ? () => toggleCompleted(activeLesson.id) : markAndAdvance}
                      className={`min-h-[48px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-body font-semibold transition-all touch-manipulation ${
                        isCurrentDone ? "bg-accent/10 text-accent" : "bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md"
                      }`}
                    >
                      {isCurrentDone ? <CheckCircle2 className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
                      {isCurrentDone ? "Concluída" : "Concluir Aula"}
                    </button>
                  </div>
                  {activeLesson.duration && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duração: {activeLesson.duration}</span>
                    </div>
                  )}
                </div>
              </div>
              <div ref={navRef} className="flex gap-3">
                <button
                  onClick={() => prevEntry && selectLesson(prevEntry.module, prevEntry.lesson)}
                  disabled={!prevEntry}
                  className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 min-h-[48px] text-left touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase">Anterior</p>
                    <p className="font-body font-semibold text-xs text-foreground truncate">{prevEntry?.lesson.title ?? "—"}</p>
                  </div>
                </button>
                <button
                  onClick={() => nextEntry && selectLesson(nextEntry.module, nextEntry.lesson)}
                  disabled={!nextEntry}
                  className={`flex-1 flex items-center gap-2 rounded-xl px-4 min-h-[48px] text-right touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed ${
                    isCurrentDone && nextEntry ? "bg-gradient-to-r from-rose-600 to-amber-600 text-white" : "bg-card border border-border"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase">Próxima</p>
                    <p className={`font-body font-semibold text-xs truncate ${isCurrentDone && nextEntry ? "text-white" : "text-foreground"}`}>{nextEntry?.lesson.title ?? "—"}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 shrink-0" />
                </button>
              </div>
            </div>
          </TabsContent>
      </div>
      </Tabs>

      {/* Desktop: original layout */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <aside className="hidden lg:block lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-20 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Módulos
              </h2>
              <span className="text-xs font-body text-muted-foreground">
                {completedCount}/{totalLessons} aulas
              </span>
            </div>
            <DesktopModuleList
              openModules={openModules}
              toggleModule={toggleModule}
              completed={completed}
              toggleCompleted={toggleCompleted}
              activeLesson={activeLesson}
              selectLesson={selectLesson}
            />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="space-y-6">
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border shadow-md overflow-hidden">
              {activeLesson.type === "video" ? (
                <div className="relative">
                  {activeLesson.videoUrl ? (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        src={activeLesson.videoUrl}
                        title={activeLesson.title}
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-rose-900 to-amber-900 flex flex-col items-center justify-center text-white gap-4">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                        <Play className="w-10 h-10 ml-1" />
                      </div>
                      <p className="font-body text-sm text-white/70">
                        Vídeo será disponibilizado em breve
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-amber-50 to-rose-50 flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-20 h-20 rounded-2xl bg-secondary/20 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-secondary" />
                  </div>
                  <p className="font-display font-bold text-xl text-foreground text-center">
                    {activeLesson.title}
                  </p>
                  {activeLesson.pdfUrl ? (
                    <a
                      href={activeLesson.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-semibold font-body text-sm px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
                    >
                      Baixar PDF
                    </a>
                  ) : (
                    <p className="font-body text-sm text-muted-foreground">
                      PDF será disponibilizado em breve
                    </p>
                  )}
                </div>
              )}

              <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs font-body text-accent font-semibold mb-1">
                      {activeModule.icon} {activeModule.title}
                    </p>
                    <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                      {activeLesson.title}
                    </h2>
                    {activeLesson.description && (
                      <p className="text-sm text-muted-foreground mt-1 font-body">
                        {activeLesson.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={isCurrentDone ? () => toggleCompleted(activeLesson.id) : markAndAdvance}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-semibold transition-all ${
                      isCurrentDone
                        ? "bg-accent/10 text-accent"
                        : "bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    {isCurrentDone ? <CheckCircle2 className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
                    {isCurrentDone ? "Concluída" : "Concluir Aula"}
                  </button>
                </div>

                {activeLesson.duration && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duração: {activeLesson.duration}</span>
                  </div>
                )}
              </div>
            </div>

            <div ref={navRef} className="flex gap-2 sm:gap-3">
              <button
                onClick={() => prevEntry && selectLesson(prevEntry.module, prevEntry.lesson)}
                disabled={!prevEntry}
                className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3.5 text-left hover:shadow-md hover:border-accent/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">Anterior</p>
                  <p className="font-body font-semibold text-xs text-foreground truncate">
                    {prevEntry?.lesson.title ?? "—"}
                  </p>
                </div>
              </button>

              <button
                onClick={() => nextEntry && selectLesson(nextEntry.module, nextEntry.lesson)}
                disabled={!nextEntry}
                className={`flex-1 flex items-center gap-2 rounded-xl px-4 py-3.5 text-right transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none ${
                  isCurrentDone && nextEntry
                    ? "bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    : "bg-card border border-border hover:shadow-md hover:border-accent/30"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] font-body uppercase tracking-wide ${isCurrentDone && nextEntry ? "text-white/70" : "text-muted-foreground"}`}>
                    Próxima
                  </p>
                  <p className={`font-body font-semibold text-xs truncate ${isCurrentDone && nextEntry ? "text-white" : "text-foreground"}`}>
                    {nextEntry?.lesson.title ?? "—"}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 shrink-0 ${isCurrentDone && nextEntry ? "text-white/70" : "text-muted-foreground"}`} />
              </button>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default Redinha;
