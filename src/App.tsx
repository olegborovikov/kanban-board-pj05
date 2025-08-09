import './App.css'
import Board from './components/Board/Board'

type AppProps = {
  onCountsChange: (active: number, finished: number) => void
}

function App({ onCountsChange }: AppProps) {
  return (
    <div className="App">
      <main>
        <Board onCountsChange={onCountsChange} />
      </main>
    </div>
  )
}

export default App
