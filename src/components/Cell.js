import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fasolid, faflag, fabomb } from '@fortawesome/fontawesome-free-solid'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export default function Cell ({details, updateFlag, triggerPress}) {
  return (
    <div onClick={() => triggerPress(details.x, details.y)}
    onContextMenu={(e) => updateFlag(e, details.x, details.y)} 
    className={details.isRevealed ? "revealedCell" : "cell"}>{details.isRevealed && details.value !== 0 ? (details.value !== "X" ? details.value : 
    <FontAwesomeIcon icon="fa-solid fa-bomb" />) : (details.isFlagged ? <FontAwesomeIcon icon="fa-solid fa-flag" className="flag"/> : "")}
    </div>
  )
}

