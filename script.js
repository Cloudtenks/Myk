// Training Dashboard JavaScript Functionality

// Global variables
let currentWeekOffset = 0;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let improvementVotes = [23, 18, 15, 7];

// Schedule data structure
const scheduleData = {
    timeSlots: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    sessions: {
        0: { // Week offset 0 (current week)
            'Monday': {
                '09:00': { title: 'IT Fundamentals', trainer: 'Sarah Johnson', type: 'lecture' },
                '11:00': { title: 'Ticketing Systems', trainer: 'Mike Chen', type: 'workshop' },
                '14:00': { title: 'Communication Skills', trainer: 'Lisa Rodriguez', type: 'workshop' }
            },
            'Tuesday': {
                '10:00': { title: 'Network Basics', trainer: 'David Kim', type: 'lecture' },
                '13:00': { title: 'Hands-on Lab', trainer: 'Sarah Johnson', type: 'lab' },
                '15:00': { title: 'Customer Service', trainer: 'Emily Davis', type: 'workshop' }
            },
            'Wednesday': {
                '09:00': { title: 'Security Awareness', trainer: 'Robert Taylor', type: 'lecture' },
                '11:00': { title: 'Incident Management', trainer: 'Mike Chen', type: 'workshop' },
                '16:00': { title: 'Weekly Assessment', trainer: 'Lisa Rodriguez', type: 'assessment' }
            },
            'Thursday': {
                '10:00': { title: 'Software Training', trainer: 'David Kim', type: 'lab' },
                '13:00': { title: 'Problem Solving', trainer: 'Sarah Johnson', type: 'workshop' },
                '15:00': { title: 'Documentation', trainer: 'Emily Davis', type: 'lecture' }
            },
            'Friday': {
                '09:00': { title: 'Project Work', trainer: 'Robert Taylor', type: 'lab' },
                '11:00': { title: 'Peer Review', trainer: 'Multiple', type: 'workshop' },
                '14:00': { title: 'Weekly Recap', trainer: 'Lisa Rodriguez', type: 'lecture' }
            }
        },
        1: { // Next week
            'Monday': {
                '09:00': { title: 'Advanced Troubleshooting', trainer: 'Mike Chen', type: 'lecture' },
                '11:00': { title: 'ITIL Framework', trainer: 'Sarah Johnson', type: 'workshop' },
                '14:00': { title: 'Change Management', trainer: 'David Kim', type: 'workshop' }
            },
            'Tuesday': {
                '10:00': { title: 'Database Basics', trainer: 'Emily Davis', type: 'lecture' },
                '13:00': { title: 'SQL Lab', trainer: 'Robert Taylor', type: 'lab' },
                '15:00': { title: 'Reporting Tools', trainer: 'Lisa Rodriguez', type: 'workshop' }
            },
            'Wednesday': {
                '09:00': { title: 'Cloud Computing', trainer: 'David Kim', type: 'lecture' },
                '11:00': { title: 'AWS Basics', trainer: 'Mike Chen', type: 'lab' },
                '16:00': { title: 'Mid-term Assessment', trainer: 'Sarah Johnson', type: 'assessment' }
            },
            'Thursday': {
                '10:00': { title: 'Mobile Support', trainer: 'Emily Davis', type: 'workshop' },
                '13:00': { title: 'Remote Access', trainer: 'Robert Taylor', type: 'lab' },
                '15:00': { title: 'VPN Configuration', trainer: 'David Kim', type: 'workshop' }
            },
            'Friday': {
                '09:00': { title: 'Capstone Project', trainer: 'Multiple', type: 'lab' },
                '11:00': { title: 'Presentation Skills', trainer: 'Lisa Rodriguez', type: 'workshop' },
                '14:00': { title: 'Career Development', trainer: 'Sarah Johnson', type: 'lecture' }
            }
        }
    }
};

// Calendar events data
const calendarEvents = {
    2024: {
        0: { // January
            15: ['New Hire Orientation'],
            17: ['Security Training'],
            22: ['Team Building Workshop'],
            29: ['Monthly Assessment']
        },
        1: { // February
            5: ['Advanced SQL Workshop'],
            12: ['Customer Service Training'],
            19: ['Certification Exam'],
            26: ['Performance Review']
        }
    }
};

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSchedule();
    initializeCalendar();
    initializeModalEvents();
});

// Schedule Functions
function initializeSchedule() {
    updateScheduleDisplay();
}

function updateScheduleDisplay() {
    const scheduleBody = document.getElementById('scheduleBody');
    const timeSlots = scheduleData.timeSlots;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const currentWeekData = scheduleData.sessions[currentWeekOffset] || {};
    
    scheduleBody.innerHTML = '';
    
    timeSlots.forEach(time => {
        const row = document.createElement('div');
        row.className = 'schedule-row';
        
        // Time slot
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        row.appendChild(timeSlot);
        
        // Day slots
        days.forEach(day => {
            const slot = document.createElement('div');
            slot.className = 'session-slot';
            
            const dayData = currentWeekData[day];
            if (dayData && dayData[time]) {
                const session = dayData[time];
                const sessionDiv = document.createElement('div');
                sessionDiv.className = `session ${session.type}`;
                sessionDiv.innerHTML = `
                    <div class="session-title">${session.title}</div>
                    <div class="session-trainer">${session.trainer}</div>
                `;
                sessionDiv.addEventListener('click', () => showSessionDetails(session));
                slot.appendChild(sessionDiv);
            }
            
            row.appendChild(slot);
        });
        
        scheduleBody.appendChild(row);
    });
    
    updateWeekDisplay();
}

function updateWeekDisplay() {
    const currentWeekElement = document.querySelector('.current-week');
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + (currentWeekOffset * 7));
    
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(baseDate.getDate() - baseDate.getDay() + 1); // Monday
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday
    
    const options = { month: 'long', day: 'numeric' };
    const startStr = startOfWeek.toLocaleDateString('en-US', options);
    const endStr = endOfWeek.toLocaleDateString('en-US', options);
    const year = startOfWeek.getFullYear();
    
    currentWeekElement.textContent = `Week of ${startStr} - ${endStr}, ${year}`;
}

function previousWeek() {
    currentWeekOffset--;
    updateScheduleDisplay();
}

function nextWeek() {
    currentWeekOffset++;
    updateScheduleDisplay();
}

function showSessionDetails(session) {
    alert(`Session: ${session.title}\nTrainer: ${session.trainer}\nType: ${session.type.charAt(0).toUpperCase() + session.type.slice(1)}`);
}

// Calendar Functions
function initializeCalendar() {
    updateCalendarDisplay();
}

function updateCalendarDisplay() {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Update month display
    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'calendar-header';
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        header.appendChild(dayHeader);
    });
    calendarGrid.appendChild(header);
    
    // Create calendar body
    const body = document.createElement('div');
    body.className = 'calendar-body';
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    for (let i = 0; i < 42; i++) { // 6 weeks
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (date.getMonth() !== currentMonth) {
            dayElement.classList.add('other-month');
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);
        
        // Check for events
        const events = getEventsForDate(date);
        if (events.length > 0) {
            dayElement.classList.add('has-event');
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-indicator';
                eventElement.textContent = event.substring(0, 10) + (event.length > 10 ? '...' : '');
                eventElement.title = event;
                dayElement.appendChild(eventElement);
            });
        }
        
        body.appendChild(dayElement);
    }
    
    calendarGrid.appendChild(body);
}

function getEventsForDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    if (calendarEvents[year] && calendarEvents[year][month] && calendarEvents[year][month][day]) {
        return calendarEvents[year][month][day];
    }
    
    return [];
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendarDisplay();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendarDisplay();
}

// Improvement Functions
function voteImprovement(index) {
    improvementVotes[index - 1]++;
    const voteElement = document.querySelector(`.improvements-grid .improvement-card:nth-child(${index}) .vote-count`);
    if (voteElement) {
        voteElement.textContent = improvementVotes[index - 1];
    }
    
    // Add visual feedback
    const voteBtn = document.querySelector(`.improvements-grid .improvement-card:nth-child(${index}) .vote-btn`);
    if (voteBtn) {
        voteBtn.style.background = '#27ae60';
        voteBtn.style.color = 'white';
        setTimeout(() => {
            voteBtn.style.background = '';
            voteBtn.style.color = '';
        }, 1000);
    }
}

// Modal Functions
function initializeModalEvents() {
    const modal = document.getElementById('suggestionModal');
    const form = document.getElementById('suggestionForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSuggestionSubmit();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAddSuggestionModal();
        }
    });
}

function showAddSuggestionModal() {
    const modal = document.getElementById('suggestionModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAddSuggestionModal() {
    const modal = document.getElementById('suggestionModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('suggestionForm').reset();
}

function handleSuggestionSubmit() {
    const title = document.getElementById('suggestionTitle').value;
    const description = document.getElementById('suggestionDescription').value;
    const priority = document.getElementById('suggestionPriority').value;
    
    // Create new improvement card
    const improvementsGrid = document.querySelector('.improvements-grid');
    const addNewCard = document.querySelector('.improvement-card.add-new');
    
    const newCard = document.createElement('div');
    newCard.className = 'improvement-card';
    newCard.innerHTML = `
        <div class="improvement-header">
            <h3>${title}</h3>
            <span class="priority-badge ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
        </div>
        <p>${description}</p>
        <div class="improvement-actions">
            <button class="vote-btn" onclick="voteNewImprovement(this)">
                <span class="vote-icon">👍</span>
                <span class="vote-count">1</span>
            </button>
            <span class="improvement-status">New</span>
        </div>
    `;
    
    improvementsGrid.insertBefore(newCard, addNewCard);
    
    closeAddSuggestionModal();
    
    // Show success message
    showNotification('Your suggestion has been submitted successfully!');
}

function voteNewImprovement(button) {
    const voteCount = button.querySelector('.vote-count');
    let currentVotes = parseInt(voteCount.textContent);
    currentVotes++;
    voteCount.textContent = currentVotes;
    
    // Visual feedback
    button.style.background = '#27ae60';
    button.style.color = 'white';
    setTimeout(() => {
        button.style.background = '';
        button.style.color = '';
    }, 1000);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(39, 174, 96, 0.3);
        z-index: 1001;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility Functions
function animateMetrics() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    metricNumbers.forEach(number => {
        const finalValue = parseInt(number.textContent);
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current);
        }, 16);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateMetrics, 500);
});

// Add smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape') {
        closeAddSuggestionModal();
    }
    
    // Arrow keys for calendar navigation
    if (e.altKey) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousMonth();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextMonth();
        }
    }
    
    // Arrow keys for schedule navigation
    if (e.ctrlKey) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousWeek();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextWeek();
        }
    }
});