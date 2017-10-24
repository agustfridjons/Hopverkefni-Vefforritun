
/**
 * Verkefni 7 – Gisk leikur
 *
 * Útfæra leik sem snýst um að giska á tölu milli 0 og 100.
 */

/**
 * global fylki sem geymir fjölda ágiskana í leikjum
 * Ef fylki er tómt hefur engin leikur verið spilaður.
 * Ef fylki er [2, 3] hafa verið spilaðir tveir leikir þar sem:
 *   - Fyrsti kláraðist í tveim ágiskunum
 *   - Seinni kláraðist í þrem ágiskunum
 */
var games = [];

/**
 * Byrjar leikinn okkar með því að kalla í play().
 * Eftir að að play() klárar, bíður notanda að spila annan leik með confirm()
 * Ef notandi ýtir á "ok" er annar leikur spilaður
 * Ef ýtt er á "cancel" er niðurstöðum leikja skilað með getResults() og alert()
 */
function start() {
  keepPlaying = true;
  while(keepPlaying) {
    play();
    keepPlaying = confirm('Spila annan leik?');
  }
  games.push();
  alert(getResults());
}

/**
 * Spilar einn leik. Sér um að:
 *   - Velja handahófskennda tölu í byrjun með randomNumber()
 *   - Biðja notanda um tölu með prompt()
 *   - Vinna úr inntaki frá notanda með parseGuess()
 *   - Láta vita hversu nálægt eða rétt gisk er með getResponse() og alert()
 *   - Halda utan um fjölda ágiskana
 *   - Vista fjölda ágiskana "games" fylki þegar búið að giska rétt
 *
 * Ef notandi ýtir á "cancel" þegar beðið er um ágiskun skal hætta í leik en
 * ekki vista ágiskanir (nota "break" í lykkju.)
 *
 * Þarf að útfæra með lykkju og flæðistýringum.
 */
function play() {
  var n = 100;
  var random = randomNumber(n);
  var tilraun = 0;
  var giskun = NaN;
  var stop = false;
  while (giskun != random) {
    giskun = parseGuess(prompt('Giskaðu á tölu frá 0 upp í ' + n + '.'));
    if (giskun == null) {
      stop = true;
      break;
    }
    alert(getResponse(giskun, random));
    tilraun++;
  }
  if(!stop){
    games.push(tilraun);
  }
}

/**
 * Skilar niðurstöðum um spilaða leiki sem streng.
 * Fjölda leikja er skilað ásamt meðalfjölda giska, t.d.:
 *   "Þú spilaðir 10 leikir
 *    Meðalfjöldi ágiskana var 6"
 * Ath að meðalfjöldi kemur í nýrri línu.
 * Ef enginn leikur var spilaður er "Þú spilaðir engan leik" skilað.
 */
function getResults(){
  if(games.length < 1) {
 		return "Þú spilaðir engan leik.";
 	}
 	if(games.length == 1) {
 		return "Þú spilaðir 1 leik.\nMeðalfjöldi ágiskana var " + calculateAverage() + '.';
 	}
 	return "Þú spilaðir " + games.length + " leiki.\nMeðalfjöldi ágiskana var " + calculateAverage() + '.';
 }

/**
 * Reiknar út og skilar meðal ágiskunum í öllum leikjum sem geymdir eru í
 * global breytu "games". Skilar gildi með tveim aukastöfum.
 * Ef games = [3, 4, 4] er niðurstaðan
 * (3 + 4 + 4) / 3 = 3.666666667
 * og er henni skilað sem 3.67
 *
 * Þarf að útfæra með lykkju.
 */
function calculateAverage() {
  var sum = 0;
  for (var i = 0; i < games.length; i++){
    sum += games[i];
  }
  var mtal = sum / games.length;
  return mtal.toFixed(2);
}

/**
 * Tekur inn input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er null skilað.
 */
function parseGuess(input) {
  if((input == null) || (input == NaN)) {
		return null;
	}
	return parseInt(input);
}

/**
 * Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
 *   - guess sem tölu, ágiskun notanda
 *   - correct sem tölu, rétt gildi
 * Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
 * Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
 * Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
 * Ef munur er undir 10 skal skila "Nálægt"
 * Ef munur er undir 20 skal skila "Frekar langt frá"
 * Ef munur er undir 50 skal skila "Langt frá"
 * Annars skal skila "Mjög langt frá"
 *
 * Þarf að útfæra með flæðistýringu.
 * Math.abs skilar algildi tölu: |a| = Math.abs(a)
 */
function getResponse(guess, correct) {
  if (!Number.isInteger(guess)){
    'Ekki rétt';
  }
  if (guess < 0){
    'Ekki rétt';
  }
  if (guess == correct){
    return 'Rétt';
  }
  if (Math.abs(correct - guess) < 5) {
    return 'Mjög nálægt';
  }
  if (Math.abs(correct - guess) < 10) {
    return 'Nálægt';
  }
  if (Math.abs(correct - guess) < 20) {
    return 'Frekar langt frá';
  }
  if (Math.abs(correct - guess) < 50) {
    return 'Langt frá';
  }
  return 'Mjög langt frá';
}

/**
 * Skilar tölu af handahófi frá [0, n]
 */
function randomNumber(n) {
  return Math.floor(Math.random() * (n + 1));
}

// Byrjar leik
start();
