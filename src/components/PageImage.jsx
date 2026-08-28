/* One image per page, one treatment for all of them.
 *
 * The site had imagery on exactly one of twelve pages, which is itself a
 * documented AI-generated-site tell — generated sites cluster at two
 * extremes: synthetic people, or no images at all substituting gradients
 * and big type.
 *
 * Every image here is atmosphere, never evidence. Each carries a caption
 * naming what it is, so it can't be mistaken for a claim about the
 * business — that line is what the trust research actually punishes.
 * The shared grade keeps four different pictures reading as one family. */

/* Each caption does two jobs: a dry line that earns the picture's place on
   that particular page, and the disclosure. The line is the human bit —
   wordplay is the thing generated copy is worst at, so a caption that
   actually lands is evidence a person wrote it. The disclosure stays
   because that's what keeps the image atmosphere rather than a claim. */
export const IMAGES = {
  roots: {
    src: 'roots',
    alt: 'A branching root network picked out in gold across cracked dark earth',
    line: 'The part doing the work is the part you don’t see.',
    credit: 'Root network · cover art, generated',
  },
  veins: {
    src: 'veins',
    alt: 'A leaf backlit so its vein structure reads as a network',
    line: 'Hold it up to the light. That’s the whole offer.',
    credit: 'Leaf veins · cover art, generated',
  },
  grid: {
    src: 'grid',
    alt: 'A city seen from high above at night, lit windows forming a grid',
    line: 'Also a network. Somebody just had to draw this one first.',
    credit: 'City grid at night · cover art, generated',
  },
  dunes: {
    src: 'dunes',
    alt: 'Wind-carved dunes at low sun, ridges running to the horizon',
    line: 'Same wind, every day. That’s the entire trick.',
    credit: 'Dunes · cover art, generated',
  },
}

export default function PageImage({ name, height = 'band', children }) {
  const img = IMAGES[name]
  if (!img) return null
  return (
    <figure className={`page-image page-image-${height}`}>
      <picture>
        <source media="(max-width: 800px)" srcSet={`/img/${img.src}-800.jpg`} />
        <img src={`/img/${img.src}-1600.jpg`} alt={img.alt} loading="lazy" decoding="async" />
      </picture>
      <span className="page-image-scrim" aria-hidden="true" />
      {children}
      <figcaption>
        <span className="page-image-line">{img.line}</span>
        <span className="page-image-credit">{img.credit}</span>
      </figcaption>
    </figure>
  )
}
