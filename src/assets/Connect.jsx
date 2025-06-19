export const handleEmailClick = () => {
    // Detect mobile device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iPad|iPhone|iPod|mobile/i.test(userAgent);

    // Define email and links
    const email = 'prakashkr2894@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Prakash,\nI saw your portfolio and would like to connect...')}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Prakash,\nI saw your portfolio and would like to connect...')}`;

    // Choose link based on device
    const link = isMobile ? mailtoLink : gmailLink;

    // Open link in a new tab/window
    window.open(link, '_blank', 'noopener,noreferrer');
};