import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StatusBar, TouchableOpacity, Text, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useRoute } from '@react-navigation/native';

// tailwind
import "../../css/global.css";
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

export default function NutritionScreen({ navigation }) {
    const route = useRoute();

    const [graphData, setGraphData] = useState([0, 0, 0, 0])

    const noData = [0, 0, 0, 0]

    const { id } = route.params;

    const [nutritionData, setNutritionData] = useState([]);
    const [currentNutritionData, setCurrentNutritionData] = useState([]);
    const [emptyError, setEmptyError] = useState('');

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const screenWidth = Dimensions.get('window').width;

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(BASE_URL_EMULATOR + `/user/pets/${id}/nutrition`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setEmptyError('');
                const allData = response.data.pet_nutrition;
                setNutritionData(allData);

                return allData;
            }

        } catch (error) {
            if (error.response?.data?.error_msg === "No data.") {
                setNutritionData([]);
                setEmptyError(error.response.data.error_msg);
                return [];
            }
        }
        return [];
    };

    useFocusEffect(
        useCallback(() => {
            const initialize = async () => {
                const fetchedData = await fetchData();
                const initialGraphData = await fetchNutritionDataForMonth(currentDate, fetchedData);
                setGraphData(initialGraphData || noData);
                setCurrentNutritionData(filterNutritionByMonth(fetchedData, currentDate.getMonth() + 1, currentDate.getFullYear()));
            };

            initialize();
        }, [currentDate])
    );

    const fetchNutritionDataForMonth = async (date, data) => {
        const getWeekTotal = (startDay, endDay) => {
            const weekData = data.filter(item => {
                const itemDate = new Date(item.nutrition_date);
                const isSameMonth = itemDate.getMonth() === date.getMonth();
                const isSameYear = itemDate.getFullYear() === date.getFullYear();
                const isInWeekRange = itemDate.getDate() >= startDay && itemDate.getDate() <= endDay;
                return isSameMonth && isSameYear && isInWeekRange;
            });
            return weekData.reduce((sum, item) => sum + item.nutrition_value, 0) / 1000;
        };

        const first = getWeekTotal(1, 7);
        const second = getWeekTotal(8, 14);
        const third = getWeekTotal(15, 21);
        const fourth = getWeekTotal(22, 31);

        return [first, second, third, fourth];
    };

    const filterNutritionByMonth = (nutritionData, selectedMonth, selectedYear) => {
        const filteredNutrition = nutritionData.filter(item => {
            const itemDate = new Date(item.nutrition_date);
            return (
                itemDate.getMonth() + 1 === selectedMonth &&
                itemDate.getFullYear() === selectedYear
            );
        });

        return filteredNutrition;
    };

    const addOrSubMonth = async ({ isAdd }) => {
        const newDate = new Date(currentDate);
        isAdd ? newDate.setMonth(newDate.getMonth() + 1) : newDate.setMonth(newDate.getMonth() - 1);

        const newMonth = newDate.getMonth() + 1;
        const newYear = newDate.getFullYear();

        setCurrentDate(newDate);
        setSelectedMonth(newMonth);
        setSelectedYear(newYear);

        const newGData = await fetchNutritionDataForMonth(newDate, nutritionData);
        setGraphData(newGData || noData);

        setCurrentNutritionData(filterNutritionByMonth(nutritionData, newMonth, newYear));
    };

    return (
        <View className='flex-1 bg-secondary'>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {/* Back Button */}
            <TouchableOpacity
                className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                onPress={() => navigation.navigate("Pet", { id: id })}
            >
                <FontAwesomeIcon icon={faChevronLeft} size={18} color="#007AFF" />
            </TouchableOpacity>

            <View className='flex my-4 items-center'>
                {/* Screen title */}
                <Text className='font-sfpro_regular text-2xl text-text'>
                    Nutrition
                </Text>

                {/* Graph */}
                <LineChart
                    data={{
                        labels: ["1. week", "2. week", "3. week", "4. week"],
                        datasets: [
                            {
                                data: graphData,
                            },
                        ],
                    }}
                    width={screenWidth - 48}
                    height={220}
                    yAxisSuffix=" kg"
                    chartConfig={{
                        backgroundColor: "#003366",
                        backgroundGradientFrom: "#003366",
                        backgroundGradientTo: "#000",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: () => "#fff",
                        propsForDots: {
                            r: "4",
                            strokeWidth: "2",
                            stroke: "#fff",
                        },
                        propsForBackgroundLines: {
                            stroke: "#ecf0f1",
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 16,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 4,
                    }}
                />

                <View className="flex-row w-[50%] justify-between">
                    <TouchableOpacity
                        className="rounded-full items-center justify-center"
                        onPress={() => addOrSubMonth({ isAdd: false })}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size={18} color="#808080" />
                    </TouchableOpacity>
                    <Text className="font-sfpro_medium text-base">{selectedMonth}. {selectedYear}.</Text>
                    <TouchableOpacity
                        className="rounded-full items-center justify-center"
                        onPress={() => addOrSubMonth({ isAdd: true })}
                    >
                        <FontAwesomeIcon icon={faChevronRight} size={18} color="#808080" />
                    </TouchableOpacity>
                </View>
            </View>


            {emptyError || currentNutritionData.length === 0 ? (
                <View className="flex-1 justify-center items-center mt-4">
                    <Text className="text-base font-sfpro_regular text-text">{emptyError || "No nutrition data available"}</Text>
                </View>
            ) : (
                <FlatList
                    data={currentNutritionData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Data name={item.nutrition_name} value={item.nutrition_value} date={item.nutrition_date} />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <TouchableOpacity
                className='absolute right-4 bottom-4 bg-midnightblue rounded-full w-16 h-16 justify-center items-center'
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    elevation: 5,
                }}
                onPress={() => navigation.navigate('NewPet')}
            >
                <FontAwesomeIcon icon={faPlus} size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const Data = ({ name, date, value }) => {
    return (
        <View className="flex-row items-center justify-between bg-white p-4 my-2 rounded-xl shadow-sm">
            <View>
                <Text className="text-base text-jetblack font-sfpro_semibold">{name}</Text>
                <Text className="text-sm text-darkgrey font-sfpro_regular">
                    {new Date(date).toLocaleDateString('hr-HR')}
                </Text>

            </View>
            <Text className="text-lg text-midnightblue font-sfpro_bold">{value} g</Text>
        </View>
    );
};