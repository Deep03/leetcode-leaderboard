import { calculate_score } from './calculate_score.js'

export async function fetch_data(username) {
    const leetcode_url = "https://leetcode.com/graphql";

    const query = {
        "query": "query userProfileUserQuestionProgressV2($userSlug: String!) { userProfileUserQuestionProgressV2(userSlug: $userSlug) { numAcceptedQuestions { count difficulty } numFailedQuestions { count difficulty } numUntouchedQuestions { count difficulty } userSessionBeatsPercentage { difficulty percentage } totalQuestionBeatsPercentage } }",
        "variables": {
          "userSlug": username
        }
      }    
    try {
        const response = await fetch(leetcode_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
        });

        if (!response.ok) throw new Error('HTTP error! Status: ' + response.status);

        const data = await response.json();
        if (data.data) return data.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}


// fetch_data("panditapollo").then((data) => {
//     console.log(data.userProfileUserQuestionProgressV2.numAcceptedQuestions)
// }).catch((err) => {
//     console.log("Error during print: ", err)
// })