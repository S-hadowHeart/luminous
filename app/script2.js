   
          // Function to get a cookie value
          function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
    
        // Retrieve values from cookies
        const API_KEY = "AIzaSyAOf49NbII0E2O_iDA4njaCt3ANOJBJPNk";
        const VIDEO_ID = 'OO2kPK5-qno';
        const CHANNEL_ID = getCookie('channelId');
        const LIVE_CHAT_ID = getCookie('chatId');
    
    
            const playPauseButton = document.getElementById('playPauseButton');
            const playPauseBtn = document.getElementById('playPauseBtn');
            const audioElement = document.getElementById('chillhop-audio');
    
            const volumeButton = document.getElementById('volumeButton');
            const pauseOverlay = document.getElementById('pauseOverlay');
            const jitsiMeetFrame = document.getElementById('jitsiMeetFrame');
    
            const notification = document.getElementById('notification');
            const notificationMessage = document.getElementById('notificationMessage');
    
            // Toggle fullscreen mode for the Jitsi Meet container
            const fullscreenButton = document.getElementById('fullscreenButton');
            const container = document.querySelector('.aspect-video'); // The parent container of the video
    
            fullscreenButton.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.mozRequestFullScreen) { // Firefox
                        container.mozRequestFullScreen();
                    } else if (container.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                        container.webkitRequestFullscreen();
                    } else if (container.msRequestFullscreen) { // IE/Edge
                        container.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            });
    
    
            let youtubePlayer;
            let jitsiApi;
            let vol = false;
            let isPlaying = false;
            
            // media controls hide/show 
            const moreButton = document.getElementById('moreButton');
            const mediaControls = document.querySelector('.media-controls'); // Select your media controls container
            
    
           
    
            const videoContainer = document.getElementById('video-container');
            const suggestedVideosContainer = document.getElementById('suggested-videos');
            const iframe = document.getElementById('jitsiMeetFrame');
            const categories = ['lofi music', 'study with me', 'focus music'];
            let currentUrl = 'https://web.webex.com/meetings'; // Store current iframe URL
    
            // Shuffle function to randomize the video array
            
                addVideoLinkEventListeners(); // Add event listeners to suggested videos
            
    
            // Add click event listeners to video links
            function addVideoLinkEventListeners() {
                if (!mediaControls.classList.contains('hidden')) {
                    mediaControls.classList.add('hidden');
                }
    
                const videoLinks = document.querySelectorAll('.video-link');
                videoLinks.forEach(link => {
                    link.addEventListener('click', (event) => {
                        event.preventDefault();
                        const videoId = event.currentTarget.getAttribute('data-video-id');
                        fetchVideoDetails(videoId);
                        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                        if (!audioElement.muted) {
                            audioElement.muted = !audioElement.muted;
                            volumeIcon.classList.remove('ri-volume-up-fill');
                            volumeIcon.classList.add('ri-volume-mute-fill');
                        }
                    });
                });
            }
    
            // Handle click event for going back to Webex meeting
            document.getElementById('backToWebex').addEventListener('click', () => {
                iframe.src = currentUrl;
                if (mediaControls.classList.contains('hidden')) {
                    mediaControls.classList.remove('hidden');
                }
                if (audioElement.muted) {
                    audioElement.muted = !audioElement.muted;
                    volumeIcon.classList.remove('ri-volume-mute-fill');
                    volumeIcon.classList.add('ri-volume-up-fill');
                    
                }
                fetchVideoDetails(VIDEO_ID)
                
     
    
            });
    
            
    
    
            moreButton.addEventListener('click', () => {
                mediaControls.classList.toggle('hidden'); // Toggle the hidden class to show/hide the controls
            });
    
    
    
    function onPlayerStateChange() {
        // Check if the audio is playing or not
        if (isPlaying) {
          playPauseButton.innerHTML = '<i class="ri-pause-fill text-2xl"></i>';
          pauseOverlay.classList.add('hidden');
        } else {
          playPauseButton.innerHTML = '<i class="ri-play-fill text-2xl"></i>';
          if (!audioElement.muted) {
            pauseOverlay.classList.remove('hidden');
          }
        }
      }
      
      
      
      

            
    async function getRandomWord() {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=2');
        const words = await response.json();
        return words;
    }
    
    async function getRandomTitleAndChannel() {
        const words = await getRandomWord();
        
        const title = `The ${words[0]} ${words[1]} Adventure`;
        const channel = `${words[0]} ${words[1]} Society`;
    
        return { title, channel };
    }
    
    async function fetchVideoDetails(videoId) {
        const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.error) {
                throw new Error(data.error);
            }
    
            document.getElementById('videoTitle').textContent = data.title;
            document.getElementById('channelName').textContent = data.author_name;
            document.getElementById('channelAvatar').src = data.thumbnail_url;
    
            document.getElementById('viewerCount').textContent = `${Math.floor(Math.random() * 50000) + 5000} views`;
            document.getElementById('likeCount').textContent = `${Math.floor(Math.random() * 10000) + 1000} likes`;
            document.getElementById('subscriberCount').textContent = `${Math.floor(Math.random() * 20000) + 5000} subscribers`;
    
        } catch (error) {
            console.error("Error fetching video details: ", error);
            
            // Get random avatar
            const randomAvatar = await getRandomAvatar(); 
            
            // Get random title and channel name
            const { title, channel } = await getRandomTitleAndChannel();
    
            document.getElementById('videoTitle').textContent = title;
            document.getElementById('channelName').textContent = channel;
            document.getElementById('channelAvatar').src = randomAvatar;
    
            document.getElementById('viewerCount').textContent = `${Math.floor(Math.random() * 500) + 100} watching live`;
            document.getElementById('likeCount').textContent = `${Math.floor(Math.random() * 10000) + 500} likes`;
            document.getElementById('subscriberCount').textContent = `${Math.floor(Math.random() * 20000) + 5000} subscribers`;
        }
    }
    
    
            // Fetch channel details
            async function fetchChannelDetails(CHANNEL_ID) {
                const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    const channel = data.items[0];
                    console.log(channel.snippet.title);
                    document.getElementById('channelName').textContent = channel.snippet.title;
                    document.getElementById('subscriberCount').textContent = `${channel.statistics.subscriberCount} subscribers`;
                    document.getElementById('channelAvatar').src = channel.snippet.thumbnails.default.url;
                } catch (error) {
                    console.error('Error fetching channel details:', error);
                }
            }
    
            // Fetch live chat messages
            async function fetchLiveChat(LIVE_CHAT_ID) {
                const url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${LIVE_CHAT_ID}&part=snippet,authorDetails&key=${API_KEY}`;
    
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    const  chatContainer = document.getElementById('live-chat');
                    
                    data.items.forEach(message => {
                        const chatMessage = document.createElement('div');
                        chatMessage.className = 'bg-gray-800 p-2 rounded';
                        chatMessage.innerHTML = `<strong>${message.authorDetails.displayName}:</strong> ${message.snippet.displayMessage}`;
                        chatContainer.appendChild(chatMessage);
                    });
                    
                    // Auto-scroll to the bottom
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                } catch (error) {
                    console.error('Error fetching live chat messages:', error);
                }
            }
    
            // Toggle CC menu and Jitsi Meet interaction
            const ccButton = document.getElementById('ccButton');
            const ccMenu = document.getElementById('ccMenu');
            const jitsiOverlay = document.getElementById('jitsiOverlay');
    
            ccButton.addEventListener('click', () => {
                ccMenu.classList.toggle('hidden');
                jitsiOverlay.classList.toggle('hidden');
            });
    
            // Handle CC options
            const ccOptions = document.querySelectorAll('input[name="cc"]');
            ccOptions.forEach(option => {
                option.addEventListener('change', (e) => {
                    if (e.target.id === 'cc-off') {
                        jitsiOverlay.classList.add('hidden');
                    } else {
                        jitsiOverlay.classList.remove('hidden');
                    }
                    ccMenu.classList.add('hidden');
                });
            });
    
            // Toggle quality menu
            document.getElementById('qualityButton').addEventListener('click', () => {
                document.getElementById('qualityMenu').classList.toggle('hidden');
            });
    
            // Toggle play/pause
            playPauseButton.addEventListener('click', () => {
                if (audioElement.paused) {
                    audioElement.play();
                    isPlaying = true;
                    playPauseButton.innerHTML = '<i class="ri-pause-fill"></i>';
                } else {
                    audioElement.pause();
                    isPlaying = false;
                    playPauseButton.innerHTML = '<i class="ri-play-fill"></i>';
                }
                onPlayerStateChange();
            });
    
            help.addEventListener('click', () => {
                window.location.href = '../index.html';
            });
    
            // Toggle volume (mute/unmute)
            volumeButton.addEventListener('click', () => {
                audioElement.muted = !audioElement.muted;
                if (audioElement.muted) {
                  volumeIcon.classList.remove('ri-volume-up-fill');
                  volumeIcon.classList.add('ri-volume-mute-fill');
                } else {
                  volumeIcon.classList.remove('ri-volume-mute-fill');
                  volumeIcon.classList.add('ri-volume-up-fill');
                }
              });
    
            // Initial setup
           
            fetchVideoDetails(VIDEO_ID);
            
    
                const qualityOptions = document.querySelectorAll('input[name="quality"]');
                qualityOptions.forEach(option => {
                option.addEventListener('change', (e) => {
                const selectedQuality = e.target.id;
            
            // Remove all blur classes initially
            jitsiMeetFrame.classList.remove('blur-720', 'blur-480');
    
            // Add appropriate blur class based on the selected quality
            if (selectedQuality === 'quality-auto' || selectedQuality === 'quality-1080p') {
                jitsiMeetFrame.classList.remove('blur'); // Remove blur for auto or 1080p
            } else if (selectedQuality === 'quality-720p') {
                jitsiMeetFrame.classList.add('blur-720'); // Add blur for 720p
            } else if (selectedQuality === 'quality-480p') {
                jitsiMeetFrame.classList.add('blur-480'); // Add blur for 480p
            }
        });
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
    
    
                window.location.href = '../index.html'; // Refresh the page
                notificationMessage.textContent = "You have been logged out.";
                notification.classList.remove('hidden');
                setTimeout(() => {
                    notification.classList.add('hidden');
                }, 3000);
                configModal.classList.add('hidden');
    
            });
    
            // Close the dropdown if clicked outside of it
            window.addEventListener('click', function (event) {
                const dropdown = document.getElementById('profileDropdown');
                const profileButton = document.getElementById('profileButton');
    
                if (!profileButton.contains(event.target) && !dropdown.contains(event.target)) {
                    dropdown.classList.add('hidden');
                }
            });
    
    
            document.getElementById('chat-toggle').addEventListener('change', (event) => {
        const chatSection = document.getElementById('live-chat-section');
        const warningMessage = document.getElementById('warning-message');
        const toggleValue = event.target.value;
    
        if (toggleValue === 'on') {
            warningMessage.classList.remove('hidden');
            startChatFunctions();
        } else if (toggleValue === 'hide') {
            chatSection.classList.add('hidden');
            stopChatFunctions();
        } else { // "off" state
            warningMessage.classList.add('hidden');
            stopChatFunctions();
            chatSection.classList.remove('hidden');
        }
    });
    
    function startChatFunctions() {
        fetchLiveChat(LIVE_CHAT_ID);
        fetchVideoDetails(VIDEO_ID);
        window.chatInterval = setInterval(() => {
            fetchLiveChat(LIVE_CHAT_ID);
            fetchVideoDetails(VIDEO_ID);
        }, 10000);
    }
    
    function stopChatFunctions() {
        clearInterval(window.chatInterval);
    }
    
    // Send chat message (same as in the original script)
    document.getElementById('send-chat').addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        const message = input.value;
        if (message) {
            try {
                // Add your logic to send the message to the YouTube API
                const chatContainer = document.getElementById('live-chat');
                const chatMessage = document.createElement('div');
                chatMessage.className = 'bg-gray-800 p-2 rounded';
                chatMessage.innerHTML = `<strong>You:</strong> ${message}`;
                chatContainer.appendChild(chatMessage);
    
                // Auto-scroll to the bottom
                chatContainer.scrollTop = chatContainer.scrollHeight;
                input.value = ''; // Clear the input after sending
            } catch (error) {
                console.error('Error sending chat message:', error);
            }
        }
    });
    
    // Function to handle YouTube URL in the search bar
    document.getElementById('search-bar').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const inputValue = event.target.value.trim();
            const videoId = extractYouTubeVideoId(inputValue);
    
            if (videoId) {
                // Hide media controls if visible
                if (!mediaControls.classList.contains('hidden')) {
                    mediaControls.classList.add('hidden');
                }
                // Update the iframe to play the entered video
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                fetchVideoDetails(videoId);
                if (!audioElement.muted) {
                    audioElement.muted = !audioElement.muted;
                    volumeIcon.classList.remove('ri-volume-up-fill');
                    volumeIcon.classList.add('ri-volume-mute-fill');
                }
            }
        }
    });
    
    // Function to extract YouTube Video ID from different URL formats
    function extractYouTubeVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/(?:\S+\/)?|(?:v|e(?:mbed)?)\/|.*[?&](?:v|video_id)=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    function openNewTab() {
        window.open('https://s-hadowheart.carrd.co', '_blank');
      }
