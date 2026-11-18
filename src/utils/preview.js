// Draws small fake app screens (as SVG images) for the project cards.
// Every project has three screens, and each screen uses one of these layouts:
// grid, list, bubbles, chart or form.
// To use real screenshots later, put images in /public and use them in ProjectCard.jsx.

export const PREVIEW_SCREENS = {
  portal: [['Residents', 'list'], ['Payments', 'chart'], ['Complaints', 'form']],
  chat: [['Chats', 'list'], ['Conversation', 'bubbles'], ['New message', 'form']],
  shop: [['Products', 'grid'], ['Cart', 'list'], ['Checkout', 'form']],
  bot: [['Chatbot', 'bubbles'], ['Expenses', 'form'], ['Net profit', 'chart']],
  music: [['Home', 'grid'], ['Playlist', 'list'], ['Now playing', 'chart']],
  dash: [['Overview', 'chart'], ['Movies', 'list'], ['Add movie', 'form']],
  todo: [['Tasks', 'list'], ['Add task', 'form'], ['Done', 'list']],
}

const WHITE = '#ffffff'
const PAGE_BACKGROUND = '#F6F7FB'
const DARK_LINE = '#cbd2e0'
const LIGHT_LINE = '#dfe3ed'

// One rectangle in the SVG
function box(x, y, width, height, color, radius = 0, opacity = 1) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${color}" opacity="${opacity}"/>`
}

// 2 rows x 3 columns of cards (like a product grid)
function drawGrid(mainColor, secondColor) {
  let svg = ''
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const x = 18 + col * 124
      const y = 50 + row * 108
      const imageColor = (row + col) % 2 ? secondColor : mainColor

      svg += box(x, y, 112, 96, WHITE, 8)
      svg += box(x + 6, y + 6, 100, 54, imageColor, 6, 0.85)
      svg += box(x + 8, y + 70, 70, 7, DARK_LINE, 3)
      svg += box(x + 8, y + 82, 44, 6, LIGHT_LINE, 3)
    }
  }
  return svg
}

// 5 rows with a round avatar, two text lines and a small tag
function drawList(mainColor, secondColor) {
  let svg = ''
  for (let row = 0; row < 5; row++) {
    const y = 50 + row * 44

    svg += box(18, y, 364, 36, WHITE, 8)
    svg += `<circle cx="40" cy="${y + 18}" r="11" fill="${secondColor}"/>`
    svg += box(60, y + 8, 120, 7, DARK_LINE, 3)
    svg += box(60, y + 21, 80, 6, LIGHT_LINE, 3)
    svg += box(332, y + 11, 38, 14, mainColor, 7, 0.9)
  }
  return svg
}

// Chat bubbles, alternating left (other person) and right (me)
function drawBubbles(mainColor) {
  let svg = ''
  for (let row = 0; row < 5; row++) {
    const width = 120 + ((row * 53) % 110)
    const isMine = row % 2 === 1
    const x = isMine ? 382 - width : 18
    const y = 50 + row * 42
    const lineColor = isMine ? WHITE : DARK_LINE
    const shortLineColor = isMine ? WHITE : LIGHT_LINE

    svg += box(x, y, width, 32, isMine ? mainColor : WHITE, 12)
    svg += box(x + 12, y + 10, width - 40, 6, lineColor, 3, isMine ? 0.8 : 1)
    svg += box(x + 12, y + 20, (width - 40) * 0.6, 5, shortLineColor, 3, isMine ? 0.5 : 1)
  }
  return svg
}

// Three number boxes on top and a bar chart below
function drawChart(mainColor, secondColor) {
  let svg = ''
  for (let col = 0; col < 3; col++) {
    const x = 18 + col * 124
    svg += box(x, 48, 112, 48, WHITE, 8)
    svg += box(x + 10, 60, 50, 8, DARK_LINE, 3)
    svg += box(x + 10, 76, 70, 10, col % 2 ? secondColor : mainColor, 3)
  }

  svg += box(18, 108, 364, 148, WHITE, 8)

  const barHeights = [40, 70, 55, 95, 80, 120, 100, 130]
  barHeights.forEach((barHeight, index) => {
    const x = 34 + index * 44
    const y = 244 - barHeight
    svg += box(x, y, 28, barHeight, index % 2 ? secondColor : mainColor, 5)
  })
  return svg
}

// Three input fields and a button
function drawForm(mainColor) {
  let svg = ''
  for (let row = 0; row < 3; row++) {
    const y = 50 + row * 58
    svg += box(18, y, 60, 6, DARK_LINE, 3)
    svg += box(18, y + 12, 364, 36, WHITE, 8)
    svg += box(28, y + 26, row === 0 ? 200 : 140, 7, LIGHT_LINE, 3)
  }
  svg += box(18, 228, 130, 30, mainColor, 8)
  svg += box(40, 239, 86, 7, WHITE, 3, 0.9)
  return svg
}

// Builds one screen and returns it as a data URI that can be used as an <img> src
export function makeShot([mainColor, secondColor], kind, screenIndex) {
  const [title, layout] = PREVIEW_SCREENS[kind][screenIndex]

  // fake browser window: background, colored top bar, three dots and the title
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 270">'
  svg += box(0, 0, 400, 270, PAGE_BACKGROUND)
  svg += box(0, 0, 400, 34, mainColor)
  svg += '<circle cx="16" cy="17" r="4" fill="#fff" opacity=".7"/>'
  svg += '<circle cx="30" cy="17" r="4" fill="#fff" opacity=".45"/>'
  svg += '<circle cx="44" cy="17" r="4" fill="#fff" opacity=".25"/>'
  svg += `<text x="200" y="22" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#fff">${title}</text>`

  if (layout === 'grid') svg += drawGrid(mainColor, secondColor)
  else if (layout === 'list') svg += drawList(mainColor, secondColor)
  else if (layout === 'bubbles') svg += drawBubbles(mainColor)
  else if (layout === 'chart') svg += drawChart(mainColor, secondColor)
  else svg += drawForm(mainColor)

  svg += '</svg>'
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}
