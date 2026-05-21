const Footer = () => (
  <footer className="px-8 py-20 border-t border-border bg-card">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="space-y-4">
        <span className="text-xl font-semibold tracking-tighter">RCKT</span>
        <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
          El sistema operativo de crecimiento para empresas mid-market y scaleups serias. LatAm + España.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-widest font-semibold">Sistema</span>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li><a href="#sistema" className="hover:text-foreground">Growth OS</a></li>
            <li><a href="#servicios" className="hover:text-foreground">Servicios</a></li>
            <li><a href="#verticales" className="hover:text-foreground">Verticales</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-widest font-semibold">Firma</span>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li><a href="#casos" className="hover:text-foreground">Casos</a></li>
            <li><a href="#" className="hover:text-foreground">Equipo</a></li>
            <li><a href="#" className="hover:text-foreground">Notas</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-widest font-semibold">Contacto</span>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li><a href="mailto:contacto@rckt.es" className="hover:text-foreground">contacto@rckt.es</a></li>
            <li><a href="https://www.rckt.es" className="hover:text-foreground">rckt.es</a></li>
            <li><a href="https://www.rckt.lat" className="hover:text-foreground">rckt.lat</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-widest font-semibold">Legal</span>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
            <li><a href="#" className="hover:text-foreground">Términos</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row gap-3 justify-between items-start md:items-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      <span>© 2026 RCKT Strategic Operations</span>
      <span>Madrid · CDMX · Bogotá · Santiago</span>
      <span>EST. 2014</span>
    </div>
  </footer>
);

export default Footer;