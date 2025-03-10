import {Routes , Route} from "react-router-dom"
import Create from "./pages/Create"
import Home from "./pages/Home"
import Delete from "./pages/Delete"
import Edit from "./pages/Edit"
import Show from "./pages/Show"
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/delete" element={<Delete />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/details" element={<Show />} />
      </Routes>
    </div>
  )
}

export default App