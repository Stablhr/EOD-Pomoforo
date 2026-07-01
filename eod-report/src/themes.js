import slothImg from './assets/1697277f4bb2899ad61a17947f2b0656-cute-sloth-in-pixel-art-style.webp'
import bunnyImg from './assets/images.jpeg'
import kittyImg from './assets/images.jpg'
import capybaraImg from './assets/images.png'

export const THEMES = [
  {
    id: 'sloth',
    name: 'Sloth',
    mascot: slothImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
  {
    id: 'bunny',
    name: 'Bunny',
    mascot: bunnyImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
  {
    id: 'kitty',
    name: 'Kitty',
    mascot: kittyImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
  {
    id: 'capybara',
    name: 'Capybara',
    mascot: capybaraImg,
    reportStyle: 'plain',
    tabIcons: { type: 'svg' },
  },
]

export function getTheme(id) {
  return THEMES.find(t => t.id === id) || THEMES[0]
}
