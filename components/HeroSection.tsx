const HeroSection = () => {
  return (
    <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h2 className="text-4xl font-bold">
        Own, Create, Monetize: Your IP, Your Universe
      </h2>
      <p className="mt-4 text-lg">
        Discover and create decentralized content on IPVerse
      </p>
      <div className="mt-6">
        <a
          href="/explore"
          className="bg-white text-blue-600 px-6 py-2 rounded mr-4"
        >
          Explore
        </a>
        <a href="/signin" className="bg-blue-800 text-white px-6 py-2 rounded">
          Sign In
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
