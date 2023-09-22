import { gql, useMutation } from '@apollo/client'
import { useRef, useState } from 'react'

export const CreateLyric = ({ id }) => {
  const [lyric, setLyric] = useState('')
  const [addLyrics] = useMutation(ADD_LYRIC, { variables: { content: lyric, songId: id } })
  const ref = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    addLyrics({ variables: { content: lyric, songId: id } })
      .then(res => {
        ref.current.value = ''
      }
      )
      .catch(e => console.log(e))
  }

  const handleChange = (e) => {
    setLyric(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Add Lyric :
          <input type='text' onChange={handleChange} ref={ref} />
        </label>
      </form>
    </div>
  )
}

const ADD_LYRIC = gql`
    mutation AddLyricSong ($content: String, $songId: ID){
        addLyricToSong(content: $content, songId: $songId){
          id
          title
          lyrics {
              content
              id
         }
     }
  }

`
