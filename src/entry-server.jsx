import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Shell from './Shell.jsx'

/* Build-time rendering entry. Runs in Node, so nothing here may touch window
   or document during render — effects don't run, which is exactly why the
   browser-only work in this app lives in useEffect. */
export function render(url, basename) {
  return renderToString(
    <StaticRouter location={url} basename={basename}>
      <Shell />
    </StaticRouter>,
  )
}
