import React from 'react';
import { View } from 'react-native';
import Badge from './Badge';


const withBadge = (WrappedComponent: React.ElementType, value, options = {}) => (props) => {

  const display = value > 0;
  return (
    <View style={props.style}>
      <WrappedComponent {...props } />
      { value > 0 && (<Badge value={value} opts={options} onPress={props.onPress}/>)}
    </View>
  );
};

export default withBadge;