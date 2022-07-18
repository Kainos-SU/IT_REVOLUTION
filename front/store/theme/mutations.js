export default {
    toggle_theme (state) {
        state.dark_theme = state.dark_theme;
        window.localStorage.setItem("theme", state.dark_theme ? "dark" : "light");
    },

    set_theme(state) {
        const userTheme = window.localStorage.getItem("theme");
        if (userTheme === null) {
            window.localStorage.setItem("theme", "light");
            state.dark_theme = false;
            return;
        }
        state.dark_theme = userTheme === "dark" ? true : false;
    }
};