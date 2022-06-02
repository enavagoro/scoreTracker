const ScoreTracker = require('../scoreTracker');

const scoreTracker = new ScoreTracker();

describe('Register teams with a starting score', () => {
  test('Teams should be equal to the params teams', () => {
    const teams = [
      ['Paris Saint Germain', 0],
      ['Real Madrid', 0],
      ['Barcelona', 0],
      ['Liverpool', 0],
      ['Sevilla', 0],
      ['Valencia', 0]
    ];

    scoreTracker.registerTeams(teams);
    const scoreTrackerTeams = scoreTracker.teams;

    expect(teams.toString()).toEqual(scoreTrackerTeams.toString());
  });
});

describe('Updates the scores given match outcome', () => {
  test('winnerIndex 0 should increment the score of first team in 3', () => {
    const previusValue = scoreTracker.getScore('Barcelona');
    scoreTracker.processMatch(['Barcelona', 'Real Madrid'], 0);
    const newValue = scoreTracker.getScore('Barcelona');

    expect(newValue).toEqual(previusValue + 3);
  });

  test('winnerIndex 1 should increment the score of second team in 3', () => {
    const previusValue = scoreTracker.getScore('Real Madrid');
    scoreTracker.processMatch(['Barcelona', 'Real Madrid'], 1);
    const newValue = scoreTracker.getScore('Real Madrid');

    expect(newValue).toEqual(previusValue + 3);
  });

  test('winnerIndex -1 should increment the score of both teams in 1', () => {
    const previusFirstTeamValue = scoreTracker.getScore('Barcelona');
    const previusSecondTeamValue = scoreTracker.getScore('Real Madrid');

    scoreTracker.processMatch(['Barcelona', 'Real Madrid'], -1);

    const newFirstTeamValue = scoreTracker.getScore('Barcelona');
    const newSecondTeamValue = scoreTracker.getScore('Real Madrid');

    expect(newFirstTeamValue).toEqual(previusFirstTeamValue + 1);
    expect(newSecondTeamValue).toEqual(previusSecondTeamValue + 1);
  });
});

describe('Returns score for a given team, -1 if not found', () => {

  test('getScore should return the team score', () => {
    const firstTeam = scoreTracker.teams[0];
    const firstTeamName = firstTeam[0];
    const firstTeamScore = firstTeam[1];

    const resultScore = scoreTracker.getScore(firstTeamName);

    expect(resultScore).toEqual(firstTeamScore);
  });

  test('getScore should return -1', () => {
    const resultScore = scoreTracker.getScore('Unexisting Team Name');

    expect(resultScore).toEqual(-1);
  });

})

describe('Returns the teams which classifies on group stage close (best 4 teams qualify)', () => {

  test('closeGroupStage should return names of teams with more score', () => {
    const teams = [
      ['Paris Saint Germain', 5],
      ['Real Madrid', 3],
      ['Barcelona', 6],
      ['Liverpool', 9],
      ['Sevilla', 2],
      ['Valencia', 1]
    ];

    const classifiesTeams = ['Liverpool', 'Barcelona', 'Paris Saint Germain', 'Real Madrid']

    scoreTracker.registerTeams(teams);
    const classifiesTeamsResult = scoreTracker.closeGroupStage();

    expect(classifiesTeams.toString()).toEqual(classifiesTeamsResult.toString());
  });
})