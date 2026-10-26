const fs = require("fs");
const { exec } = require("child_process");
const crypto = require("crypto");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };

  // 1. Handle CORS Preflight (replaces cors() middleware)
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  // 2. Health check endpoint (replaces app.get('/health'))
  if (event.rawPath === "/health") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "ok", message: "Server is running" }),
    };
  }

  // Extract raw body payload
  let code = event.body || "";
  if (event.isBase64Encoded) {
    code = Buffer.from(event.body, "base64").toString("utf-8");
  }

  if (!code) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "error", message: "No code provided" }),
    };
  }

  // 3. File System Management (replaces ./user/index.js)
  // Use /tmp and unique IDs to isolate concurrent user requests
  const fileId = crypto.randomUUID();
  const userFile = `/tmp/user_${fileId}.js`;

  try {
    fs.writeFileSync(userFile, code, "utf-8");

    // 4. Execute Code (wrapped in a Promise for Lambda's async runtime)
    return await new Promise((resolve) => {
      // 3-second timeout prevents infinite loops from hanging the function
      exec(`node ${userFile}`, { timeout: 3000 }, (err, stdout, stderr) => {
        // Clean up the file immediately so /tmp does not fill up
        if (fs.existsSync(userFile)) fs.unlinkSync(userFile);

        if (err) {
          resolve({
            statusCode: 200,
            headers,
            body: JSON.stringify({ status: "error", message: err.message }),
          });
          return;
        }
        if (stderr) {
          resolve({
            statusCode: 200,
            headers,
            body: JSON.stringify({ status: "error", message: stderr }),
          });
          return;
        }

        resolve({
          statusCode: 200,
          headers,
          body: JSON.stringify({ status: "ok", message: stdout }),
        });
      });
    });
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Internal Server Error",
      }),
    };
  }
};
