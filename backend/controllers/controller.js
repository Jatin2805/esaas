const { default: mongoose } = require('mongoose');
const Workout = require('../model/workout'); 
const getcategory = async(req,res)=>{
    const {categoryname} = req.params;
    try {
    const workouts = await Workout.find({ category: categoryname }).sort({ createdAt: -1 });

    if (workouts.length === 0) {
      return res.status(404).json({ error: "No workouts found in this category" });
    }

    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getallworkout = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getworkout = async (req, res) => {
  const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const createworkout = async (req, res) => {
  const { title, reps, load ,category} = req.body;

  try {
    const workout = await Workout.create({ title, reps, load  ,category });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteworkout = async (req, res) => {
  const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({ _id:id});
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }
    
    res.status(200).json({ message: 'Workout deleted successfully' });
}
const updateworkout = async (req,res)=>{
    const {id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndUpdate({ _id:id},{

        ...req.body 
    }, { new: true })
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }
    
    res.status(200).json(workout);
}



module.exports = {
  getworkout,
  getallworkout,
  createworkout,
  deleteworkout,
  updateworkout,
  getcategory,
};
