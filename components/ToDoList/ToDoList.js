import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import colors from '../../colors';
import ToDoModal from '../ToDoModal/ToDoModal';

const ToDoList = (props) => {

    
    const TodosDone = props.list.todos.filter((todo) => todo.completed).length;
    const TodosRemaining = props.list.todos.length - TodosDone;

    const [isToDoModalVisible, settoDoModalVisible] = useState(false)
    

    const toggleToDoModal = () => { 
        settoDoModalVisible(!isToDoModalVisible)
    }
  return (
    <View>
        <Modal animationType='slide' visible={isToDoModalVisible} onRequestClose={toggleToDoModal}>
            <ToDoModal list={props.list} closeModal={toggleToDoModal} updateList={props.updateList} />
        </Modal>
            <TouchableOpacity style={[styles.container, {backgroundColor: props.list.color}]} onPress={toggleToDoModal}>
            <Text style={styles.title}>{props.list.name}</Text>
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.count}>{TodosRemaining}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.count}>{TodosDone}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 10
    },
    count: {
        fontSize: 40,
        fontWeight: "200",
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }
});

export default ToDoList;