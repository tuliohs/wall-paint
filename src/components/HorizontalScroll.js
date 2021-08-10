import React, { Component, useEffect, useState } from "react";
import {
    //Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from "react-native";

import Animated, {
    useAnimatedScrollHandler,
    useSharedValue, useAnimatedStyle,
    interpolate, useAnimatedRef
} from 'react-native-reanimated'
import { colors } from "../constants/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HorizontallScroll() {

    const aref = useAnimatedRef()
    const xOffset = useSharedValue(0);
    const isScrolling = useSharedValue(false);
    const [dataSourceCords, setDataSourceCords] = useState([]);

    const Screen = ({ text, index }) => {
        return (
            <View style={styles.scrollPage}>
                <Animated.View style={[styles.screen, headerImageStyle]}
                //onLayout={(event) => {
                //    const layout = event.nativeEvent.layout;
                //    dataSourceCords[index] = layout.x;
                //    setDataSourceCords(dataSourceCords);
                //}}
                >
                    <Text style={styles.text}>{text}</Text>
                </Animated.View>
            </View>
        );
    }


    const headerImageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 800 },
                //{
                //    scale: interpolate(
                //        xOffset.value,
                //        [

                //            (index - 1) * SCREEN_WIDTH2,
                //            index * SCREEN_WIDTH2,
                //            (index + 1) * SCREEN_WIDTH2
                //        ],
                //        [0.25, 1, 0.25],
                //        //Extrapolate.CLAMP,
                //    ),
                //},
                //{
                //    rotateX: interpolate(
                //        xOffset.value,
                //        [
                //            (index || 2 - 1) * SCREEN_WIDTH2,
                //            index || 2 * SCREEN_WIDTH2,
                //            (index || 2 + 1) * SCREEN_WIDTH2
                //        ],
                //        //[
                //        //    45,
                //        //    0,
                //        //    45
                //        //],
                //        //[
                //        //    1 * SCREEN_WIDTH2,
                //        //    SCREEN_WIDTH2,
                //        //    1 * SCREEN_WIDTH2
                //        //],
                //        ["45deg", "0deg", "45deg"],
                //        Extrapolate.CLAMP,
                //    )
                //},
                //{
                //    rotateY:
                //        concat(
                //            interpolate(
                //                xOffset.value,
                //                [
                //                    /*(index - 1) */ SCREEN_WIDTH2,
                //                    /*index **/ SCREEN_WIDTH2,
                //                    /*(index + 1) */ SCREEN_WIDTH2
                //                ],
                //                [45, 0, 45]),
                //            'deg'
                //        )
                //            }
                //interpolate(
                //    xOffset.value,
                //    [
                //        (index - 1) * SCREEN_WIDTH,
                //        index * SCREEN_WIDTH,
                //        (index + 1) * SCREEN_WIDTH
                //    ],
                //    ["-45deg", "0deg", "45deg"],
                //Extrapolate.CLAMP,
                //)
                //}
            ]
        }
    }
    )

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => xOffset.value = event.contentOffset.x,
        onBeginDrag: (e) => isScrolling.value = true,
        onEndDrag: (e) => isScrolling.value = false,
    })

    const scrollHandlerByIndex = (i) => {
        const y = 0
        const x = dataSourceCords[i]
        aref.current.scrollTo({ x, y });

        //const x = SCREEN_WIDTH * (i + 1)
        //aref.current.scrollTo({ x, y });
    }

    return (
        <>
            <Animated.ScrollView
                ref={aref}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                horizontal
                pagingEnabled
                style={styles.scrollView}
            >
                <Screen text="Parede 1" index={0} />
                <Screen text="Parede 2" index={1} />
                <Screen text="Parede 3" index={2} />
                <Screen text="Parede 4" index={3} />
            </Animated.ScrollView>
            <Button title="goTo" onPress={() => scrollHandlerByIndex(3)} />
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexDirection: "row",
        backgroundColor: colors.primary
    },
    scrollPage: {
        width: SCREEN_WIDTH,
        padding: 20
    },
    screen: {
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "white"
    },
    text: {
        fontSize: 45,
        fontWeight: "bold"
    }
});
