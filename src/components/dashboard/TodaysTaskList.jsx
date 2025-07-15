import React from "react";
import "../../styles/TodaysTaskList.css";

const TodaysTaskList = ({ habits }) => {
    const isEmpty = !habits || habits.length === 0;

    return (
        <div className="todays-task-card">
            <h2>✅ Today's Tasks</h2>

            {isEmpty ? (
                <div className="empty-task-placeholder">
                    <p className="no-habit-text">You haven’t added any habits yet.</p>
                    <button className="add-habit-btn-today">➕ Add Your First Habit</button>
                </div>
            ) : (
                <div className="task-list-wrapper">
                    <ul className="task-list">
                        {habits.map((habit) => (
                            <li
                                key={habit.id}
                                className={habit.completedToday ? "task done" : "task pending"}
                            >
                                {habit.title} {habit.completedToday ? "✅" : "❌"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TodaysTaskList;
