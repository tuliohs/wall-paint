import React, { useState } from 'react'
import Cubo from '../components/Cubo'
import CustomInput from '../components/CustomInput'
import CustomView from '../components/CustomView'
import {
    Text, StyleSheet, Dimensions,
    TouchableWithoutFeedback, Alert,
    Keyboard, View, ScrollView

} from 'react-native'

import strings from '../constants/strings'
import { colors } from '../constants/theme'
const { height, width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)

const Home = () => {
    const [tamanho, setTamanho] = useState({
        front: {
            width: 2,
            height: 2
        },
        back: {
            width: 2,
            height: 2
        },
        left: {
            width: 2,
            height: 2
        },
        right: {
            width: 2,
            height: 2
        },
    })

    const [itemSelect, setItemSelect] = useState('front')
    const onChangeHeight = (e) => {
        if (e > 15 || e < 15)
            return
        Alert.alert("Erro", "A parede deve ter entre 1 e 15 Metros")
        setTamanho({
            ...tamanho,
            [itemSelect]: {
                ...tamanho[itemSelect],
                height: e
            }
        })
    }
    const onChangeWidth = (e) => {
        setTamanho({
            ...tamanho,
            [itemSelect]: {
                ...tamanho[itemSelect],
                height: e
            }
        })
    }
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
            <>
                <Cubo tamanho={tamanho} setTamanho={setTamanho}
                    itemSelect={itemSelect} setItemSelect={setItemSelect} />
                <DismissKeyboard>
                    <CustomView space="between" middle
                        style={{
                            width: width,
                            //position: 'absolute',
                            marginTop: height / 2 - 120
                        }}
                    >
                        <CustomView middle center  >
                            <CustomView row style={stylesSheet.borderTop}           >
                                <Text style={stylesSheet.label} >{strings.txAltura}</Text>
                                <CustomInput
                                    placeholder={strings.phAltura}
                                    onChangeText={e => onChangeHeight(e)}

                                    value={tamanho[itemSelect].height.toString()}
                                    //style={styles.inputs} 
                                    style={stylesSheet.input}
                                    bgColor={colors.reverse}
                                    placeholderTextColor={colors.gray}
                                    //secureTextEntry={c.secureTextEntry}
                                    textColor={colors.text}
                                    error={false}
                                />
                            </CustomView>
                            <CustomView row style={stylesSheet.borderTop}           >
                                <Text style={stylesSheet.label} >{strings.txLargura}</Text>
                                <CustomInput
                                    placeholder={strings.phLargura}
                                    onChangeText={e => onChangeWidth(e)}
                                    value={tamanho[itemSelect].height.toString()}
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
                </DismissKeyboard>
            </ >
        </ScrollView>
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

    },
    borderTopButton: {
        borderColor: "#D3D3D3",
        borderTopWidth: 0.8,
        width: width * 0.82,
        marginBottom: 30
    },
})
export default Home