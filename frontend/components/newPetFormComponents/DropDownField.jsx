import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export const DropDownField = ({ label, placeholder, selectedValue, setSelectedValue, helper, error, items = [] }) => {
    const [open, setOpen] = useState(false);
    const [internalItems, setInternalItems] = useState(items);

    useEffect(() => {
        setInternalItems(items);
    }, [items]);

    return (
        <View className="w-full px-6 mb-4" style={{ zIndex: open ? 999 : 1 }}>
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${open ? 'text-primary' : 'text-jetblack'}`}>
                {label}
            </Text>

            {/* DropDownPicker */}
            <DropDownPicker
                className={`w-full bg-white rounded-xl px-4 py-2 text-base text-gray-900 shadow-sm border 
                ${error ? 'border-error' : open ? 'border-primary' : 'border-lightgrey'}`}
                open={open}
                setOpen={setOpen}
                value={selectedValue}
                setValue={setSelectedValue}
                items={internalItems}
                placeholder={placeholder}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                style={{
                    borderColor: open ? '#4A90E2' : '#d1d1d1',
                    borderWidth: 1,
                    zIndex: 999,
                }}
                dropDownContainerStyle={{
                    backgroundColor: '#fafafa',
                    borderColor: '#d1d1d1',
                    borderWidth: 1,
                    borderRadius: 10,
                    zIndex: 999,
                    elevation: 5,
                }}
            />

            {/* Helper or Error */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? (
                    <Text className="text-xs text-darkgrey">{helper}</Text>
                ) : (
                    <Text className="text-xs text-error">{error}</Text>
                )}
            </View>
        </View>
    );
};

