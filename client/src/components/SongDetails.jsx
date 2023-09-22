import { gql, useQuery } from '@apollo/client'
import { Link, useRoute } from 'wouter'
import { CreateLyric } from './CreateLyric'
import { LyricList } from './LyricList'

export const SongDetails = () => {
  const [, params] = useRoute('/song/:id')
  const { loading, error, data } = useQuery(SONG_DETAILS, { variables: { id: params.id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>
  if (data && data.song) {
    return (
      <>
        <h1>Details for Song: {data.song.title}</h1>
        <p>ID : {data.song.id}</p>
        {data.song.lyrics &&
          <LyricList lyricsArray={data.song.lyrics} songTitle={data.song.title} />}
        <hr />
        <CreateLyric id={params.id} />
        <Link href='/'>Go Back</Link>
      </>
    )
  } else {
    return <p>No songs available.</p>
  }
}

const SONG_DETAILS = gql`
query SongDetails($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        content
        id
        likes
      }
    }
  }
`
