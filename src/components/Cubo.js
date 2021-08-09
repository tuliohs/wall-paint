import React, { Component, PropTypes, useEffect } from 'react';
import {
    Dimensions,
    PanResponder,
    View
} from 'react-native';
import { transformOrigin, rotateXY, rotateXZ } from '../utils';

import Animated, {
    useAnimatedScrollHandler,
    useSharedValue, useAnimatedStyle,
    interpolate, useAnimatedRef
} from 'react-native-reanimated'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = {
    container: {
        position: 'absolute',
        left: WIDTH / 2 - 50,
        top: HEIGHT / 2 - 50,
        width: 100,
        height: 100,
        backgroundColor: "transparent"
    },
    rectangle: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 100,
        height: 150,
        zIndex: 10
    }
};

export default function Cubo() {

    const refViewFront = React.useRef()//  useAnimatedRef()
    const refViewBack = React.useRef()//  useAnimatedRef()
    const refViewRight = React.useRef()//  useAnimatedRef()
    const refViewLeft = React.useRef()//  useAnimatedRef()

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

    function handlePanResponderMove(e, gestureState) {
        const { dx, dy } = gestureState;
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
    }

    function RenderLeft({ color }) {
        return (
            <View
                ref={component => refViewRight.current = component}
                style={[styles.rectangle, (color) ? { backgroundColor: color } : null]}
                {...panResponder.panHandlers}
            />
        )
    }

    function RenderRight({ color }) {
        return (
            <View
                ref={component => refViewLeft.current = component}
                style={[styles.rectangle, (color) ? { backgroundColor: color } : null]}
                {...panResponder.panHandlers}
            />
        )
    }

    function RenderFront({ color }) {
        return (
            <View
                ref={component => refViewFront.current = component}
                style={[styles.rectangle, (color) ? { backgroundColor: color } : null]}
                {...panResponder.panHandlers}
            />
        )
    }

    function RenderBack({ color }) {
        return (
            <View
                ref={component => refViewBack.current = component}
                style={[styles.rectangle, (color) ? { backgroundColor: color } : null]}
                {...panResponder.panHandlers}
            />
        )
    }

    //renderTop({color}) {
    //    return (
    //        <View
    //            ref={component => this.refViewTop.current = component}
    //            style={[styles.rectangle, (color) ? { backgroundColor: color } : null]}
    //            {...this.panResponder.panHandlers}
    //        />
    //    )
    //}

    //renderBottom({color}) {
    //    return (
    //        <View
    //            ref={component => this.refViewBottom.current = component}
    //            style={[styles.rectangle, (color) ? { backgroundColor: color } : null]}
    //            {...this.panResponder.panHandlers}
    //        />
    //    )
    //}

    return (
        <View style={styles.container}>
            <RenderFront color='#4c72e0' />
            <RenderBack color='#8697df' />
            <RenderLeft color='#b5bce2' />
            <RenderRight color='#e5afb9' />
            {/*{this.renderTop('#de7c92')}*/}
            {/*{this.renderBottom('#d1426b')}*/}
        </View>
    )
}