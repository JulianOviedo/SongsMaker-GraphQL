import { gql, useMutation, useQuery } from '@apollo/client'
import { Link } from 'wouter'

export const SongList = () => {
  const { loading, error, data } = useQuery(GET_SONGS)
  const [deleteSong] = useMutation(DELETE_SONG, { refetchQueries: [{ query: GET_SONGS }] })

  const handleDelete = (songId) => {
    deleteSong({ variables: { id: songId } })
      .then(res => {
        console.log('DELETED: ', res)
      })
      .catch(e => console.log(e))
  }

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
              <button onClick={() => handleDelete(song.id)}>Delete</button>
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
const DELETE_SONG = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id){
      title
    }
  }
`
