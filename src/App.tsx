import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Patterns from './components/Patterns';

const App: React.FC = (): React.ReactElement => {

    return (
        <main className="m-auto w-full h-screen bg-slate-100 flex justify-center content-center">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patterns" element={<Patterns />} />
            </Routes>
        </main>
    );
}

export default App;