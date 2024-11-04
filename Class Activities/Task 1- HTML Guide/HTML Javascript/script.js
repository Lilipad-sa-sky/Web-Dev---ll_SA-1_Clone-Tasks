function displayTime() {
    const currentTime = new Date().toLocaleTimeString(); // Get current time
    document.getElementById('timeDisplay').textContent = 'Current Time: ' + currentTime;
}
