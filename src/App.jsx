import './App.css'
import SaaSHeroSection from './components/SaaSHeroSection'

function App() {
  const handleStartFree = () => {
    window.open('https://github.com/khamis1992/adapti-biz-flow', '_blank');
  };
  
  const handleLogin = () => {
    window.open('https://github.com/khamis1992/adapti-biz-flow', '_blank');
  };
  
  const handleRequestDemo = () => {
    window.open('https://github.com/khamis1992/adapti-biz-flow', '_blank');
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <SaaSHeroSection 
        onStartFree={handleStartFree}
        onLogin={handleLogin}
        onRequestDemo={handleRequestDemo}
      />
    </div>
  )
}

export default App

