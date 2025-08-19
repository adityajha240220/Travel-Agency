interface HeroProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function HeroSection({ onLogin, onSignup }: HeroProps) {
  return (
    <div className="relative z-10 text-white text-center py-20 bg-black bg-opacity-50">
      <h1 className="text-5xl font-bold mb-4">Welcome to Travel Odyssey</h1>
      <p className="text-xl mb-6">Your journey starts here with free tips and premium plans!</p>
      <div className="space-x-4">
        <button onClick={onLogin} className="bg-blue-600 px-6 py-3 rounded-lg">
          Login
        </button>
        <button onClick={onSignup} className="bg-green-600 px-6 py-3 rounded-lg">
          Sign Up
        </button>
      </div>
    </div>
  );
}