import {
  PrismaClient,
  Category,
  DifficultyLevel,
  CssCategory,
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const countJs = await prisma.javascriptAssignment.count()
  const countCss = await prisma.cssAssignment.count()

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
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
