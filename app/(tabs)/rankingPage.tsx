import { ViewBox } from '@/components/View';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as Font from 'expo-font';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Podium from '../../assets/images/podium.svg';

export default function Ranking() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [snapPoints] = useState(['40%', '80%']);
    const handleSheetChanges = useCallback((index: number) => console.log(index), []);

    useEffect(() => {
        Font.loadAsync({
            BMJUA: require('../../assets/fonts/BMJUA.ttf'),
        }).then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) return null;

    const Card = ({ name, rank, count }: {name: string; rank: number; count: number }) => {
        return (
            <ViewBox style={styles.cardWrapper}>
                <ViewBox style={styles.card}>
                    {/* 순위 */}
                    <ViewBox style={styles.rankCircle}>
                        <Text style={styles.rankText}>{rank}</Text>
                    </ViewBox>

                    {/* 프로필 사진 */}
                    <View style={[styles.rankImage, { overflow: 'hidden' }]}>
                        <Image 
                            source={require('../../assets/images/rabbit-user-profile.png')} 
                            style={{ width: 95, height: 95, marginTop: 20 }}
                            resizeMode="contain" 
                        />
                    </View>

                    {/* 이름 및 개수 */}
                    <View style={styles.rankInfoWrapper}>
                        <Text style={styles.cardName}>{name}</Text>
                        <Text style={styles.cardCount}>{count}개</Text>
                    </View>
                </ViewBox>
            </ViewBox>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.podiumWrapper}>
                <Text style={styles.title}>동대문구 꽃 탐험가 랭킹</Text>

                {/* 시상대 */}
                <View style={styles.podiumCirclesRow}>
                    {/* 2등 */}
                    <View style={[styles.rankWrapper, { marginBottom: -60 }]}>
                        <View style={[styles.podiumImage, { overflow: 'hidden' }]}>
                            <Image 
                                source={require('../../assets/images/rabbit-user-profile.png')} 
                                style={{ width: 130, height: 130, marginTop: 30 }}
                                resizeMode="contain" 
                            />
                        </View>
                        <Text style={styles.podiumName}>김철수</Text>
                        <Text style={styles.podiumCount}>14개</Text>
                    </View>

                    {/* 1등 */}
                    <View style={[styles.rankWrapper, { marginBottom: -10 }]}>
                        <View style={[styles.podiumImage, { overflow: 'hidden' }]}>
                                <Image 
                                    source={require('../../assets/images/rabbit-user-profile.png')} 
                                    style={{ width: 130, height: 130, marginTop: 30 }}
                                    resizeMode="contain" 
                                />
                            </View>
                        <Text style={styles.podiumName}>신짱구</Text>
                        <Text style={styles.podiumCount}>15개</Text>
                    </View>

                    {/* 3등 */}
                    <View style={[styles.rankWrapper, { marginBottom: -110 }]}>
                        <View style={[styles.podiumImage, { overflow: 'hidden' }]}>
                                <Image 
                                    source={require('../../assets/images/rabbit-user-profile.png')} 
                                    style={{ width: 130, height: 130, marginTop: 30 }}
                                    resizeMode="contain" 
                                />
                        </View>
                        <Text style={styles.podiumName}>맹구</Text>
                        <Text style={styles.podiumCount}>13개</Text>
                    </View>
                </View>

                <Podium width={350} height={500} />

                <BottomSheet 
                    ref={bottomSheetRef} 
                    index={0} 
                    snapPoints={snapPoints} 
                    onChange={handleSheetChanges}
                    enableContentPanningGesture={true}
                    enableDynamicSizing={false}
                    containerStyle={{ width: '100%' }}
                    backgroundStyle={styles.BSContainer}
                >
                    <BottomSheetScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
                        <Card name="정지윤" rank={4} count={12} />
                        <Card name="김은지" rank={5} count={10} />
                        <Card name="양나슬" rank={6} count={9} />
                        <Card name="이채우" rank={7} count={8} />
                    </BottomSheetScrollView>
                </BottomSheet>

                {/* 내 랭킹 카드 */}
                <View style={styles.myRankingCard}>
                    <View style={styles.myCard}>
                        {/* 순위 */}
                        <View style={styles.rankCircle}>
                            <Text style={[styles.rankText, { color: '#FFC0CB' }]}>{7}</Text>
                        </View>

                        {/* 프로필 사진 */}
                        <View style={{ width: 58, height: 58, borderRadius: 50, marginLeft: 10, overflow: 'hidden' }}>
                            <Image
                                source={require('../../assets/images/rabbit-user-profile.png')}
                                style={{ width: 98, height: 98, position: 'absolute', left: -18, top: -9 }}
                                resizeMode="contain" 
                            />
                        </View>

                        {/* 이름 및 개수 */}
                        <View style={styles.rankInfoWrapper}>
                            <Text style={styles.cardName}>정지윤</Text>
                            <Text style={styles.cardCount}>4개</Text>
                        </View>

                        {/* 공유 아이콘 */}
                        <View style={{ position: 'absolute', top: 20, right: 20 }}>
                            <Image
                                source={require('../../assets/images/share.png')}
                                style={styles.share}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FFE8',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#338D29', 
        marginTop: 20,
        marginBottom: 15, 
        textAlign: 'center',
        fontFamily: 'BMJUA',
    },





    podiumWrapper: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    podiumCirclesRow: {
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
    podiumName : {
        fontSize: 18,
        color: '#338D29',
        fontFamily: 'BMJUA',
        marginTop: 5,
    },  
    podiumCount: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'BMJUA',
        marginTop: 3,
    },  
    podiumImage: {
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





    BSContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    cardWrapper: {
        flex: 0,         
        alignSelf: 'center',
        width: '90%',       
        height: 90,
        marginTop: 0,
    },
    card: {
        backgroundColor: '#77BC6F',
        flex: 1,       
        height: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    cardName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'BMJUA',
    },
    rankCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    rankText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#338D29',
    },
    rankImage: {
        width: 58,
        height: 58,
        borderRadius: 29, 
        backgroundColor: '#ffffff', 
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderWidth: 2,        
        borderColor: '#338D29', 
    },
    rankInfoWrapper: {
        flexDirection: 'column',
        marginLeft: 15,
        justifyContent: 'flex-start',
    },
    cardCount: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'BMJUA',
        marginTop: 5,
    },
    share: {
        width: 30,
        height: 30,
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
    scrollContainer: {
        paddingBottom: 20,
        alignItems: 'center',
        gap: 15,
    },





    myRankingCard: {
        position: 'absolute',
        bottom: 40, 
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10, 
    },
    myCard: {
        backgroundColor: '#FFC0CB',
        width: '90%',
        height: 90,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
});