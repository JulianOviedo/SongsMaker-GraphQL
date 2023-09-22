export const LyricList = ({ lyricsArray, songTitle }) => {
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
