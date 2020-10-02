import { laughIcon, sadIcon, winkIcon, loveIcon,
          glassesIcon, fearIcon } from "./emojiIcons";

const getIcon = (iconName) => {
  switch (iconName) {
    case "sad":
      return sadIcon;
    case "laugh":
      return laughIcon;
    case "love":
      return loveIcon;
    case "glasses":
      return glassesIcon;
    case "fear":
      return fearIcon;
    case "wink":
      return winkIcon;
    default:
      return undefined;
  }
}

export default getIcon;