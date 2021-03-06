import { Dimensions } from "react-native";
import { Value } from "react-native-reanimated";

const { width, height } = Dimensions.get('window')

export const COLORS = {
    cornflower: '#546de5',
    biscay: '#303952',
    tigerlily: '#e15f41',
    blueCuracao: '#3dc1d3',
    pencilLead: '#596275',
    rosyHightlight: '#f7d794',
    brewedMustard: '#e77f67',
    softBlue: '#778beb',
    purpleMountainMajesty: '#786fa6',
    appleValley: '#ea8685',
    myBlack: '#2d3436',
    myGray: '#636e72',
    myWhite: '#dfe6e9',
}

export const MY_KEY = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
export const MY_COLLECTION = 'members';

export const CARD_HEIGHT = height/1.618;
export const CARD_WIDTH = CARD_HEIGHT/1.618;
export const MAX_TRACK = CARD_WIDTH/2;

export const LISTINGS = [
    {
      id: "o zdravii",
      picture: require("./assets/lightRatioIcon.png"),
    },
    {
      id: "o upokoenii",
      picture: require("./assets/lightRatioIcon.png"),
    },
  ];

export const HEADER_HEIGHT = 200;
export const MIN_HEADER_HEIGHT = 90;

export const GROUP_CARD_WIDTH = width/2;
export const GROUP_CARD_MARGIN = 6;
