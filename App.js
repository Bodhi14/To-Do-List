import React, {useEffect, useState} from 'react';
import { FlatList, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import colors from './colors';
import ToDoList from './components/ToDoList/ToDoList';
import AddModalList from './components/AddModalList/AddModalList';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './Firebase';

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().collection('users').doc('ILbzmn44hlGJVQr6qCnt').collection('lists').get().then(
      snap => {
        snap.forEach((s) => {

          
          setLists([...lists, {
            id: lists.length + 1,
            name: s.data().name,
            color: s.data().color,
            todos: s.data().todos
           }]);

           lists.push({
            id: lists.length + 1,
            name: s.data().name,
            color: s.data().color,
            todos: s.data().todos
           })


           console.log(lists);
        }) 
      }
    );
  }, [])
  

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addNewList = (list) => {
    setLists([...lists, {...list, id: lists.length+1}]);
  }

  const updatelist = (list) => {
    setLists(
      lists.map(item => {
        return item.id === list.id ? list : item;
      })
    )
  }

  
  return (
    <View style={styles.container}>
      <Modal
      animationType='slide' 
      visible={modalVisible} 
      onRequestClose={toggleModal}>
        <AddModalList closeModal={toggleModal} addLists={addNewList} />
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.separator} />
        <Text style={styles.title}>
        Todo<Text style={{ fontWeight: 'bold', color: colors.orange2 }}> Lists</Text> 
        </Text>
      <View style={styles.separator} />
    </View>
  
    <View style={{marginVertical: 40}} >
      <TouchableOpacity style={styles.addList} onPress={toggleModal}>
        <AntDesign name="plus" size={20} color={colors.lightBlue} />
      </TouchableOpacity>
      <Text style={styles.add}>Add List</Text>
      </View>
      

      <View style={{height: '55%', marginLeft: 5}}>
        <FlatList 
        data={lists} 
        keyExtractor={item => item.name} 
        vertical={true} 
        showsVerticalScrollIndicator={false} 
        renderItem={
          ({item}) => {
            return(
              <ToDoList list={item} updateList={updatelist} />
            );
          }
        }
        keyboardShouldPersistTaps="always" 
        />
      </View>
      <View style={{flexDirection: 'row', height: '8%', marginTop: 'auto', backgroundColor: 'black', width: '100vw', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: '100%' }}>&#169; 2023, Made by Bodhisattwa Das</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator : {
    height: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundcolor: colors.lightBlue,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.orange1, 
  },
  addList : {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add : {
    color: colors.lightBlue,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 14,
  }
});
