//script.js

// Przycisk rozpoczynający nową grę
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

// Ustawienie tego, co będzie się działo po kliknięciu na przyciski "papier", "nożyce", "kamień" (listenery ustawione na odpowiednie funkcje uruchamiane z przycisków)
// wywołanie funkcji playerPick z parametrem reprezentującym wybór gracza
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//wartosci poczatkowe gry. Ustalamy stan gry na notStarted. Stan gry będzie nam służył do ustalenia, które kontenery należy w danej chwili wyświetlać
var gameState = 'notStarted',  //started // ended
    player = {					//obiekt player, name, score
        name: '',
        score: 0
    },
    computer = {				//tylko score
        score: 0
    };

//  zmienne, które będą wskazywać na elementy gry, a konkretnie jej poszczególne części.   
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

 //Wcześniej zdefiniowaliśmy zmienną gameState. Decydujemy, że może ona przyjąć kilka wartości - zależnie od tego, czy gra nie została jeszcze rozpoczęta, jest w trakcie czy została zakończona chcemy wyświetlić różne elementy na stronie.Zależnie od stanu zmiennej gameState zostaną wykonane różne polecenia.
 function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}   

setGameElements();    				//wywolanie

//definiujmy zmienne odnoszące się do tych elementów na stronie, które będziemy aktualizować przed rozpoczęciem rozgrywki.
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

// definiujemy funkcję, która będzie uruchamiana po wciśnięciu przycisku "New Game" / "Play Again"   
function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); // This function has not been created yet
  }

}    

//Zdefiniujmy teraz funkcję, która odpowiada za pobranie wyboru gracza.
function playerPick(playerPick) {
    console.log(playerPick);
}

//wybor komputera
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

//umieszczenie wyboru gracza i komputera na stronie
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

//function playerPick(playerPick) {
//    var computerPick = getComputerPick();

//    playerPickElem.innerHTML = playerPick;
//    computerPickElem.innerHTML = computerPick;
//}

// logika gry i przyznawanie punktów. Funkcja otrzymuje wybory obu graczy. Na początek zakładamy, że to my wygraliśmy rundę - dzięki temu nie musimy tego sprawdzać, a jedynie potwierdzić.
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
        
    }
setGamePoints();
checkGameWinner ();
}

//funkcja powinna wywoływać się za każdym wyborem gracza.
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

//Aktualizacja wyniku
//Teraz dodajemy wartości. Wynik gry znajduje się wewnątrz obiektów player oraz computer - brakuje tylko wyświetlania go na stronie.
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

//zakonczenie rozgrywki
function checkGameWinner () {
    if(player.score == 10) {
        gameState = 'ended';
        alert('Congratulations, ' + player.name +'! You win!');
        setGameElements();
    }
     else if(computer.score == 10) {
        gameState = 'ended';
        alert('Game over', 'You lose!');
        setGameElements();
    }
}

