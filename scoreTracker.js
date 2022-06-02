class ScoreTracker {
    /* List of Teams */
    teams = []

    /* 
        Object with names of the teams in the keys
        and the array index in the value
    */
    referenceTeamList = {};

    /** Register teams with a starting score
    * @param {object[]} teams
    * @return {void}
    */

    registerTeams(teams) {
        this.teams = teams;
        this.hashRegisterTeams(teams);
    }

    /** Reference the index of the position of the team in the array
     * 
     * @param {object[]} teams 
     * @param {void}
     */

    hashRegisterTeams(teams) {
        for (let index = 0; index < teams.length; index++) {
            const team = teams[index];
            const name = team[0];

            this.referenceTeamList[name] = index;
        }
    }

    /** Updates the scores given match outcome (winner: +3, looser: 0, tie: +1 each)
    * @param {string[]} teams // length 2
    * @param {number} winnerIndex // 0, 1, -1 (-1 for ties)
    * @return {void}
    */

    processMatch(teams, winnerIndex) {
        /* Right side of the team array element (Score) */
        const scoreIndex = 1;

        const firstTeamName = teams[0];
        const firstTeamIndex = this.referenceTeamList[firstTeamName];

        const secondTeamName = teams[1];
        const secondTeamIndex = this.referenceTeamList[secondTeamName];

        /* Score Mapping */
        const winnerPoints = 3;
        const tiePoints = 1;

        /* Result Mapping */

        const tie = -1;

        if (winnerIndex === tie) {
            this.teams[firstTeamIndex][scoreIndex] += tiePoints;
            this.teams[secondTeamIndex][scoreIndex] += tiePoints;
            return 0;
        }

        const winnerTeamIndex = winnerIndex ? secondTeamIndex : firstTeamIndex;
        this.teams[winnerTeamIndex][scoreIndex] += winnerPoints;
    }

    /** Returns score for a given team, -1 if not found
    * @param {string} team //name of the team
    * @return {number} score of the team
    */

    getScore(team) {
        const teamIndex = this.referenceTeamList[team];
        const score = 1;
        const notFound = -1;

        return this.teams[teamIndex] ? this.teams[teamIndex][score] : notFound;
    };

    /** Returns the teams which classifies on group stage close (best 4 teams qualify)
    * @return {string[]} teams qualified
    */

    closeGroupStage() {
        const tempArray = [...this.teams];
        const score = 1;
        const firstTeamQualified = 0;
        const lastTeamQualified = 4;
        const teamName = 0;

        return tempArray.sort((teamA, teamB) => teamB[score] - teamA[score])
                        .slice(firstTeamQualified, lastTeamQualified)
                        .map(team => team[teamName]);
    }
}

module.exports = ScoreTracker;
