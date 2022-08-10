import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import PageNotFound from 'pages/PageNotFound'
import Profile from 'pages/Profile'
import * as url from 'data/url'
import { Fragment } from 'react'
import Navbar from 'components/navbar'
import Posts from 'pages/Posts'
import Explore from 'pages/Explore'
import SinglePost from 'pages/SinglePost'

export default function Authenticated() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={url.URL_EXPLORE} element={<Explore />} />
        <Route path={url.URL_SINGLE_POST} element={<SinglePost />} />

        <Route path={url.URL_PROFILE} element={<Profile />}>
          <Route path={url.URL_POSTS} element={<Posts which="posts" />} />
          <Route path={url.URL_VIDEOS} element={<h1>videos</h1>} />
          <Route path={url.URL_SAVED} element={<Posts which="saved" />} />
          <Route path={url.URL_TAGGED} element={<h1>tagged</h1>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Fragment>
  )
}
