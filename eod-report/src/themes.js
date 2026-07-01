import slothImg from './assets/1697277f4bb2899ad61a17947f2b0656-cute-sloth-in-pixel-art-style.webp'
import natureImg from './assets/images.jpeg'
import oceanImg from './assets/images.jpg'
import pixelImg from './assets/images.png'

export const THEMES = [
  {
    id: 'sloth',
    name: 'Sloth',
    mascot: slothImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
  {
    id: 'nature',
    name: 'Nature',
    mascot: natureImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    mascot: oceanImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
  {
    id: 'pixel',
    name: 'Pixel',
    mascot: pixelImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
]

export function getTheme(id) {
  return THEMES.find(t => t.id === id) || THEMES[0]
}
