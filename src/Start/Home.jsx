import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate();

  return(
    <div className="home">
      <h2>Rouge Country</h2>
      <button onClick={() => navigate('/selection')}>Start</button>
      <button>Stats</button>
      <button>World</button>
    </div>
  )
}