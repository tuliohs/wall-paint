import React, { useState, useEffect } from 'react'
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
import { sizes } from '../constants/theme/layout'
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

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

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
                                    marginTop: height / 2 - 126
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
                                    <CustomView row style={[stylesSheet.borderTop,
                                    {
                                        //backgroundColor: colors.background,
                                        borderBottomWidth: sizes.INPUT_BORDER_WIDTH,
                                        borderBottomColor: colors.input
                                    }
                                    ]}           >
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
                                    <CustomButton
                                        border
                                        round
                                        bgColor={colors.primary}
                                        style={{
                                            marginTop: 20,
                                            width: width * 0.8,
                                            backgroundColor: '#2c5394'
                                        }}
                                    //onPress={handlerPress}
                                    //style={[styles.createButton,
                                    //    //{ opacity: btActive ? 1 : 0.5 }
                                    //]}
                                    //{...rest}
                                    >
                                        <Text
                                            style={{ //fontFamily: 'montserrat-bold'
                                                color: colors.white,
                                                fontSize: 16
                                            }}
                                        >
                                            {" ➕      Porta ou Janela"}
                                        </Text>
                                    </CustomButton>


                                </CustomView>
                            </CustomView>
                        </>
                    </DismissKeyboard>
                </ >

            </ScrollView>
            <>
                {
                    isKeyboardVisible ? <></> :
                        <>
                            {/*<CustomView
                                style={{
                                    width: width,
                                    position: 'absolute',
                                    textAlign: 'center',
                                    bottom: 50
                                }}
                            ><Text
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center'
                                }}
                            >{calculaQuantidadeTinta(tamanho).soma.toString() + " litros"}</Text>
                                <View style={{
                                    marginTop: 20
                                }}   >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            textAlign: 'center'
                                        }}
                                    >{calculaQuantidadeTinta(tamanho).toString}</Text>
                                </View>
                            </CustomView>*/}

                            <CustomButton
                                style={{
                                    width: 65,
                                    height: 60,
                                    borderTopLeftRadius: 30,
                                    //borderRadius: 30,
                                    //borderTopLeftRadius: 10,
                                    backgroundColor: '#122b73',
                                    position: 'absolute',
                                    bottom: -10,
                                    right: -10,
                                }}
                            >
                                <Image source={{ uri: 'https://img.icons8.com/glyph-neue/64/ffffff/paint-bucket.png' }}
                                    onPress={() => console.log('oko')}
                                    height={40}
                                    width={40}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: 'absolute',
                                        bottom: 8,
                                        right: 8,
                                    }}

                                />
                                {/*<Text
                                    style={{
                                        width: 65,
                                        height: 30,
                                        //borderRadius: 30,
                                        borderTopLeftRadius: 30,
                                        color: '#8898aa',
                                        position: 'absolute',
                                        bottom: -5,
                                        right: -5,
                                    }}
                                >Expandir</Text>*/}
                            </CustomButton>
                        </>}
            </>
        </>
    )
}

const stylesSheet = StyleSheet.create({
    label: {
        width: width * 0.40,
        textAlign: 'right',
        marginRight: 8,
        marginTop: 12,
        fontSize: 22,
        fontWeight: "bold"
    },
    input: {
        width: width * 0.45,
        borderColor: 'transparent',
        borderWidth: 0,
        color: "black",
        marginTop: 5,
        fontSize: 20,
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