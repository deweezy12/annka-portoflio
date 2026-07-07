import { useCallback, useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import "./App.css";

const NAV_LINKS = [
  { href: "#sedcard", label: "Sedcard" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#polas", label: "Polas" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const PORTFOLIO_ORDER = [
  6, 12, 18, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19,
] as const;
const PORTFOLIO_IMAGES = PORTFOLIO_ORDER.map((imageNumber) =>
  asset(`images/portfolio-${String(imageNumber).padStart(2, "0")}.jpg`),
);
const PORTFOLIO_COUNT = PORTFOLIO_IMAGES.length;

const SEDCARD_ROWS: Array<[string, string]> = [
  ["Height", "166 cm / 5'5\""],
  ["Weight", "60 kg"],
  ["Bust", "89 cm"],
  ["Waist", "72 cm"],
  ["Hips", "95 cm"],
  ["Cup", "75B"],
  ["Shoes", "EU 39"],
  ["Hair", "Blonde"],
  ["Eyes", "Blue"],
  ["Location", "Germany • Düsseldorf / Berlin"],
  ["Languages", "German • English"],
];

const POLAS_ITEMS: Array<{ label: string; file: string }> = [
  { label: "Full Body", file: "polas-fullbody-2.jpg" },
  { label: "Side", file: "polas-side.jpg" },
  { label: "Front", file: "polas-closeup.jpg" },
  { label: "Close Up", file: "polas-closeup2.jpg" },
];

const ABOUT_TEXT =
  "I believe authenticity creates the strongest presence. Beyond modeling, I am passionate about meaningful human connection, mindfulness, body awareness and personal growth. Alongside my creative work, I volunteer with people with disabilities and continue my studies in health psychology. Whether in front of a camera or working with people, I aim to bring professionalism, presence and kindness into every collaboration.";

export function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) =>
      current === null
        ? current
        : (current - 1 + PORTFOLIO_COUNT) % PORTFOLIO_COUNT,
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? current : (current + 1) % PORTFOLIO_COUNT,
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="annkafalk-page">
      <a href="#main" className="annkafalk-skip-link">
        Skip to content
      </a>

      <header className="annkafalk-nav">
        <div className="annkafalk-nav__inner">
          <a href="#top" className="annkafalk-nav__brand">
            Annka Falk
          </a>

          <nav aria-label="Primary">
            <ul className="annkafalk-nav__links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="annkafalk-nav__toggle"
            aria-expanded={mobileNavOpen}
            aria-controls="annkafalk-mobile-nav"
            onClick={() => setMobileNavOpen(true)}
          >
            Menu
          </button>
        </div>

        <div
          id="annkafalk-mobile-nav"
          className={`annkafalk-nav__mobile ${mobileNavOpen ? "is-open" : ""}`}
        >
          <button
            type="button"
            className="annkafalk-nav__mobile-close"
            onClick={() => setMobileNavOpen(false)}
          >
            Close
          </button>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileNavOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main id="main">
        <section id="top" className="annkafalk-hero">
          <div className="annkafalk-page__shell annkafalk-hero__grid">
            <div className="annkafalk-hero__media">
              <img
                src={asset("images/hero.jpg")}
                alt="Annka Falk portrait"
                loading="eager"
              />
            </div>

            <div className="annkafalk-hero__content">
              <p className="annkafalk-hero__eyebrow">Commercial Model</p>
              <h1 className="annkafalk-hero__name">Annka Falk</h1>
              <p className="annkafalk-hero__tagline">
                Model • Yoga Teacher • Social Impact Advocate
              </p>

              <div className="annkafalk-hero__cta">
                <a
                  href="#portfolio"
                  className="annkafalk-btn annkafalk-btn--solid"
                >
                  View Portfolio
                </a>
                <a
                  href="#contact"
                  className="annkafalk-btn annkafalk-btn--ghost"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="sedcard" className="annkafalk-section">
          <div className="annkafalk-page__shell">
            <div className="annkafalk-section__header">
              <p className="annkafalk-section__eyebrow">Details</p>
              <h2 className="annkafalk-section__title">Sedcard</h2>
            </div>

            <div className="annkafalk-sedcard">
              {SEDCARD_ROWS.map(([label, value]) => (
                <div className="annkafalk-sedcard__row" key={label}>
                  <span className="annkafalk-sedcard__label">{label}</span>
                  <span className="annkafalk-sedcard__value">{value}</span>
                </div>
              ))}

              <p className="annkafalk-sedcard__note">
                Available for commercial beauty, fashion, sport, jewelry and
                lifestyle productions.
              </p>
            </div>
          </div>
        </section>

        <section id="portfolio" className="annkafalk-section">
          <div className="annkafalk-page__shell">
            <div className="annkafalk-section__header">
              <p className="annkafalk-section__eyebrow">Selected Work</p>
              <h2 className="annkafalk-section__title">Portfolio</h2>
            </div>

            <div className="annkafalk-portfolio__grid">
              {PORTFOLIO_IMAGES.map((src, index) => (
                <button
                  type="button"
                  key={src}
                  className="annkafalk-portfolio__item"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open portfolio image ${index + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="polas" className="annkafalk-section">
          <div className="annkafalk-page__shell">
            <div className="annkafalk-section__header">
              <p className="annkafalk-section__eyebrow">Raw &amp; Honest</p>
              <h2 className="annkafalk-section__title">Polas</h2>
            </div>

            <div className="annkafalk-polas__grid">
              {POLAS_ITEMS.map((item) => (
                <div className="annkafalk-polas__item" key={item.label}>
                  <div className="annkafalk-polas__frame">
                    <img
                      src={asset(`images/${item.file}`)}
                      alt={`Polaroid – ${item.label}`}
                      loading="lazy"
                    />
                  </div>
                  <span className="annkafalk-polas__label">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="annkafalk-polas__note">
              Natural light • No make-up • Unretouched
            </p>
          </div>
        </section>

        <section id="about" className="annkafalk-section">
          <div className="annkafalk-page__shell">
            <div className="annkafalk-section__header">
              <p className="annkafalk-section__eyebrow">Beyond the Camera</p>
              <h2 className="annkafalk-section__title">About</h2>
            </div>

            <div className="annkafalk-about">
              <p className="annkafalk-about__text">{ABOUT_TEXT}</p>
            </div>
          </div>
        </section>

        <section id="contact" className="annkafalk-section">
          <div className="annkafalk-page__shell">
            <div className="annkafalk-section__header">
              <p className="annkafalk-section__eyebrow">Get in Touch</p>
              <h2 className="annkafalk-section__title">Contact</h2>
            </div>

            <div className="annkafalk-contact">
              <p className="annkafalk-contact__lead">
                For bookings, collaborations or inquiries, I would love to hear
                from you.
              </p>

              <div className="annkafalk-contact__links">
                <a
                  href="https://instagram.com/annkafalk_"
                  target="_blank"
                  rel="noreferrer"
                  className="annkafalk-contact__link"
                >
                  <svg
                    className="annkafalk-contact__icon"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
                  </svg>
                  @annkafalk
                </a>
              </div>

              <p className="annkafalk-contact__meta">
                Based in Germany • Available internationally
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="annkafalk-footer">
        <p>© {new Date().getFullYear()} Annka Falk</p>
      </footer>

      {lightboxIndex !== null && (
        <div
          className="annkafalk-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="annkafalk-lightbox__close"
            onClick={closeLightbox}
          >
            Close
          </button>

          <button
            type="button"
            className="annkafalk-lightbox__arrow annkafalk-lightbox__arrow--prev"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
          >
            ‹
          </button>

          <img
            src={PORTFOLIO_IMAGES[lightboxIndex]}
            alt=""
            className="annkafalk-lightbox__img"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="annkafalk-lightbox__arrow annkafalk-lightbox__arrow--next"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
