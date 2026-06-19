import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import './fonts.css'
import './index.css'
import './visuals.css'
import './premium.css'
import './i18n'

/* vite-react-ssg entry: statically pre-renders every route to HTML at
   build time and hydrates the same React app on the client. */
export const createRoot = ViteReactSSG({ routes })
