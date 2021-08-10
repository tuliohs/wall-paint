import React, { useState } from 'react'
import Cubo from '../components/Cubo'
import CustomInput from '../components/CustomInput'
import CustomView from '../components/CustomView'
import {
    Text, StyleSheet, Dimensions,
    TouchableWithoutFeedback, Alert, Image,
    Keyboard, View, ScrollView

} from 'react-native'

import strings from '../constants/strings'
import { colors } from '../constants/theme'
import sides from '../constants/config/sides'
import CustomButton from '../components/CustomButton'
import { calculaQuantidadeTinta } from '../utils/calculate'
const { height, width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
)

const Home = () => {
    const [tamanho, setTamanho] = useState({
        [sides.front]: { width: 8, height: 4 },
        [sides.back]: { width: 8, height: 4 },
        [sides.left]: { width: 8, height: 4 },
        [sides.right]: { width: 8, height: 4 },
    })

    const [itemSelect, setItemSelect] = useState(sides.front)
    const onChangeHeight = (e) => {
        //if (e > 15 || e < 15) 
        //Alert.alert("Erro", "A parede deve ter entre 1 e 15 Metros")
        changeEquivalentSide(e, "height")
    }
    const onChangeWidth = (e) => {
        changeEquivalentSide(e, "width")

    }
    const changeEquivalentSide = (e, type) => {
        if (itemSelect === sides.front || itemSelect === sides.back) {
            setTamanho({
                ...tamanho,
                [sides.front]: { ...tamanho[sides.front], [type]: e },
                [sides.back]: { ...tamanho[sides.back], [type]: e }
            })
        }
        else {
            setTamanho({
                ...tamanho,
                [sides.left]: { ...tamanho[sides.left], [type]: e },
                [sides.right]: { ...tamanho[sides.right], [type]: e }
            })
        }
    }
    return (
        <>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                <>
                    <Cubo tamanho={tamanho} setTamanho={setTamanho}
                        itemSelect={itemSelect} setItemSelect={setItemSelect} />

                    <DismissKeyboard>
                        <>
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

                                            value={(tamanho[itemSelect]?.height)?.toString()}
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
                                            value={(tamanho[itemSelect]?.width)?.toString()}
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
                        </>
                    </DismissKeyboard>
                </ >

            </ScrollView>
            <CustomView
                style={{
                    width: width,
                    position: 'absolute',
                    textAlign: 'center',
                    bottom: 20
                }}
            ><Text
                style={{
                    fontSize: 30,
                    textAlign: 'center'
                }}
            >{calculaQuantidadeTinta(tamanho).soma.toString() + " litros"}</Text>
                <View>
                    <Text
                        style={{
                            fontSize: 12,
                            textAlign: 'center'
                        }}
                    >{calculaQuantidadeTinta(tamanho).toString}</Text>
                </View>
            </CustomView>

            <CustomButton
                style={{
                    width: 65,
                    height: 80,
                    //borderRadius: 30,
                    borderTopLeftRadius: 10,
                    backgroundColor: '#EA1D2C',
                    position: 'absolute',
                    bottom: -5,
                    right: -10,
                }}
            >
                <Text
                    style={{
                        width: 65,
                        height: 78,
                        //borderRadius: 30,
                        borderTopLeftRadius: 30,
                        color: '#ffffff',
                        position: 'absolute',
                        bottom: -5,
                        right: -5,
                    }}
                >Calcular</Text>
                <Image source={{ uri: 'https://img.icons8.com/glyph-neue/64/ffffff/paint-bucket.png' }}
                    onPress={() => console.log('oko')}
                    height={40}
                    width={40}
                    style={{
                        width: 40,
                        height: 40,
                        //borderRadius: 30,
                        //borderTopLeftRadius: 30,
                        //backgroundColor: '#ee6e73',
                        //textAlign: 'center',
                        position: 'absolute',
                        bottom: 5,
                        right: 12,
                    }}

                />
            </CustomButton>

        </>
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