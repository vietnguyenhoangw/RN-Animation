import React, {useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  LogBox,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function AnimationWithXY() {
  const translateXY = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const spinValue = React.useRef(new Animated.Value(0.0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
  });

  const onClickStart = () => {
    Animated.sequence([
      Animated.timing(translateXY, {
        toValue: {x: 0, y: height - 90},
        useNativeDriver: true,
      }),
      Animated.timing(translateXY, {
        toValue: {x: width - 30, y: height - 90},
        useNativeDriver: true,
      }),
      Animated.timing(translateXY, {
        toValue: {x: width - 30, y: 0},
        useNativeDriver: true,
      }),
      Animated.timing(translateXY, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
      }),
    ]).start(finished => {
      if (finished) {
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start(finished => {
          if (finished) {
            spinValue.setValue(0);
          }
        });
      }
    });
  };

  const onClickCenter = () => {
    Animated.parallel([
      Animated.timing(translateXY, {
        toValue: {x: width / 2, y: height / 2},
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onClickSpin = () => {};

  const onClickReset = () => {};

  const onClickScale = () => {};

  const renderView = () => {
    return (
      <Animated.View
        style={[
          {
            width: 30,
            height: 30,
            backgroundColor: 'green',
            transform: [
              {translateX: translateXY.x},
              {translateY: translateXY.y},
              {rotate: spin},
            ],
          },
        ]}></Animated.View>
    );
  };

  const renderBottomBtn = (onClick: any, title: any, colors: any) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          height: 40,
          bottom: 0,
          backgroundColor: colors,
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={[
            {
              alignSelf: 'center',
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>{renderView()}</View>
      <View style={{flexDirection: 'row'}}>
        {renderBottomBtn(onClickStart, 'Run around', 'green')}
        {renderBottomBtn(onClickCenter, 'Go to center', 'red')}
        {renderBottomBtn(onClickSpin, 'Spin', 'yellow')}
        {renderBottomBtn(onClickReset, 'Reset', 'grey')}
        {renderBottomBtn(onClickScale, 'Scale to X', 'blue')}
      </View>
    </View>
  );
}

export default AnimationWithXY;
