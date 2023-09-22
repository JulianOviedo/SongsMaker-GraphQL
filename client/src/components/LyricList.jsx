import { gql, useMutation } from '@apollo/client'

export const LyricList = ({ lyricsArray, songTitle }) => {
  const [addLike] = useMutation(ADD_LIKE)

  const handleLike = (lyricId) => {
    addLike({ variables: { id: lyricId } })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      {lyricsArray && (
        <ul key={songTitle}>
          {lyricsArray.map(lyric => {
            return (
              lyric.content && (
                <li key={lyric.id}>
                  {lyric.content}
                  <br />
                  <small>
                    <i>{lyric.likes}</i>
                    <button onClick={() => handleLike(lyric.id)}>Like</button>
                  </small>
                  <br />
                </li>
              )
            )
          })}
        </ul>
      )}
    </>
  )
}

const ADD_LIKE = gql`
  mutation AddLike($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`
