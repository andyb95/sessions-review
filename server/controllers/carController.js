module.exports = {
  getAllCars: async (req, res) => {
    const db = req.app.get('db')

    try{
      const cars = await db.get_all_cars()
  
      res.status(200).send(cars)

    } catch (error) {

      console.log(error)
      res.status(500).send("couldn't retrieve cars")
    }

  },

  getCarById: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    const car = await db.get_car_by_id([id])
    if (car[0]){
      res.status(200).send(car[0])
    } else {
      res.status(404).send("Couldn't find car")
    }

    res.status(200).send(car[0])
  },

  addCar: async (req, res) => {
    const db = req.app.get('db')
    const {make, model, year, miles, color} = req.body
      
    const newCar = await db.create_car({make, model, year, miles, color})

    res.status(200).send(newCar[0])
  },
  
  deleteCar: async(req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    try{
      await db.delete_car_by_id([id])
      res.status(200).send('Car deleted')

    } catch (error {
      res.status(404).send("couldn't delete car")
    })
  },
}
