const express = require('express'),
    fs = require('fs'),
    path = require('path'),
    dataFile = '/data/cars.json',
    router = express.Router();

const getNextAvailableId = (allCars) => {
    let maxId = allCars.reduce((prev, current) => {
        if (current.car_id > prev.car_id) {
            maxId = current.car_id;
        }
        return maxId;
    }, 0);
    return ++maxId;
}

const getCarData = () => (
    JSON.parse(
        fs.readFileSync(
           path.join(__dirname + dataFile) , 'utf8'
        )
    )
);

const saveCarData = (data) => (
    fs.writeFile(
        path.join(__dirname + dataFile), 
        JSON.stringify(data, null, 4),
        (err) => {
            if (err) {
                console.log(err);
            }
        })
);

router.route('/')
    .get((_, res) => {
        const data = getCarData();
        res.send(data);
    })
    .post((req, res) => {
        const data = getCarData();
        const nextId = getNextAvailableId(data);
        const newCar = {
            car_id: nextId,
            name: req.body.name,
            brand: req.body.brand,
            year_release: req.body.year_release
        };
        data.push(newCar);
        saveCarData(data);

        res.status(201).send(newCar);
    });

/* GET, PUT and DELETE individual cars */
router.route('/:id')
    .get((req, res) => {
        var data = getCarData();
        var matchingCar = data.find(
            (item) => item.car_id === +req.params.id
        );

        if(!matchingCar) {
            res.sendStatus(404);
        } else {
            res.send(matchingCar);
        }
    })
    .delete((req, res) => {
        var data = getCarData();
        var pos = data
            .map((e) => e.car_id)
            .indexOf(parseInt(req.params.id, 10));

        if (pos > -1) {
            data.splice(pos, 1);
        } else {
            res.sendStatus(404);
        }

        saveCarData(data);
        res.sendStatus(204);
    })
    .put((req, res) => {
        var data = getCarData();
        var matchingCar = data.find(
            (item) => item.car_id === req.params.id
        );

        if(!matchingCar) {
            res.sendStatus(404);
        } else {
            matchingCar.name = req.body.name;
            matchingCar.brand = req.body.brand;
            matchingCar.year_release = req.body.year_release;

            saveCarData(data);
            res.sendStatus(204);
            res.send(matchingCar);
        }
    });

module.exports = router;