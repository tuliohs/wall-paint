import * as React from 'react';
import { View } from 'react-native';
import { colors } from '../constants/theme';
import { sizes } from '../constants/theme/layout'

export default function CustomView(props) {

    const { flex, row, middle, left, right, space, bgColor, style, lightColor, darkColor, ...otherProps } = props

    const viewStyles = [classes.block,
    flex && { flex: flex === true ? 1 : flex },
    row && classes.row,
    middle && classes.middle,
    left && classes.left,
    right && classes.right,
    space && { justifyContent: `space-${space}` },
    bgColor ? { backgroundColor: bgColor } : { backgroundColor: colors.background }
    ]

    return <View style={[viewStyles, style]} {...otherProps} />;
}


const classes = {
    block: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    top: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    bottom: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    card: {
        borderRadius: sizes.CARD_BORDER_RADIUS,
        borderWidth: sizes.CARD_BORDER_WIDTH,
        //borderColor: theme.COLORS.BLOCK,
    },
    shadow: {
        //shadowColor: theme.COLORS.BLOCK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: sizes.BLOCK_SHADOW_OPACITY,
        shadowRadius: sizes.BLOCK_SHADOW_RADIUS,
        elevation: sizes.ANDROID_ELEVATION,
    },
    fluid: {
        width: 'auto',
    },
}