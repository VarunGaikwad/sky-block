import DayCloud from "../assets/Day Clouds.svg";
import DayRain from "../assets/Day Rain.svg";
import DaySnow from "../assets/Day Snow.svg";
import DayStorm from "../assets/Day Storm.svg";
import DaySun from "../assets/Day Sun.svg";
import DayWind from "../assets/Day Wind.svg";
import NightCloud from "../assets/Night Clouds.svg";
import NightRain from "../assets/Night Rain.svg";
import NightSnow from "../assets/Night Snow.svg";
import NightStorm from "../assets/Night Storm.svg";
import NightMoon from "../assets/Night Moon.svg";
import NightWind from "../assets/Night Wind.svg";

function FindWeatherIconCodes(code: number, is_day: number): string {
  const WeatherIconCodes: Record<string, number[]> = {
      cloud: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      ],
      snow: [
        14, 15, 16, 22, 36, 37, 38, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 82,
        85, 86, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
      ],
      storm: [17, 29, 30, 31, 32, 33, 34, 35],
      sun: [13],
      wind: [18],
      rain: [
        50, 51, 52, 53, 54, 55, 56, 57, 10, 11, 12, 20, 21, 23, 24, 25, 26, 27,
        28, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 80, 81, 83, 84, 87,
        88,
      ],
    },
    SVGImage: Record<string, string[]> = {
      cloud: [NightCloud, DayCloud],
      snow: [NightSnow, DaySnow],
      storm: [NightStorm, DayStorm],
      sun: [NightMoon, DaySun],
      wind: [NightWind, DayWind],
      rain: [NightRain, DayRain],
    };

  for (const [key, codes] of Object.entries(WeatherIconCodes)) {
    if (codes.includes(code)) {
      return SVGImage[key][is_day];
    }
  }

  return SVGImage["sun"][0];
}

const WeatherContext: Record<number, string> = {
  "-1": "",
  0: "No cloud development observed",
  1: "Clouds thinning",
  2: "Sky unchanged",
  3: "Clouds forming or developing",
  4: "Visibility reduced by smoke",
  5: "Haze",
  6: "Dust in suspension",
  7: "Dust or sand raised by wind",
  8: "Mature dust or sand whirls",
  9: "Duststorm or sandstorm observed",
  10: "Mist",
  11: "Shallow fog or ice fog",
  12: "Continuous fog or ice fog",
  13: "Lightning visible",
  14: "Non-reaching precipitation",
  15: "Remote precipitation reaching ground.",
  16: "Close precipitation hitting ground",
  17: "Thunderstorm without precipitation",
  18: "Squalls observed",
  20: "Sparse drizzle or snow grains",
  21: "Rain",
  22: "Snow",
  23: "Rain and snow or ice pellets",
  24: "Freezing drizzle or freezing rain",
  25: "Rain showers",
  26: "Snow showers",
  27: "Hail showers",
  28: "Fog or ice fog",
  29: "Thunderstorm observed",
  30: "Decreasing duststorm or sandstorm",
  31: "No change in duststorm or sandstorm",
  32: "Increasing duststorm or sandstorm",
  33: "Decreasing severe duststorm or sandstorm",
  34: "No change in severe duststorm or sandstorm",
  35: "Increasing severe duststorm or sandstorm",
  36: "Blowing snow low",
  37: "Heavy drifting snow",
  38: "Blowing snow high",
  40: "Far fog or ice fog above observer",
  41: "Patchy fog or ice fog",
  42: "Thinning fog or ice fog",
  43: "Invisible fog or ice fog",
  44: "No change in visible fog or ice fog",
  45: "Invisible fog or ice fog",
  46: "Thickening fog or ice fog",
  47: "Invisible fog or ice fog",
  48: "Fog depositing rime, visible",
  49: "Fog depositing rime, invisible",
  50: "Intermittent slight drizzle",
  51: "Continuous drizzle",
  52: "Intermittent moderate drizzle",
  53: "Continuous drizzle",
  54: "Intermittent heavy drizzle",
  55: "Continuous drizzle",
  56: "Slight freezing drizzle",
  57: "Moderate or heavy freezing drizzle",
  58: "Slight drizzle and rain",
  59: "Moderate or heavy drizzle and rain",
  60: "Intermittent slight rain",
  61: "Continuous rain",
  62: "Intermittent moderate rain",
  63: "Continuous rain",
  64: "Intermittent heavy rain",
  65: "Continuous rain",
  66: "Slight freezing rain",
  67: "Moderate or heavy freezing rain",
  68: "Slight rain or drizzle and snow",
  69: "Moderate to heavy rain, drizzle, or snow",
  70: "Intermittent slight snowflakes",
  71: "Continuous snowflakes",
  72: "Intermittent moderate snowflakes",
  73: "Continuous snowflakes",
  74: "Intermittent heavy snowflakes",
  75: "Continuous snowflakes",
  76: "Diamond dust",
  77: "Snow grains",
  78: "Star-like snow crystals",
  79: "Ice pellets",
  80: "Slight rain showers",
  81: "Moderate or heavy rain showers",
  82: "Violent rain showers",
  83: "Slight showers of rain and snow mixed",
  84: "Moderate to heavy rain and snow showers",
  85: "Slight snow showers",
  86: "Moderate or heavy snow showers",
  87: "Slight showers of snow pellets or small hail",
  88: "Moderate to heavy snow pellets or small hail showers.",
  89: "Slight showers of hail",
  90: "Moderate or heavy showers of hail",
  91: "Slight rain with preceding thunderstorm",
  92: "Moderate or heavy rain at observation time",
  93: "Light precipitation: snow, rain, mixed precipitation, or hail at observation time.",
  94: "Moderate to heavy precipitation: snow, rain, mixed precipitation, or hail at observation time.",
  95: "Slight or moderate thunderstorm without hail",
  96: "Slight or moderate thunderstorm with hail",
  97: "Heavy thunderstorm without hail",
  98: "Thunderstorm combined with duststorm or sandstorm",
  99: "Heavy thunderstorm with hail",
};
export { FindWeatherIconCodes, WeatherContext };
