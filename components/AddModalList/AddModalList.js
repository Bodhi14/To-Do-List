import { AntDesign } from '@expo/vector-icons';
import React, {useState} from 'react';

import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import colors from '../../colors';
import dummydata from '../../dummydata';

const AddModalList = (props) => {
    
    const bgcolors = ["blue", "red", "green", "orange", "yellow" ];

    const [Name, setName] = useState("");
    const [Color, setColor] = useState(bgcolors[0]);

    const createToDo = () => {
        dummydata.push(
            {
            Name,
            Color,
            todos: [],
            }
        )
    };
    
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={styles.touch}>
        <AntDesign name="close" size={24} color={colors.black} onPress={props.closeModal} />
        </TouchableOpacity>
    <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
        <Text style={styles.title}>Create New Todo</Text>

        <TextInput style={styles.input} placeholder="List Name" onChangeText={text => setName(text)} />

        <View style={styles.colorpicker}>
            {
                 bgcolors.map(
                    (color) => {
                        return (
                        <TouchableOpacity key={color} style={[styles.colorselect, {backgroundColor: color}]} onPress={() => setColor(color)}></TouchableOpacity>
                    );
                }
                   )
            }
        </View>
        <TouchableOpacity style={[styles.new, {backgroundColor: "blue"}]} onPress={createToDo}>
            <Text style={{ color: colors.white, fontWeight: '600', fontSize: 20}}>Create</Text>
        </TouchableOpacity>
    </View>


    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touch : {
        position: 'absolute',
        top: 64,
        right: 32
    },
    new: {
        marginTop: 15,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue,
    },
    title : {
        fontSize: 20,
        fontWeight: "800",
        color: colors.black,
        textAlign: "center",
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    create: {
        marginTop: 24,
        height: 50, 
        borderRadius: 6,
        alignItems: 'center',
        
    },
    colorpicker: {
         flexDirection: 'row',
         justifyContent: 'center',
         marginTop: 12
    },
    colorselect : {
        alignItems: 'center'
    },
})
export default AddModalList;