export class Drawer {
    constructor(container) {
        this.container = container;
    }

    createImageNode = (icon) => {
        const el = document.createElement('img');
        el.src = `http://openweathermap.org/img/w/${icon}.png`;
        return el;
    }

    weatherNodeFromWeatherEntity = (htmlTag) => ({ main, description, icon }) => {
        const node = document.createElement(htmlTag);
        const textNode = document.createTextNode(`Expected: ${main}, Description: ${description}`);
        const nodeImage = this.createImageNode(icon);
        node.appendChild(textNode);
        node.appendChild(nodeImage);
        return node;
    };

    drawWeather(weatherSummaryEntities) {
        if (weatherSummaryEntities.length > 0) {
            const weatherNodeParragraph = this.weatherNodeFromWeatherEntity('p');
            const nodes = weatherSummaryEntities.map(weatherNodeParragraph)
            nodes.forEach((n) => {
                document.getElementById(this.container).appendChild(n);
            })
        }
    }

    drawForecastResult(results) {
        if (results.length > 0) {
            let node = document.createElement("ul");
            results.forEach((element) => {
                let liNode = document.createElement("li");
                let mainP = document.createElement("p");
                const mainPText = document.createTextNode(`Date: ${element.date} Time: ${element.time}`);
                mainP.appendChild(mainPText);
                liNode.appendChild(mainP);

                const weatherNodeParragraph = this.weatherNodeFromWeatherEntity('p');
                element.weather.forEach((element) => {
                    liNode.appendChild(
                        weatherNodeParragraph(element)
                    );
                });
                node.appendChild(liNode);
            });
            document.getElementById(this.container).appendChild(node);
        }
    }
}