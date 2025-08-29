import { ViewBox } from '@/components/View';
import { Image, StyleSheet, Text } from 'react-native';
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
                    <ViewBox>
                        <Text style={styles.name}>흰둥이</Text>
                        <ViewBox style={styles.dashed}/>
                    </ViewBox>
                    <PenIcon style={{marginTop: 5}}/>
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
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
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


});
