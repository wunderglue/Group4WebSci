/**
 * Service responsible for getting lists of questions to ask the user.
 */
app.service('questionsService', function($http, userService) {
    /**
     * Fetch a list of practises for the current league.
     * @returns {Promise<string[]>}
     */
    this.getPracticeTypes = async function() {
        return ["Lifting", "Doubles"]
    }

    /**
     * Given a practice type, return a list of questions
     */
    this.getQuestionsByType = async function(type) {
        if(type === "Lifting") {
            return [
                {"name":"Pounds", "description": "How many pounds did you lift?", "type":"quantity", "unit":"lbs"},
                {"name":"Repetitions", "description": "How many times did you lift those weights?", "type":"count"}
            ]
        }
        else if(type === "Doubles") {
            return [
                {"name":"Partner", "description": "What was the name of your doubles partner", "type":"text"},
                {"name":"Score", "description": "What was the final score", "type": "count"},
                {"name":"Win/Loss", "description": "Did you win?", "type":"yes/no"}
            ]
        }
    }
})