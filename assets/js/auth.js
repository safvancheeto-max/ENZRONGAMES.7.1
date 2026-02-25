const Auth = {
    init() {
        this.updateAuthUI();
        this.checkSession();
    },

    signup(username, email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) {
            return { success: false, message: "Email already exists" };
        }

        const newUser = {
            id: Date.now(),
            username,
            email,
            password, // In a real app, this would be hashed
            xp: 0,
            level: 1,
            badges: ['Newbie'],
            joinedDate: new Date().toLocaleDateString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        this.login(email, password);
        return { success: true };
    },

    login(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true };
        }
        return { success: false, message: "Invalid credentials" };
    },

    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    },

    updateAuthUI() {
        const authSection = document.getElementById('auth-nav');
        if (!authSection) return;

        const user = this.getCurrentUser();
        if (user) {
            authSection.innerHTML = `
                <div class="user-menu-wrap">
                    <a href="profile.html" class="user-profile-link">
                        <i class="fas fa-user-circle"></i> ${user.username}
                        <span class="user-lvl">LVL ${user.level}</span>
                    </a>
                    <button onclick="Auth.logout()" class="btn btn-outline small ml-3">LOGOUT</button>
                </div>
            `;
        }
    },

    checkSession() {
        // Daily reward check
        const user = this.getCurrentUser();
        if (user) {
            const today = new Date().toLocaleDateString();
            if (user.lastRewardDate !== today) {
                // Show reward notification placeholder
                console.log("Daily Reward Available!");
            }
        }
    }
};

// Initialize
Auth.init();
window.Auth = Auth;
