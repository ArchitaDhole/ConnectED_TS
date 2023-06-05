import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../config';
import { ref, onValue, push, set } from 'firebase/database';

const BlackList = () => {
  const [black, setBlack] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    let isMounted = true;

    const listRef = ref(db, 'blacklist/');
    onValue(listRef, (snapshot) => {
      setBlack(snapshot.val());
    })

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    for (var i = 1; i < black.length; i++) {
      dataa.push(black[i])
    }
  }, [black]);

  const handleAddName = () => {
    const nameRef = ref(db, `blacklist/${black.length}`);
    set(nameRef, newName);
    setNewName('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a name"
          value={newName}
          onChangeText={setNewName}
        />
        <TouchableOpacity
          style={newName ? styles.addButton : styles.disabledButton}
          onPress={handleAddName}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {black.length > 0 ? (
        <View style={styles.listContainer}>
          {black.map((name, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.name}>{name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Text style={styles.noName}>No students in blacklist</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  disabledButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noName: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BlackList;
