import React from "react";
import { Entypo } from '@expo/vector-icons';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../CONSTANTS";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.myBlack,
  },
});

const Play = ({ setPlay, namesToPray }) => {

  return (
    <View style={styles.container}>
          <TouchableOpacity style={{...StyleSheet.absoluteFillObject, top: 20, left: 5, zIndex: 100, width: 70, height: 70}} onPress={() => setPlay(false)}>
            <Entypo name="cross" size={34} color={COLORS.myWhite} />
          </TouchableOpacity>
    </View>
       
  );
};

export default Play;