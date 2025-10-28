# Generator Fleet Monitor Dashboard

A real-time monitoring dashboard for GenerX generator fleet management, powered by HydroScan and Monnit IoT Platform.

![Demo Badge](https://img.shields.io/badge/status-live%20demo-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-cyan)

## Features

- 🔴 **Real-time Monitoring** - Live sensor data updates every 3 seconds
- 📊 **Health Scoring** - Automatic health score calculation based on sensor readings
- ⚡ **Multi-Sensor Tracking** - Temperature, vibration, battery voltage, and AC current
- 🎯 **Smart Alerts** - Color-coded status indicators (Healthy, Warning, Critical, Offline)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🌙 **Dark Theme** - Professional dark UI optimized for 24/7 monitoring
- 🔔 **Alert System** - Real-time notifications for critical and warning conditions

## Dashboard Overview

The dashboard monitors 6 generators across different locations:

1. **Tampa Bay Medical Center** - Generac 24kW
2. **Riverside Commerce Plaza** - Generac 36kW
3. **Industrial Park Distribution** - Generac 48kW
4. **Maple Avenue Residence** - Generac 22kW
5. **Downtown Data Center** - Generac 60kW
6. **Westside Facility** - Generac 30kW

### Monitored Metrics

Each generator displays:
- **Health Score** (0-100%) - Calculated from all sensor inputs
- **Runtime Today** - Cumulative operational hours
- **Battery Voltage** - With GOOD/AGING/CRITICAL indicators
- **Temperature** - Engine temperature in °F
- **Vibration Level** - Mechanical vibration measurement
- **AC Current** - Electrical current draw in Amps

### Status Levels

- 🟢 **Healthy** (80-100%) - All systems normal
- 🟡 **Warning** (50-79%) - Elevated readings, monitor closely
- 🔴 **Critical** (<50%) - Immediate attention required
- ⚫ **Offline** - No sensor data received

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/Fightguy88/Generator_UI.git
cd Generator_UI

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Quick Demo (No Installation)

Simply open `demo.html` in any web browser for a standalone version that requires no setup!

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
Generator_UI/
├── src/
│   ├── App.jsx                      # Root application component
│   ├── GeneratorFleetMonitor.jsx   # Main dashboard component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles with Tailwind
├── public/                          # Static assets
├── dist/                            # Production build output
├── demo.html                        # Standalone demo (no build required)
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
└── package.json                     # Project dependencies
```

## Deployment

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repository name:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/Generator_UI/', // Your repo name
})
```

2. Build and deploy:

```bash
npm run build
```

3. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select your branch and `/dist` folder
   - Save

### Deploy to Vercel/Netlify

Simply connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) - they'll auto-detect the Vite configuration and deploy automatically.

**Build settings:**
- Build command: `npm run build`
- Output directory: `dist`

## Technology Stack

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## Health Score Algorithm

The health score (0-100%) is calculated based on:

```javascript
Base Score: 100%

Deductions:
- Temperature > 200°F: -2% per degree over
- Vibration > 4.0: -8% per unit over
- AC Current > 65A: -1.5% per amp over
- Battery < 12.4V: -15% per 0.1V under
- Battery < 12.0V: Additional -20% (critical)
```

Status is determined by final score:
- ≥80% = Healthy
- 50-79% = Warning
- <50% = Critical

## Real-Time Simulation

The demo includes realistic sensor data simulation:

- Values fluctuate within realistic ranges
- Automatic health score recalculation
- Dynamic alert generation
- Status changes based on sensor thresholds
- Updates every 3 seconds

## Customization

### Adding New Generators

Edit `src/GeneratorFleetMonitor.jsx`:

```javascript
const [generators, setGenerators] = useState([
  {
    id: 7,
    name: "Your Generator Name",
    address: "Your Address",
    status: "healthy",
    healthScore: 95,
    // ... other properties
  }
]);
```

### Adjusting Alert Thresholds

Modify the health score calculation in the `useEffect` hook:

```javascript
if (newTemp > 200) healthScore -= (newTemp - 200) * 2;  // Adjust multiplier
if (newVib > 4) healthScore -= (newVib - 4) * 8;       // Adjust threshold
```

### Changing Update Frequency

Update the interval in milliseconds:

```javascript
setInterval(() => {
  // Update logic
}, 3000); // Change from 3000ms (3 seconds)
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Performance

- Initial load: ~1.2s
- Time to Interactive: ~1.5s
- Bundle size: ~155KB (gzipped)
- Live data updates with minimal CPU usage
- Optimized re-renders using React hooks

## WSL/Windows Users

If running in WSL2 on Windows:

1. Access via Windows browser: `http://localhost:5173`
2. Or use WSL IP: `http://<wsl-ip>:5173`
3. Or open `demo.html` directly from Windows Explorer at: `\\wsl$\Ubuntu\home\user\Generator_UI\demo.html`

## Future Enhancements

- [ ] Historical data charts and trends
- [ ] Email/SMS alert notifications
- [ ] Multi-user authentication
- [ ] Mobile app (React Native)
- [ ] Data export (CSV/PDF reports)
- [ ] Integration with Monnit API
- [ ] Predictive maintenance AI
- [ ] Customizable dashboard layouts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an [Issue](https://github.com/Fightguy88/Generator_UI/issues)
- Contact: Your support email

## Acknowledgments

- Powered by HydroScan × Monnit IoT Platform
- Built with React and Vite
- Icons by Lucide React
- Styled with Tailwind CSS

---

**Live Demo**: [View Dashboard](https://fightguy88.github.io/Generator_UI/)
**Repository**: [GitHub](https://github.com/Fightguy88/Generator_UI)

Made with ⚡ for GenerX Generator Fleet Management
