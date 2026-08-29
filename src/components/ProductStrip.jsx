/* The four Odessa captures, run as one continuous full-bleed strip.
 *
 * Deliberately not four screenshots in four bordered cards. The captures are
 * near-black already, so with no frame and a mask at the edges the app's own
 * ground merges into the page's — you read one wide piece of interface, not a
 * gallery of thumbnails.
 *
 * Every caption ends in "Demo data." That is not decoration and must not be
 * dropped: these are real screens of the real dashboard running against
 * in-memory fixtures, NOT a record of anyone's actual day. The claim that
 * Odessa runs daily belongs in the prose, where it is a sentence someone is
 * accountable for, rather than implied by a picture.
 */

const SHOTS = [
  { src: 'odessa-folio',   label: 'The daily view',    alt: 'Odessa’s daily folio: the day summarised in a sentence, a four-domain ledger, and the next commitment' },
  { src: 'odessa-plan',    label: 'The plan',          alt: 'Odessa’s plan screen: obligations placed on an hour rail, with unfinished work held at the foot' },
  { src: 'odessa-channel', label: 'The written channel', alt: 'Odessa in text between calls, with drafted correspondence waiting to be sent' },
  { src: 'odessa-routine', label: 'Disciplines',       alt: 'Odessa’s routine screen: weekly counts on habits kept and patterns the system has inferred' },
]

export default function ProductStrip() {
  return (
    <figure className="strip">
      <div className="strip-frame">
        <div className="strip-rail">
        {SHOTS.map((s) => (
          <div className="strip-shot" key={s.src}>
            <picture>
              <source type="image/webp" srcSet={`/img/${s.src}.webp`} />
              <img src={`/img/${s.src}.jpg`} alt={s.alt} width="660" height="1125" loading="lazy" decoding="async" />
            </picture>
            <span className="strip-label">{s.label}</span>
          </div>
          ))}
        </div>
        <span className="strip-veil" aria-hidden="true" />
      </div>
      <figcaption className="strip-caption">
        Odessa, running. Screens are the real dashboard against demo data — not a record of a real day.
      </figcaption>
    </figure>
  )
}
