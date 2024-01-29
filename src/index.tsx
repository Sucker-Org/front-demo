import { createRoot } from 'react-dom/client';
import { StrictMode } from "React";
import 'virtual:svg-icons-register';
import '@/assets/scss/common.scss';
import App from './pages/App';

const app = document.getElementById('app');
const root = createRoot(app);
root.render(
    <StrictMode>
    <App />
    </StrictMode>
);
