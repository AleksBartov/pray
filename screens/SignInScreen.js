import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { COLORS, MY_COLLECTION, MY_KEY } from '../CONSTANTS';
import { greatData } from '../helpers/GreatData';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.biscay,
      alignItems: 'center',
      justifyContent: 'center',
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
    input: {
      width: 200,
      height: 60,
      margin: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.cornflower,
      color: COLORS.blueCuracao,
      fontSize: 18,
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
        <Transition.In type='scale' durationMs={600} interpolation='easeIn' delayMs={400} />
        <Transition.Out type='scale' durationMs={100} interpolation='easeOut' />
    </Transition.Sequence>

    const donwloadingData = async ({ username, password }) => {
        fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${MY_COLLECTION}?${MY_KEY}`)
            .then(data => data.json())
            .then(users => {
                const isSigned = users.find(u=>(u.username === username) && (u.password === password));
                isSigned ?  greatData({ username, navigation }) : setWrongInputsModal(true);
            })
            .catch(err=>alert(err));
    }
    return (
        <Transitioning.View
        ref={ref}
        transition={trsn}
        style={{ flex: 1, backgroundColor: COLORS.biscay }}>
        <View style={ styles.container }>
          <Text>ВХОД</Text>
          <TextInput style={styles.input} placeholder='ваше имя' value={username} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder='пароль' value={password} onChangeText={setPassword} secureTextEntry={true} />
          <TouchableOpacity
            onPress={() => {
              ref.current.animateNextTransition();
              setBtnPressed(true);
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
    )
}

export default SignInScreen
