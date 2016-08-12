module.exports = {
  build: "cd app && npm run build:dev",
  deploy: [
    "Blocktix",
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
