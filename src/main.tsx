
import { createRoot } from 'react-dom/client'
import './styles.css'
import { CalendarApp } from './CalendarApp.tsx'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

createRoot(document.getElementById('root')!).render(

  <CalendarApp />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
