import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from '@/firebaseConfig'
import moment from "moment-timezone";
import { Timestamp } from "firebase/firestore";

const useReminders = (selectedDate = null) => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const today = moment.tz("Asia/Jakarta").format("YYYY-MM-DD");
        const q = query(
            collection(db, "schedules"),
            where("userId", "==", auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const remindersData = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const startDateMoment = 
                    data.startDate instanceof Timestamp
                        ? moment.tz(data.startDate.toDate(), "Asia/Jakarta")
                        : null;
                const endDateMoment =
                    data.endDate instanceof Timestamp
                        ? moment.tz(data.endDate.toDate(), "Asia/Jakarta")
                        : null;
                
                const startDate = startDateMoment ? startDateMoment.format("YYYY-MM-DD") : null;
                const endDate = endDateMoment ? endDateMoment.format("YYYY-MM-DD") : null;

                // Jika ada selectedDate (untuk Reminder.jsx), gunakan perbandingan berdasarkan selectedDate
                if (selectedDate) {
                    const selectedDateMoment = moment.tz(selectedDate, "Asia/Jakarta");
                    const selectedDateString = selectedDateMoment.startOf("day").format("YYYY-MM-DD");

                    if (startDate && endDate) {
                        if (selectedDateString >= startDate && selectedDateString <= endDate) {
                            remindersData.push({ id: doc.id, ...data });
                        }
                    } else if (startDate && data.forever) {
                        if (selectedDateString >= startDate) {
                            remindersData.push({ id: doc.id, ...data });
                        }
                    }
                } else {
                    // Jika tidak ada selectedDate (untuk Home.jsx), gunakan perbandingan berdasarkan today
                    if (startDate && endDate) {
                        if (today >= startDate && today <= endDate) {
                            remindersData.push({ id: doc.id, ...data });
                        }
                    } else if (startDate && endDate === null) {
                        if (today >= startDate) {
                            remindersData.push({ id: doc.id, ...data });
                        }
                    }
                }
            });

            // Urutkan reminders berdasarkan waktu
            remindersData.sort((a, b) => {
                const allTimesA = a.reminders ? a.reminders.sort() : [];
                const allTimesB = b.reminders ? b.reminders.sort() : [];

                for (let i = 0; i < Math.max(allTimesA.length, allTimesB.length); i++) {
                    const timeA = allTimesA[i] || "";
                    const timeB = allTimesB[i] || "";

                    if (timeA < timeB) return -1;
                    if (timeA > timeB) return 1;
                }

                return 0;
            });

            setReminders(remindersData);
        });

        return () => unsubscribe();
    }, [selectedDate]);

    return reminders;
};

export default useReminders;
