import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, Animated, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import colors from '../../colors';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../../Firebase';

const ToDoModal = (props) => {

  const [newTodo, SetnewToDo] = useState("");
  
  const name = props.list.name;
  const color = props.list.color;
  const todos = props.list.todos;

  const task_count = todos.length;
  const completed_count = todos.filter(todo => todo.completed).length;


  const addNewTodo = () => {
    let list = props.list;
    list.todos.push({
      title: newTodo,
      completed: false
    });
    props.updateList(list);
    SetnewToDo("");


    Keyboard.dismiss();
  }


  const toggleCompletion = (index) => {
    let list = props.list;

    list.todos[index].completed = !list.todos[index].completed;


    props.updateList(list);
  }


  const deleteToDo = (index) => {
    let list = props.list;
    list.todos.splice(index, 1);
    props.updateList(list);
  }

  const rightActions = (index) => {

    return (
     <TouchableOpacity onPress={() => {deleteToDo(index)}}>
         <Animated.View style={styles.deleteButton}>
             <Animated.Text style={{ color: 'white'}}>
                Delete
             </Animated.Text>
         </Animated.View>
     </TouchableOpacity>
    )
   }

  const rendertodo = (todo, index) => {
    return (
        <Swipeable renderRightActions={() => rightActions(index)}>
        <View styles={styles.ToDoContainer}>
            <TouchableOpacity style={{ flexDirection: 'row'}} onPress={() => toggleCompletion(index)}>
                <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline" } size={24} color='#808080' style={{ width: 32}} />
                <Text style={[styles.Todo, {textDecorationLine: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#808080' : 'black' }]}>
                {todo.title}
                </Text>
            </TouchableOpacity>
        </View>
        </Swipeable>
    )
  }


  
  return (
    <KeyboardAvoidingView style={{flex: 1}} behaviour="padding">
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{position: 'absolute', top: 40, right: 32, zIndex: 10}} onPress={
            props.closeModal
        }
        >
        <AntDesign name='close' size={24} color='black' />
        </TouchableOpacity>
        
        <View style={[styles.section, styles.header, {borderBottomColor: color}]}>
        <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.task_count}>{completed_count} of {task_count} tasks</Text>
        </View>
       </View>
     
      

       <View style={[styles.section, {flex: 1, marginLeft: 30}]}>
        <FlatList data={todos}
         renderItem={({item, index}) => rendertodo(item, index)} 
         keyExtractor={(item)=> item.title}
         contentContainerStyle={{marginLeft: 32}} 
         showsVerticalScrollIndicator={false}
         />
       </View>
       
       <View style={[styles.section, styles.footer]} behavior="padding">
         <TextInput style={[styles.input, {borderColor: color}]} onChangeText={(text) => SetnewToDo(text)} value={newTodo} />
         <TouchableOpacity style={[styles.addTodo, {backgroundColor: color}]} onPress={addNewTodo}>
            <AntDesign name="plus" size={24} color='white' />
        </TouchableOpacity>
       </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    section: {
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 30,
        borderBottomWidth: 3
    },
    title: {
        paddingTop: 60,
        marginRight: 6,
        paddingRight: 4,
        fontSize: 20,
        position: 'sticky',
        fontWeight: 'bold',
        color: 'black',
    },
    task_count: {
        marginTop: 4,
        marginBottom: 16,
        position: 'sticky',
        color: '#808080'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 4,
        paddingHorizontal: 6
    },
    addTodo: {
          borderRadius: 4,
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center'
    },
    ToDoContainer: {
         paddingHorizontal: 16,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'space-between',
    },
    Todo: {
        flexDirection: 'row',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#808080',
    },
    deleteButton : {
        flex: 1,
        borderRadius: 6,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems : 'center',
        width: 80
    }

})

export default ToDoModal;