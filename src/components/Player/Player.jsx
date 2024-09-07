import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName}){
  const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing ] = useState(false)

    function handleChangeName(event){
      setPlayerName(event.target.value)
    }

    function handleEdit(){
      setIsEditing( (editing) => !editing)
      if(isEditing){
        onChangeName(symbol, playerName)
      }
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    if(isEditing){
      editablePlayerName = <input type="text" required value={playerName} onChange={handleChangeName}/>  
 
        
    }

    
    return(
        <li className={isActive ? "active" : undefined}>
        <span className="player">
          {editablePlayerName}
          <span className="plauer-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{isEditing ? "Save": "Edit"}</button>
      </li>
    )
}