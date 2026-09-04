import Link from 'next/link';

import './LightHeader.css';

/* The light site header. Pages that are light-first (the homepage, The
   Marketing Engineer) render this and the global navy bar stands down for
   them in ConditionalNavigation — the same way scrollytelling pages carry
   their own header.

   Sticky on white with a hairline; the wordmark is the brand mark itself:
   Black Ops One at weight 400 (the only cut — faux bold fills the stencil
   gaps), teal e, ink sy. */
export default function LightHeader() {
  return (
    <header className="lh">
      <div className="lh-inner">
        <Link href="/" className="lh-wordmark" aria-label="Esy home">
          <span className="lh-wordmark-e">e</span>sy
        </Link>
        <nav className="lh-nav" aria-label="Primary">
          <Link href="https://make.esy.com/signin" className="lh-signin">Sign in</Link>
          <Link href="https://make.esy.com" className="lh-cta">Start producing</Link>
        </nav>
      </div>
    </header>
  );
}
