import React from 'react'
import Cubo from '../components/Cubo'
import CustomInput from '../components/CustomInput'
import CustomView from '../components/CustomView'
import { Text, StyleSheet, Dimensions } from 'react-native'
import strings from '../constants/strings'
import { colors } from '../constants/theme'
const { height, width } = Dimensions.get('screen');

const Home = () => {
    return (
        <CustomView><Cubo />

            <CustomView space="between">
                <CustomView middle center  >
                    <CustomView row style={stylesSheet.borderTop}           >
                        <Text style={stylesSheet.label} >{strings.altura}</Text>
                        <CustomInput
                            placeholder={strings.altura}
                            //onChangeText={e => setUser({ ...user, [c.field]: e })}
                            //value={user[c.field]}
                            //style={styles.inputs} 
                            style={stylesSheet.input}
                            bgColor={colors.reverse}
                            placeholderTextColor={colors.gray}
                            //secureTextEntry={c.secureTextEntry}
                            textColor={colors.text}
                            error={false}
                        />
                    </CustomView>
                </CustomView>
            </CustomView>
        </CustomView>
    )
}

const stylesSheet = StyleSheet.create({
    label: {
        width: width * 0.25,
        textAlign: 'right',
        marginRight: 8,
        marginTop: 12,
        fontSize: 15,
        fontWeight: "bold"
    },
    input: {
        width: width * 0.55,
        borderColor: 'transparent',
        borderWidth: 0,
        color: "black",
        fontSize: 15,
    },
    borderTop: {
        borderColor: "#D3D3D3",
        borderTopWidth: 0.8,
        position: 'absolute',


    },
    borderTopButton: {
        borderColor: "#D3D3D3",
        borderTopWidth: 0.8,
        width: width * 0.82,
        marginBottom: 30
    },
})
export default Home