import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { ref, onValue, set } from 'firebase/database';
import { db } from "../config";

const Profile = ({ navigation, route }) => {
  const { teacherId, password } = route.params;

  const [name, setName] = useState('');

  useEffect(() => {
    onValue(ref(db, 'teachers/' + teacherId), (snapshot) => {
      const data = snapshot.val();
      setName(data.teacher_name)
    })
  }, [teacherId, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi {name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.blueButton]}
          onPress={() => {
            navigation.navigate('Convo', {
              teacherId: teacherId,
              password: password,
            });
          }}>
          <Text style={styles.buttonText}>Conversation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => {
            navigation.navigate('To Do');
          }}>
          <Text style={styles.buttonText}>To Do</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.orangeButton]}
          onPress={() => {
            navigation.navigate('Notice');
          }}>
          <Text style={styles.buttonText}>Notice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.purpleButton]}
          onPress={() => {
            navigation.navigate('Gallery');
          }}>
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.redButton]}
          onPress={() => {
            navigation.navigate('Blacklist');
          }}>
          <Text style={styles.buttonText}>Blacklist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    backgroundColor: 'white',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '40%',
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueButton: {
    backgroundColor: '#2980b9',
  },
  greenButton: {
    backgroundColor: '#2ecc71',
  },
  orangeButton: {
    backgroundColor: '#f1c40f',
  },
  purpleButton: {
    backgroundColor: '#9b59b6',
  },
  redButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Profile;
