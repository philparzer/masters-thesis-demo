import ClipboardText from "@/components/clipboard-text";
import AnnotationPlayground from "../components/annotation-playground";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[1000px]">
      <section className="text-center">
        <h1 className="text-4xl font-semibold leading-[1.3em] dark:text-white">
          LLM-based Text Analysis for <br></br> Translation of Literary Texts
        </h1>

        <h3 className="mt-3 text-md font-medium">
          <span className="block">University of Innsbruck</span>
          <span className="block">Philipp Parzer</span>
        </h3>
        <div className="flex gap-4 mt-4 justify-center">
          <a
            href="https://github.com"
            className="underline opacity-50 transition-opacity hover:opacity-100"
          >
            github repository
          </a>
          <a
            href="https://github.com"
            className="underline opacity-50 transition-opacity hover:opacity-100 "
          >
            download paper
          </a>
        </div>
      </section>
      <p className="mt-8 mb-12 text-center">
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
      {/* <AnnotationPlayground /> */}
      <Link href="/login">login</Link>
      <div className="px-5">
      <section className="mt-20">
        <h2 className="text-2xl dark:text-white font-semibold mb-4 text-left">Examples</h2>
        <p className="mb-12 text-justify">
          The texts provided below have been used to evaluate the efficacy of this tool in the paper. It&apos;s important to note that
          the paper&apos;s focus on Russian presents an insightful
          yet limited perspective that highlights the need for
          expanded research to encompass a broader range of language pairs.
        </p>
        <div className="flex flex-col gap-14 px-5">
          <ClipboardText
            text={`В самом начале третьего семестра, на одной из лекций по эмэл философии, Никита Сонечкин сделал одно удивительное открытие. Дело было в том, что с некоторых пор с ним творилось непонятное: стоило маленькому ушастому доценту, похожему из одолеваемого кощунственными мыслями попика, войти в аудиторию, как Никиту начинало смертельно клонить в сон. А когда доцент принимался говорить и показывать пальцем в люстру, Никита уже ничего не мог с собой поделать — он засыпал. Ему чудилось, что лектор говорит не о философии, а о чем-то из детства: о каких-то чердаках, песочницах и горящих помойках, потом ручка в Никитиных пальцах забиралась по диагонали в самый верх листа, оставив за собой неразборчивую фразу, наконец он клевал носом и проваливался в черноту, откуда через секунду-другую выныривал, чтобы вскоре все повторилось в той же самой последовательности. Его конспекты выглядели странно и были непригодны для занятий: короткие абзацы текста пересекались длинными косыми предложениями, где речь шла то о космонавтах-невозвращенцах, то о рабочем визите монгольского хана, а почерк становился мелким и прыгающим.`}
            language="Russian"
            author="Viktor Pelevin"
            title="Spi"
            page={1}
          />

          <ClipboardText
            text={`Марта 25 числа случилось в Петербурге необыкновенно странное происшествие. Цирюльник Иван Яковлевич, живущий на Вознесенском проспекте (фамилия его утрачена, и даже на вывеске его — где изображен господин с намыленною щекою и надписью: «И кровь отворяют» — не выставлено ничего более), цирюльник Иван Яковлевич проснулся довольно рано и услышал запах горячего хлеба. Приподнявшись немного на кровати, он увидел, что супруга его, довольно почтенная дама, очень любившая пить кофий, вынимала из печи только что испеченные хлебы. — Сегодня я, Прасковья Осиповна, не буду пить кофию, — сказал Иван Яковлевич, — а вместо того хочется мне съесть горячего хлебца с луком. (То есть Иван Яковлевич хотел бы и того и другого, но знал, что было совершенно невозможно требовать двух вещей разом, ибо Прасковья Осиповна очень не любила таких прихотей.) «Пусть дурак ест хлеб; мне же лучше, — подумала про себя супруга, — останется кофию лишняя порция». И бросила один хлеб на стол.`}
            language="Russian"
            author="Nikolai Gogol"
            title="The Nose"
            page={1}
          />
        </div>

      </section>
      <section className="mt-20 text-justify">
        <h2 className="text-2xl dark:text-white font-semibold mb-4 text-left">Local Setup</h2>
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
      <section className="mt-20">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">Further Research</h2>
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
      </div>
    </main>
  );
}
