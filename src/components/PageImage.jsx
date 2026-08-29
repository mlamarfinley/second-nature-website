/* One image per page, integrated as ground rather than inserted as a picture.
 *
 * The first version sat inside the text column with a border top and bottom,
 * which made it read as a rectangle pasted onto the page — the boxed-card
 * problem the brief explicitly rules out. This version is full-bleed, has no
 * borders at all, and is masked so it dissolves into the page colour at both
 * edges. It is the ground a section stands on, not an illustration dropped
 * into the prose.
 *
 * Every image is atmosphere, never evidence. The quiet credit is what keeps
 * that line legible — it is the device that stops an image being read as a
 * claim about the business.
 */

export const IMAGES = {
  roots: {
    src: 'roots',
    alt: 'A branching root network picked out in gold across cracked dark earth',
    credit: 'Root network · cover art, generated',
  },
  veins: {
    src: 'veins',
    alt: 'A leaf backlit so its vein structure reads as a network',
    credit: 'Leaf veins · cover art, generated',
  },
  grid: {
    src: 'grid',
    alt: 'A city seen from high above at night, lit windows forming a grid',
    credit: 'City grid at night · cover art, generated',
  },
  dunes: {
    src: 'dunes',
    alt: 'Wind-carved dunes at low sun, ridges running to the horizon',
    credit: 'Dunes · cover art, generated',
  },
}

/* `heading` sits on the image, so the band carries content rather than
   interrupting it. Leave it out and the band is pure atmosphere. */
export default function PageImage({ name, heading, children }) {
  const img = IMAGES[name]
  if (!img) return null
  return (
    <div className={`page-image page-image-${name}`}>
      <picture>
        <source media="(max-width: 800px)" type="image/webp" srcSet={`/img/${img.src}-800.webp`} />
        <source media="(max-width: 800px)" srcSet={`/img/${img.src}-800.jpg`} />
        <source type="image/webp" srcSet={`/img/${img.src}-1600.webp`} />
        <img
          src={`/img/${img.src}-1600.jpg`}
          width="1600"
          height="896"
          alt={img.alt}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="page-image-veil" aria-hidden="true" />
      {(heading || children) && (
        <div className="page-image-body">
          {heading && <p className="page-image-heading serif-display">{heading}</p>}
          {children}
        </div>
      )}
      <span className="page-image-credit">{img.credit}</span>
    </div>
  )
}
