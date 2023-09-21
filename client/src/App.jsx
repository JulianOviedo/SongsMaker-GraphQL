import { CreateSong } from './components/CreateSong'
import { SongDetails } from './components/SongDetails'
import { SongList } from './components/SongList'
import { Route } from 'wouter'

export default function App () {
  return (
    <>
      <Route path='/' component={SongList} />
      <Route path='/song/new' component={CreateSong} />
      <Route path='/song/:id' component={SongDetails} />
    </>
  )
}
