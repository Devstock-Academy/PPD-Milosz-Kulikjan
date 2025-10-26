const withFlowbiteReact = require('flowbite-react/plugin/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co'], 
  },
}

module.exports = withFlowbiteReact(nextConfig)
