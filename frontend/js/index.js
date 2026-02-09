     const chatWindow = document.getElementById('chat-window');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');

        // Fungsi Render Pesan Baru
        function appendMessage(text, type) {
            const wrapper = document.createElement('div');
            wrapper.className = `message-wrapper ${type}`;

            // Avatar Logic
            let avatarHTML = '';
            if (type === 'ai') {
                avatarHTML = `
                <div class="msg-avatar ai-avatar-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z"/><path d="M12 8v4l3 3"/></svg>
                </div>`;
            } else {
                avatarHTML = `
                <div class="msg-avatar user-avatar-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>`;
            }

            // Isi Pesan
            wrapper.innerHTML = `
                ${type === 'ai' ? avatarHTML : ''}
                <div class="message-bubble">${text}</div>
                ${type === 'user' ? avatarHTML : ''}
            `;

            chatWindow.appendChild(wrapper);
            chatWindow.scrollTop = chatWindow.scrollHeight;
            return wrapper.querySelector('.message-bubble'); // Return elemen bubble untuk dimanipulasi (misal loading)
        }

        async function handleSend() {
            const message = userInput.value.trim();
            if (!message) return;

            // 1. Tampilkan Chat User
            appendMessage(message, 'user');
            userInput.value = '';
            
            // 2. Loading State
            sendBtn.disabled = true;
            // Buat bubble loading dummy
            const loadingWrapper = document.createElement('div');
            loadingWrapper.className = 'message-wrapper ai';
            loadingWrapper.innerHTML = `
                <div class="msg-avatar ai-avatar-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z"/><path d="M12 8v4l3 3"/></svg>
                </div>
                <div class="message-bubble loading-dots">SmartDocs berpikir</div>
            `;
            chatWindow.appendChild(loadingWrapper);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            try {
                // 3. Tembak API
                const response = await fetch('http://127.0.0.1:8000/api/v1/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: message })
                });

                const data = await response.json();
                
                // 4. Hapus Loading & Tampilkan Jawaban
                loadingWrapper.remove();
                appendMessage(data.answer || "Maaf, saya bingung.", "ai");

            } catch (error) {
                loadingWrapper.remove();
                appendMessage("❌ Gagal terhubung ke Backend (Cek terminal Uvicorn!)", "ai");
                console.error(error);
            } finally {
                sendBtn.disabled = false;
                userInput.focus();
            }
        }

        sendBtn.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });