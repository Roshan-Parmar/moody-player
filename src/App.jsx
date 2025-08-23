import FacialExpression from "./components/FacialExpression"
import MoodSongs from "./components/MoodSongs"
import { useState } from "react";
const App = () => {
    const [songs,setSongs] = useState([]);

  return (
    <>
    <FacialExpression songs={songs} setSongs={setSongs} />
    <MoodSongs songs={songs} />

    </>
  )
}

export default App