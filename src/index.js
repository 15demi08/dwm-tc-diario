import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import './index.css';
import App from './App';
import PaginaInicial from './paginas/PaginaInicial';
import PaginaDetalhes, { atualizarEntrada } from './paginas/PaginaDetalhes';
// import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path='/:ano/:mes' element={<PaginaInicial />} />
            <Route path='/:ano/:mes/:dia' element={<PaginaDetalhes />} action={atualizarEntrada} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
