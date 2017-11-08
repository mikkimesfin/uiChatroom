import { LayoutAnimation, Animated, Dimensions, Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';
import { Constants } from 'expo';
import Header from '../Header'
var {height, width} = Dimensions.get('window');

const smallSize = width / 5;
const itemWidth = width * .67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;
const fontSize=  300;

const COLORS = ['coral', 'mediumturquoise', 'palevioletred', 'papayawhip', 'tomato']
// const ITEMS = [
//   'https://s-media-cache-ak0.pinimg.com/564x/1d/00/9d/1d009d53dd993bd0a604397e65bbde6d.jpg',
//   'https://s-media-cache-ak0.pinimg.com/564x/53/9d/bb/539dbb7cc07c677925627c6e91585ef5.jpg',
//   'https://s-media-cache-ak0.pinimg.com/564x/3d/0b/a6/3d0ba6600a33f3e4b3bac737e024d720.jpg',
//   'https://s-media-cache-ak0.pinimg.com/564x/d9/b8/27/d9b8276db7cd24443bc4a937f853914b.jpg',
//   'https://s-media-cache-ak0.pinimg.com/564x/75/eb/53/75eb53941897f231cd0b55f25806d887.jpg',
//   ''
// ]
const ITEMS = [
  'http://www.thedomesticgeekblog.com/wp-content/uploads/marve_key_005_h.jpg',
  'https://vignette.wikia.nocookie.net/house-of-cards/images/a/a8/House_of_Cards_Season_1_Poster.jpg/revision/latest?cb=20140217231358',
  'http://www.gstatic.com/tv/thumb/tvbanners/12738283/p12738283_b_v8_ab.jpg',
  'http://vignette2.wikia.nocookie.net/marvelcinematicuniverse/images/5/54/Jessica_Jones_Final_Poster.png/revision/latest?cb=20151026144655',
  'https://images-na.ssl-images-amazon.com/images/M/MV5BMDRmOTZlOTEtNDdkMS00Yjg4LWJlYjgtZjA2NzkwZjMyNTk2XkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_UY268_CR4,0,182,268_AL_.jpg',
  ''
]
const SMALL_ITEMS = [
  'http://www.gstatic.com/tv/thumb/tvbanners/12738283/p12738283_b_v8_ab.jpg',
  'http://www.gstatic.com/tv/thumb/tvbanners/13812572/p13812572_b_v8_aa.jpg',
  'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg',
  'http://vignette2.wikia.nocookie.net/marvelcinematicuniverse/images/5/54/Jessica_Jones_Final_Poster.png/revision/latest?cb=20151026144655',
  'https://s-media-cache-ak0.pinimg.com/236x/95/bb/e4/95bbe482ca9744ea71f68321ec4260a2.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/54/7d/13/547d1303000793176aca26505312089c.jpg',
  ''
]


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollX: new Animated.Value(0),
      indicator: new Animated.Value(1)
    }
  }

  componentDidMount() {
    LayoutAnimation.spring()
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={{height: 20 + height / 2}}>
          <Text style={[styles.heading, {fontSize: 28}]}>Favorites</Text>
          {this.renderScroll()}
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>Trending</Text>
          <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} style={{paddingHorizontal: 10, flex: 1, width: width}}>
            {SMALL_ITEMS.map((image,i) => {
              return this.renderNormal(image, i)
            })}
          </ScrollView>
          </View>
      </View>
    );
  }

  renderScroll() {
    return <Animated.ScrollView
      horizontal={true}
      style={{flex: 1}}
      contentContainerStyle={{alignItems: 'center', flexGrow: 1}}
      decelerationRate={0}
      snapToInterval={itemWidth}
      scrollEventThrottle={16}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }]
      )}
    >
      {ITEMS.map((image,i) => {
        return this.renderRow(image, i)
      })}
    </Animated.ScrollView>
  }


  renderNormal(image, i) {
    if (image === '' ) {
      return null
    }

    return <View key={i}  style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
        <Image source={{uri: image}} style={[{height: smallSize, width: smallSize, opacity: 1, resizeMode: 'cover'}]} />
        <View style={{marginLeft: 20}}>
          <Text style={{fontWeight: '600', fontSize: 16}}>Watch Trailer </Text>
          <Text style={{fontWeight: '300', fontSize: 12}}>Rating: ✯✯✯✯✯</Text>
        </View>
      </View>
  }

  renderRow(image, i) {
    let inputRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth, (i + 2) * itemWidth];
    let secondRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth]

    // Ensure that we're leaving space for latest item.
    if (image === '') {
      return <View key={i} style={[styles.emptyItem, {width: width * .33}]}></View>
    }

    return (
      <Animated.View key={i} style={[styles.emptyItem, {
        opacity: this.state.scrollX.interpolate({
          inputRange: secondRange,
          outputRange: [.3, 1, 1]
        }),
        height: this.state.scrollX.interpolate({
          inputRange: secondRange,
          outputRange: [itemHeight * .8, itemHeight, itemHeight],
        })
      }]}>
        <Image key={i} source={{uri: image}} style={[StyleSheet.AbsoluteFill, {height: itemHeight, width: itemWidth, opacity: 1, resizeMode: 'cover'}]}>
        <View style={[StyleSheet.AbsoluteFill, {opacity: 0.4, backgroundColor: COLORS[i], width: itemWidth, height: itemHeight}]}></View>
        <Animated.View
            style={[{
              width: itemWidth,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flex: 1,
              position: 'relative',
              height: itemHeight,
              opacity: this.state.scrollX.interpolate({
                inputRange,
                outputRange: [0.4,1, 1, 1]
              }),
              transform: [{
                scale: this.state.scrollX.interpolate({
                  inputRange,
                  outputRange: [.5, 1, 1.4, 1]
                })
              }]
            }]}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: itemWidth, height: itemHeight, position: 'absolute', bottom: -itemHeight / 4, right: -itemWidth / 4}}>
              <Text style={{fontSize: fontSize,color: 'rgba(0,0,0,0.4)'}}>{i + 1}</Text>
            </View>
          </Animated.View>
          </Image>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  emptyItem: {
    overflow: 'hidden',
    height: itemHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 20,
    borderColor: 'white',
    width: itemWidth,
    backgroundColor: 'transparent'
  },
  heading: {
    fontSize: 22,
    fontWeight: '300',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});
