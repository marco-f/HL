document.addEventListener('DOMContentLoaded', () => {
        if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                        navigator.serviceWorker.register('/service-worker.js')
                                .then((registration) => {
                                        console.log('Service Worker successfully registered:', registration)
                                })
                                .catch((error) => {
                                        console.log('Service Worker Registration Failed:', error)
                                })
                })
        }
})
