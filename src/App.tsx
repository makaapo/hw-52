import './App.css'
import Card from "./components/Card/CardComponent.tsx";

const App = () => (
    <div className="playingCards faceImages">
        <Card rank="K" suit="diams" />
        <Card rank="A" suit="hearts" />
    </div>
)
;

export default App
