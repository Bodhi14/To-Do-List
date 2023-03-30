import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput } from 'react-native';

const ToDoModal = (props) => {


  const [newToDo, SetnewToDo] = useState("");
  

  const task_count = props.list.todos.length;
  const completed_count = props.list.todos.filter(todo => todo.completed).length;


  const toggleCompletion = (index) => {
    let list = props.list;

    list.todos[index].completed =!list.todos[index].completed;

    props.updateList(list);

  }

  const rendertodo = ({todo, index}) => {
    return (
        <View styles={styles.ToDoContainer}>
            <TouchableOpacity onPress={()=> toggleCompletion(index)}>
                <Ionicons name={todo.completed ? 'ios-square' : 'ios-square-outline' } size={24} color='#808080' style={{ width: 32}} />
            </TouchableOpacity>


           <Text style={[styles.todo, {textDecorationLine: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#808080' : 'black' }]}>
           {todo.title}
           </Text>
        </View>
    )
  }
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{position: 'absolute', top: 64, right: 32, zIndex: 10}} onPress={
            props.closeModal
        }
        >
        <AntDesign name='close' size={24} color='black' />
        </TouchableOpacity>
       <View style={[styles.section, styles.header, {borderBottomColor: props.list.color}]}>
        <View>
            <Text style={styles.title}>{props.list.name}</Text>
            <Text style={styles.task_count}>{completed_count} of {task_count} tasks</Text>
        </View>
       </View>

       <View style={[styles.section, {flex: 2}]}>
        <FlatList data={props.list.todos}
         renderItem={({item, index}) => rendertodo(item, index)} 
         keyExtractor={(item)=> item.title}
         contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}} 
         showsVerticalScrollIndicator={false}
         />
       </View>
       
       <View style={[styles.section, styles.footer]}>
         <TextInput style={[styles.input, {borderColor: props.list.color}]} />
         <TouchableOpacity style={[styles.addTodo, {backgroundColor: props.list.color}]}>
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
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        marginTop: 5,
        marginRight: 6,
        paddingRight: 4,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#808080',
    },
    task_count: {
        marginTop: 4,
        marginBottom: 16
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
         paddingVertical: 16,
         flexDirection: 'row',
         alignItems: 'center'
    },
    todo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#808080'
    }

})

export default ToDoModal;