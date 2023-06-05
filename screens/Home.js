import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ref, onValue, set } from 'firebase/database';
import { db } from "../config";

const Home = ({ navigation }) => {
  const [state, setState] = useState({
    teacherId: '',
    password: '',
    backgroundColour: '#D8D8D8',
    textColor: 'grey',
    pointer: 'default',
    disable: true,
    isPasswordCorrect: false,
  });

  const handlePasswordChange = (text) => {
    if (text === 'abc') {
      setState({
        ...state,
        isPasswordCorrect: true,
        password: text,
        textColor: 'white',
        pointer: 'pointer',
        backgroundColour: '#2196F3',
      });
    } else {
      setState({
        ...state,
        password: text,
        isPasswordCorrect: false,
        textColor: 'grey',
        pointer: 'default',
        backgroundColour: '#D8D8D8',
      });
    }
  };

  const onPressButton = () => {
    const teacherId = state.teacherId;
    const password = state.password;
    onValue(ref(db, 'teachers/' + teacherId), (snapshot) => {
      const data = snapshot.val();
      if (data && data.password === password) {
        navigation.navigate('Profile', {
          teacherId: state.teacherId,
          password: state.password,
        });
      } else {
        alert('Invalid teacher ID or password.');
      }
    }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Teacher Id"
          placeholderTextColor="#dcdcdc"
          onChangeText={(text) => setState({ ...state, teacherId: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#dcdcdc"
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: state.backgroundColour,
              pointerEvents: state.pointer,
              borderRadius: 15,
            },
          ]}
          disabled={!state.isPasswordCorrect}
          onPress={onPressButton}>
          <Text
            style={[
              styles.buttonText,
              {
                color: state.textColor,
              },
            ]}
          >
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    color: '#000',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
