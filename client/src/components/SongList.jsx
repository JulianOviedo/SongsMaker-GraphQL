import { gql, useQuery } from '@apollo/client'
import { Link } from 'wouter'

export const SongList = () => {
  const { loading, error, data } = useQuery(GET_SONGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  if (data && data.songs) {
    return (
      <>
        <h1>Song List</h1>
        <ul>
          {data.songs.map(song => (
            <li key={song.id}>
              <p>{song.title}</p>
            </li>
          ))}
        </ul>
        <hr />
        <Link href='/song/new'>Create Song</Link>
      </>
    )
  } else {
    return <p>No songs available.</p>
  }
}

export const GET_SONGS = gql`
  query {
    songs {
      id
      title
    }
  }
`
