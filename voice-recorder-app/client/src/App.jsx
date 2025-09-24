import MicIcon from "../src/assets/microphone.png";

function App() {
  return (
    <div className="Main bg-gray-300 min-h-screen">
      <div className="NavbarContainer bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
        {/* Left Side */}
        <button className="hover:cursor-pointer">
          <div className="homeContainer flex justify-center items-center">
            <img className="w-auto h-9" src={MicIcon}></img>
            <div className="pl-2 font-mono">Voicely</div>
          </div>
        </button>
        {/* Right Side */}
        <div className="loginContainer font-mono">
          <button className="hover:cursor-pointer">Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
