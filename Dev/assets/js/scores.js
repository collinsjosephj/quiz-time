// Function to print high scores
//Started my own code, troubleshooted, and had to reference Main for time constraint. 
function getScores() {
    var hiScores = localStorage.getItem('highscores');

    if (hiScores === null) {
        return [];
    } else {
        return JSON.parse(hiScores);
    }
}

// Function to sort scores property by desc order
function scoresDesc(scores) {
    scores.sort((a, b) => {
        const scoreA = parseInt(a.finalScore.split(' ')[0]);
        const scoreB = parseInt(b.finalScore.split(' ')[0]);
        return scoreB - scoreA;
    });
    return scores;
}
function printScores() {
    const scores = getScores();
    const sortedScores = scoresDesc(scores);
    const scoreListEl = document.getElementById('score-list');
    scoreListEl.innerHTML = '';
    sortedScores.forEach(score => {
        const listItemEl = document.createElement('li');
        listItemEl.textContent = `${score.initials}: ${score.finalScore}`;
        scoreListEl.appendChild(listItemEl);
    });
}
function clearHiScores() {
    window.localStorage.removeItem('#highscores');
    window.location.reload();
}
document.getElementById('clear').onclick = clearHiScores;

printScores();
