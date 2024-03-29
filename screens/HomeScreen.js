import { View, Text, TextInput, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories.js';
import FeaturedRow from '../components/FeaturedRow.js'
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "featured"] {
          ...,
          restaurant[]->{
            ...,
            dishes[]->
          }
        }`
    )
    .then((data) => {
      setFeaturedCategories(data);
    });
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={require('../assets/wc.png')}
          className="h-10 w-10 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">
            Deliver Now!</Text>
          <Text className="font-bold text-xl">Current Location
            <ChevronDownIcon size={20} color="#000" />
          </Text>
        </View>
        <UserIcon size={30} color="#000" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder='Restaurants and Cuisines'
            keyboardType='default' />
        </View>
        <AdjustmentsVerticalIcon color="#000" />

      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured rows */}

        {featuredCategories?.map((category) => (
          <FeaturedRow 
          key={category._id}
          id={category._id}
          title={category.name}
          description={category.short_description}
        />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;