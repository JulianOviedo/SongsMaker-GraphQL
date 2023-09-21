import { gql, useQuery } from '@apollo/client'
import { useRoute } from 'wouter'

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
        <hr />
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
    }
  }
`
