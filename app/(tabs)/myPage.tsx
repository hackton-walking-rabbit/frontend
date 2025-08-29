import { ViewBox } from '@/components/View';
import { Image, StyleSheet, Text } from 'react-native';
import Carrot from '../../assets/images/carrot.svg';
import FlowerPink1 from '../../assets/images/flower-pink.svg';
import PenIcon from '../../assets/images/pen.svg';

export default function MyPage() {
    return (
        <ViewBox style={styles.container}>
            <ViewBox style={styles.profileContainer}>
                <ViewBox style={[styles.podiumImage, { overflow: 'hidden' }]}>
                    <Image 
                        source={require('../../assets/images/rabbit-user-profile.png')} 
                        style={{ width: 230, height: 230, marginTop: 50, marginLeft: 10 }}
                        resizeMode="contain" 
                    />
                </ViewBox>
                <ViewBox style={styles.nameBox}>
                    <ViewBox style={{backgroundColor: 'transparent',}}>
                        <Text style={styles.name}>흰둥이</Text>
                        <ViewBox style={styles.dashed}/>
                    </ViewBox>
                    <PenIcon style={{marginTop: 5}}/>
                </ViewBox>
            </ViewBox>

            <ViewBox style={styles.infoBox}>
                <ViewBox style={styles.box}>
                    <FlowerPink1 width={25} height={25} style={{marginLeft: 30,}}/>
                    <Text style={{fontSize: 16, color: '#fff'}}>꽃 수집한 날짜 수: </Text>
                </ViewBox>
                <ViewBox style={styles.box}>
                    <FlowerPink1 width={25} height={25} style={{marginLeft: 30,}}/>
                    <Text style={{fontSize: 16, color: '#fff'}}>수집한 꽃 종류: </Text>
                </ViewBox>
                <ViewBox style={styles.box}>
                    <FlowerPink1 width={25} height={25} style={{marginLeft: 30,}}/>
                    <Text style={{fontSize: 16, color: '#fff'}}>도감 목록 수: </Text>
                </ViewBox>
                <ViewBox style={styles.box}>
                    <Carrot width={25} height={25} style={{marginLeft: 30,}}/>
                    <Text style={{fontSize: 16, color: '#fff'}}>성공한 미션 수: </Text>
                </ViewBox>
            </ViewBox>

            <ViewBox style={styles.saparator} />

            <ViewBox style={styles.accountAction}>
                <ViewBox style={styles.withdrawal}>
                    <Text style={{fontSize: 15}}>회원탈퇴</Text>
                </ViewBox>
                <ViewBox style={styles.logOut}>
                    <Text style={{fontSize: 15, color: '#fff'}}>로그아웃</Text>
                </ViewBox>
            </ViewBox>
            
        </ViewBox>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#F7FFE8'
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'transparent',
        marginBottom: 30,
    },

    podiumImage: {
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,        
        borderColor: '#338D29',  
    },
    nameBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        left: 9,
        backgroundColor: 'transparent',
    },
    name: {
        fontSize: 24,
        opacity: 0.7,
    },
    dashed: {
        borderWidth: 0.5,
        borderColor: '#000',
        borderStyle: 'dashed',
        width: '100%',
        marginVertical: 2,
    },

    infoBox: {
        width: '100%',
        alignItems:'center',
        gap: 10,
        backgroundColor: 'transparent',
    },
    box: {
        backgroundColor: '#338D29',
        borderRadius: 10,
        width: '80%',
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    saparator: {
        borderWidth: 0.5,
        borderColor: '#000',
        opacity: 0.3,
        marginVertical: 15,
        width: '80%',
    },

    accountAction: {
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
    withdrawal: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 10,
        width: '80%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logOut: {
        backgroundColor: '#f04f40ff',
        borderRadius: 10,
        width: '80%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
