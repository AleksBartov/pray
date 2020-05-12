import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export const COLORS = {
    cornflower: '#546de5',
    biscay: '#303952',
    tigerlily: '#e15f41',
    blueCuracao: '#3dc1d3',
    pencilLead: '#596275',
    rosyHightlight: '#f7d794',
}

export const MY_KEY = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
export const MY_COLLECTION = 'members';

export const CARD_WIDTH = width/1.6;
export const CARD_HEIGHT = height/2;
export const MAX_TRACK = CARD_WIDTH/2;

export const IMAGES = [
    require('./assets/icon.png')
];
