import { httpClient } from './httpClient';
const apiKey = '855fb3867fa7108f3d6a43d7405878e6';

export const getCurrentWeather = (city) => {
    // let promise = new Promise((resolve, reject) => {
    //     const uri = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
    //     const client = new XMLHttpRequest();
    //     client.onload = (event) => resolve(event.target.responseText);;
    //     client.onerror = (event) => reject(event.target.statusText);
    //     client.open('get', uri); // By default async
    //     client.send();
    // });

    // return promise;
    const uri = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
    return httpClient.get(uri);
};

export const getForecastWeather = (city) => {
    // let promise = new Promise((resolve, reject) => {
    //     const uri = `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${apiKey}`;
    //     const client = new XMLHttpRequest();
    //     client.onload = (event) => resolve(event.target.responseText);
    //     client.onerror = (event) => reject(event.target.statusText);
    //     client.open('get', uri); // By default async
    //     client.send();
    // });
    const uri = `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${apiKey}`;
    return httpClient.get(uri);
};