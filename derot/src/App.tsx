import { AppRoutes } from './app/routes/AppRoutes'
import { AppDataProvider } from './app/providers/AppDataProvider'
import './App.css'

function App() {
  return <AppDataProvider><AppRoutes /></AppDataProvider>
}

export default App
