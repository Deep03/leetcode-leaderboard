const leetcode_url = "https://leetcode.com/graphql";
const { error } = require("console");
const fs = require("fs");
const parsed_json = JSON.parse(fs.readFileSync("user_query/arjeetjoshi175_query.json"));

async function fetch_data() {
    try {
        const response = await fetch(leetcode_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsed_json),
        });

        if (!response.ok) throw new Error('HTTP error! Status: ' + response.status);

        const data = await response.json();
        if (data.data) fs.writeFile('user_data/arjeetjoshi175_data.json', JSON.stringify(data.data, null, 2), (err) => {
            if (err) console.log("Error writing to file:", err);
            else console.log("File has been written.");
        });
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export function get_user_score(user_name) {
    let file_name  = 'user_data/'+ user_name + '_data.json'
    const data = JSON.parse(fs.readFileSync(file_name))
    try {
        const problems_solved_user = data.userProfileUserQuestionProgressV2.numAcceptedQuestions
        const easy_solved = problems_solved_user[0].count
        const medium_solved = problems_solved_user[1].count
        const hard_solved = problems_solved_user[2].count
        const rank = easy_solved * 1 + medium_solved * 2 + hard_solved * 2
        return rank
    } catch (error) {
        console.log('Error: ', error)
        return -1
    }



}

// fetch_data();