const toggleSidebar = document.getElementById('toggleSidebar');
        const sideMenu = document.getElementById('sideMenu');
        const howToStartSection = document.getElementById('howToStartSection');
        const stop_music = document.getElementById('stop_music');
        const stop_interact = document.getElementById('stop_interact');
        const back_meet = document.getElementById('back_meet');
        const everything_stuck = document.getElementById('everything_stuck');




        const hide_media_contorl_Section = document.getElementById('hide_media_contorl');

        const startMeetingSection = document.getElementById('startMeetingSection');
        const howToStartButton = document.getElementById('howToStart');
        const startMeetingButton = document.getElementById('startMeeting');
        const hide_media_contorl_Button = document.getElementById('hidebutton');
        const stop_musicbtn = document.getElementById('stop_musicbtn');
        const stop_interactbtn = document.getElementById('stop_interactbtn');
        const back_meetbtn = document.getElementById('back_meetbtn');
        const everything_stuckbtn = document.getElementById('everything_stuckbtn');



// Function to redirect to app2.html
function redirectToFunApp() {
    window.location.href = 'app/app2.html'; // Redirect to the specified URL
}

// Attach click event listener to the fun button
document.getElementById('funButton').addEventListener('click', redirectToFunApp);



        const configButton = document.getElementById('configButton');
        const configModal = document.getElementById('configModal');
        const closeButton = document.getElementById('closeButton');
        const saveButton = document.getElementById('saveButton');
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notificationMessage');
        sideMenu.classList.toggle('-translate-x-full');

        // Toggle the sidebar visibility
        toggleSidebar.addEventListener('click', () => {
            sideMenu.classList.toggle('-translate-x-full');
        });

        everything_stuckbtn.addEventListener('click', () => {
            everything_stuck.classList.remove('hidden');
            startMeetingSection.classList.add('hidden');
            hide_media_contorl_Section.classList.add('hidden');
            stop_music.classList.add('hidden');
            stop_interact.classList.add('hidden');
            back_meet.classList.add('hidden');
            howToStartSection.classList.add('hidden');




        });

        // Show the "How to Start" section and hide others
        howToStartButton.addEventListener('click', () => {
            howToStartSection.classList.remove('hidden');
            startMeetingSection.classList.add('hidden');
            hide_media_contorl_Section.classList.add('hidden');
            stop_music.classList.add('hidden');
            stop_interact.classList.add('hidden');
            back_meet.classList.add('hidden');
            everything_stuck.classList.add('hidden');




        });

        // Show the "Start Meeting" section and hide others
        startMeetingButton.addEventListener('click', () => {
            startMeetingSection.classList.remove('hidden');
            howToStartSection.classList.add('hidden');
            hide_media_contorl_Section.classList.add('hidden');
            stop_music.classList.add('hidden');
            stop_interact.classList.add('hidden');
            back_meet.classList.add('hidden');
            everything_stuck.classList.add('hidden');

            


        });

        hide_media_contorl_Button.addEventListener('click', () => {
            hide_media_contorl_Section.classList.remove('hidden');
            howToStartSection.classList.add('hidden');
            startMeetingSection.classList.add('hidden');
            stop_music.classList.add('hidden');
            stop_interact.classList.add('hidden');
            back_meet.classList.add('hidden');
            everything_stuck.classList.add('hidden');




        });
        stop_musicbtn.addEventListener('click', () => {
            stop_music.classList.remove('hidden');
            howToStartSection.classList.add('hidden');
            startMeetingSection.classList.add('hidden');
            hide_media_contorl_Section.classList.add('hidden');
            stop_interact.classList.add('hidden');
            back_meet.classList.add('hidden');
            everything_stuck.classList.add('hidden');




        });

        stop_interactbtn.addEventListener('click', () => {
            stop_interact.classList.remove('hidden');
            howToStartSection.classList.add('hidden');
            startMeetingSection.classList.add('hidden');
            stop_music.classList.add('hidden');
            hide_media_contorl_Section.classList.add('hidden');
            back_meet.classList.add('hidden');
            everything_stuck.classList.add('hidden');


        });

        back_meetbtn.addEventListener('click', () => {
            back_meet.classList.remove('hidden');
            howToStartSection.classList.add('hidden');
            startMeetingSection.classList.add('hidden');
            stop_music.classList.add('hidden');
            hide_media_contorl_Section.classList.add('hidden');
            stop_interact.classList.add('hidden');
            everything_stuck.classList.add('hidden');


        });

        // Toggle the configuration modal visibility
        configButton.addEventListener('click', () => {
            configModal.classList.toggle('hidden');
        });

        // Close the configuration modal
        closeButton.addEventListener('click', () => {
            configModal.classList.add('hidden');
        });

        // Save the configuration and show a notification
        // Function to set a cookie
        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/"; // Path set to root
        }

        // Event listener for the save button
        saveButton.addEventListener('click', () => {
            const apiKey = document.getElementById('apiKeyInput').value;
            const videoId = document.getElementById('videoIdInput').value;
            const chatId = document.getElementById('chatIdInput').value;
            const channelId = document.getElementById('channelIdInput').value;

            // Set cookies for the configuration data
            setCookie('apiKey', apiKey);
            setCookie('videoId', videoId);
            setCookie('chatId', chatId);
            setCookie('channelId', channelId);

            // Notify user of successful save
            notificationMessage.textContent = "Configuration saved successfully!";
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
            configModal.classList.add('hidden');
        });

        // Show the instructions when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            howToStartSection.classList.remove('hidden');
            startMeetingSection.classList.add('hidden');
        });


        // Toggle Dropdown Menu
        document.getElementById('profileButton').addEventListener('click', function () {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.classList.toggle('hidden');
        });

        // Logout Functionality
        document.getElementById('logoutButton').addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default button behavior

            // Destroy all cookies
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c.split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            });


            notificationMessage.textContent = "You have been logged out.";
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
            configModal.classList.add('hidden');

            window.location.reload(); // Refresh the page
        });

        // Close the dropdown if clicked outside of it
        window.addEventListener('click', function (event) {
            const dropdown = document.getElementById('profileDropdown');
            const profileButton = document.getElementById('profileButton');

            if (!profileButton.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });


        apps.addEventListener('click', () => {
            window.location.href = 'app/app.html';
        });

        function openNewTab() {
            window.open('https://s-hadowheart.carrd.co', '_blank');
          }
