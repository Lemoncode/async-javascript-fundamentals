export class Drawer {
    constructor(container) {
        this.container = container;
    }

    drawWeather(weatherSummaryEntities) {
        if (weatherSummaryEntities.length > 0) {
            weatherSummaryEntities.forEach((element) => {
                let node = document.createElement("p");
                const textNode = document.createTextNode(`Expected: ${element.main}, Description: ${element.description}`);
                let nodeImage = document.createElement("img");
                nodeImage.src = `http://openweathermap.org/img/w/${element.icon}.png`;
                node.appendChild(textNode);
                node.appendChild(nodeImage);
                document.getElementById(this.container).appendChild(node);
            });
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

                element.weather.forEach((element) => {
                    let detailP = document.createElement("p");
                    const detailPText = document.createTextNode(`Expected: ${element.main}, ${element.description}`);
                    let nodeImage = document.createElement("img");
                    nodeImage.src = `http://openweathermap.org/img/w/${element.icon}.png`;
                    detailP.appendChild(detailPText);
                    detailP.appendChild(nodeImage);
                    liNode.appendChild(detailP);
                });

                node.appendChild(liNode);
            });
            document.getElementById(this.container).appendChild(node);
        }
    }
}
