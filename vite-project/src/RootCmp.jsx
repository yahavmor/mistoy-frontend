import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from '../store/store.js'




export function RootCmp() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/todo" element={<ToyIndex/>} />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}
