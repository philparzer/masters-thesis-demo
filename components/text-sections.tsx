//reusable component for content sections (used in playground and home)

import ClipboardText from "@/components/clipboard-text";

interface TextSectionsProps {}

const TextSections = ({}: TextSectionsProps) => {
  return (
    <div className="lg:px-5">
      <section className="mt-24 lg:mt-20">
        <h2 className="text-xl lg:text-2xl dark:text-white font-semibold mb-2 lg:mb-4 text-left">
          Examples
        </h2>
        <p className="mb-6 lg:mb-12 text-justify">
          The texts provided below have been used to evaluate the efficacy of
          this tool in the paper. It&apos;s important to note that the
          paper&apos;s focus on Russian and German literary texts presents an
          insightful yet limited perspective that highlights the need for
          expanded research to encompass a broader range of language pairs,
          genres, etc.
        </p>
        <div className="flex flex-col gap-14 lg:px-5">
          <ClipboardText
            text={`В самом начале третьего семестра, на одной из лекций по эмэл философии, Никита Сонечкин сделал одно удивительное открытие.
            Дело было в том, что с некоторых пор с ним творилось непонятное: стоило маленькому ушастому доценту, похожему из одолеваемого кощунственными мыслями попика, войти в аудиторию, как Никиту начинало смертельно клонить в сон. А когда доцент принимался говорить и показывать пальцем в люстру, Никита уже ничего не мог с собой поделать — он засыпал. Ему чудилось, что лектор говорит не о философии, а о чем-то из детства: о каких-то чердаках, песочницах и горящих помойках, потом ручка в Никитиных пальцах забиралась по диагонали в самый верх листа, оставив за собой неразборчивую фразу, наконец он клевал носом и проваливался в черноту, откуда через секунду-другую выныривал, чтобы вскоре все повторилось в той же самой последовательности. Его конспекты выглядели странно и были непригодны для занятий: короткие абзацы текста пересекались длинными косыми предложениями, где речь шла то о космонавтах-невозвращенцах, то о рабочем визите монгольского хана, а почерк становился мелким и прыгающим.
            Сначала Никита очень расстраивался из-за своей неспособности нормально высидеть лекцию, а потом задумался: неужели это происходит только с ним? Он стал приглядываться к остальным студентам, и здесь-то его ждало открытие.
            Оказалось, что спят вокруг почти все, но делают это гораздо умнее, чем он, - уперев лоб в раскрытую ладонь, так что лицо оказывалось спрятанным. Кисть правой руки при этом скрывались за локтем левой, и разобрать, пишет сидящий или нет, было нельзя. Никита попробовал принять это положение и обнаружил, что сразу же изменилось качество его сна. Если раньше он рывками перемещался от полной отключенности до перепуганного бодрствования, то теперь эти два состояния соединились — он засыпал, но не окончательно, не до черноты, и то, что с ним происходило, напоминало утреннюю дрему, когда любая мысль без труда превращается в движущуюся цветную картинку, следя за которой можно одновременно дожидаться звонка переведенного на час вперед будильника.`}
            language="Russian"
            author="Viktor Pelevin"
            title="Spi"
            link="http://pelevin.nov.ru/rass/pe-spi/1.html"
            page={1}
          />

          <ClipboardText
            text={`Вместо предисловия

            В окошке железной раскаленной будки сатанело лицо билетерши. Оно было маслянистым и пузырчатым, как доведенный до совершенства блин на сковороде. К блину устремилась змейка из робких граждан, мечтающих взять билет на ближайший «Омик» — ржавый речной теплоходик постройки семидесятых годов. Следующий «Омик» отходил от пристани только через полтора часа, а значит, неуспевшим грозили либо солнечный удар на городском пляже без зонтиков, либо глубокий обморок в здании речного вокзала без кондиционеров. 
            В этой очереди я была последней. Волосы мои, еще в аэропорту развеиваемые сплит-системами, ныне прилипли ко лбу и шее, истекая солеными струями. Платье-футляр из хлопка пропиталось потом и словно подшил латекс подробно обтягивало формы. Босоножки на шпильке и тонких лямках отделились от влажных стоп и жили своей развязной жизнью. Кожаный шопер натер плечо и стремился на свободу — к бастующим туфлям. Очевидно, лук и макияж не соответствовали атмосфере кипящей набережной. По сравнению со мной старухи, прожженные солнцем, в свободных рубахах и бездонных юбках, с бидонами и холщовыми сумками, казались гораздо более уместными, органичными и производили впечатление людей, ладящих с собственными головами.
            
            Наконец подошла очередь.
            — Вы принимаете карты? — спросила я билетершу, с трудом елозя во рту сухим языком.
            — Ополоумела, курва? — взвизгнула огненная тетка. — Ты здесь хоть одну розетку видишь? Только наличные.
            — Сколько стоит билет?
            — Тариф на стене, — буркнула она, утирая капли с блинного лица.
            На выкрашенной в лазурь будке действительно висел тетрадный лист, разлинованный и исписанный от руки. Буквы выгорели.
            
            Поднимая и приспуская очки, я пыталась найти нужную строчку.
            — До отправления две минуты. Куда надо?
            — Остров Рафаила.
            — Семьдесят два рубля пятьдесят копеек.
            
            Я протянула стольник, радуясь, что в кошельке были хоть какие-то купюры. Билетерша загремела мелочью в жестяной банке, отсчитывая сдачу.
            — Боже, не надо! — взмолилась я.
            — Боже тебе ничего не даст, — пробурчала она, отрывая билет от толстого рулона.`}
            language="Russian"
            author="Katya Kachur"
            title="Gen Rafaila"
            link="https://eksmo.ru/book/gen-rafaila-ITD1321105/"
            page={[5, 6]}
          />
          <ClipboardText
            text={`Pierre Anthon verließ an dem Tag die Schule, als er herausfand, dass nichts etwas bedeutete und es sich deshalb nicht lohnte, irgendwas zu tun.
            Wir anderen blieben.
            Und auch wenn die Lehrer sich bemühten, rasch hinter ihm aufzuräumen – sowohl im Klassenzimmer als auch in unseren Köpfen –, so blieb doch ein bisschen von Pierre Anthon in uns hängen. Vielleicht kam deshalb alles so, wie es kam.
            Es war in der zweiten Augustwoche. Die Sonne brannte und machte uns faul und leicht reizbar, der Asphalt klebte an den Sohlen unserer Turnschuhe, und die Äpfel und Birnen waren gerade eben so reif, dass sie perfekt als Wurfgeschoss in der Hand lagen. Wir schauten weder links noch rechts. Der erste Schultag nach den Sommerferien. Das Klassenzimmer roch nach Reinigungsmitteln und langem Leerstehen, die Fensterscheiben warfen gestochen scharfe Spiegelbilder, und an der Tafel hing kein Kreidestaub. Die Tische standen in Zweierreihen so gerade wie Krankenhausflure und wie sie es nur an ebendiesem einen Tag im Jahr tun. Klasse 7A.
            Wir gingen zu unseren Plätzen, ohne uns über die vorgegebene Ordnung aufzuregen.
            Kommt Zeit, kommt Rat, kommt Unordnung. Aber nicht heute!
            Eskildsen begrüßte uns mit demselben Witz wie in jedem Jahr.
            
            „Kinder, freut euch über den heutigen Tag“, sagte er. „Ohne Schule gäbe es auch keine Ferien.“
            
            Wir lachten. Nicht, weil wir das witzig fanden, sondern weil er es sagte.
            
            Genau da stand Pierre Anthon auf.
            „Nichts bedeutet irgendetwas“, sagte er. „Das weiß ich schon lange. Deshalb lohnt es sich nicht, irgendetwas zu tun. Das habe ich gerade herausgefunden.“ Ganz ruhig bückte er sich und packte die Sachen, die er gerade herausgenommen hatte, wieder in seine Tasche. Mit gleichgültiger Miene nickte er uns zum Abschied zu und ging hinaus, ohne die Tür hinter sich zu schließen.
            `}
            language="German"
            author="Janne Teller"
            title="Nichts. Was im Leben wichtig ist"
            page={[8, 10]}
            link={
              "https://www.carlsen.de/hardcover/nichts-was-im-leben-wichtig-ist/9783551581671"
            }
          />
          <ClipboardText
            text={`Hafermilch, Mandelmilch, Cashewmus, tiefgefrorene Himbeeren, Hummus, Kölln Haferflocken, Chiasamen, Bananen, Dinkelnudeln, Avocado, Avocado, Avocado. Ich spiele: Ich darf nicht hochschauen. Circa 30, männlich, schlaksig, rahmenlose Brille, Levi’s-Shirt, rate ich, sage »30,72 Euro«, schaue endlich hoch, und als ich den Levi’s-Schriftzug sehe, ist das ziemlich cool und vielleicht sogar der bisherige Höhepunkt meines Tages. Es ist zwar eine jüngere Frau, aber das T-Shirt richtig zu erraten ist schon stark.
            4 Stunden später lege ich die Gut&Günstig-Variante von Mirácoli-Nudeln, Gut&Günstig-Haferflocken, Dr. Oetker Bourbon-Vanillesoße und Vollmilch auf das Band. »4,06 Euro«, sagt Frau Bach, ich zahle, stopfe die Sachen in meinen Rucksack und renne zum Bahnhof.
            
            Straßenbahn, Uni, Übungsaufgaben und Texte kopieren. Ich habe einen strikten Zeitplan, in den ein in 3 von 4 Fällen nicht funktionierender Kopierer einfach nicht reinpasst. »Papierstau«. Ich spüre, wie sich beim Anblick dieses Wortes die Wut in mir aufstaut, balle die Fäuste und starre diesen weißen, doofen Klotz an. Zerstörungswut.
            
            Straßenbahn, Übungsaufgaben lösen, Schwimmen, Ida. Der Übungszettel ist machbar, und ich schaffe es, alle Aufgaben während der 69-minütigen Fahrt von der Uni zum Schwimmbad zu lösen. Ich atme den Chlorgeruch tief ein, schmeiße meinen Rucksack auf die Bank neben Ursulas bunten Korb, ziehe das Kleid über meinen Kopf, springe kopfüber ins Wasser, tauche in den tiefen Bereich bis zum Grund, setze mich auf den Boden und schaue mir das Geschehen im Becken von unten an. Viele unkoordiniert zappelnde Kinderbeine, ein paar mehr oder weniger koordiniert zappelnde Seniorenbeine, tauchende Kinderkörper, gemischte Beine am Beckenrand. Insgesamt sieht das Zusammenspiel dieser vielen Bewegungen nach Spaß aus, sofern ich das von hier unten beurteilen kann. Ich stoße mich vom Boden ab, um wie immer meine 22 Bahnen zu schwimmen, und als ich bei der 20. oder 22. Bahn nicht sicher bin, ob es die 20. oder 22. ist, ärgere ich mich und schwimme zur Bestrafung noch 5 zusätzliche Bahnen.            
            `}
            language="German"
            author="Caroline Wahl"
            title="22 Bahnen"
            page={[9, 10]}
            link={
              "https://www.amazon.de/Bahnen-Nominiert-Lieblingsbuch-unabh%C3%A4ngigen-Buchhandels/dp/3832168036"
            }
          />

          <p className="text-justify">
            <span className="text-red-500 opacity-50">more examples soon</span>
          </p>
        </div>
      </section>
      <section className="mt-20">
        <h2 className="text-xl lg:text-2xl dark:text-white font-semibold mb-2 lg:mb-4">
          Prompts
        </h2>
        <p className="text-justify">
          <span className="text-red-500 opacity-50">section coming soon</span>
        </p>
      </section>
      <section className="mt-20">
        <h2 className="text-xl lg:text-2xl dark:text-white font-semibold mb-2 lg:mb-4">
          The Paper
        </h2>
        <p className="text-justify">
          <span className="text-red-500 opacity-50">section coming soon</span>
        </p>
      </section>
      <section className="mt-20">
        <h2 className="text-xl lg:text-2xl dark:text-white font-semibold mb-2 lg:mb-4">
          Further Research
        </h2>
        <p className="text-justify">
          <span className="text-red-500 opacity-50">section coming soon</span>
        </p>
      </section>
      <section className="mt-20">
        <h2 className="text-xl lg:text-2xl dark:text-white font-semibold mb-2 lg:mb-4">
          Public API
        </h2>
        <p className="text-justify">
          <span className="text-red-500 opacity-50">section coming soon</span>
        </p>
      </section>
      <section className="mt-20">
        <h2 className="text-xl lg:text-2xl dark:text-white font-semibold mb-2 lg:mb-4">
          Architecture
        </h2>
        <p className="text-justify">
          <span className="text-red-500 opacity-50">section coming soon</span>
        </p>
      </section>
      <section className="mt-20 text-justify">
        <h2 className="text-xl lg:text-2xl dark:text-white font-semibold mb-2 lg:mb-4 text-left">
          Local Setup
        </h2>
        <p className="text-justify">
          <span className="text-red-500 opacity-50">section coming soon</span>
        </p>
      </section>
    </div>
  );
};

export default TextSections;
