// 宣告全域變數
let deck = []
let playerHand = []
let dealerHand = []
let playerPoints = 0
let dealerPoints = 0
let cash = 1000 // 初始金額
let bet = 0

// 發牌
function deal() {
  // 洗牌
  shuffleDeck()
  // 清空手牌
  playerHand = []
  dealerHand = []
  // 發兩張牌給玩家和莊家
  playerHand.push(dealCard())
  playerHand.push(dealCard())
  dealerHand.push(dealCard())
  dealerHand.push(dealCard())
  // 顯示手牌和點數
  showPlayerHand()
  showDealerHand()
  check()
}

// 點擊叫牌
function hit() {
  playerHand.push(dealCard())
  showPlayerHand()
  check()
}

// 點擊停牌
function stand() {
  // 莊家繼續叫牌，直到點數超過17並且點數大於玩家點數
  while (dealerPoints < 17 || dealerPoints < playerPoints) {
    dealerHand.push(dealCard())
    showDealerHand()
  }
  checkWin()
}

// 洗牌
function shuffleDeck() {
  // 生成一副新牌
  deck = []
  const suits = ['♠️', '♣️', '♦️', '♥️']
  const values = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A'
  ]
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, suit })
    }
  }
  // 洗牌
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
}

// 抽牌
function dealCard() {
  return deck.pop()
}

// 計算手牌點數
function calculateHandPoints(hand) {
  let points = 0
  let aceCount = 0
  for (const card of hand) {
    if (card.value === 'A') {
      aceCount++
      points += 11
    } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
      points += 10
    } else {
      points += parseInt(card.value)
    }
  }
  // 處理A的情況
  while (points > 21 && aceCount > 0) {
    points -= 10
    aceCount--
  }
  return points
}

// 顯示玩家手牌
function showPlayerHand() {
  playerPoints = calculateHandPoints(playerHand)
  const playerArea = document.getElementById('player-area')
  playerArea.innerHTML = `<h2>玩家(player):${playerPoints}</h2>`
  for (const card of playerHand) {
    const cardDiv = document.createElement('div')
    cardDiv.innerText = card.value + card.suit
    playerArea.appendChild(cardDiv)
  }
}

// 顯示莊家手牌
function showDealerHand() {
  dealerPoints = calculateHandPoints(dealerHand)
  const dealerArea = document.getElementById('dealer-area')
  dealerArea.innerHTML = `<h2>莊家(dealer):${dealerPoints}</h2>`
  for (const card of dealerHand) {
    const cardDiv = document.createElement('div')
    cardDiv.innerText = card.value + card.suit
    dealerArea.appendChild(cardDiv)
  }
}

// 檢查勝負
function check() {
  if (playerPoints > 21) {
    alert('玩家爆牌，莊家獲勝！')
  } else if (playerPoints === 21 && playerHand.length === 2) {
    alert('Black Jack，玩家獲勝！')
  } else {
    return
  }
}

function checkWin() {
  if (dealerPoints > 21) {
    alert('莊家爆牌，玩家獲勝！')
  } else if (playerPoints === dealerPoints) {
    alert('點數相同，平手！')
  } else if (playerPoints > dealerPoints) {
    alert('玩家點數大於莊家，玩家獲勝！')
  } else {
    alert('莊家點數大於玩家，莊家獲勝！')
  }
}

// 初始化
document.getElementById('deal').addEventListener('click', deal)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stand').addEventListener('click', stand)
