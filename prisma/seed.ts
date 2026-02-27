import {
  PrismaClient,
  Category,
  DifficultyLevel,
  CssCategory,
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const countJs = await prisma.javascriptAssignment.count()
    const countCss = await prisma.cssAssignment.count()
    let moduleCount = await prisma.module.count()
    const technologyCount = await prisma.technology.count()
    const sprintCount = await prisma.sprint.count()

    if (countJs === 0) {
      await prisma.javascriptAssignment.createMany({
        data: [
          {
            name: 'Reverse string',
            descriptionStart: 'Napisz funkcję, która odwraca ciąg znaków.',
            descriptionEnd: 'Nie używaj wbudowanej funkcji reverse().',
            patternFunction:
              "function reverseString(input) {return input.split('').reverse().join('');}",
            sampleInput: ['hello'],
            sampleOutput: ['olleh'],
            category: Category.LOOP,
            difficultyLevel: DifficultyLevel.MEDIUM,
            tests: [
              { input: ['world'], output: 'dlrow' },
              { input: ['javascript'], output: 'tpircsavaj' },
              { input: ['openai'], output: 'ianepo' },
              { input: ['assistant'], output: 'tnatsissa' },
              { input: ['example'], output: 'elpmaxe' },
              { input: ['function'], output: 'noitcnuf' },
              { input: ['input'], output: 'tupni' },
              { input: ['output'], output: 'tuptuo' },
            ],
          },
          {
            name: 'Repeat string',
            descriptionStart:
              'Napisz funkcję, która powtarza napis określoną liczbę razy.',
            descriptionEnd: 'Nie używaj wbudowanej metody repeat().',
            patternFunction:
              "function repeatString(input, times) { let result = ''; for (let i = 0; i < times; i++) { result += input; } return result; }",
            sampleInput: ['ab', '3'],
            sampleOutput: ['ababab'],
            category: Category.LOOP,
            tests: [
              { input: ['a', '1'], output: 'a' },
              { input: ['a', '5'], output: 'aaaaa' },
              { input: ['xy', '2'], output: 'xyxy' },
              { input: ['test', '0'], output: '' },
              { input: ['js', '3'], output: 'jsjsjs' },
              { input: ['hi', '4'], output: 'hihihihi' },
              { input: ['ok', '2'], output: 'okok' },
              { input: ['z', '6'], output: 'zzzzzz' },
            ],
          },
          {
            name: 'Remove spaces',
            descriptionStart:
              'Napisz funkcję, która usuwa wszystkie spacje z napisu.',
            descriptionEnd: 'Nie używaj replace() ani regexów.',
            patternFunction:
              "function removeSpaces(input) { let result = ''; for (let i = 0; i < input.length; i++) { if (input[i] !== ' ') result += input[i]; } return result; }",
            sampleInput: ['hello world'],
            sampleOutput: ['helloworld'],
            category: Category.FUNCTION,
            tests: [
              { input: ['a b c'], output: 'abc' },
              { input: ['no spaces'], output: 'nospaces' },
              { input: ['   '], output: '' },
              { input: ['test'], output: 'test' },
              { input: ['remove all spaces'], output: 'removeallspaces' },
              { input: [' space at start'], output: 'spaceatstart' },
              { input: ['end space '], output: 'endspace' },
              { input: ['m i x e d'], output: 'mixed' },
            ],
          },
          {
            name: 'Uppercase every second letter',
            descriptionStart:
              'Napisz funkcję, która zamienia co drugą literę na wielką.',
            descriptionEnd: 'Pierwsza litera pozostaje mała.',
            patternFunction:
              "function upperSecond(input) { let result = ''; for (let i = 0; i < input.length; i++) { result += i % 2 === 1 ? input[i].toUpperCase() : input[i]; } return result; }",
            sampleInput: ['abcdef'],
            sampleOutput: ['aBcDeF'],
            category: Category.LOOP,
            tests: [
              { input: ['hello'], output: 'hElLo' },
              { input: ['javascript'], output: 'jAvAsCrIpT' },
              { input: ['test'], output: 'tEsT' },
              { input: ['a'], output: 'a' },
              { input: ['ab'], output: 'aB' },
              { input: ['loop'], output: 'lOoP' },
              { input: ['string'], output: 'sTrInG' },
              { input: ['input'], output: 'iNpUt' },
            ],
          },
          {
            name: 'Remove duplicate characters',
            descriptionStart:
              'Napisz funkcję, która usuwa powtarzające się znaki z napisu.',
            descriptionEnd: 'Zachowaj kolejność pierwszych wystąpień.',
            patternFunction:
              "function removeDuplicates(input) { let result = ''; for (let i = 0; i < input.length; i++) { if (!result.includes(input[i])) result += input[i]; } return result; }",
            sampleInput: ['banana'],
            sampleOutput: ['ban'],
            category: Category.FUNCTION,
            tests: [
              { input: ['apple'], output: 'aple' },
              { input: ['aaaa'], output: 'a' },
              { input: ['abcabc'], output: 'abc' },
              { input: ['test'], output: 'tes' },
              { input: ['javascript'], output: 'javscript' },
              { input: ['loop'], output: 'lop' },
              { input: ['input'], output: 'input' },
              { input: ['mississippi'], output: 'misp' },
            ],
          },
        ],
      })
    }

    if (countCss === 0) {
      await prisma.cssAssignment.createMany({
        data: [
          {
            name: 'Draw donut',
            category: CssCategory.SHAPES,
            difficultyLevel: DifficultyLevel.EASY,
            description:
              'Laboris aute et dolore quis do pariatur ut minim Lorem officia eiusmod aute eiusmod fugiat.Labore voluptate commodo magna eu pariatur dolore labore voluptate magna commodo mollit veniam proident.Officia cillum voluptate sint consequat quis irure.Magna proident ipsum ullamco laborum dolor aliquip aute.Cillum tempor anim non ut pariatur irure quis nisi proident et anim anim.',
            colors: ['#f5a22e', '#ffffff', '#12a32e', '#000000', '#221231'],
            targetUrl:
              'http://res.cloudinary.com/pokersun/image/upload/v1681385849/learning-platform/images/6437e9799bd2e398d419795f-image-1681385849.png',
            requirements: 95,
          },
          {
            name: 'Draw object',
            category: CssCategory.SHAPES,
            difficultyLevel: DifficultyLevel.MEDIUM,
            description:
              'Laboris aute et dolore quis do pariatur ut minim Lorem officia eiusmod aute eiusmod fugiat.Labore voluptate commodo magna eu pariatur dolore labore voluptate magna commodo mollit veniam proident.Officia cillum voluptate sint consequat quis irure.Magna proident ipsum ullamco laborum dolor aliquip aute.Cillum tempor anim non ut pariatur irure quis nisi proident et anim anim.',
            colors: ['#D35400', '#FF5733', '#D4AC0D'],
            targetUrl:
              'http://res.cloudinary.com/pokersun/image/upload/v1681479387/learning-platform/images/643956da75eaae481017f26d-image-1681479386.png',

            requirements: 95,
          },
          {
            name: 'Draw lamp',
            category: CssCategory.SHAPES,
            difficultyLevel: DifficultyLevel.EASY,
            description:
              'Laboris aute et dolore quis do pariatur ut minim Lorem officia eiusmod aute eiusmod fugiat.Labore voluptate commodo magna eu pariatur dolore labore voluptate magna commodo mollit veniam proident.Officia cillum voluptate sint consequat quis irure.Magna proident ipsum ullamco laborum dolor aliquip aute.Cillum tempor anim non ut pariatur irure quis nisi proident et anim anim.',
            colors: ['#E1C16E', '#7B3F00'],
            targetUrl:
              'http://res.cloudinary.com/pokersun/image/upload/v1681391619/learning-platform/images/6438000375eaae4810171ffa-image-1681391619.png',

            requirements: 95,
          },
          {
            name: 'Draw switch',
            category: CssCategory.SHAPES,
            difficultyLevel: DifficultyLevel.HARD,
            description:
              'Laboris aute et dolore quis do pariatur ut minim Lorem officia eiusmod aute eiusmod fugiat.Labore voluptate commodo magna eu pariatur dolore labore voluptate magna commodo mollit veniam proident.Officia cillum voluptate sint consequat quis irure.Magna proident ipsum ullamco laborum dolor aliquip aute.Cillum tempor anim non ut pariatur irure quis nisi proident et anim anim.',
            colors: ['#97CC7E'],
            targetUrl:
              'http://res.cloudinary.com/pokersun/image/upload/v1678961467/learning-platform/images/6412eb3b1a8514503d1fc681-image-1678961467.png',
            requirements: 95,
          },
        ],
      })
    }
    if (technologyCount === 0) {
      await prisma.technology.createMany({
        data: [
          {
            name: 'HTML',
            id: 'clogwts3a022751v8aucxg3io',
            description:
              'HTML (HyperText Markup Language) to język używany do strukturyzacji treści na stronach internetowych.',
          },
          {
            name: 'CSS',
            id: 'clogwts3a022751v8aucxg3ip',
            description:
              'CSS (Cascading Style Sheets) to język używany do stylizowania i rozmieszczania elementów HTML na stronach internetowych.',
          },
          {
            name: 'JavaScript',
            id: 'clogwts3a022751v8aucxg3iq',
            description:
              'JavaScript to język programowania, który pozwala dodawać interaktywność i logikę działania stron internetowych.',
          },
        ],
      })
    }
    if (moduleCount === 0) {
      await prisma.module.createMany({
        data: [
          {
            id: 'clogwts3a022740v8aucxg3id',
            moduleIndex: 1,
            name: 'Podstawy programowania',
            difficultyLevel: DifficultyLevel.EASY,
            description:
              'W tym module kursu będziesz zgłębiać podstawy nauk komputerowych oraz języka JavaScript. Rozpoczynamy od zrozumienia działania internetu, poprzez algorytmy i struktury danych, a kończąc na zaawansowanych technikach programowania w JS. Kurs skupia się na praktycznych aspektach, wprowadzając uczestników w świat front-endu. Sześć sprintów zapewnia stopniowe i zorganizowane przyswajanie wiedzy',
            moduleVideo: 'fBGhBP476zE',
            input:
              'Żeby przystąpić do tego modułu nie potrzebujesz żadnej wiedzy z zakresu programowania',
            output:
              'Po zakończeniu modułu będziesz posiadać wiedzę z zakresu podstaw tworzenia algorytmów, HTML, CSS oraz podstaw JavaScript',
          },
          {
            id: 'clogwts3a022740v8aucxg3ie',
            moduleIndex: 2,
            name: 'Biblioteka React.js o obiegówka',
            difficultyLevel: DifficultyLevel.MEDIUM,
            description:
              'Ten moduł wprowadza w świat React.js, najpopularniejszej biblioteki do budowy interaktywnych interfejsów użytkownika. Omówimy komponenty, stany, propsy oraz podstawy hooków. Kurs pozwoli uczestnikom budować dynamiczne aplikacje front-endowe w sposób modułowy.',
            moduleVideo: 'NKsma2XgjL4',
            input: 'Podstawowa znajomość HTML, CSS i JavaScript jest wymagana',
            output:
              'Po ukończeniu modułu będziesz potrafić tworzyć interaktywne aplikacje w React.js, używając komponentów, stanów i podstawowych hooków',
          },
          {
            id: 'clogwts3a022740v8aucxg3if',
            moduleIndex: 3,
            name: 'Framework Next.js',
            difficultyLevel: DifficultyLevel.MEDIUM,
            description:
              'Moduł koncentruje się na frameworku Next.js, który rozszerza React o funkcje takie jak server-side rendering, routing i optymalizacja wydajności. Uczestnicy nauczą się tworzyć szybkie i skalowalne aplikacje webowe z wykorzystaniem Next.js.',
            moduleVideo: 'dJkLP986zR4',
            input: 'Wymagana podstawowa znajomość React.js oraz JavaScript',
            output:
              'Po zakończeniu modułu będziesz potrafić tworzyć aplikacje w Next.js z routingiem, server-side renderingiem oraz optymalizacją wydajności',
          },
          {
            moduleIndex: 4,
            name: 'Fullstack development',
            difficultyLevel: DifficultyLevel.HARD,
            description:
              'Kompleksowy moduł łączący frontend z backendem. Nauczysz się tworzyć pełne aplikacje webowe z wykorzystaniem React/Next.js po stronie klienta oraz Node.js z bazami danych po stronie serwera. Poznasz architekturę aplikacji, autoryzację, uwierzytelnianie i bezpieczeństwo.',
            moduleVideo: 'video_id_4',
            input:
              'Wymagana jest znajomość React, Node.js i podstaw baz danych',
            output:
              'Po zakończeniu modułu stworzysz kompletne aplikacje fullstack z własnym API, bazą danych i interfejsem użytkownika',
          },
          {
            moduleIndex: 5,
            name: 'Praktyki dydaktyczne',
            difficultyLevel: DifficultyLevel.HARD,
            description:
              'Moduł praktyczny, w którym będziesz pracować nad rzeczywistymi projektami w symulowanym środowisku pracy. Nauczysz się pracy w zespole, code review, planowania sprintów i rozwiązywania rzeczywistych problemów programistycznych.',
            moduleVideo: 'video_id_5',
            input: 'Wymagana jest znajomość wszystkich poprzednich modułów',
            output:
              'Po zakończeniu modułu zdobędziesz praktyczne doświadczenie w pracy nad projektami w zespole',
          },
          {
            moduleIndex: 6,
            name: 'Praktyki',
            difficultyLevel: DifficultyLevel.HARD,
            description:
              'Moduł praktyk zawodowych, w którym będziesz realizować rzeczywiste zadania w środowisku zbliżonym do komercyjnego. Skupisz się na samodzielnym rozwiązywaniu problemów, optymalizacji kodu i wdrażaniu aplikacji.',
            moduleVideo: 'video_id_6',
            input:
              'Wymagana jest znajomość wszystkich poprzednich modułów i umiejętność samodzielnej pracy',
            output:
              'Po zakończeniu modułu będziesz gotowy do podjęcia pracy jako młodszy programista fullstack',
          },
        ],
      })
      moduleCount = await prisma.module.count()
    }
    if (sprintCount === 0 && moduleCount > 0) {
      const firstModule = await prisma.module.findFirst({
        where: { moduleIndex: 1 },
      })

      if (firstModule) {
        const jsAssignments = await prisma.javascriptAssignment.findMany()
        const cssAssignments = await prisma.cssAssignment.findMany()

        const htmlTech = await prisma.technology.findUnique({
          where: { name: 'HTML' },
        })
        const cssTech = await prisma.technology.findUnique({
          where: { name: 'CSS' },
        })
        const jsTech = await prisma.technology.findUnique({
          where: { name: 'JavaScript' },
        })

        await prisma.sprint.create({
          data: {
            name: 'Podstawy nauk komputerowych i HTML',
            difficultyLevel: DifficultyLevel.EASY,
            shortDescription:
              'W tym sprincie skupimy się na podstawach nauk komputerowych',
            longDescription:
              'W pierwszym sprincie odkryjesz podstawy nauk komputerowych, które stanowią fundament w świecie technologii. Dowiesz się, jak w praktyce działa internet, jakie mechanizmy napędzają przeglądarki oraz jak za pomocą algorytmów można przedstawiać i rozwiązywać problemy. Diagramy UML pozwolą Ci na graficzne przedstawienie procesów, a dzięki nauce podstaw HTML zyskasz umiejętność tworzenia prostej struktury strony.',
            duration: 40,
            sprintNumber: 1,
            moduleId: firstModule.id,
            activities: [jsAssignments[2]?.id, cssAssignments[0]?.id].filter(
              Boolean
            ),
            technologies: {
              connect: htmlTech ? [{ id: htmlTech.id }] : [],
            },
          },
        })

        await prisma.sprint.create({
          data: {
            name: 'Podstawy CSS i stylowanie',
            difficultyLevel: DifficultyLevel.MEDIUM,
            shortDescription: 'Wprowadzenie do stylowania stron internetowych',
            longDescription:
              'W tym sprincie poznasz podstawy CSS. Nauczysz się jak stylować elementy HTML, pracować z kolorami, typografią, oraz jak tworzyć responsywne layouty. Poznasz różne metody selekcji elementów, model pudełkowy oraz podstawy flexboxa.',
            duration: 45,
            sprintNumber: 2,
            moduleId: firstModule.id,
            activities: [cssAssignments[2]?.id, cssAssignments[1]?.id].filter(
              Boolean
            ),
            technologies: {
              connect: [
                ...(cssTech ? [{ id: cssTech.id }] : []),
                ...(htmlTech ? [{ id: htmlTech.id }] : []),
              ],
            },
          },
        })

        await prisma.sprint.create({
          data: {
            name: 'Podstawy JavaScript',
            difficultyLevel: DifficultyLevel.MEDIUM,
            shortDescription: 'Wprowadzenie do programowania w JavaScript',
            longDescription:
              'W tym sprincie rozpoczniesz swoją przygodę z JavaScript. Poznasz podstawowe koncepcje programistyczne takie jak zmienne, typy danych, operatory, instrukcje warunkowe i pętle. Nauczysz się pisać proste skrypty i interaktywnie manipulować treścią strony.',
            duration: 50,
            sprintNumber: 3,
            moduleId: firstModule.id,
            activities: [jsAssignments[0]?.id, jsAssignments[1]?.id].filter(
              Boolean
            ),
            technologies: {
              connect: [
                ...(jsTech ? [{ id: jsTech.id }] : []),
                ...(htmlTech ? [{ id: htmlTech.id }] : []),
              ],
            },
          },
        })

        await prisma.sprint.create({
          data: {
            name: 'Funkcje i tablice w JavaScript',
            difficultyLevel: DifficultyLevel.HARD,
            shortDescription: 'Zaawansowane operacje na danych w JS',
            longDescription:
              'Czwarty sprint poświęcony jest kluczowym elementom JavaScript - funkcjom i tablicom. Nauczysz się deklarować i wywoływać funkcje, przekazywać parametry, a także efektywnie manipulować danymi w tablicach. Poznasz metody tablicowe, które są niezbędne w codziennej pracy programisty.',
            duration: 40,
            sprintNumber: 4,
            moduleId: firstModule.id,
            activities: [jsAssignments[3]?.id, cssAssignments[3]?.id].filter(
              Boolean
            ),
            technologies: {
              connect: jsTech ? [{ id: jsTech.id }] : [],
            },
          },
        })

        await prisma.sprint.create({
          data: {
            name: 'Zaawansowany JavaScript',
            difficultyLevel: DifficultyLevel.HARD,
            shortDescription: 'Zaawansowane koncepcje i techniki w JavaScript',
            longDescription:
              'W tym sprincie poznasz zaawansowane koncepcje JavaScript. Nauczysz się pracować na bardziej złożonych strukturach danych, optymalizować kod oraz rozwiązywać skomplikowane problemy programistyczne. Sprint przygotuje Cię do samodzielnego tworzenia bardziej zaawansowanych aplikacji.',
            duration: 50,
            sprintNumber: 5,
            moduleId: firstModule.id,
            activities: [jsAssignments[4]?.id].filter(Boolean),
            technologies: {
              connect: [...(jsTech ? [{ id: jsTech.id }] : [])],
            },
          },
        })
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
