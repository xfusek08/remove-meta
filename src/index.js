import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorScreen from './components/EditorScreen';
import HomeScreen from './components/HomeScreen';
import './scss/common.scss';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/*' element={<HomeScreen />}/>
            <Route path='/editor/*' element={<EditorScreen />}/>
        </Routes>
    </BrowserRouter>
);
