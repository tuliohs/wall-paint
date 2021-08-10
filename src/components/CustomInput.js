import * as React from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import { colors } from '../constants/theme';
import { sizes } from '../constants/theme/layout'

export default function CustomInput(props) {

    const { error, borderless, label, help, helpStyles,
        labelStyles, icon, iconFamily, iconSize, iconContent, right,
        rounded, disabled, isPassword, placeholderTextColor, bgColor,
        style, lightColor, darkColor, ...otherProps } = props

    const styles = {
        inputStyle: {
            backgroundColor: colors.background,
            borderRadius: sizes.INPUT_BORDER_RADIUS,
            borderWidth: sizes.INPUT_BORDER_WIDTH,
            borderColor: colors.input,
            height: sizes.INPUT_HEIGHT,
            paddingHorizontal: sizes.INPUT_HORIZONTAL,
            width: '100%',
        },
        inputText: {
            color: colors.input,
            fontSize: sizes.INPUT_TEXT,
            textDecorationColor: 'transparent',
            textShadowColor: 'transparent',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputView: {
            flex: 1,
        },
        inputIcon: {
            marginHorizontal: sizes.base,
        },
        label: {
            fontWeight: '500',
            fontSize: sizes.INPUT_VERTICAL_LABEL,
            marginVertical: sizes.INPUT_VERTICAL_LABEL,
            paddingHorizontal: sizes.INPUT_HORIZONTAL
        },
        helpText: {
            //color: theme.COLORS.SECONDARY,
            //fontSize: sizes.INPUT_HELP_TEXT,
            marginVertical: 8,
            paddingHorizontal: 16,
            fontSize: 14
        },
        rounded: {
            borderRadius: sizes.INPUT_ROUNDED,
        },
        borderless: {
            borderColor: 'transparent',
            borderWidth: 0,
        },
    }

    const viewStyles = [
        bgColor ? { backgroundColor: bgColor } : backgroundColor
    ]

    const inputViewStyles = [
        styles.inputStyle,
        styles.inputContainer,
        bgColor && { backgroundColor: bgColor },
        rounded && styles.rounded,
        borderless && styles.borderless,
        error && { borderColor: colors.error },
        style,
    ]

    const inputStyles = [
        styles.inputView,
        borderless && icon && styles.inputIcon,
        styles.inputText,
        //color && { color },
        //textInputStyle || {}
    ]

    //const iconColor = useThemeColor('default')
    const iconInstance = null/* = icon ? (
        <Icon
            name={icon}
            family={iconFamily}
            size={iconSize || sizes.base * 1.0625}
            color={(error && theme.color.error) || iconColor// || placeholderTextColor
            }
        />
    ) : (iconContent)*/

    const labelContent = label && <Text style={[styles.label, labelStyles || {}]}>{label}</Text>
    const helpContent = help && <Text style={[styles.helpText, helpStyles || {}]}>{help}</Text>;
    return (
        <View
            style={{
                //marginVertical: sizes.BASE / 2,
                alignContent: 'center',
            }}>
            {labelContent}
            {/*{topHelp && !bottomHelp && helpContent}*/}
            <View style={inputViewStyles}>
                {!right && iconInstance}
                <TextInput
                    //ref={onRef} 
                    //keyboardType={type}
                    secureTextEntry={isPassword}
                    placeholderTextColor={placeholderTextColor}
                    underlineColorAndroid="transparent"
                    style={[viewStyles, inputStyles, style]} {...otherProps}
                />
                {right && iconInstance}
                {/*{viewPassElement}*/}
            </View>
            {/*{bottomHelp && helpContent}*/}
        </View>

    )
}


