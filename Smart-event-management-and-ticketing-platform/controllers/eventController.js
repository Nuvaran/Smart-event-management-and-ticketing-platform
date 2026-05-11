const Event = require(`../models/event`);

exports.getAllEvents = async(req,res) =>{
    try {
        const events = await Event.find();
        res.render(`index` , {events});

    } catch (error) {
        res.status(500).send("Error loading events");
    }
}

exports.createEvent = async (req,res) =>{
    try{
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.redirect(`/admin/dashboard`);

    } catch (error){
        res.status(500).send("Error creating event");
    }
}