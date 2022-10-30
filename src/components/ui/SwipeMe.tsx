import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { View, StyleSheet, ViewPropTypes, PanResponder, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../assets/Styles';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    // backgroundColor: '#ff00ff',
    // padding: 10
  },
  content: {
    flex :1,
  },
  sides: {
    // marginTop: 5,
  },
  left: {
    backgroundColor: Theme.color.greenAction
  },
  right: {
    backgroundColor: Theme.color.redAction
  }
});

const leftContent = <View style={styles.left}><Icon name={'arrow-forward'} color={'#fff'} /></View>;
const rightContent = <View style={styles.right}><Icon name={'arrow-forward'} color={'#fff'} /></View>;

type SProps = {
  children: any;
  styles?: any;
  style?: any;
  left?: any;
  leftSwipe: () => void;
  right?: any;
  rightSwipe: () => void;
  onPress: () => void;
  onLongPress: () => void;
};
type SState = {};

const MIN_SWIPE = 10;
const SWIPE_DIST = 75;
const LONG_PRESS_DELAY = 1200;

const noop = () => {};

export default class SwipeMe extends PureComponent<SProps, SState> {

  unmounted = false;

  static defaultProps = {
    leftSwipe: noop,
    rightSwipe: noop,
    onPress: noop,
    onLongPress: noop,
    // left: leftContent,
    // right: rightContent
  };

  state = {
    pan: new Animated.ValueXY(),
    width: 0,
    lastOffset: { x: 0, y: 0 },
    hasMoved: false,
    leftActive: false,
    rightActive: false
  };

  longPress;

  setLongPress = () => {
    if (this.longPress) {
      clearTimeout(this.longPress);
    }
    this.longPress = setTimeout(() => {
      this.props.onLongPress();
      this.setState({hasMoved: true});
    }, LONG_PRESS_DELAY);
  };

  componentDidMount() {}

  componentWillUnmount() {
    this.unmounted = true;
  }

  canLeft = () => (this.props.right !== undefined || true);
  canRight = () => (this.props.left !== undefined || true);

  handleLayout = ({nativeEvent: {layout: {width}}}) => {
    this.setState({width});
  }

  handlePan = Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}], {useNativeDriver: false});

  handleMoveShouldSetPanResponder = (e, g) => {
    // console.log('set pan');
    // return !(Math.abs(g.dy) >= 1);
    return Math.abs(g.dx) >= MIN_SWIPE;
  };

  handleStartShouldSetPanResponder = (e, g) => {
    // console.log('pan frmo start', g.dx, g.dy, g.vx, g.vy);
    // return !(Math.abs(g.dy) >= 1);
    return false;
  }

  handlePanResponderGrant = (e, g) => {
    // console.log('grant');
    this.setLongPress();
    // this.longPress = setTimeout(() => {
    //   console.log('long pressed');
    //   this.props.onLongPress();
    // }, LONG_PRESS_DELAY);
    const {lastOffset, pan} = this.state;
    pan.setOffset(lastOffset);
    // handle swipe start
  };

  handlePanResponderStart = (e, g) => {
    // console.log('start');
  };

  handlePanResponderMove = (e, g) => {
    // console.log('move');
    this.setLongPress();
    // clearTimeout(this.longPress);
    // this.longPress = setTimeout(() => {
    //   console.log('long press');
    //   this.props.onLongPress();
    // }, LONG_PRESS_DELAY);
    const {lastOffset, leftActive, rightActive, hasMoved} = this.state;
    const {dx, vx} = g;
    const x = dx + lastOffset.x;
    const canSwipeLeft = this.canLeft();
    const canSwipeRight = this.canRight();
    const isSwippingLeft = vx < 0;
    const isSwipingRight = vx > 0;
    let nextLeft = leftActive;
    let nextRight = rightActive;

    this.handlePan(e, g);

    if (!leftActive && canSwipeRight && x >= SWIPE_DIST) {
      nextLeft = true;
    }
    if (!rightActive && canSwipeLeft && x <= -SWIPE_DIST) {
      nextRight = true;
    }
    if (leftActive && x < SWIPE_DIST) {
      nextLeft = false;
    }
    if (rightActive && x > -SWIPE_DIST) {
      nextRight = false;
    }
    const needsUpdate = nextLeft !== leftActive || nextRight !== rightActive || !hasMoved;

    this.setState({
      hasMoved: true,
      leftActive: nextLeft,
      rightActive: nextRight
    })
  };

  handlePanResponderRelease = (e, g) => {
    const { rightSwipe, leftSwipe } = this.props;
    const {leftActive, rightActive, pan} = this.state;
    clearTimeout(this.longPress);
    if (leftActive) {
      // left action
      rightSwipe();
    }
    if (rightActive) {
      // right action
      leftSwipe();
    }
    const animationConfig = {
      toValue: { x: 0, y: 0},
      duration: 125,
      easing: Easing.elastic(0.5),
      useNativeDriver: false
    };

    this.setState({
      lastOffset: {x: 0, y: 0},
      leftActive: false,
      rightActive: false,
      hasMoved: false
    });
    pan.flattenOffset();
    Animated.timing(pan, animationConfig).start(() => {
      // Callback for when animation has finished
      // runs after release
      if (this.unmounted) {
        return;
      }
      // run
    });
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
    onStartShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onPanResponderGrant: this.handlePanResponderGrant,
    onPanResponderStart: this.handlePanResponderStart,
    onPanResponderRelease: this.handlePanResponderRelease,
    onPanResponderEnd: this.handlePanResponderRelease,
    onPanResponderMove: this.handlePanResponderMove,
    onPanResponderTerminationRequest: (e, g) => {
      console.log('term reque');
      return true;
    }
  });

  longPressMechanic = () => {
    if (!this.longPress) {
      this.props.onLongPress();
    }
  };

  render() {
    const {
      children,
      style,
      left,
      right,
      onPress,
      ...props
    } = this.props;
    const {pan, width} = this.state;
    const swipeLeft = this.canLeft();
    const swipeRight = this.canRight();
    const transform = [{
      translateX: pan.x.interpolate({
        inputRange: [
          swipeLeft ? -width : 0,
          swipeRight ? width : 0
        ],
        outputRange: [
          swipeLeft ? -width + StyleSheet.hairlineWidth : 0,
          swipeRight ? width - StyleSheet.hairlineWidth : 0
        ],
        extrapolate: 'clamp'
      })
    }];
    return(
      <View onLayout={this.handleLayout} style={[styles.container, style.container || {}]} {...this.panResponder.panHandlers}>
        
        { swipeRight && (
          <Animated.View style={[{transform, marginLeft: -width, width}, styles.sides, style.side || {}, style.sideLeft || {}]}>
            { left }
          </Animated.View>
        )}
        <Animated.View style={[{ transform }, styles.content, style.content || {}]}>
          <TouchableOpacity onPress={() => onPress()} onLongPress={this.longPressMechanic}>
            { children }
          </TouchableOpacity>
        </Animated.View>
        { swipeLeft && (
          <Animated.View style={[{transform, marginRight: -width, width}, styles.sides, style.side || {}, style.sideRight || {}]}>
            { right }
          </Animated.View>
        )}
      </View>
        
    );
  }
}