import { Title, Button } from '../components'

function Home({ setScreen, setGameType}) {
  
  const selectGameType = (type) => {
    setGameType(type);
    setScreen('settings');
  }

  return (
    <div className="p-8 text-center">
      <Title size={"scale-100"}></Title>
      <div className='flex gap-4 justify-center'>
        <Button onClick={() => selectGameType('singleplayer')}>INDIVIDUAL</Button>
        <Button onClick={() => selectGameType('localversus')}>VERSUS</Button>
      </div>
    </div>
  )
}

export default Home