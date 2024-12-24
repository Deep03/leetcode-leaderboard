const leetcode_url = "https://leetcode.com/graphql";
const fs = require("fs");
const parsed_json = JSON.parse(fs.readFileSync("query.json"));

async function fetchData() {
    try {
        const response = await fetch(leetcode_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsed_json),
        });

        if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
        }
        const data = await response.json();
        if (data.data.userProfileUserQuestionProgressV2.numAcceptedQuestions) console.log(data.data.userProfileUserQuestionProgressV2.numAcceptedQuestions);
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchData();
