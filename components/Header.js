import * as React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return (
        <View style={props.styles.container}>
            <Text style={props.styles.title}>Header</Text>
        </View>
    );
};


export default Header;