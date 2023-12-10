//reusable component for content sections (used in playground and home)

const Header = () => {
  return (
    <>
      <section className="text-center">
        <h1 className="text-[26px] lg:text-4xl font-semibold leading-[1.3em] dark:text-white">
          LLM-based Text Analysis for <br></br> Translation of Literary Texts
        </h1>

        <h3 className="mt-3 text-md font-medium dark:text-white">
          <span className="block">Master&apos;s Thesis</span>
          <span className="block">University of Innsbruck</span>
          <span className="block">Philipp Parzer</span>
        </h3>
      </section>
      
      <p className="mt-8 mb-14 text-center">
        This paper introduces a novel enhancement of human-in-the-loop literary
        translation processes by including large language models (LLMs).{" "}
        <span className="bg-black/10 dark:bg-white/20 dark:text-zinc-300 font-medium px-1 rounded-sm">
          LLMs annotate the source text
        </span>{" "}
        hinting at possible pitfalls, hard to translate sections, and other
        peculiarities. This increases human translators&apos; efficiency, as{" "}
        <span className="bg-black/10 dark:bg-white/20 dark:text-zinc-300 px-1 rounded-sm font-medium">
          translators can focus on translation problems and spend less time
          post-editing standard language.
        </span>{" "}
        The system outlined uses GPT-4&apos;s function-calling API.
      </p>
    </>
  );
};

export default Header;
