// News feeds aggregated on the client via rss2json.com (CORS-friendly, free).
// Add or remove sources here. The page fetches all feeds in parallel and
// merges by date.
//
// Tip: search "RSS" on any outlet's site — most still publish full feeds.
export type Feed = {
  id: string;
  source: string;
  url: string;
  tag: "Local" | "Immigration" | "Rapid response" | "National" | "Community";
  notes?: string;
};

export const feeds: Feed[] = [
  {
    id: "mprnews-immigration",
    source: "MPR News — Immigration",
    url: "https://www.mprnews.org/feeds/topic/immigration.rss",
    tag: "Local",
    notes: "Public radio coverage of immigration in Minnesota."
  },
  {
    id: "sahan",
    source: "Sahan Journal",
    url: "https://sahanjournal.com/feed/",
    tag: "Immigration",
    notes: "Immigrant communities of color in Minnesota."
  },
  {
    id: "startribune-mn",
    source: "Star Tribune — Local",
    url: "https://www.startribune.com/local/index.rss2",
    tag: "Local"
  },
  {
    id: "ap-immigration",
    source: "AP — Immigration",
    url: "https://rsshub.app/apnews/topics/immigration",
    tag: "National"
  },
  {
    id: "bia-news",
    source: "Border / Immigration in America",
    url: "https://immigrationimpact.com/feed/",
    tag: "Immigration"
  }
];
