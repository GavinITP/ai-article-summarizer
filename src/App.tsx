import Demo from "./components/Demo";
import Hero from "./components/Hero";

const App = () => {
  return (
    <main className="font-inter">
      <div className="w-full min-h-screen fixed pointer-events-none">
        <div className="bg-black absolute w-full h-full" />
      </div>

      <div className="text-white relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;
