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

function home() {
  const spinValue = React.useRef(new Animated.Value(0.0)).current;

  // fade value
  const fadeValue = React.useRef(new Animated.Value(1)).current;

  // x, y coordinates
  const offsetX = React.useRef(new Animated.Value(0)).current;
  const offsetY = React.useRef(new Animated.Value(0)).current;

  // x, y ratio scale
  const scaleY = React.useRef(new Animated.Value(1)).current;
  const scaleX = React.useRef(new Animated.Value(1)).current;

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
      Animated.timing(offsetY, {
        toValue: height - 90,
        useNativeDriver: true,
      }),
      Animated.timing(offsetX, {
        toValue: width - 30,
        useNativeDriver: true,
      }),
      Animated.timing(offsetY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(offsetX, {
        toValue: 0,
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
      Animated.timing(offsetY, {
        toValue: height / 2,
        useNativeDriver: true,
      }),
      Animated.timing(offsetX, {
        toValue: width / 2 - 30,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(scaleY, {
          toValue: 4,
          useNativeDriver: true,
        }),
        Animated.timing(scaleX, {
          toValue: 4,
          useNativeDriver: true,
        }),
      ]).start(finished => {
        if (finished) {
          Animated.parallel([
            Animated.timing(scaleY, {
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.timing(scaleX, {
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.timing(fadeValue, {
              toValue: 0,
              useNativeDriver: true,
            }),
          ]).start();
        }
      });
    });
  };

  const onClickSpin = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(finished => {
      if (finished) {
        spinValue.setValue(0);
      }
    });
  };

  const onClickReset = () => {
    Animated.parallel([
      Animated.timing(offsetY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(offsetX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(scaleX, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(scaleY, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onClickScale = () => {
    Animated.timing(scaleX, {
      toValue: 27,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderView = () => {
    return (
      <Animated.View
        style={[
          {
            width: 30,
            height: 30,
            backgroundColor: 'red',
            transform: [
              {rotate: spin},
              {translateY: offsetY},
              {translateX: offsetX},
              {scaleX: scaleX},
              {scaleY: scaleY},
            ],
            opacity: fadeValue,
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

export default home;
