import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { db } from "../config";
import ReactScrollToBottom from 'react-scroll-to-bottom';

const Conversation = ({ navigation, route }) => {
  const { teacherId, password, studentId } = route.params;
  console.log(route.params);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const teacherNameRef = ref(db, `teachers/${teacherId}/teacher_name`);
    onValue(teacherNameRef, (snapshot) => {
      const teacherName = snapshot.val();
      console.log(teacherName);
      const chatRef = ref(db, `students/${studentId}/messages/${teacherName}`);
      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const chatArray = Object.values(data);
          setChat(chatArray);
        }
      });
    });
    return () => { };
  }, [studentId, teacherId]);

  const handleMessageSubmit = () => {
    const teacherNameRef = ref(db, `teachers/${teacherId}/teacher_name`);
    onValue(teacherNameRef, (snapshot) => {
      const teacherName = snapshot.val();
      console.log(teacherName)
      const messagesRef = ref(db, `students/${studentId}/messages/${teacherName}`);
      push(messagesRef, {
        message: message,
        sentBy: 'teacher'
      }).then(() => {
        setMessage('');
      }).catch((error) => {
        alert(error);
      });
    })

  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <ReactScrollToBottom scrollToBottom={true}>
          {chat.map((message, index) => (
            <View
              style={[
                styles.messageContainer,
              ]}
              key={index}
            >
              <Text style={
                message.sentBy === 'teacher' ? styles.messageContainerRight : styles.messageContainerLeft
              }>{message.message}</Text>
            </View>
          ))}
        </ReactScrollToBottom>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.button} onPress={handleMessageSubmit}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#007bff49',
  },
  messageContainerRight: {
    backgroundColor: '#007bff49',
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  messageContainerLeft: {
    backgroundColor: '#ECECEC',
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 16,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#649edd',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,

    fontSize: 16,
    color: '#444',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 16,
  },
  clearButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});


export default Conversation;