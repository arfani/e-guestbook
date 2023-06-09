import { useEffect, useState } from "react";

export const useDateTime = () => {
    const locale = 'id';
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

    useEffect(() => {
        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDateTime hook.
            setDate(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const month = `${today.toLocaleDateString(locale, { month: 'long' })}`;
    const year = `${today.toLocaleDateString(locale, { year: 'numeric' })}`;
    const date = `${day}, ${today.getDate()} ${month} ${year}`;

    const hour = today.getHours();
    const wish = `Selamat ${(hour < 10 && 'Pagi') || (hour < 16 && 'Siang') || (hour < 18 && 'Sore') || 'Malam'}`;

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    return {
        date,
        time,
        wish,
    };
};