import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// tailwind
import "../css/global.css";

export default function PetCard({ name, type, breed, imageUrl }) {
    return (
        <TouchableOpacity className='mx-4 my-2 rounded-lg shadow-xl shadow-black'>
            <View className='absolute inset-0 ' />
            <View className='flex-1 rounded-2xl py-2 flex-row items-center bg-background'>
                <View className='rounded-xl'>
                    <Image
                        className='size-36 rounded-2xl mx-4 my-4 shadow-black shadow-md '
                        source={imageUrl || require('../img/default-pet.jpg')}
                    />
                </View>

                <View className='flex-1 ml-2'>
                    <Text className='color-text font-sfpro_bold text-xl'>
                        Name: {name || 'Unknown Pet'}
                    </Text>
                    <View className='flex-row mr-2'>
                        <Text className='color-text font-sfpro_regular text-md'>
                            {breed || 'Unknown Breed'} | {breed || 'Unknown Breed'}
                        </Text>
                    </View>
                </View>
                <View className='absolute top-2 right-2'>
                    <FontAwesomeIcon icon={faCircleInfo} size={24} color="#3F72AF" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

// export default function PetCard({ name, type, breed, imageUrl }) {
//     return (
//         <TouchableOpacity className='mx-4 my-2 rounded-lg p-1 shadow-md shadow-black'>
//             <View className='absolute inset-0 ' />
//             <View className='flex-1 rounded-2xl flex-row items-center bg-background'>
//                 <View className='rounded-xl'>
//                     <Image
//                         className='size-36 rounded-2xl mx-2 my-4 shadow-black shadow-md '
//                         source={imageUrl || require('../img/default-pet.jpg')}
//                     />
//                 </View>

//                 <View className='flex-1 ml-2'>
//                     <Text className='color-text font-poppins_extra_bold text-lg'>
//                         {name || 'Unknown Pet'}
//                     </Text>
//                     <View className='flex-row'>
//                         <Text className='color-text font-poppins_regular text-base'>
//                             {breed || 'Unknown Breed'} | {breed || 'Unknown Breed'}
//                         </Text>
//                     </View>
//                 </View>
//                 <View className='absolute top-2 right-2'>
//                     <FontAwesomeIcon icon={faCircleInfo} size={24} color="#3F72AF" />
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// }
