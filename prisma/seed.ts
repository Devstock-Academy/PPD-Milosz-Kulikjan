import { PrismaClient, Category, DifficultyLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.javascriptAssignment.count()

  if (count === 0) {
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
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
