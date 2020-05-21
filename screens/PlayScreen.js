import React from "react";
import { Entypo } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../CONSTANTS";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.myBlack,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const PlayScreen = () => {

    const { goBack, getParam } = useNavigation();
    const namesToPray = getParam('namesToPray');
    const title = getParam('title');

  return (
    <View style={styles.container}>
          <TouchableOpacity style={{...StyleSheet.absoluteFillObject, top: 20, left: 5, zIndex: 100, width: 70, height: 70}} onPress={() => goBack()}>
            <Entypo name="cross" size={34} color={COLORS.myWhite} />
          </TouchableOpacity>
            <Text style={{ fontSize: 35, color: COLORS.myGray }}>{ title }</Text>
    </View>
       
  );
};

PlayScreen.sharedElements = navigation => {
    const title = navigation.getParam('title');
    return [title];
  };


export default PlayScreen;