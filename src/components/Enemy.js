import React from 'react';
function App({img,totalHP, currentHP}) {
  
  return (
    <>
    <div className="enemy">
        <img src={img} alt=""/>
        <div className="enemy-hp-bar">
            <div className="enemy-hp" style={{width: (currentHP/totalHP * 100) +'%' }}></div>
        </div>
    </div>
    </>
  );
}

export default App;
