import "./emplacement.css"
import Header from "../Header/Header"

export default function PostEmplacement() {
    return (
        <div>
            <Header />
        <div className="postEmplacement">
            <input type="text" placeholder="Nom du café/bar"/>
            <input type="text" placeholder="Prix du chocolat chaud"/>
            <input type="text" placeholder="Adresse"/>
            <input type="text" placeholder="Jours d'ouverture"/>
            <button>Ajouter un chocolat chaud ☕ </button>
        </div>
        </div>
    )
}