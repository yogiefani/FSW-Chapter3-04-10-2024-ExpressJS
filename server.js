const fs = require("fs");
// const http = require("http")
const express = require("express");

const app = express();

//middleware untuk membaca json dari request body
app.use(express.json());

// default = healt check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Application is running good..",
  });
});
// url /yogi
app.get("/yogi", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Ping Successfully !",
  });
});
///api.v1/(collection nya ) => collection nya ini harus JAMAK (s)
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);

app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Success get cars data",
    isSuccess: true,
    totalData: cars.length,
    data: {
      cars,
    },
  });
});

app.post("/api/v1/cars", (req, res) => {
  //insert into...

  const newCar = req.body;
  cars.push(newCar);

  fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "Success",
      message: "Success add new car data",
      isSuccess: true,
      data: {
        car: newCar,
      },
    });
  });
});

app.get("/api/v1/cars/:id", (req, res) => {
  //select * from fsw2 where id="1" or NAME = "Yogi"
  const id = req.params.id *1;
  console.log(id);
  
  const car = cars.find((i) => i.id === id)

  //salah satu basic error handling
  if(!car){
    return res.status(404).json({
      status: "Failed",
      message: `Failed get car data this id : ${id}`,
      isSuccess: false,
      data: null,
      });
  }

  res.status(200).json({
    status: "Success",
    message: "Success get car data by id",
    isSuccess: true,
    data: {
      car,
    },
    });
});

app.patch("/api/v1/cars/:id", (req, res) => {
  //UPDATE ... FROM =(table) WHERE id=req.param.id
  const id = req.params.id * 1;

  //mencari data by id
  const car = cars.find((i) => i.id === id);
  //mencari index 
  const carIndex = cars.findIndex((i) => i.id === id)

  //update sesuai request bodynya (client/frontend)
  //object assign = menggunakan objek spread operator

  cars[carIndex] = {...cars[carIndex], ...req.body};


  //get new data for response API | sesuai kebutuhan ga harus
  const newCar = cars.find((i) => i.id === id);

  if(!car){
    return res.status(404).json({
      status: "Failed",
      message: "API not exist!!",
  
    })
  }
  //MASUKIN/ REWRITE DATA JSON dalam file
  fs.writeFile(`${__dirname}/assets/data/cars.json`, 
    JSON.stringify(cars), 
    (err) => {
    res.status(201).json({
      status: "Success",
      message: `Success update car data by id: ${id}`,
      isSuccess: true,
      data: {
        newCar
      }
    });
  });
})

//middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi
// membuat middleware = our own middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    Message: "API not exist !!",
  });
});

app.listen("3000", () => {
  console.log("start aplikasi di port 3000");
});
