import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, ScrollView } from 'react-native';
import { firestore, collection, addDoc, MESSAGES } from './firebase/Config';
import { useState } from 'react';
import { orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import Constants from 'expo-constants';
import { onSnapshot } from 'firebase/firestore';
import { convertFirebaseTimestampToJS } from './helpers/Functions';

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot (q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
         text: doc.data().text,
         created: convertFirebaseTimestampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
  })
  return () => {
    unsubscribe()
  }
  }, [])

  /*const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    setNewMessage('')
    console.log('Message saved')
  }
  */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) =>(
            <View style = {styles.message} key = {message.id}>
              <Text style = {styles.messageInfo}> {message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
    message: {
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor:'#f5f5f5',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginLeft: 10,
      marginRight: 10
    },
});
