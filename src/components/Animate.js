import React , { useEffect, useState , useCallback} from 'react';
import Knight from './Knight'
import Enemy from './Enemy'
import enemy1 from '../assets/images/monster.png'
import enemy2 from '../assets/images/animal-1.gif'
import enemy3 from '../assets/images/animal-2.gif'
import enemy4 from '../assets/images/animal-3.gif'
import chance from './chanceHelper'

var listImg = [
  enemy1,
  enemy2,
  enemy3,
  enemy4,
]

function App({Stag,setStag, SubStag,setSubStag,Gold, setGold,KnightInfo,setKnightInfo}) {
  const [BGPosition, setBGPosition] = useState(0)  
  const [IsSeeEnemy, setIsSeeEnemy] = useState(false)
  const [EnemyPosition, setEnemyPosition] = useState(-50)
  
  const [ListEnemy, setListEnemy] = useState([])
  const [BaseEnemy, setBaseEnemy] = useState({
    hp:1000,
    totalHP:1000,
    att:100,
    def:20,
    gold: 1,
  })

  const createListEnemy = useCallback(()=>{
    var newList = []
    for (let index = 0; index < 6; index++) {
      var randomNumber = Math.round(Math.random() * listImg.length)
      newList.push({
        img:listImg[randomNumber],
        hp:BaseEnemy.hp + (BaseEnemy.hp * Stag * 10 / 100),
        totalHP:BaseEnemy.totalHP + (BaseEnemy.totalHP * Stag * 10 / 100),
        att:BaseEnemy.att + ((BaseEnemy.att * Stag * 10 / 100)),
        def:BaseEnemy.def + ((BaseEnemy.def * Stag * 10 / 100)),
        gold:BaseEnemy.gold + ((BaseEnemy.gold * Stag * 10 / 100)),
      })
    }
    setBaseEnemy({
      hp:BaseEnemy.hp + (BaseEnemy.hp * Stag * 10 / 100),
      totalHP:BaseEnemy.totalHP + (BaseEnemy.totalHP * Stag * 10 / 100),
      att:BaseEnemy.att + ((BaseEnemy.att * Stag * 10 / 100)),
      def:BaseEnemy.def + ((BaseEnemy.def * Stag * 10 / 100)),
      gold:BaseEnemy.gold + ((BaseEnemy.gold * Stag * 10 / 100)),
    })
    setListEnemy([...newList])
  },[Stag])

  const increstStag = useCallback(()=>{
    if(SubStag < 5){
      setSubStag(SubStag + 1)
      createListEnemy()
    }else{
      setStag( Stag + 1)
      setSubStag(1)
      createListEnemy()
    }
  },[Stag, SubStag,setStag, setSubStag,createListEnemy])

  const resetStag = useCallback(()=>{
    setSubStag(1)
    createListEnemy()
    setEnemyPosition(-50)
    setKnightInfo({
      ...KnightInfo,
      hp:KnightInfo.totalHP
    })
    setIsSeeEnemy(false)
  }, [KnightInfo, createListEnemy, setSubStag, setKnightInfo])

  useEffect(()=>{
    createListEnemy()
  },[createListEnemy])

  const combat = useCallback(()=>{
    var loopCombat = setInterval(() => {
      if(KnightInfo.hp > 0){
        if(ListEnemy[0]){
          if(ListEnemy[0].hp >= 0){
            var isCrit = chance(KnightInfo.critChance)
            var isDoge = chance(KnightInfo.doge)
            if(isCrit){
              ListEnemy[0].hp = ListEnemy[0].hp - (KnightInfo.att + (KnightInfo.att * KnightInfo.critDmg / 100) - ListEnemy[0].def)
            }else{
              ListEnemy[0].hp = ListEnemy[0].hp - (KnightInfo.att - ListEnemy[0].def)
            }
            if(!isDoge){
              KnightInfo.hp = KnightInfo.hp - ListEnemy[0].att - KnightInfo.def
              setKnightInfo({
                ...KnightInfo, 
                hp: KnightInfo.hp
              })
            }
            setListEnemy([...ListEnemy])
          }else{
            clearInterval(loopCombat)
            setGold(Gold + ListEnemy[0].gold)
            ListEnemy.shift()
            setListEnemy([...ListEnemy])
            setIsSeeEnemy(false)
            if(ListEnemy.length > 0){
              setEnemyPosition(EnemyPosition - 90)
            }else{
              setKnightInfo({
                ...KnightInfo,
                hp: KnightInfo.totalHP
              })
              increstStag()
              setEnemyPosition(-50)
            }
          }
        }
      }else{
        clearInterval(loopCombat)
        resetStag()
      }
    }, 500);
  },[KnightInfo, ListEnemy, EnemyPosition, Gold, increstStag, resetStag, setGold, setKnightInfo])

  useEffect(()=>{
    setTimeout(() => {
      if(!IsSeeEnemy){
        if(BGPosition <= -566){
          setBGPosition(0)
        }else{
          setBGPosition(BGPosition - 2)
        }
      }
    }, 20);
  },[BGPosition,IsSeeEnemy])

  useEffect(()=>{
      setTimeout(() => {
        if(EnemyPosition >= window.innerWidth - 80){
          setIsSeeEnemy(true)
          combat()
        }else{
          setEnemyPosition(EnemyPosition + 4)
        }
      }, 20);
  },[EnemyPosition])


  return (
    <>
      <div className="animate" style={{backgroundPosition: BGPosition}}>
        <div>
          <p>Stag = {Stag}, SubStag = {SubStag} </p>
        </div>
        <Knight
        IsSeeEnemy={IsSeeEnemy}
        setIsSeeEnemy={setIsSeeEnemy}
        currentHP={KnightInfo.hp}
        totalHP={KnightInfo.totalHP}
        />
        <div className="list-enemy" style={{left: window.innerWidth - EnemyPosition}}>
          {
            ListEnemy&&ListEnemy.map(el=>{
              return(
                <Enemy
                totalHP={el.totalHP}
                currentHP={el.hp}
                img={el.img}
                />
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
