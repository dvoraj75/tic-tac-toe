import '../index.css'
import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    function handleEditClick() {
        setIsEditing(editing => !editing);
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    const [ isEditing, setIsEditing ] = useState(false);
    const [ playerName, setPlayerName ] = useState(initialName);
    let playerNameContainer = isEditing ?
        <input type="text" required value={playerName} onChange={handleChange}/>
        : <span className="player-name">{playerName}</span>;
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
              {playerNameContainer}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
};