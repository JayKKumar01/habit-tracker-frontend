import React from "react";
import "../../styles/HabitOverviewGrid.css";
import HabitCard from "./HabitCard";
import { getLocalDateStr } from "../../utils/dateUtils";
import {updateHabitInList} from "../state/habitState";

const HabitOverviewGrid = ({ habits, loading, email, setHabitsFromHabitOverview }) => {
    const localDateStr = getLocalDateStr();

    if (loading) {
        return (
            <div className="habit-overview-container">
                <h2>📋 Your Habits</h2>
                <p style={{ marginTop: "1rem", fontStyle: "italic" }}>Loading habits...</p>
            </div>
        );
    }

    const activeHabits = habits.filter(
        (habit) => !habit.endDate || habit.endDate > localDateStr
    );

    function updateHabit(id, endDate) {
        setHabitsFromHabitOverview(prev => updateHabitInList(prev, id, { endDate }));
    }


    return (
        <div className="habit-overview-container">
            <h2>📋 Your Habits</h2>
            <div className="habit-scroll-row">
                {activeHabits.length > 0 ? (
                    activeHabits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            email={email}
                            onUpdate={updateHabit}
                        />
                    ))
                ) : (
                    <p style={{ marginTop: "1rem" }}>No active habits to show.</p>
                )}
            </div>
        </div>
    );
};

export default HabitOverviewGrid;
