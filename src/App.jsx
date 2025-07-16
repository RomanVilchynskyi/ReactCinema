import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoPage from './components/NoPage'
import FilmsList from './components/FilmsList'
import Home from './components/Home'
import CreateFilmForm from './components/CreateFilmForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="films" element={<FilmsList />} />
          <Route path="create" element={<CreateFilmForm />} />
          <Route path="edit/:id" element={<CreateFilmForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
