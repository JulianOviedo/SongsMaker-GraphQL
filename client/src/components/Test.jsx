import { gql, useQuery } from '@apollo/client'

const GET_SONGS = gql`
    query {
        songs {
            title
    }
}
`
export const Test = () => {
  const { loading, error, data } = useQuery(GET_SONGS)
  console.log('loading:', loading)
  console.log('error:', error)
  console.log('data:', data)

  console.log(data)

  if (!loading && !error) {
    return (
      <div>
        <h1>Testing</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <h1>testing</h1>
  )
}
