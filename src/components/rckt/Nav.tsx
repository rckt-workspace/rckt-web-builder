const Nav = () => (
  <nav className="flex items-center justify-between px-8 py-6">
    <div className="flex items-center gap-12">
      <span className="text-xl font-bold tracking-tight text-foreground">RCKT.es</span>
      <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-foreground/80">
        <a href="#sistema" className="hover:text-foreground transition-colors">Sistema</a>
        <a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a>
        <a href="#verticales" className="hover:text-foreground transition-colors">Verticales</a>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <a
        href="#contacto"
        className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-semibold hover:bg-foreground/90 transition-colors shadow-soft"
      >
        Contacto <span aria-hidden>→</span>
      </a>
    </div>
  </nav>
);

export default Nav;