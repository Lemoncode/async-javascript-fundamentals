export class Mapper {
    currentWeather(data) {
        return data.weather.map((element) => ({
            description: element.description,
            icon: element.icon,
            main: element.main
        }));
    }

    forecastWeather(data) {
        return data.list.map((element) => ({
            date: element.dt_txt.split(' ')[0],
            time: element.dt_txt.split(' ')[1],
            weather: element.weather
        }));
    }
}
