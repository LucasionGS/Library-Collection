/**
 * JavaScript Wrapper for osu! API.
 */

/**
 * OsuAPI v1 Object.
 */
class OsuAPI{
  
  /**
   * **DISCLAIMER**: It is NOT recommended to hard code your own API key in this. Inspect element can view your key and others can use your key,
   * which is against osu!'s rules.  
   * Instead, it is recommended to ask a user for their API key to temporarily use while they use the website. 
   * @param {string} apiKey osu! API key.
   */
  constructor(apiKey) {
    this.key = apiKey;  
  }
  
  /**
   * The base URL for the osu!api v1
   */
  static baseURL = "https://osu.ppy.sh/api/";

  /**
   * Fetch a JSON formatted website.
   * @param {string} url URL to fetch JSON from.
   */
  static fetchJSON(url) {
    return fetch(url)
    .then(res => {
      console.log(res.text());
      console.log(res.json());
      return res.json();
    });
  }

  /**
   * Build a query json object into a string usable for GET
   * @param {{"data":"Value"}} data Query data as json object to return into a query string.
   */
  static encodeQuery(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  /**
   * osu! Mods  
   * Taken directly from osu! API wiki.  
   * Slightly modified names to make more sense.
   */
  static mods =
  {
    None           : 0,
    NoFail         : 1,
    Easy           : 2,
    TouchDevice    : 4,
    Hidden         : 8,
    HardRock       : 16,
    SuddenDeath    : 32,
    DoubleTime     : 64,
    Relax          : 128,
    HalfTime       : 256,
    /**
     * Only set along with DoubleTime. i.e: NC only gives 576
     */
    Nightcore      : 512,
    Flashlight     : 1024,
    Autoplay       : 2048,
    SpunOut        : 4096,
    Autopilot      : 8192,
    /**
     * Only set along with SuddenDeath. i.e: PF only gives 16416
     */
    Perfect        : 16384,
    Key4           : 32768,
    Key5           : 65536,
    Key6           : 131072,
    Key7           : 262144,
    Key8           : 524288,
    FadeIn         : 1048576,
    Random         : 2097152,
    Cinema         : 4194304,
    Target         : 8388608,
    Key9           : 16777216,
    KeyCoop        : 33554432,
    Key1           : 67108864,
    Key3           : 134217728,
    Key2           : 268435456,
    ScoreV2        : 536870912,
    Mirror         : 1073741824
  }

  /**
   * osu! Beatmap
   * 
   */
  static Beatmap = class Beatmap {
    constructor(beatmap_data) {
      this.approved = beatmap_data.approved;
      this.submit_date = beatmap_data.submit_date;
      this.approved = beatmap_data.approved;
      this.last_update = beatmap_data.last_update;
      this.artist = beatmap_data.artist;
      this.beatmap_id = beatmap_data.beatmap_id;
      this.beatmapset_id = beatmap_data.beatmapset_id;
      this.bpm = beatmap_data.bpm;
      this.creator = beatmap_data.creator;
      this.creator_id = beatmap_data.creator_id;
      this.difficultyrating = beatmap_data.difficultyrating;
      this.diff_aim = beatmap_data.diff_aim;
      this.diff_speed = beatmap_data.diff_speed;
      this.diff_size = beatmap_data.diff_size;
      this.diff_overall = beatmap_data.diff_overall;
      this.diff_approach = beatmap_data.diff_approach;
      this.diff_drain = beatmap_data.diff_drain;
      this.hit_length = beatmap_data.hit_length;
      this.source = beatmap_data.source;
      this.genre_id = beatmap_data.genre_id;
      this.language_id = beatmap_data.language_id;
      this.title = beatmap_data.title;
      this.total_length = beatmap_data.total_length;
      this.version = beatmap_data.version;
      this.file_md5 = beatmap_data.file_md5;
      this.mode = beatmap_data.mode;
      this.tags = beatmap_data.tags;
      this.favourite_count = beatmap_data.favourite_count;
      this.rating = beatmap_data.rating;
      this.playcount = beatmap_data.playcount;
      this.passcount = beatmap_data.passcount;
      this.count_normal = beatmap_data.count_normal;
      this.count_slider = beatmap_data.count_slider;
      this.count_spinner = beatmap_data.count_spinner;
      this.max_combo = beatmap_data.max_combo;
      this.download_unavailable = beatmap_data.download_unavailable;
      this.audio_unavailable = beatmap_data.audio_unavailable;
    }
  };

  /**
   * @returns {Promise<[OsuAPI.Beatmap]>} An array of Beatmaps
   */
  getBeatmaps(
    /**
     * @type {{
     * since:"YYYY-MM-DD HH:MM:SS" 
     * s: "//Beatmapset ID"
     * b: "//Beatmap ID (diff specific)"
     * u: "//UserID" | "//Username"
     * type: "string" | "id"
     * m: 0 | 1 | 2 | 3
     * a: 0 | 1
     * h: "//Beatmap Hash"
     * limit: 500
     * mods: number | [OsuAPI.mods]
     * }}
     */
    parameters = {}) {
    var beatmaps = [];
    if (typeof parameters.mods == "object") {
      parameters.mods = parameters.mods.reduce((a,b) => a + b, 0);
    }
    OsuAPI.fetchJSON(OsuAPI.baseURL+"/get_beatmaps?"+OsuAPI.encodeQuery(parameters)).then(maps => {
      for (let i = 0; i < maps.length; i++) {
        const mapData = maps[i];
        beatmaps.push(new OsuAPI.Beatmap(mapData));
      }
    });
  }
}
