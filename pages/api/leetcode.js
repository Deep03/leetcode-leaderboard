// pages/api/leetcode.js

export default async function handler(req, res) {
    const leetcode_url = "https://leetcode.com/graphql";
    const query = {
      query: `
        query userProfileUserQuestionProgressV2($userSlug: String!) {
          userProfileUserQuestionProgressV2(userSlug: $userSlug) {
            numAcceptedQuestions { count difficulty }
            numFailedQuestions { count difficulty }
            numUntouchedQuestions { count difficulty }
            userSessionBeatsPercentage { difficulty percentage }
            totalQuestionBeatsPercentage
          }
        }
      `,
      variables: { userSlug: req.query.username },  // Pass username as query parameter
    };
  
    try {
      const response = await fetch(leetcode_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
  
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch data from LeetCode' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  