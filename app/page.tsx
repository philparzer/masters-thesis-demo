import AnnotationTextArea from "@/components/annotation-text-area";

export default function Home() {
  return (
    <main className="max-w-[1000px]">
      <section className="text-center">
      <h1 className="text-4xl font-semibold leading-[1.3em]">
        LLM-based Text Analysis for <br></br> Translation of Literary Texts
      </h1>
      <h3 className="mt-3 text-xl">
        <span className="block">University of Innsbruck</span>
        <span className="block">Philipp Parzer</span>
      </h3>
      </section>
      <p className="my-12 text-center">
        This paper introduces a novel enhancement of human-in-the-loop literary
        translation processes by including large language models (LLMs). <span className="bg-black/10 font-medium px-1 rounded-sm">LLMs
        annotate the source text</span> hinting at possible pitfalls, hard
        to translate sections, and other peculiarities. This increases human
        translators' efficiency, as <span className="bg-black/10 px-1 rounded-sm font-medium">translators can focus on translation
        problems and spend less time post-editing standard language.</span> The system
        outlined uses GPT-4's function-calling API.
      </p>
      <AnnotationTextArea />
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <p className="text-justify">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
      </section>
      <section className="mt-20 text-justify">
        <h2 className="text-2xl font-semibold mb-4 text-center">Paper</h2>
        <p className="text-justify">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
      </section>
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">References</h2>
        <p className="text-justify">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
      </section>
    </main>
  );
}
