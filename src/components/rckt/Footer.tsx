const Footer = () => (
  <footer className="px-6 py-20 border-t border-white/40 bg-sage-gradient">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="space-y-4">
        <span className="text-xl font-medium tracking-tight">RCKT<span className="text-primary">.es</span></span>
        <p className="text-[14px] text-muted-foreground max-w-[260px] leading-relaxed">
          El sistema operativo de crecimiento para empresas mid-market y scaleups.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
        <div className="space-y-4">
          <span className="text-[12px] text-primary">— Sistema</span>
          <ul className="text-[14px] space-y-2 text-muted-foreground">
            <li><a href="#sistema" className="hover:text-foreground">Growth OS</a></li>
            <li><a href="#servicios" className="hover:text-foreground">Servicios</a></li>
            <li><a href="#verticales" className="hover:text-foreground">Verticales</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="text-[12px] text-primary">— Firma</span>
          <ul className="text-[14px] space-y-2 text-muted-foreground">
            <li><a href="#casos" className="hover:text-foreground">Casos</a></li>
            <li><a href="#" className="hover:text-foreground">Equipo</a></li>
            <li><a href="#" className="hover:text-foreground">Notas</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="text-[12px] text-primary">— Contacto</span>
          <ul className="text-[14px] space-y-2 text-muted-foreground">
            <li><a href="mailto:contacto@rckt.es" className="hover:text-foreground">contacto@rckt.es</a></li>
            <li><a href="https://www.rckt.es" className="hover:text-foreground">rckt.es</a></li>
            <li><a href="https://www.rckt.lat" className="hover:text-foreground">rckt.lat</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="text-[12px] text-primary">— Legal</span>
          <ul className="text-[14px] space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
            <li><a href="#" className="hover:text-foreground">Términos</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border/70 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center text-[11px] text-muted-foreground">
      <span>© 2026 RCKT.es Strategic Operations</span>
      <span>Madrid · CDMX · Bogotá · Santiago</span>
      <span>EST. 2014</span>
    </div>
  </footer>
);

export default Footer;