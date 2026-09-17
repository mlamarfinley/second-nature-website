/* Decorative roots: a branching structure carrying a slow trace of light.
   Original SVG geometry; no external animation library or canvas loop. */
const branches = [
  'M360 -30 C310 100 385 150 295 260 S310 405 230 535 S240 695 145 865',
  'M324 150 C270 205 280 258 195 302 S165 409 90 448',
  'M295 260 C350 307 330 360 397 412 S400 512 455 557',
  'M272 390 C210 416 210 457 151 485 S132 556 57 597',
  'M230 535 C280 580 255 621 328 673 S322 783 393 824',
  'M217 660 C150 683 165 731 84 775 S60 861 0 902',
  'M195 302 C180 270 134 281 109 245 S65 225 33 202',
  'M151 485 C116 459 99 480 62 452 S20 450 -10 432',
  'M328 673 C365 660 384 683 421 659 S455 658 480 641',
  'M145 865 C190 905 171 938 230 980',
]
export default function RootNetwork() {
  return (
    <svg className="root-network" viewBox="0 0 460 980" fill="none" aria-hidden="true" focusable="false">
      {branches.map((d, i) => (
        <g key={d}>
          <path d={d} className="root-network-line" />
          <path d={d} pathLength="100" className="root-network-trace" style={{ animationDelay: `${-i * 1.3}s` }} />
        </g>
      ))}
    </svg>
  )
}
