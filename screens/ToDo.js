import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../config';
import { ref, onValue, set } from 'firebase/database';

const ToDo = () => {
  const [note, setNote] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const noteRef = ref(db, 'ToDo/');
    onValue(noteRef, (snapshot) => {
      setNote(snapshot.val());
    })

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (note.length > 1) {
      setDataa(note.slice(1));
    }
  }, [note]);

  useEffect(() => {
    console.log(dataa);
  }, [dataa]);

  const renderItem = ({ item }) => (
    <View style={styles.todoItem} key={item.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleAddToDo = () => {
    if (title && description) {
      const newTodo = {
        title: title,
        description: description,
        id: (dataa.length + 1).toString(),
      };
      const todoRef = ref(db, `ToDo/${newTodo.id}`);
      set(todoRef, newTodo);
      setTitle('');
      setDescription('');
      setDataa(prevData => [...prevData, newTodo]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={title}
          onChangeText={setTitle}
          multiline={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <TouchableOpacity
          style={title && description ? styles.addButton : styles.disabledButton}
          onPress={handleAddToDo}
          disabled={!title || !description}
        >
          <Text style={styles.addButtonText}>Add To Do</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataa}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: '20px'
  },
  todoItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: '2%',
    width: '94vw'
  },
  input: {
    flex: 1,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginRight: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
    flexWrap: 'wrap',
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
});

export default ToDo;
