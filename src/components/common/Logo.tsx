import { colors } from '../../theme'

interface Props {
  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
}

export function Logo(props: Props) {
  return (
    <svg
      width={260}
      height={70}
      viewBox="0 0 260 70"
      xmlns="http://www.w3.org/2000/svg"
      style={{...props}}
    >
      <rect x={0} y={0} width={260} height={70} fill="transparent" />
      <path
        d="M19.2 25.7Q21.2 25.7 23.0 26.3Q24.8 26.9 26.0 28.0L26.0 28.0L23.3 32.9Q21.1 31.5 18.8 31.5L18.8 31.5Q15.6 31.5 13.6 33.8Q11.7 36.0 11.7 39.9L11.7 39.9L11.7 52.9L5.7 52.9L5.7 26.2L11.1 26.2L11.1 30.3Q12.7 28.0 14.7 26.8Q16.7 25.7 19.2 25.7L19.2 25.7ZM40.9 25.7Q47.4 25.7 51.1 29.4Q54.8 33.2 54.8 39.7L54.8 39.7Q54.8 40.4 54.6 41.9L54.6 41.9L33.3 41.9Q33.7 44.8 36.0 46.5Q38.2 48.2 41.7 48.2L41.7 48.2Q44.0 48.2 46.1 47.5Q48.2 46.7 49.4 45.5L49.4 45.5L53.1 49.0Q51.1 51.2 48.0 52.4Q45.0 53.7 41.6 53.7L41.6 53.7Q37.2 53.7 33.9 51.9Q30.7 50.2 28.9 47.0Q27.1 43.8 27.1 39.6L27.1 39.6Q27.1 35.5 28.8 32.3Q30.6 29.2 33.7 27.5Q36.8 25.7 40.9 25.7L40.9 25.7ZM41.1 30.9Q38.0 30.9 36.0 32.6Q34.0 34.2 33.4 37.2L33.4 37.2L48.9 37.2Q48.5 34.3 46.5 32.6Q44.4 30.9 41.1 30.9L41.1 30.9ZM70.3 53.6Q63.5 53.6 58.2 49.6L58.2 49.6L61.0 45.3Q62.8 46.7 65.3 47.4Q67.8 48.2 70.4 48.2L70.4 48.2Q73.0 48.2 74.4 47.4Q75.8 46.7 75.8 45.2L75.8 45.2Q75.8 43.8 74.4 43.0Q73.0 42.3 69.9 42.0L69.9 42.0Q64.7 41.5 61.9 39.3Q59.0 37.2 59.0 33.8L59.0 33.8Q59.0 31.3 60.5 29.5Q61.9 27.6 64.6 26.6Q67.2 25.6 70.6 25.6L70.6 25.6Q76.7 25.6 81.2 28.7L81.2 28.7L78.5 33.0Q75.0 30.7 70.9 30.7L70.9 30.7Q68.0 30.7 66.5 31.5Q65.0 32.3 65.0 33.8L65.0 33.8Q65.0 35.0 66.2 35.8Q67.5 36.5 70.4 36.8L70.4 36.8Q76.4 37.5 79.1 39.5Q81.8 41.5 81.8 45.3L81.8 45.3Q81.8 47.7 80.3 49.6Q78.9 51.5 76.3 52.5Q73.7 53.6 70.3 53.6L70.3 53.6ZM106.5 26.2L112.5 26.2L112.5 52.9L107.1 52.9L107.1 49.5Q103.7 53.5 98.0 53.5L98.0 53.5Q94.6 53.5 92.1 51.9Q89.5 50.4 88.2 47.6Q86.8 44.8 86.8 41.0L86.8 41.0L86.8 26.2L92.8 26.2L92.8 40.6Q92.8 44.1 94.5 46.1Q96.2 48.0 99.1 48.0L99.1 48.0Q102.4 48.0 104.4 45.8Q106.5 43.7 106.5 40.3L106.5 40.3L106.5 26.2Z "
        fill="#fff"
      />
      <path
        d="M151.2 25.7Q156.3 25.7 159.3 28.8Q162.3 31.9 162.3 37.3L162.3 37.3L162.3 52.9L156.2 52.9L156.2 37.8Q156.2 34.6 154.8 32.9Q153.4 31.2 150.7 31.2L150.7 31.2Q147.7 31.2 145.9 33.1Q144.0 35.0 144.0 38.1L144.0 38.1L144.0 52.9L138.0 52.9L138.0 37.8Q138.0 34.6 136.5 32.9Q135.1 31.2 132.4 31.2L132.4 31.2Q129.4 31.2 127.6 33.1Q125.7 35.0 125.7 38.1L125.7 38.1L125.7 52.9L119.7 52.9L119.7 26.2L125.1 26.2L125.1 29.4Q128.0 25.7 133.0 25.7L133.0 25.7Q135.8 25.7 138.1 26.9Q140.4 28.2 141.7 30.4L141.7 30.4Q144.8 25.7 151.2 25.7L151.2 25.7ZM190.5 26.2L195.9 26.2L195.9 52.9L190.5 52.9L190.5 49.4Q188.9 51.3 186.4 52.4Q183.8 53.5 180.7 53.5L180.7 53.5Q176.9 53.5 173.9 51.8Q170.9 50.0 169.2 46.8Q167.5 43.6 167.5 39.6L167.5 39.6Q167.5 35.5 169.2 32.3Q170.9 29.2 173.9 27.4Q176.9 25.7 180.7 25.7L180.7 25.7Q183.8 25.7 186.4 26.8Q188.9 27.9 190.5 29.8L190.5 29.8L190.5 26.2ZM181.7 48.0Q185.3 48.0 187.6 45.7Q189.9 43.3 189.9 39.6L189.9 39.6Q189.9 35.9 187.6 33.5Q185.3 31.2 181.7 31.2L181.7 31.2Q178.1 31.2 175.8 33.5Q173.6 35.9 173.6 39.6L173.6 39.6Q173.6 43.3 175.8 45.7Q178.1 48.0 181.7 48.0L181.7 48.0ZM215.1 39.0L227.9 52.9L220.0 52.9L209.3 41.1L209.3 52.9L203.3 52.9L203.3 15.1L209.3 15.1L209.3 37.5L218.9 26.2L226.3 26.2L215.1 39.0ZM242.1 25.7Q248.6 25.7 252.3 29.4Q256.0 33.2 256.0 39.7L256.0 39.7Q256.0 40.4 255.9 41.9L255.9 41.9L234.5 41.9Q234.9 44.8 237.2 46.5Q239.4 48.2 243.0 48.2L243.0 48.2Q245.2 48.2 247.3 47.5Q249.4 46.7 250.6 45.5L250.6 45.5L254.3 49.0Q252.3 51.2 249.2 52.4Q246.2 53.7 242.8 53.7L242.8 53.7Q238.4 53.7 235.2 51.9Q231.9 50.2 230.1 47.0Q228.3 43.8 228.3 39.6L228.3 39.6Q228.3 35.5 230.0 32.3Q231.8 29.2 234.9 27.5Q238.0 25.7 242.1 25.7L242.1 25.7ZM242.3 30.9Q239.2 30.9 237.2 32.6Q235.2 34.2 234.6 37.2L234.6 37.2L250.1 37.2Q249.8 34.3 247.7 32.6Q245.6 30.9 242.3 30.9L242.3 30.9Z "
        fill={colors.primary}
      />
    </svg>
  )
}
