import axios from 'axios'
import { useEffect, useState } from 'react';
function App() {
  const [state, setState] = useState([])
  const [text, setText] = useState('')

  const add = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('https://backend-deploy-orcin.vercel.app/add-name', { name: text }, { withCredentials: true })
      setState([...state, data])
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const getData = async () => {
    try {
      const { data } = await axios.get('https://backend-deploy-orcin.vercel.app/', { withCredentials: true })
      setState(data.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="App">
      <form onSubmit={add}>
        <input onChange={(e) => setText(e.target.value)} type="text" className='px-4 py-3 w-[400px] border' placeholder="input" />
        <button className="px-4 py-3 bg-indigo-500">submit</button>
      </form>
      <div>
        {
          state.map((d, i) => <h2 key={i}>{d.name}</h2>)
        }
      </div>
    </div>
  );
}

export default App;
