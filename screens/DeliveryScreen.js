import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    return (
        <View className="bg-white flex-1">
            <SafeAreaView className="z-50">
                <View className="flex-row justify-between items-center p-5">
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <XMarkIcon color="black" size={30} />
                    </TouchableOpacity>
                    <Text className="font-light text-black text-lg">Order Help</Text>
                </View>

                <View className="bg-black mx-2 my-2 rounded-md p-6 z-50 shadow-md">
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-lg text-white">Estimated Arrival</Text>
                            <Text className="text-4xl font-bold text-white">30-40 Minutes</Text>
                        </View>
                        <Image
                            source={require('../assets/food-delivery.png')}
                            className="h-20 w-20"
                        />
                    </View>

                    <Progress.Bar size={30} color='white' indeterminate={true} />

                    <Text className="mt-3 text-white">
                        Your order at {restaurant.title} is being prepared!
                    </Text>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                className="flex-1 -mt-10 z-0"
                mapType='mutedStandard'
            >
                <Marker
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                    identifier='origin'
                    pinColor='black'
                />
            </MapView>

            <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
                <Image
                    source={require('../assets/wc.png')}
                    className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
                />
                <View className="flex-1">
                    <Text className="text-lg">Gokul Kannan</Text>
                    <Text className="text-gray-400">Your Rider</Text>
                </View>

                <Text className="text-lg mr-5 font-bold">Call</Text>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen