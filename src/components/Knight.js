import React from 'react';
function App({IsSeeEnemy,currentHP,totalHP}) {
  return (
    <>
    <div className={!IsSeeEnemy ? 'knight knight-move' : 'knight knight-attack'}>
        <div className="knight-hp-bar">
            <div className="knight-hp" style={{width: (currentHP/totalHP * 100) +'%' }}></div>
        </div>
    </div>
    </>
  );
}

export default App;
