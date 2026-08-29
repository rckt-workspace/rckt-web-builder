import { useEffect, useState } from "react";
import AdvisorChat from "./AdvisorChat";

const AdvisorChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("rckt:advisor-open", handleOpen);
    return () => {
      window.removeEventListener("rckt:advisor-open", handleOpen);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] md:bottom-8 md:right-8">
      {/* Chat container - always mounted, visibility controlled by CSS */}
      <div className={isOpen ? "w-[380px] max-w-[calc(100vw-32px)] max-h-[calc(100dvh-2rem)]" : "hidden"}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-10 right-0 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          aria-label="Cerrar asesor"
        >
          Cerrar
        </button>
        <AdvisorChat />
      </div>

      {/* Launcher button - only shown when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3.5 text-[15px] font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
          aria-label="Abrir asesor RCKT"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-foreground opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-foreground" />
          </span>
          Asesor RCKT.es
        </button>
      )}
    </div>
  );
};

export default AdvisorChatLauncher;
