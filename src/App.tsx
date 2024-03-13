// import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"

function App() {
    return <Container>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Container>
}

export default App
