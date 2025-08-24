# my-tac-app

A hybrid TAC dApp with Next.js frontend and hardhat smart contracts - powered by TAC

## Project Structure

- `/frontend` - Next.js frontend with TAC SDK integration
- `/contracts` - hardhat smart contracts for TAC

## Getting Started

### Frontend

```bash
cd frontend
npm run dev
```

### Contracts

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network tacTestnet
```

## Learn More

- [TAC Documentation](https://docs.tac.build)
