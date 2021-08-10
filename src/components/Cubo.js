import React, { Component, PropTypes, useEffect, useState } from 'react';
import {
    Dimensions,
    PanResponder, Button,
    View, Text, FlatList
} from 'react-native';
import CustomButton from './CustomButton'
import { transformOrigin, rotateXY, rotateXZ } from '../utils';

import Animated, {
    useAnimatedScrollHandler, runOnJS,
    useSharedValue, useAnimatedStyle,
    interpolate, useAnimatedRef
} from 'react-native-reanimated'
import { colors } from '../constants/theme/index';
import sides from '../constants/config/sides';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const animationDesvioX = 30
const animationDesvioY = 30

const styles = {
    container: {
        //position: 'absolute',
        zIndex: 9999999,
        left: WIDTH / 2 - 50,
        top: HEIGHT / 2 - 300,
        width: 100,
        height: 100,
        backgroundColor: "transparent"
    }
};

export default function Cubo({ tamanho, setTamanho, itemSelect, setItemSelect }) {

    const refViewFront = useAnimatedRef()
    const refViewBack = useAnimatedRef()
    const refViewRight = useAnimatedRef()
    const refViewLeft = useAnimatedRef()



    const panResponder = React.useRef(
        PanResponder.create({
            // Ask to be the responder:
            //  onStartShouldSetPanResponder: (evt, gestureState) => true,
            //  onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            //    true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            //  onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            //    true,

            //  onPanResponderGrant: (evt, gestureState) => {
            //    // The gesture has started. Show visual feedback so the user knows
            //    // what is happening!
            //    // gestureState.d{x,y} will be set to zero now
            //  },
            onPanResponderMove: (evt, gestureState) => {
                handlePanResponderMove(evt, gestureState)
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            //  onPanResponderTerminationRequest: (evt, gestureState) =>
            //    true,
            //  onPanResponderRelease: (evt, gestureState) => {
            //    // The user has released all touches while this view is the
            //    // responder. This typically means a gesture has succeeded
            //  },
            //  onPanResponderTerminate: (evt, gestureState) => {
            //    // Another component has become the responder, so this gesture
            //    // should be cancelled
            //  },
            //  onShouldBlockNativeResponder: (evt, gestureState) => {
            //    // Returns whether this component should block native components from becoming the JS
            //    // responder. Returns true by default. Is currently only supported on android.
            //    return true;
            //  }
        })
    ).current;

    function handlerMoveByDxDy(dx, dy, it) {
        console.log(dx, dy)
        const origin = { x: 0, y: 0, z: -50 };
        let matrix = rotateXY(dx, dy);
        transformOrigin(matrix, origin);
        refViewFront.current.setNativeProps({ style: { transform: [{ perspective: 1000 }, { matrix: matrix }] } });

        matrix = rotateXY(dx + 180, dy);
        transformOrigin(matrix, origin);
        refViewBack.current.setNativeProps({ style: { transform: [{ perspective: 1000 }, { matrix: matrix }] } });

        matrix = rotateXY(dx + 90, dy);
        transformOrigin(matrix, origin);
        refViewRight.current.setNativeProps({ style: { transform: [{ perspective: 1000 }, { matrix: matrix }] } });

        matrix = rotateXY(dx - 90, dy);
        transformOrigin(matrix, origin);
        refViewLeft.current.setNativeProps({ style: { transform: [{ perspective: 1000 }, { matrix: matrix }] } });

        //matrix = rotateXZ(dx, dy - 90);
        //transformOrigin(matrix, origin);
        //this.refViewTop.current. setNativeProps({ style: { transform: [{ perspective: 1000 }, { matrix: matrix }] } });

        //matrix = rotateXZ(-dx, dy + 90);
        //transformOrigin(matrix, origin);
        //this.refViewBottom.current. setNativeProps({ style: { transform: [{ perspective: 1000 }, { matrix: matrix }] } });
        runOnJS(setItemSelect)(it)
    }

    function handlePanResponderMove(e, gestureState) {
        const { dx, dy } = gestureState;
        handlerMoveByDxDy(dx, dy)
    }

    const customStyles = {
        rectangle_faces: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: tamanho.front.height * 20 || 80,// 80,
            height: tamanho.front.width * 20 || 80,
            zIndex: 10
        },
        rectangle_lados: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: tamanho.left.height * 20 || 80,// 80,
            height: tamanho.left.width * 20 || 80,
            zIndex: 10
        }
    }

    function RenderLeft({ color }) {
        return (
            <Animated.View
                ref={component => refViewRight.current = component}
                style={[customStyles.rectangle_lados, (color) ? { backgroundColor: color } : null]}
                {...panResponder.panHandlers}
            />
        )
    }

    function RenderRight({ color }) {
        return (
            <Animated.View
                ref={component => refViewLeft.current = component}
                style={[customStyles.rectangle_lados, (color) ? { backgroundColor: color } : null]}
                {...panResponder.panHandlers}
            />
        )
    }

    function RenderFront({ color }) {
        return (
            <Animated.View
                ref={component => refViewFront.current = component}
                style={[customStyles.rectangle_faces, (color) ? { backgroundColor: color } : null]}
                {...panResponder.panHandlers}
            />
        )
    }

    function RenderBack({ color }) {
        return (
            <>
                <Animated.View
                    ref={component => refViewBack.current = component}
                    style={[customStyles.rectangle_faces, (color) ? { backgroundColor: color } : null]}
                    {...panResponder.panHandlers}
                >

                    <Button
                        style={{
                            zIndex: 99999,
                            maginTop: -250
                        }}
                        title="Back" />
                </Animated.View>
            </>
        )
    }
    //renderTop({color}) {
    //    return (
    //        <View
    //            ref={component => this.refViewTop.current = component}
    //            style={[customStyles.rectangle, (color) ? { backgroundColor: color } : null]}
    //            {...this.panResponder.panHandlers}
    //        />
    //    )
    //}

    //renderBottom({color}) {
    //    return (
    //        <View
    //            ref={component => this.refViewBottom.current = component}
    //            style={[customStyles.rectangle, (color) ? { backgroundColor: color } : null]}
    //            {...this.panResponder.panHandlers}
    //        />
    //    )
    //}
    useEffect(() => {
        //console.log(refViewFront.current)

    }, [refViewFront, refViewBack, refViewRight, refViewLeft])
    const goToPositionLeft = (it) => {
        handlerMoveByDxDy(180 + animationDesvioY, 0 + animationDesvioX, it)
        //setItemSelect(it)
    }
    const goToPositionRight = (it) => {
        handlerMoveByDxDy(90 + animationDesvioY, 0 + animationDesvioX, it)
        //setItemSelect(it)
    }
    const goToPositionFront = (it) => {
        handlerMoveByDxDy(-180 + animationDesvioY, 0 + animationDesvioX, it)
        //setItemSelect(it)
    }
    const goToPositionBack = (it) => {
        handlerMoveByDxDy(-90 + animationDesvioY, 0 + animationDesvioX, it)
        //setItemSelect(it)
    }

    const walls = [
        { id: sides.left, title: "Left", onPress: () => goToPositionLeft(sides.left) },
        { id: sides.front, title: "Front", onPress: () => goToPositionFront(sides.front) },
        { id: sides.right, title: "Right", onPress: () => goToPositionRight(sides.right) },
        { id: sides.back, title: "Back", onPress: () => goToPositionBack(sides.back) },
    ]
    return (
        <View style={{
            position: 'relative',
        }}>
            <Animated.View style={styles.container}>
                <RenderFront color='#4c72e0' />
                <RenderBack color='#8697df' />
                <RenderLeft color='#d1426b' />
                <RenderRight color='#e5afb9' />
                {/*{this.renderTop('#de7c92')}*/}
                {/*{this.renderBottom('#d1426b')}*/}
            </Animated.View>
            <FlatList

                style={{
                    position: 'absolute',
                    marginTop: HEIGHT / 2 - 80
                }}
                data={walls} horizontal={true}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View key={item?.title}>
                        <CustomButton round border
                            active={itemSelect === item?.title}
                            size="small"
                            bgColor={'#1e1e1e'}
                            onPress={item.onPress}>
                            <Text style={{
                                color: itemSelect !== item?.title ? colors.white : colors.text
                            }}>{item.title}</Text>
                        </CustomButton>
                    </View>)}
            />
        </View>
    )
}