/* Full-bleed atmospheric illustrations, with accessible descriptions. */

export const IMAGES = {
  roots: {
    src: 'roots',
    alt: 'A branching root network picked out in gold across cracked dark earth',
  },
  veins: {
    src: 'veins',
    alt: 'A leaf backlit so its vein structure reads as a network',
  },
  grid: {
    src: 'grid',
    alt: 'A city seen from high above at night, lit windows forming a grid',
  },
  dunes: {
    src: 'dunes',
    alt: 'Wind-carved dunes at low sun, ridges running to the horizon',
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
          alt={`Illustration: ${img.alt}`}
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
    </div>
  )
}
