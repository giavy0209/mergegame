import React , { useEffect, useState , useCallback} from 'react';
import Animate from './components/Animate'
import MergeArea from './components/MergeArea'
const knightInfo = {
  hp:10000,
  totalHP:10000,
  def: 50,
  att: 200,
  gold: 0,
  critChance: 2,
  critDmg: 10,
  doge: 0,
}

function App() {
  const [Stag, setStag] = useState(1)
  const [SubStag, setSubStag] = useState(1)
  const [Gold, setGold] = useState(0)
  const [KnightInfo, setKnightInfo] = useState(knightInfo)

  return (
    <>
      <div className="game">
        <Animate
        Stag={Stag}
        SubStag={SubStag}
        setSubStag={setSubStag}
        setStag={setStag}
        Gold={Gold}
        setGold={setGold}
        KnightInfo={KnightInfo}
        setKnightInfo={setKnightInfo}
        />
        <MergeArea/>
        <p style={{bottom: 0}}>gold = {Math.floor(Gold)} </p>
      </div>
    </>
  );
}

export default App;
