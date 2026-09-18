export const BLOG_TITLE = "RCKT Insights";
export const BLOG_SUBTITLE =
  "Ideas, sistemas y señales para vender mejor, pensar mejor y crecer.";

export default function BlogHero() {
  return (
    <header className="relative mx-auto max-w-6xl px-5 pt-32 pb-10 md:px-6 md:pt-40 md:pb-14">
      <div className="deco-dots absolute top-28 left-5 md:left-6" aria-hidden="true" />
      <p className="label-orange">Blog</p>
      <h1 className="font-display mt-4 text-[40px] leading-[1.05] font-semibold tracking-tight text-ink md:text-[68px]">
        {BLOG_TITLE}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{BLOG_SUBTITLE}</p>
    </header>
  );
}
