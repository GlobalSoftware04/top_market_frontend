// App.js
import { AuthProvider } from "./context/AuthContext";
import AppContent from "./pages/AppContent/AppContent";
import 'primeicons/primeicons.css';
import '../node_modules/primereact/resources/primereact.min.css';
import '../node_modules/primereact/resources/themes/lara-light-blue/theme.css';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
