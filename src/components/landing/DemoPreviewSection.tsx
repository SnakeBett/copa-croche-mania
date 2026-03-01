import { Monitor } from "lucide-react";

const DemoPreviewSection = () => (
  <section className="py-12 md:py-20 px-4">
    <div className="max-w-4xl mx-auto space-y-8 text-center">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 text-xs font-bold font-body tracking-wide">
          <Monitor className="w-3.5 h-3.5" />
          PRÉVIA DA ÁREA DE MEMBROS
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Veja como é por dentro do curso
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-lg mx-auto">
          Área de membros organizada, com módulos e aulas passo a passo.
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-700">
          {/* Browser bar */}
          <div className="bg-[#2b2b2b] flex items-center gap-3 px-4 py-2.5">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-[#1a1a1a] rounded-md px-3 py-1.5">
              <p className="text-[11px] text-gray-400 font-mono text-center truncate">
                copacrochemania.com/areademembros
              </p>
            </div>
          </div>
          {/* GIF content */}
          <img
            src="/images/demo-area-membros.gif"
            alt="Prévia da área de membros Copa Crochê Mania"
            className="w-full h-auto block bg-gray-900"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

export default DemoPreviewSection;
