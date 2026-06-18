const Nav = () => (
  <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
    <div className="flex items-center gap-12">
      <span className="text-[20px] font-bold tracking-tight text-white">
        RCKT<span className="text-white/70">.es</span>
      </span>
      <div className="hidden md:flex items-center gap-7 text-[14px] font-medium text-white/85">
        <a href="#sistema" className="hover:text-white transition-colors">Sistema</a>
        <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
        <a href="#verticales" className="hover:text-white transition-colors">Verticales</a>
        <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
      </div>
    </div>
    <div className="flex items-center gap-5">
      <a
        href="#contacto"
        className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-medium text-white/85 hover:text-white transition-colors"
      >
        Iniciar sesión
      </a>
      <a
        href="#contacto"
        className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#0a2540] px-4 py-2 text-[14px] font-semibold hover:bg-white/90 transition-colors"
      >
        Empezar ahora <span aria-hidden>→</span>
      </a>
    </div>
  </nav>
);

export default Nav;