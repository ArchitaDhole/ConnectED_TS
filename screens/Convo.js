import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Convo = ({ route }) => {
    const { teacherId, password } = route.params;

    const navigation = useNavigation();
    const students = [
        { id: 'STG12A13', name: 'Aditi Dhole' },
        { id: 'STG09A01', name: 'Archita Dhole' },
        { id: 'STG09A02', name: 'Saee Shinde' },
    ];

    const handleStudentPress = (studentId) => {
        const selectedStudent = students.find((student) => student.id === studentId);
        console.log(selectedStudent.name)
        navigation.navigate('Conversation', {
            teacherId: teacherId,
            password: password,
            studentId: selectedStudent.id
        })
    };

    return (
        <View style={styles.messagesContainer}>
            {students.map((student) => (
                <View key={student.id} style={styles.message}>
                    <View style={styles.avatar}></View>
                    <TouchableOpacity onPress={() => handleStudentPress(student.id)}>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageName}>{student.name}</Text>
                            <Text style={styles.messageText}>Hi, I'm your student!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    messagesContainer: {
        alignSelf: 'stretch',
        maxHeight: 400,
        marginBottom: 20,
    },
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    messageContent: {
        flex: 1,
        margin: '10px',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    messageName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        color: '#555',
    },
});

export default Convo;
