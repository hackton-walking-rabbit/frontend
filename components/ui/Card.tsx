import { ViewBox } from '@/components/View';
import { Image, StyleSheet, Text } from 'react-native';

interface CardProps {
    title: string,
}

export const Card = ( {title} : CardProps) => {

    return (
        <ViewBox style={styles.card}>
            <ViewBox style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', margin:10, gap: 10}}>
                <Image source={require('../../assets/images/magnolia.png')} style={styles.image} resizeMode='contain'/>
                <Text style={styles.title}>{title}</Text>
            </ViewBox>
            <ViewBox style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10}}>
                <Image source={require('../../assets/images/share.png')} style={styles.share} resizeMode='contain'/>
            </ViewBox>
            <ViewBox style={styles.positionContiner}>
                <Text style={{color: '#ffffff', fontSize: 12}}>발견된 위치 보기</Text>
                <Image source={require('../../assets/images/position.png')} style={styles.position} resizeMode='contain'/>

            </ViewBox>
        </ViewBox>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#77BC6F',
        width: 300,
        height: 100,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },

    image: {
        width: 58,
        height: 76,
    },
    title: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    share: {
        width: 20,
        height: 20,
    },
    positionContiner: {
        backgroundColor: 'transparent', 
        position: 'absolute', 
        bottom: 10, 
        right: 10, 
        flexDirection: 'row',
        alignItems:'center'
    },
    position: {
        width: 20,
        height: 20,
    },
})