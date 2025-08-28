import { Card } from '@/components/ui/Card';
import { ViewBox } from '@/components/View';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.ko = {
monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
dayNamesShort: ['일','월','화','수','목','금','토'],
};
LocaleConfig.defaultLocale = 'ko';

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
  const textColor = isSelected ? '#ffffff' : (isInactive ? '#9FA59A' : '#338D29');


  const backgroundColor = isSelected ? '#77BC6F' : marking?.selectedColor ?? '#F1F1F1';

  return (
    <TouchableOpacity
      onPress={() => onPress?.(date)}
      activeOpacity={0.8}
      style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 2}}
    >
      <ViewBox
        style={{
          width: isSelected ? 25 : 22,
          height: isSelected ? 25 : 22,
          borderRadius: 13,
          backgroundColor,
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

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const [selected, setSelected] = useState<string | undefined>(formattedToday);

  const selectedDate = (dateString?: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };
 
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
        }}
        enableSwipeMonths={true}

        
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
        <BottomSheetView>

          <ViewBox style={styles.dateBox}>
            <Text style={styles.date}>
              {selectedDate(selected)}
            </Text>
          </ViewBox>

          <BottomSheetScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
              <Card title="목련"></Card>
              <Card title="능소화"></Card>
              <Card title="능소화"></Card>
              <Card title="능소화"></Card>
              <Card title="능소화"></Card>

          </BottomSheetScrollView>
        </BottomSheetView>
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
});
