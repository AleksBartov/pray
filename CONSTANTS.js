import { Dimensions } from "react-native";

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
}

export const MY_KEY = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
export const MY_COLLECTION = 'members';

export const CARD_WIDTH = width/1.6;
export const CARD_HEIGHT = height/2;
export const MAX_TRACK = CARD_WIDTH/2;

export const LISTINGS = [
    {
      id: "o zdravii",
      picture: require("./assets/icon.png"),
    },
    {
      id: "o upokoenii",
      picture: require("./assets/icon.png"),
    },
  ];
