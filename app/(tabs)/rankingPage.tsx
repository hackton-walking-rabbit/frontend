import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Podium from '../../assets/images/podium.svg';

export default function Ranking() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            BMJUA: require('../../assets/fonts/BMJUA.ttf'),
        }).then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={styles.podiumWrapper}>
                <Text style={styles.title}>동대문구 꽃 탐험가 랭킹</Text>

                {/* 시상대 */}
                <View style={styles.circlesRow}>
                    {/* 2등 */}
                    <View style={[styles.rankWrapper, { marginBottom: -50 }]}>
                        <View style={styles.circle} />
                        <Text style={styles.nameText}>김철수</Text>
                        <Text style={styles.scoreText}>14개</Text>
                    </View>

                    {/* 1등 */}
                    <View style={[styles.rankWrapper, { marginBottom: 0 }]}>
                        <View style={styles.circle} />
                        <Text style={styles.nameText}>신짱구</Text>
                        <Text style={styles.scoreText}>15개</Text>
                    </View>

                    {/* 3등 */}
                    <View style={[styles.rankWrapper, { marginBottom: -110 }]}>
                        <View style={styles.circle} />
                        <Text style={styles.nameText}>맹구</Text>
                        <Text style={styles.scoreText}>13개</Text>
                    </View>
                </View>

                <Podium width={350} height={500} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FFE8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#338D29', 
        marginTop: 40,
        marginBottom: 20, 
        textAlign: 'center',
        fontFamily: 'BMJUA',
    },





    podiumWrapper: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    circlesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '80%',
        paddingHorizontal: 7,
    },
    rankWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    nameText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'BMJUA',
        marginTop: 5,
    },  
    scoreText: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'BMJUA',
    },  
    circle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,        
        borderColor: '#338D29',  
    },

    first: {
        marginBottom: -10,
    },
    second: {
        marginBottom: -60, 
    },
    third: {
        marginBottom: -110, 
    },
});