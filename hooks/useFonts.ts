import localFont from 'next/font/local'
const BeaufortforLOL = localFont({
  src: '../public/assets/fonts/BeaufortforLOL-Bold.ttf',
})
const Spiegel = localFont({
  src: [
    {
      path: '../public/assets/fonts/Spiegel-Bold.ttf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../public/assets/fonts/Spiegel-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
  ],
})

export const useFonts = () => {
  return { BeaufortforLOL, Spiegel }
}
