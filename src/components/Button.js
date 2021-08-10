import * as React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { sizes } from '../constants/theme/layout'
import { colors } from '../constants/theme'

const { width } = Dimensions.get('window');

export default function Button(props) {

    const { disabled, onPress, bgColor, opacity, children, style, size, round, shadowless, shadowColor, iconSize, onlyIcon,
        darkColor, ...otherProps } = props

    const viewStyles = [
        bgColor ? { backgroundColor: bgColor } : { backgroundColor: colors.sucess },

    ]

    const defaultSizeIcon = 0
    const buttonStyles = [
        styles.defaultButton,
        size === 'large' ? { width: width * 0.9 } : (size === "small" ? { width: width * 0.2 } : { width: width * 0.42 }),
        round && { borderRadius: sizes.base * 2 },
        onlyIcon && {
            width: (iconSize || defaultSizeIcon) * 2.75,
            height: (iconSize || defaultSizeIcon) * 2.75,
            borderWidth: 0,
            borderRadius: (iconSize || defaultSizeIcon) * 2,
        },
        !shadowless && styles.shadow,
        { zIndex: 2 },
        style,
    ];

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                { color: 'white' },
                viewStyles, buttonStyles, style]} {...otherProps} >
            {children}
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    smallButton: {
        width: 75,
        height: 28,
    },
    mediumButton: {
        width: 120,// 105
        height: 28 //
    },
    defaultButton: {
        borderRadius: 4,
        width: sizes.BUTTON_WIDTH,
        height: sizes.BUTTON_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },
    shadow: {
        //shadowColor: theme.COLORS.BLOCK,
        shadowOffset: { width: 0, height: 2 },
        //shadowOpacity: sizes.OPACITY,
        shadowRadius: sizes.BUTTON_SHADOW_RADIUS,
    },
    customText: {
        fontSize: sizes.font,
        color: colors.white,
    },
    androidShadow: {
        elevation: sizes.ANDROID_ELEVATION,
    },
})