import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useLocation } from 'wouter'
import { GET_SONGS } from './SongList'

export const CreateSong = () => {
  const [, setLocation] = useLocation()
  const [newSongData, setNewSongData] = useState(null)
  const [addSong] = useMutation(ADD_SONG, { refetchQueries: [{ query: GET_SONGS }] })

  const handleSubmit = (e) => {
    e.preventDefault()

    addSong({ variables: { title: newSongData } })
      .then(result => {
        setLocation('/')
      })
      .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    setNewSongData(e.target.value)
  }

  return (
    <div>
      <h3>Create new Song</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type='text' onChange={handleChange} placeholder='One More Time - Daft punk' />
        </label>
      </form>
    </div>
  )
}

const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`
