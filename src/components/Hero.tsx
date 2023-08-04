import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-14 pt-3">
        <img src={logo} alt="sumz logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() => window.open("https://github.com/GavinITP")}
          className="bg-white rounded-full px-4 py-2 text-black hover:scale-105 duration-100"
        >
          Github
        </button>
      </nav>

      <h1 className="text-center font-satoshi font-black text-5xl sm:text-6xl md:text-7xl max-w-[20ch] mb-12">
        Summarize Articles with <br />
        <span className="bg-gradient-to-br from-yellow-500 via-red-500 to-orange-500 text-transparent bg-clip-text">
          OpenAI GPT-4
        </span>
      </h1>

      <h2 className="text-center max-w-[60ch] text-md md:text-lg text-gray-300">
        Make summarizing articles easy using OpenAI GPT-4. It effortlessly picks
        out key points from complex content. Simplify your reading by turning
        articles into short summaries with OpenAI GPT-4's help
      </h2>
    </header>
  );
};

export default Hero;
