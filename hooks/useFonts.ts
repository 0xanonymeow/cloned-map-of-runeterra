import localFont from 'next/font/local'
const BeaufortforLOL = localFont({
  src: '../public/assets/fonts/BeaufortforLOL-Bold.ttf',
})

export const useFonts = () => {
  return { BeaufortforLOL }
}
