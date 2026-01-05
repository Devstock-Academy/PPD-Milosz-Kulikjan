import { NextRequest, NextResponse } from 'next/server'

console.log('✅ /api/run-code loaded')

export async function POST(request: NextRequest) {
  console.log('📨 POST /api/run-code called')

  try {
    const body = await request.json()
    const { code } = body

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        {
          output: '❌ Please provide JavaScript code',
          success: false,
        },
        { status: 400 }
      )
    }

    console.log('📝 Code length:', code.length)
    let output = ''

    const sandbox = {
      console: {
        log: (...args: any[]) => {
          output +=
            args
              .map((arg) =>
                typeof arg === 'object'
                  ? JSON.stringify(arg, null, 2)
                  : String(arg)
              )
              .join(' ') + '\n'
        },
        error: (...args: any[]) => {
          output +=
            '❌ ERROR: ' + args.map((arg) => String(arg)).join(' ') + '\n'
        },
        warn: (...args: any[]) => {
          output +=
            '⚠️ WARN: ' + args.map((arg) => String(arg)).join(' ') + '\n'
        },
        info: (...args: any[]) => {
          output +=
            'ℹ️ INFO: ' + args.map((arg) => String(arg)).join(' ') + '\n'
        },
      },
      Math: Math,
      JSON: JSON,
      Date: Date,
      Array: Array,
      Object: Object,
      String: String,
      Number: Number,
      Boolean: Boolean,
      RegExp: RegExp,
      Promise: Promise,
      Map: Map,
      Set: Set,
      Error: Error,
      TypeError: TypeError,
      RangeError: RangeError,
      SyntaxError: SyntaxError,
    }

    try {
      const wrappedCode = `
        "use strict";
        const safeGlobals = ['Math', 'JSON', 'Date', 'Array', 'Object', 
                            'String', 'Number', 'Boolean', 'RegExp',
                            'Promise', 'Map', 'Set', 'Error',
                            'TypeError', 'RangeError', 'SyntaxError'];
        
        safeGlobals.forEach(name => {
          globalThis[name] = eval(name);
        });
        
        globalThis.console = console;
        
        try {
          ${code}
        } catch(err) {
          console.error('Uncaught error:', err.message);
        }
      `

      const func = new Function(...Object.keys(sandbox), wrappedCode)

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error('⏰ Execution timeout (5 seconds)')),
          5000
        )
      })

      await Promise.race([
        Promise.resolve(func(...Object.values(sandbox))),
        timeoutPromise,
      ])
    } catch (execError: any) {
      if (execError.message.includes('timeout')) {
        output += '⏰ Execution timed out after 5 seconds\n'
      } else {
        output += `❌ Execution Error: ${execError.message}\n`
      }
    }

    if (!output.trim()) {
      output = '✅ Code executed successfully (no console output)'
    }

    return NextResponse.json({
      output: output.trim(),
      success: !output.includes('❌') && !output.includes('ERROR:'),
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('💥 Server Error:', error)
    return NextResponse.json(
      {
        output: `❌ Server Error: ${error.message}`,
        success: false,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Code Execution API',
    status: 'online',
    timestamp: new Date().toISOString(),
  })
}
