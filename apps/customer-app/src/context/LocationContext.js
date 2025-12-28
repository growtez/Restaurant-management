import React, { createContext, useContext, useState } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([
        { id: 1, label: 'Home', address: '123 Main Street, Mumbai 400001', isDefault: true, coords: null },
        { id: 2, label: 'Work', address: '456 Office Park, Mumbai 400002', isDefault: false, coords: null },
    ]);
    const [selectedAddress, setSelectedAddress] = useState({
        id: 1,
        label: 'Home',
        address: '123 Main Street, Mumbai 400001',
        isDefault: true,
        coords: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'We need your location to deliver food to you',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const getCurrentLocation = async () => {
        setIsLoading(true);
        const hasPermission = await requestLocationPermission();

        if (!hasPermission) {
            setIsLoading(false);
            Alert.alert('Permission Denied', 'Location permission is required for delivery');
            return null;
        }

        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setCurrentLocation(location);
                    setIsLoading(false);
                    Alert.alert('Location Found', `Lat: ${location.latitude.toFixed(6)}\nLng: ${location.longitude.toFixed(6)}`);
                    resolve(location);
                },
                (error) => {
                    setIsLoading(false);
                    Alert.alert('Location Error', error.message);
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        });
    };

    const addAddress = (newAddress) => {
        const address = {
            id: Date.now(),
            ...newAddress,
            isDefault: savedAddresses.length === 0,
        };
        setSavedAddresses(prev => [...prev, address]);
        return address;
    };

    const setDefaultAddress = (id) => {
        setSavedAddresses(prev =>
            prev.map(addr => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
        const selected = savedAddresses.find(a => a.id === id);
        if (selected) {
            setSelectedAddress(selected);
        }
    };

    const value = {
        currentLocation,
        savedAddresses,
        selectedAddress,
        isLoading,
        getCurrentLocation,
        addAddress,
        setDefaultAddress,
        setSelectedAddress,
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (!context) {
        // Return default values if context is not available
        return {
            currentLocation: null,
            savedAddresses: [],
            selectedAddress: { label: 'Select Address', address: 'Tap to choose' },
            isLoading: false,
            getCurrentLocation: async () => { },
            addAddress: () => { },
            setDefaultAddress: () => { },
            setSelectedAddress: () => { },
        };
    }
    return context;
}
