const Nav = () => (
  <nav className="flex items-center justify-between px-8 py-6 border-b border-border">
    <div className="flex items-center gap-12">
      <span className="text-xl font-semibold tracking-tighter">RCKT</span>
      <div className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase text-muted-foreground">
        <a href="#sistema" className="hover:text-foreground transition-colors">Sistema</a>
        <a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a>
        <a href="#verticales" className="hover:text-foreground transition-colors">Verticales</a>
        <a href="#casos" className="hover:text-foreground transition-colors">Casos</a>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <a href="#contacto" className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors">Contacto</a>
      <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </div>
    </div>
  </nav>
);

export default Nav;