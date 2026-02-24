import SectionWrapper from "@/components/shared/SectionWrapper";

const chatMessages = [
  { text: "Você vende? 😍", time: "19:32", align: "left" as const },
  { text: "Qual o valor?", time: "19:33", align: "right" as const },
  { text: "Faz em outra cor? 💚💛", time: "19:34", align: "left" as const },
  { text: "Quero 2!! Uma pra mim e uma de presente 🎁", time: "19:35", align: "right" as const },
];

const OpportunitySection = () => (
  <section
    id="oportunidade"
    className="py-16 md:py-24 px-4"
    style={{ background: "linear-gradient(180deg, hsl(145 45% 32% / 0.05) 0%, hsl(30 33% 94%) 100%)" }}
  >
    <div className="max-w-3xl mx-auto text-center space-y-10">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground">
        Imagine essa cena ⚽
      </h2>
      <div className="space-y-4 text-base md:text-lg font-body text-muted-foreground leading-relaxed">
        <p>Você publica a foto de uma bolsa de crochê verde e amarelo.</p>
        <p>Com o escudo do Brasil bordado. Ambiente bonito.</p>
        <p className="font-semibold text-foreground mt-6">E começam os comentários:</p>

        {/* WhatsApp-style chat */}
        <div className="max-w-sm mx-auto my-8 rounded-2xl overflow-hidden shadow-xl border border-border">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
              C
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold font-body">Cliente Interessada</p>
              <p className="text-white/60 text-[10px] font-body">online</p>
            </div>
          </div>

          {/* Chat body */}
          <div
            className="px-3 py-4 space-y-2.5"
            style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c8b0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\"), #ECE5DD" }}
          >
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.align === "right" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative px-3 py-2 rounded-lg max-w-[78%] text-left ${
                    msg.align === "right"
                      ? "bg-[#DCF8C6] rounded-tr-none"
                      : "bg-white rounded-tl-none"
                  }`}
                  style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.08)" }}
                >
                  <p className="text-[#303030] text-sm font-body leading-snug">{msg.text}</p>
                  <p className="text-[9px] text-[#999] font-body text-right mt-0.5 -mb-0.5">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-foreground font-medium">
          Isso não é coincidência.<br />
          É comportamento de <strong className="text-accent">torcedor brasileiro</strong>.
        </p>
      </div>
    </div>
  </section>
);

export default OpportunitySection;
