import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Transition, Transitioning, cond, eq, neq } from 'react-native-reanimated';
import { COLORS, MY_COLLECTION, MY_KEY } from '../CONSTANTS';
import { greatData } from '../helpers/GreatData';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.biscay,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: COLORS.blueCuracao,
      fontWeight: '600',
      fontSize: 28,
      marginBottom: 30,
    },
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    modal: {
      width: 250,
      height: 250,
      backgroundColor: COLORS.pencilLead,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    inputBox: {
      width: 260,
      height: 60,
      paddingHorizontal: 10,
      margin: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.cornflower,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    input: {
      color: COLORS.blueCuracao,
      fontSize: 18,
      width: 180,
    },
    delBtnBox: {
      width: 60,
      height: 60,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    button: {
      width: 140,
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      backgroundColor: COLORS.tigerlily,
    },
    btnText: {
      color: COLORS.biscay,
      fontWeight: '600',
      fontSize: 18,
    },
  });

const SignInScreen = ({ navigation }) => {
    const [ wrongInputsModal, setWrongInputsModal ] = useState(false);
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ btnPressed, setBtnPressed ] = useState(false);
    const ref = useRef();
    useEffect(() => {
        ref.current.animateNextTransition();
    }, []);
    const trsn = <Transition.Sequence>
        <Transition.In type='scale' durationMs={600} interpolation='easeIn' delayMs={400} propagation='bottom' />
        <Transition.Out type='scale' durationMs={100} interpolation='easeOut' />
    </Transition.Sequence>

    const donwloadingData = async ({ username, password }) => {
        fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${MY_COLLECTION}?${MY_KEY}`)
            .then(data => data.json())
            .then(users => {
                const isSigned = users.find(u=>(u.username === username) && (u.password === password));
                isSigned ?  greatData({ username, navigation, setBtnPressed, setUsername, setPassword }) : setWrongInputsModal(true);
            })
            .catch(err=>alert(err));
    }

    return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Transitioning.View
        ref={ref}
        transition={trsn}
        style={{ flex: 1, backgroundColor: COLORS.biscay }}>
        <View style={ styles.container }>
          <Text style={styles.title}>ВХОД</Text>
          <View style={styles.inputBox}>
            <TextInput style={styles.input} placeholder='ваше имя' value={username} onChangeText={setUsername} />
            <TouchableOpacity onPress={() => setUsername(null)} >
              <View style={[styles.delBtnBox, { opacity: username ? 1 : 0 } ]}>
                <MaterialCommunityIcons name="close-circle" size={24} color={COLORS.pencilLead} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputBox}>
            <TextInput style={styles.input} placeholder='пароль' value={password} onChangeText={setPassword} secureTextEntry={true} />
            <TouchableOpacity onPress={() => setPassword(null)} >
              <View style={[styles.delBtnBox, { opacity: password ? 1 : 0 } ]}>
                <MaterialCommunityIcons name="close-circle" size={24} color={COLORS.pencilLead} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              ref.current.animateNextTransition();
              setBtnPressed(true);
              Keyboard.dismiss();
              donwloadingData({ username, password });
            }}>
            <View style={styles.button}>
            {
              btnPressed ? <ActivityIndicator size='large' color={COLORS.biscay} /> : <Text style={styles.btnText}>войти</Text>
            }
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType='fade'
          transparent={true}
          visible={wrongInputsModal}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={{ color: COLORS.rosyHightlight, margin: 5, fontSize: 14 }}>Неверные имя пользователя или пароль</Text>
              <TouchableOpacity
                onPress={() => {
                  setBtnPressed(false);
                  setWrongInputsModal(false);
                }}>
                <View style={styles.button}>
                  <Text style={styles.btnText}>понятно</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Transitioning.View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
    )
}

export default SignInScreen
