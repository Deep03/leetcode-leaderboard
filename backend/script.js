const leetcode_url = "https://leetcode.com/graphql";
const fs = require("fs");
const parsed_json = JSON.parse(fs.readFileSync("user_query/upendrapant-query.json"));

async function fetchData() {
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
        if (data.data) fs.writeFile('user_data/upendrapant-data.json', JSON.stringify(data.data, null, 2), (err) => {
            if (err) console.log("Error writing to file:", err);
            else console.log("File has been written.");
        });
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

fetchData();
