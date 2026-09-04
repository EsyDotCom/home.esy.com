import Link from 'next/link';

/* The page's own header — light, because the hero is light. The global bar is
   navy and stands down on this route (ConditionalNavigation), the same way
   scrollytelling pages carry their own.

   Sticky on white with a hairline; the wordmark is the brand mark itself:
   Black Ops One at weight 400 (the only cut — faux bold fills the stencil
   gaps), teal e, ink sy. */
export default function HomeV3Header() {
  return (
    <header className="hv3-header">
      <div className="hv3-header-inner">
        <Link href="/" className="hv3-wordmark" aria-label="Esy home">
          <span className="hv3-wordmark-e">e</span>sy
        </Link>
        <nav className="hv3-header-nav" aria-label="Primary">
          <Link href="https://make.esy.com/signin" className="hv3-header-signin">Sign in</Link>
          <Link href="https://make.esy.com" className="hv3-header-cta">Start producing</Link>
        </nav>
      </div>
    </header>
  );
}
