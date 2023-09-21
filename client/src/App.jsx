import { CreateSong } from './components/CreateSong'
import { SongList } from './components/SongList'
import { Route } from 'wouter'

export default function App () {
  return (
    <>
      <Route path='/' component={SongList} />
      <Route path='/song/new' component={CreateSong} />

    </>
  )
}
