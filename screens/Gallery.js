import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Modal, TouchableWithoutFeedback, Text, TextInput, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper/src';
import { db } from '../config';
import { ref, onValue, set } from 'firebase/database';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [img, setImg] = useState([]);
  const [data, setData] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const iRef = ref(db, 'images/');
    onValue(iRef, (snapshot) => {
      data.push(snapshot.val());
      data[0].shift();
      for (var i = 0; i < data[0].length; i++) {
        img.push(data[0][i]);
      }
    })

    return () => {
      isMounted = false;
    };
  }, []);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => setSelectedImage(item.image)}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 100, height: 100, margin: 5 }}
      />
    </TouchableWithoutFeedback>
  );

  const handleButtonPressed = () => {
    if (link) {
      const newImage = {
        image: link,
        id: (img.length + 1).toString()
      };
      const updatedImages = [...img, newImage];
      setImg(updatedImages);
      setLink('');
      const imgRef = ref(db, `images/${newImage.id}`);
      set(imgRef, newImage);
    }
  };  

  return (
    <View style={styles.container}>
      <FlatList
        data={img}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Paste the link of image here...'
          value={link}
          onChangeText={setLink} />
        <TouchableOpacity
          style={link ? styles.addButton : styles.disabledButton}
          onPress={handleButtonPressed}
        >
          <Text style={styles.addButtonText}>Add Image</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={!!selectedImage} animationType="slide">
        <Text style={styles.goback} onPress={() => setSelectedImage(null)}>
          ← Go back
        </Text>
        <Swiper style={styles.wrapper} showsButtons={true}>
          {img.map((item) => (
            <View key={item.id} style={styles.slide}>
              <TouchableWithoutFeedback>
                <Image source={{ uri: item.image }} style={styles.image} />
              </TouchableWithoutFeedback>
            </View>
          ))}
        </Swiper>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  goback: {
    fontSize: 30,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: 10,
  }, inputContainer: {
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
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
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

export default Gallery;
