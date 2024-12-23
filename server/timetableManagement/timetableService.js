const db = require('../database/dbInit'); 
const admin = require('firebase-admin');

const saveSchedule = async (req, res) => {
    const { userId, schedule, startTime, hourDuration, breakDuration } = req.body;
    
    try {
      await db.collection('schedules').doc(userId).set({
        schedule: schedule,
        startTime: startTime,
        hourDuration: hourDuration,
        breakDuration: breakDuration,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.status(200).send({ message: 'Orar salvat cu succes!' });
    } catch (error) {
      res.status(500).send({ error: 'A apărut o eroare la salvarea orarului.' });
      console.error('Eroare la salvarea orarului:', error);
    }
  };
  
  const loadSchedule = async (req, res) => {
    const userId = req.params.userId;
   
    try {
      const doc = await db.collection('schedules').doc(userId).get();
     
      if (!doc.exists) {
        return res.status(404).send({ message: 'No schedule found for this user' });
      }
     
      const scheduleData = doc.data();
     
      res.status(200).send({
        schedule: scheduleData.schedule,
        timeConfig: {
          startTime: scheduleData.startTime,
          hourDuration: scheduleData.hourDuration,
          breakDuration: scheduleData.breakDuration
        }
      });
    } catch (error) {
      console.error('Error loading schedule:', error);
      res.status(500).send({ error: 'A apărut o eroare la încărcarea orarului.' });
    }
  };

  const deleteSubject = async (req, res) => {
    const { userId, day, index } = req.body;
  
    try {
      const userDocRef = db.collection('schedules').doc(userId);
      const doc = await userDocRef.get();
  
      if (!doc.exists) {
        return res.status(404).send({ message: 'Orarul nu există pentru acest utilizator.' });
      }
  
      const scheduleData = doc.data().schedule;
      
      if (scheduleData[day]) {
        scheduleData[day][index] = ''; 
      }
  
      await userDocRef.update({ schedule: scheduleData });
      res.status(200).send({ message: 'Materia a fost ștearsă cu succes!' });
    } catch (error) {
      console.error('Eroare la ștergerea materiei:', error);
      res.status(500).send({ error: 'A apărut o eroare la ștergerea materiei.' });
    }
  };
  
  module.exports = { saveSchedule, loadSchedule, deleteSubject };
  