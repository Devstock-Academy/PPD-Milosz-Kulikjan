declare module 'prettier/standalone' {
  import prettier from 'prettier'
  export default prettier
}

declare module 'prettier/parser-babel' {
  import { Parser } from 'prettier'
  const parser: Parser
  export default parser
}
