const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const allowedParameters = ["country", "category", "page", "pageSize"];

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "NEWS_API_KEY is not configured" });
  }

  const url = new URL(NEWS_API_URL);
  for (const parameter of allowedParameters) {
    const value = req.query[parameter];
    if (typeof value === "string") {
      url.searchParams.set(parameter, value);
    }
  }
  url.searchParams.set("apiKey", apiKey);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(502).json({ message: "Unable to reach NewsAPI" });
  }
};
