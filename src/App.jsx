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
import FavoriteFilms from './components/FavoriteFilms'
import DetailFilmInfo from './components/DetailFilmInfo'
import FilmSessions from './components/FilmSessions'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="films" element={<FilmsList />} />
          <Route path="create" element={<CreateFilmForm />} />
          <Route path="edit/:id" element={<CreateFilmForm />} />
          <Route path="details/:id" element={<DetailFilmInfo />} />
          <Route path='liked' element={<FavoriteFilms />} />
          <Route path='sessions' element={<FilmSessions />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
