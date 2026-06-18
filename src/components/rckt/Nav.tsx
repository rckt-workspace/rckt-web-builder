const Nav = () => (
  <nav className="mx-auto mt-5 flex max-w-6xl items-center justify-between rounded-full border border-border/70 bg-background/70 px-6 py-2.5 backdrop-blur-xl shadow-soft">
    <div className="flex items-center gap-10">
      <span className="text-[17px] font-medium tracking-tight text-foreground">
        RCKT<span className="text-primary">.es</span>
      </span>
      <div className="hidden md:flex items-center gap-7 text-[13.5px] font-normal text-foreground/75">
        <a href="#sistema" className="hover:text-foreground transition-colors">Sistema</a>
        <a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a>
        <a href="#verticales" className="hover:text-foreground transition-colors">Verticales</a>
        <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <a
        href="#contacto"
        className="hidden sm:inline-flex items-center gap-1.5 text-[13.5px] text-foreground/75 hover:text-foreground transition-colors"
      >
        Iniciar sesión
      </a>
      <a
        href="#contacto"
        className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-[13px] font-medium hover:bg-foreground/85 transition-colors"
      >
        Empezar <span aria-hidden>→</span>
      </a>
    </div>
  </nav>
);

export default Nav;