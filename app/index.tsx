import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function Loading() {
    const router = useRouter();
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
        }).start(() => {
            router.replace('/login');
        });
    },[]);

    const barWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300],
    })

    const flowerX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300 - 43],
    })

    return (
        <View style={styles.root}>
            {/* 배경 */}
            <View>
                <Image source={require('../assets/images/gradation_1.png')} style={styles.grad1}/>
                <Image source={require('../assets/images/gradation_2.png')} style={styles.grad2}/>
                <Image source={require('../assets/images/gradation_3.png')} style={styles.grad3}/>
                <Text style={styles.title_en1}>Walking</Text>
                <Text style={styles.title_en2}>Rabbit</Text>
                <Image source={require('../assets/images/foot_right.png')} style={styles.foot_right} resizeMode="contain"/>
                <Image source={require('../assets/images/foot_left.png')} style={styles.foot_left} resizeMode="contain"/>
                <Image source={require('../assets/images/rabbit_shadow.png')} style={styles.rabbit_shadow} resizeMode="contain"/>
            </View>

            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>워킹토끼</Text>
                    <Text style={styles.subTitle}>꽃의 도시 동대문구를 걷다</Text>
                </View>
                <Animatable.Image 
                    animation={{
                        0:   { translateY: 0 },
                        0.5: { translateY: 8 },
                        1:   { translateY: 0 },
                    }}
                    iterationCount={"infinite"}
                    duration={1200}
                    easing={"ease-in-out"}
                    source={require('../assets/images/운영자토끼-전신-측면.png')} 
                    style={styles.rabbit}
                />
                <View style={styles.loadingBar}>
                    <Animated.View style={[styles.progress, {width: barWidth}]}>
                        <Animated.Image source={require('../assets/images/magnolia.png')} style={[styles.magnolia, {transform: [{translateX: flowerX}]}]}/>
                    </Animated.View>
                </View>
            </View>
        </View>

        
    )

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        color: '#338D29',
        fontSize: 60,
        fontFamily: 'BMJUA',
    },
    subTitle: {
        color: '#808080',
        fontSize: 18,
        fontFamily: 'BMJUA',
        textAlign: 'center',
    },
    rabbit: {
        left: 10,
    },
    loadingBar: {
        backgroundColor: '#ffffff',
        borderColor: '#338D29',
        width: 300,
        height: 33,
        borderWidth: 2,
        borderRadius: 20,
        position: 'relative',
        marginTop: 10,
    },
    progress: {
        height: '100%',
        backgroundColor: '#338D29',
        borderRadius: 20,
        justifyContent: 'center',
    },
    magnolia: {
        width: 68,
        height: 65,
        left: -12,
    },




    grad1: {
        position: 'absolute',
        top: 100,
    },
    grad2: {
        position: 'absolute',
        right: 0,
    },
    grad3: {
        position: 'absolute',
        width: '100%',
        top: 220,
    },
    title_en1: {
        color: '#ffffff',
        fontSize: 40,
        fontFamily: 'Mynerve',
        position: 'absolute',
        top: 400,
        left: 15,
    },
    title_en2: {
        color: '#ffffff',
        fontSize: 40,
        fontFamily: 'Mynerve',
        position: 'absolute',
        top: 460,
        right: 20,
    },
    foot_right: {
        position: 'absolute',
        top: 530,
        left: 65,
        width: 46,
    },
    foot_left: {
        position: 'absolute',
        top: 510,
        left: 20,
        width: 46,
    },
    rabbit_shadow: {
        position: 'absolute',
        top: 520,
        left: 115,
        width: 120,
    },

})