
import { ViewBox } from "@/components/View";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text } from "react-native";
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
            // router.replace('/login');
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
        <ViewBox style={styles.root}>

            {/* 배경 */}
            <Image source={require('../assets/images/gradation_1.png')} style={styles.grad1}/>
            <Image source={require('../assets/images/gradation_2.png')} style={styles.grad2}/>
            <Image source={require('../assets/images/gradation_3.png')} style={styles.grad3}/>
            <Text style={styles.title_en1}>Walking</Text>
            <Text style={styles.title_en2}>Rabbit</Text>
            <Image source={require('../assets/images/foot_right.png')} style={styles.foot_right} resizeMode="contain"/>
            <Image source={require('../assets/images/foot_left.png')} style={styles.foot_left} resizeMode="contain"/>
            <Image source={require('../assets/images/rabbit_shadow.png')} style={styles.rabbit_shadow} resizeMode="contain"/>

            <ViewBox style={styles.container}>
                <ViewBox>
                    <Text style={styles.title}>워킹토끼</Text>
                    <Text style={styles.subTitle}>꽃의 도시 동대문구를 걷다</Text>
                </ViewBox>
                {/* <Rabbit_admin/> */}
                <Animatable.Image 
                    animation={{
                        0:   { translateY: 0 },
                        0.5: { translateY: 8 },
                        1:   { translateY: 0 },
                    }}
                    iterationCount={"infinite"}
                    duration={1200}
                    easing={"ease-in-out"}
                    source={require('../assets/images/rabbit-admin1.png')} 
                    style={styles.rabbit}
                    resizeMode="contain"
                />
                <ViewBox style={styles.loadingBar}>
                    <Animated.View style={[styles.progress, {width: barWidth}]}>
                        {/* <Magnolia/> */}
                        <Animated.Image source={require('../assets/images/magnolia.png')} style={[styles.magnolia, {transform: [{translateX: flowerX}]}]}/>
                    </Animated.View>
                </ViewBox>
            </ViewBox>
        </ViewBox>


        
    )

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'relative',
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
        zIndex: 2,
        lineHeight: 60,
    },
    subTitle: {
        color: '#808080',
        fontSize: 18,
        fontFamily: 'BMJUA',
        textAlign: 'center',
        zIndex: 2,
    },
    rabbit: {
        width: 180,
        height: 250,
        top: -15,
        left: 10,
        zIndex: 2,
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
        zIndex: 2,
    },
    progress: {
        height: '100%',
        backgroundColor: '#338D29',
        borderRadius: 20,
        justifyContent: 'center',
        zIndex: 2,
    },
    magnolia: {
        width: 68,
        height: 65,
        left: -12,
        zIndex: 2,
    },




    grad1: {
        position: 'absolute',
        top: 100,
        zIndex: 1,
    },
    grad2: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },
    grad3: {
        position: 'absolute',
        width: '100%',
        top: 220,
        zIndex: 1,
    },
    title_en1: {
        color: '#ffffff',
        fontSize: 40,
        fontFamily: 'Mynerve',
        position: 'absolute',
        top: 390,
        left: 15,
        zIndex: 1,
        lineHeight: 60,
    },
    title_en2: {
        color: '#ffffff',
        fontSize: 40,
        fontFamily: 'Mynerve',
        position: 'absolute',
        top: 470,
        right: 20,
        zIndex: 1,
        lineHeight: 44,
    },
    foot_right: {
        position: 'absolute',
        top: 530,
        left: 65,
        width: 46,
        zIndex: 1,
    },
    foot_left: {
        position: 'absolute',
        top: 510,
        left: 20,
        width: 46,
        zIndex: 1,
    },
    rabbit_shadow: {
        position: 'absolute',
        top: 520,
        left: 115,
        width: 120,
        zIndex: 1,
    },

})