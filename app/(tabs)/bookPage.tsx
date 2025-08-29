import { apiFetch } from '@/api/apiClient';
import { ViewBox } from '@/components/View';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import BorderIcon from '../../assets/images/flower-border.svg';

LocaleConfig.locales.ko = {
monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
dayNamesShort: ['일','월','화','수','목','금','토'],
};
LocaleConfig.defaultLocale = 'ko';

const photoCounts: Record<string, number> = {
  '2025-08-29': 3,
  '2025-08-30': 6,
  '2025-08-31': 11,
};

const missionStatus: Record<string, number> = {
  '2025-08-30': 200,
};

const photosByDate: Record<string, { title: string, count: number }[]> = {
  '2025-08-29': [
    { title: '목련', count: 3 }
  ],
  '2025-08-30': [
    { title: '목련', count: 2 },
    { title: '능소화', count: 1 }
  ],
  '2025-08-31': [
    { title: '목련', count: 5 },
    { title: '능소화', count: 3 },
    { title: '장미', count: 3 }
  ],
};

// const getColor = (dateString: string): [string, string] => {
//   let bgColor = '#F1F1F1';
//   let textColor = '#338D29'
//   const count = photoCounts[dateString] ?? 0;

//   if (count === 0) bgColor = '#F1F1F1';
//   else if (count < 6) bgColor = '#EAFFC0';
//   else if (count < 11) bgColor = '#77BC6F';
//   else bgColor = '#338D29';

//   if (count > 5) textColor = '#ffffff'

//   return [bgColor, textColor];
// }

type ChatRecord = {
  chatRecordId: number;
  photo: string;
  title: string;
  missionId: number | null;
};
type CalendarDay = {
  day: number;
  recordSum: number;
  chatRecords: ChatRecord[];
};
type CalendarResponse = {
  status: number;
  message: string;
  data: CalendarDay[];
};

const makePhotoCounts = (data: CalendarDay[], year: number, month: number) => {
  const counts: Record<string, number> = {};
  data.forEach(d => {
    const date = `${year}-${String(month).padStart(2,"0")}-${String(d.day).padStart(2,"0")}`;
    counts[date] = d.recordSum;
  });
  return counts;
};

const makeMissionStatus = (data: CalendarDay[], year: number, month: number) => {
  const status: Record<string, number> = {};
  data.forEach(d => {
    const date = `${year}-${String(month).padStart(2,"0")}-${String(d.day).padStart(2,"0")}`;
    if (d.chatRecords.some(c => c.missionId !== null)) {
      status[date] = 200;
    }
  });
  return status;
};

const makePhotosByDate = (data: CalendarDay[], year: number, month: number) => {
  const photos: Record<string, {title: string; count: number}[]> = {};
  data.forEach(d => {
    const date = `${year}-${String(month).padStart(2,"0")}-${String(d.day).padStart(2,"0")}`;
    const grouped: Record<string, number> = {};
    d.chatRecords.forEach(c => {
      grouped[c.title] = (grouped[c.title] ?? 0) + 1;
    });
    photos[date] = Object.entries(grouped).map(([title, count]) => ({title, count}));
  });
  return photos;
};

type DayProps = {
  date?: DateData; 
  state?: 'disabled' | 'inactive' | 'today' | 'selected' | '';
  onPress?: (date: DateData) => void;
  marking?: { 
    selected?: boolean; 
    selectedColor?: string; 
    dotColor?: string; 
    marked?: boolean;
    disabled?: boolean;
  };
};

const DotDay = (({ date, state, onPress, marking, selected }: DayProps & {selected?: string}) => {
  if (!date) {
    return <ViewBox style={{ width: 32, height: 32 }} />;
  }

  const isSelected = selected === date.dateString;
  const isInactive = state === "disabled" || state === "inactive"; // 이전/다음 달 날짜

  // const [bgColor, countTextColor] = date.dateString ? getColor(date.dateString): ['#F1F1F1', '#338D29'];
  // const textColor = isInactive ? '#9FA59A' : countTextColor;

    const count = photoCounts[date.dateString] ?? 0;
    let bgColor = '#F1F1F1';
    let countTextColor = '#338D29';
    if (count === 0) bgColor = '#F1F1F1';
    else if (count < 6) bgColor = '#EAFFC0';
    else if (count < 11) bgColor = '#77BC6F';
    else bgColor = '#338D29';
    if (count > 5) countTextColor = '#ffffff';

    const textColor = isInactive ? '#9FA59A' : countTextColor;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(date)}
      activeOpacity={0.8}
      style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 2}}
    >
      {missionStatus[date.dateString] === 200 &&
        <BorderIcon 
          width = {isSelected ? 35 : 30}
          height = {isSelected ? 35 : 30}
          style={styles.missionBorder}
        />
      }
      <ViewBox
        style={{
          width: isSelected ? 25 : 22,
          height: isSelected ? 25 : 22,
          borderRadius: 13,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: isSelected ? 13 : 10,  
            fontWeight: isSelected ? '700' : '400', 
            fontFamily: 'BMJUA',
            color: textColor,
          }}
        >
          {date.day}
        </Text>
      </ViewBox>

    </TouchableOpacity>
  );
});

export default function Encyclopedia() {
  const [ snapPoints ] = useState(['40%', '80%']);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [expandedFlower, setExpandedFlower] = useState<string | null>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const [selected, setSelected] = useState<string | undefined>(formattedToday);

   const [photoCounts, setPhotoCounts] = useState<Record<string, number>>({});
  const [missionStatus, setMissionStatus] = useState<Record<string, number>>({});
  const [photosByDate, setPhotosByDate] = useState<Record<string, {title: string; count: number}[]>>({});

  const fetchCalendar = async (year: number, month: number) => {
    try {
      const res = await apiFetch(`/api/calendar?year=${year}&month=${month}`, { method: 'GET' });
      console.log('fetching URL:', `${process.env.API_BASE_URL}/api/calendar?year=${year}&month=${month}`);
      if (!res.ok) {
        console.error("캘린더 조회 실패", await res.text());
        return;
      }
      const json: CalendarResponse = await res.json();
      json.data.forEach((day) => {
    console.log(day.day, day.recordSum, day.chatRecords);
  });
      setPhotoCounts(makePhotoCounts(json.data, year, month));
      setMissionStatus(makeMissionStatus(json.data, year, month));
      setPhotosByDate(makePhotosByDate(json.data, year, month));
    } catch (err) {
      console.error("캘린더 불러오기 오류", err);
    }
  };

  useEffect(() => {
    fetchCalendar(today.getFullYear(), today.getMonth() + 1);
  }, []);


  const selectedDate = (dateString?: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  const handleCardPress = (title: string) => {
    setExpandedFlower(title);
  }
  
  const Card = ({ title, count }: {title: string, count: number }) => {
    return (
      <ViewBox style={styles.cardWrapper}>
        {count>1 &&<ViewBox style={styles.behindBox}/> }

        <ViewBox style={styles.card}>
          <ViewBox style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', margin:10, gap: 10}}>
            <Image source={require('../../assets/images/magnolia.png')} style={styles.image} resizeMode='contain'/>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>{title}</Text>
              <View style={{height: 0.5, backgroundColor: '#fff', width: '100%'}}/>
            </View>
          </ViewBox>

          <ViewBox style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10}}>
            <Image source={require('../../assets/images/share.png')} style={styles.share} resizeMode='contain'/>
          </ViewBox>

          <ViewBox style={styles.positionContiner}>
            <Text style={{color: '#ffffff', fontSize: 12}}>발견된 위치 보기</Text>
            <Image source={require('../../assets/images/position.png')} style={styles.position} resizeMode='contain'/>
          </ViewBox>
        </ViewBox>
      </ViewBox>
    
    )
    
  }
 
  return (
    <ViewBox style={styles.container}>
      <ViewBox style={styles.colorGuide}>
        <ViewBox style={styles.count15}>
          <Text style={{ fontSize: 10}}>1~5</Text>
        </ViewBox><ViewBox style={styles.count610}>
          <Text style={{ fontSize: 10}}>6~10</Text>
        </ViewBox><ViewBox style={styles.count11up}>
          <Text style={{ fontSize: 10}}>11~</Text>
        </ViewBox>
      </ViewBox>

      <Calendar
        current={formattedToday}
        firstDay={0}
        onDayPress={day => {
          console.log('selected day: ', day);
          setSelected(day.dateString);
          setExpandedFlower(null);
        }}
        enableSwipeMonths={true}
         onMonthChange={(month) => {
            // month: { year: number, month: number, timestamp: number, dateString: string }
            fetchCalendar(month.year, month.month);
          }}

        
        renderHeader={(date) => (
          <Text style={styles.monthText}>
            {date.getFullYear()}년 {date.getMonth()+1}월
          </Text>
        )}
        style={styles.calendar}


        theme={{
          calendarBackground: '#F7FFE8', 
          textSectionTitleColor: '#338D29', 
          textDisabledColor: '#9FA59A', 
          arrowColor: '#475C3B', 
          monthTextColor: '#338D29', 
          textMonthFontWeight: 'bold', 
          dayTextColor: '#338D29',
          textDayFontSize: 10,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 13,
          textDayFontFamily: 'BMJUA',
          textMonthFontFamily: 'BMJUA',
          textDayHeaderFontFamily: 'BMJUA',
        }}

        dayComponent={(props) => (<DotDay {...props} selected={selected} onPress={props.onPress}/>)}
      />



      <BottomSheet 
        ref={bottomSheetRef} 
        index={0} 
        snapPoints={snapPoints} 
        onChange={handleSheetChanges}
        enableContentPanningGesture={true}
        enableDynamicSizing={false}
        backgroundStyle={styles.BSContainer}
      >
        <ViewBox style={styles.dateBox}>
          <Text style={styles.date}>
            {selectedDate(selected)}
          </Text>
        </ViewBox>

        <BottomSheetScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
          {selected && !expandedFlower &&
            photosByDate[selected]?.map((photo, index) => (
              <TouchableOpacity key={index} onPress={() => handleCardPress(photo.title)}>
                <Card title={photo.title} count={photo.count} />
              </TouchableOpacity>
            ))
          }

          {selected && expandedFlower &&
          (photosByDate[selected] ?? [])
            .filter(photo => photo.title === expandedFlower)
            .map((photo, index) => (
              <Card key={index} title={photo.title} count={1} />
            ))
          }
        </BottomSheetScrollView>
      </BottomSheet>
    </ViewBox>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FFE8'
    },
    colorGuide: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      margin: 10,
      gap: 8,
      backgroundColor: 'transparent'
    },
    count15: {
      width: 30,
      height: 30,
      borderRadius: 30,
      borderColor: '#000000',
      borderWidth: 1,
      backgroundColor: '#EAFFC0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    count610: {
      width: 30,
      height: 30,
      borderRadius: 30,
      borderColor: '#000000',
      borderWidth: 1,
      backgroundColor: '#77BC6F',
      alignItems: 'center',
      justifyContent: 'center',
    },
    count11up: {
      width: 30,
      height: 30,
      borderRadius: 30,
      borderColor: '#000000',
      borderWidth: 1,
      backgroundColor: '#338D29',
      alignItems: 'center',
      justifyContent: 'center',
    },

    monthText: { fontSize: 20, fontWeight: '700', color: '#2E7D32' },

    calendar: {
      marginLeft: 30,
      marginRight: 30,
    },

    missionBorder: {
      position: 'absolute',
      top: -5
    },

  
    BSContainer: {
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      elevation: 10,
      // ios용이라 확인 불가능
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    dateBox:{
      alignItems: 'flex-start',
      marginBottom: 20,
      left: 20,
    },
    date: {
      fontSize: 15,
      color: '#338D29',

    },
    scrollContainer: {
      paddingBottom: 20,
      alignItems: 'center',
      gap: 15,
    },


    cardWrapper: {
      width: 300,
      height: 100,
      marginTop: 10,
    },
    behindBox: {
      position: 'absolute',
      top: -7,
      left: -7,
      width: '100%',
      height: '100%',
      borderRadius: 20,
      backgroundColor: '#338D29'
    },
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
        width: 30,
        height: 30,
    },
    positionContiner: {
        backgroundColor: 'transparent', 
        position: 'absolute', 
        bottom: 10, 
        right: 10, 
        flexDirection: 'row',
        alignItems:'center',
        gap: 3,
    },
    position: {
        width: 30,
        height: 30,
    },
    

});
