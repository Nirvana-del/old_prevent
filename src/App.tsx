import AppRouter from "@/router";
import {BrowserRouter} from 'react-router-dom';
import AuthRoute from "@/components/Auth/AuthRoute";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
            <AuthRoute>
              <AppRouter/>
            </AuthRoute>
      </BrowserRouter>
    </div>
  )
}

export default App
