# UnfoldGotLatent 🎭

A decentralized talent competition platform where AI judges roast performances and community members earn rewards for accurate predictions.

## Overview 🎯

UnfoldGotLatent combines entertainment, AI, and DeFi to create an engaging talent competition platform. Creators submit YouTube performances, receive feedback from AI judges with distinct personalities (Donald Trump, Joe Rogan, Mickey Mouse), and the community stakes tokens to predict scores.

### Key Features ✨

- Submit and watch performances via YouTube links
- AI-generated personality-based feedback with voice synthesis
- Token staking and prediction system
- Community engagement through roasts and votes
- Transparent reward distribution
- Available as web app and Telegram mini app

## Technical Stack 🛠

- **Frontend**: Vite, TailwindCSS
- **Blockchain**: Aptos/Base Chain (Move + EVM Smart Contracts)
- **AI Integration**: 
 - GPT-4o, OpenAI Assistants for personality-based commentary
 - OpenAI Whisper for text-to-speech
- **Authentication**: Okto Wallet (Google Sign-in)
- **Storage**: Cloudinary

## Getting Started 🚀

### Prerequisites

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
