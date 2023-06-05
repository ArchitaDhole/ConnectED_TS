import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../config';
import { ref, onValue, set } from 'firebase/database';

const Notice = () => {
  const [note, setNote] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    let isMounted = true;
    const noteRef = ref(db, 'notice/');
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

  const renderNoticeItem = ({ item }) => (
    <View style={styles.noticeContainer} key={item.id}>
      <Text style={styles.noticeTitle}>{item.title}</Text>
      <Text style={styles.noticeContent}>{item.content}</Text>
    </View>
  );

  const handleAddNotice = () => {
    if (title && content) {
      const newNotice = {
        title: title,
        content: content,
        id: (dataa.length + 1).toString(),
      };
      const noticeRef = ref(db, `notice/${newNotice.id}`);
      set(noticeRef, newNotice);
      setTitle('');
      setContent('');
      setDataa(prevData => [...prevData, newNotice]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          multiline={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline={true}
        />
        <TouchableOpacity
          style={title && content ? styles.addButton : styles.disabledButton}
          onPress={handleAddNotice}
          disabled={!title || !content}
        >
          <Text style={styles.addButtonText}>Add Notice</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataa}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.noticeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  noticeList: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  noticeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    maxWidth: '80%',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noticeContent: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
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

export default Notice;
