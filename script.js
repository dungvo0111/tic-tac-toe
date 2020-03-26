const X_MARK = 'x'
const O_MARK = 'o'
let xTurn
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('.board')
const winningMess = document.querySelector('.winning-mess')
const announceText = document.querySelector('[message-text]')
const button = document.querySelector('.button')
const WIN_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

gameStart()

function gameStart () {
    cellElements.forEach(cell => {
        cell.classList.remove(X_MARK)
        cell.classList.remove(O_MARK)
        cell.addEventListener('click', handleClick, {once:true} )
    })
    xTurn = true;
    setHoverEffect()
    winningMess.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target
    const currentMark = xTurn ? X_MARK : O_MARK
    placeMark(cell, currentMark)
    
    //Check For Win
    if (checkWin(currentMark)) {
        announceText.innerHTML = `${xTurn ? "X": "O"} Won!`
        winningMess.classList.add('show')
    } else if (isDraw()) {
        announceText.innerHTML = `Draw!`
        winningMess.classList.add('show')
    } else {
        //Switch Turns
        switchTurn()
        setHoverEffect()
    }  
}

function checkWin(currentMark) {
    return WIN_COMBINATION.some(element => {
        return element.every(index => {
            return cellElements[index].classList.contains(currentMark)
        })
    })
}

function isDraw() {
    return ([...cellElements].every(cell => {
        return cell.classList.contains(X_MARK) || cell.classList.contains(O_MARK)
    }))
        
    
}

function placeMark(cell, currentMark) {
    cell.classList.add(currentMark)
}

function switchTurn() {
    return xTurn = !xTurn
}

function setHoverEffect() {
    board.classList.remove(X_MARK)
    board.classList.remove(O_MARK)
    if (xTurn) {
        board.classList.add(X_MARK)
    } else {
        board.classList.add(O_MARK)
    }
}

button.addEventListener('click', gameStart)
