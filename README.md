# GotCHA Game CAPTCHA

A next-generation CAPTCHA system that replaces traditional challenges with engaging mini-games. This project was built for the [CAPTCHA Game Challenge Hackathon](https://dorahacks.io/hackathon/captcha-game-challenge/detail).

## 🎮 Features

- **Multiple Game Types:**
  - Target Practice (Click Game)
  - Pattern Memory Challenge
  - Card Matching Game
  - Sliding Puzzle
- **Iframe Integration** for seamless website embedding
- **Mobile-friendly** with touch support
- **Secure Verification** through gameplay
- **Lightweight Implementation**

## 🚀 Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

## 🔧 Implementation

### Game Integration

To integrate GotCHA into your website, add the iframe:

```html
<iframe
  src="https://your-deployment-url/random?secret=your_api_secret"
  width="400"
  height="580"
  className="rounded-md shadow-md"
></iframe>
```

### Game Types

1. **Target Practice**
   - Click moving targets
   - Score 3 hits to verify
   - Time limit: 20 seconds

2. **Pattern Challenge**
   - Memorize and repeat color sequences
   - Complete 1 pattern to verify
   - Time limit: 30 seconds

3. **Memory Challenge**
   - Match 3 pairs of cards
   - Time limit: 30 seconds

4. **Puzzle Challenge**
   - Solve a sliding puzzle
   - Complete the puzzle to verify
   - Time limit: 30 seconds

## 🏗️ Architecture

### Core Components

1. **Game Provider**
   - Manages game state
   - Handles scoring and timing
   - Controls game lifecycle

2. **CAPTCHA Wrapper**
   - Handles iframe integration
   - Manages verification flow
   - Provides user interface

3. **Game Components**
   - Implements individual games
   - Handles user interactions
   - Manages game-specific logic

## 🔒 Security

- Secure secret key handling
- Cross-origin communication protection
- Iframe security best practices
- Error handling and validation

## 🎨 Styling

The project uses:

- Tailwind CSS for styling
- Framer Motion for animations
- Lucide icons
- ShadcN UI components

## 📱 Mobile Support

- Touch-friendly interactions
- Responsive design
- No keyboard input required
- Mobile-optimized layouts

## 🧪 Development

### Project Structure

```
src/
├── components/
│   ├── games/          # Individual game implementations
│   ├── captcha/        # CAPTCHA-specific components
│   └── ui/             # Reusable UI components
├── context/            # Game state management
├── hooks/              # Custom React hooks
├── lib/               # Utility functions
└── types/             # TypeScript definitions
```

### Key Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License

## 🙏 Acknowledgments

- Built for the CAPTCHA Game Challenge Hackathon
- Uses @gotcha-widget/lib for CAPTCHA integration
- UI components from shadcn/ui
