import { useState, useEffect } from 'react'

export default function Home() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  function FetchData(){
    fetch('https://api.publicapis.org/entries')
      .then((res) => res.json())
      .then((data) => {
        setData(data.entries)
        setLoading(false)
        console.log(data)
    })
  }

  useEffect(() => {
    setLoading(true)
    FetchData()
  }, [])

  if (isLoading) return <span>
    Loading Data
  </span>
  if (!data) return <span>
    No Data
  </span>

  return (
    <div className='data'>
      <p>This page was rendered using api data from <a href="https://api.publicapis.org/entries" target="_blank" rel="noreferrer">https://api.publicapis.org/entries</a></p>
      {
        data.map((item) => {
          return(
            <>
              <h2>{item.API}</h2>
              <p style={{fontWeight: 600}}>Auth: <span style={{fontWeight: 300}}>{item.Auth ? <span style={{color: 'red'}}>{item.Auth}</span> : <span style={{color: 'teal'}}>No API Key</span>}</span></p>
              <p style={{fontWeight: 600}}>Category: <span style={{fontWeight: 300}}>{item.Category}</span></p>
              <p style={{fontWeight: 600}}>CORS: <span style={{fontWeight: 300}}>{item.Cors}</span></p>
              <p style={{fontWeight: 600}}>HTTPS: <span style={{fontWeight: 300}}>{item.HTTPS.toString()}</span></p>
              <p style={{fontWeight: 600}}>Description:<span style={{fontWeight: 300}}>{item.Description}</span></p>
              <p style={{fontWeight: 600}}>Link:<span style={{fontWeight: 300}}><a href={item.Link} target="_blank" rel="noreferrer"> {item.Link}</a></span></p>
              <hr/>
            </>
          )
        })
      }
    </div>
  )
}
