export const handleEmailClick = () => {
    
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iPad|iPhone|iPod|mobile/i.test(userAgent);

    
    const email = 'prakashkr2894@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Prakash,\nI saw your portfolio and would like to connect...')}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Prakash,\nI saw your portfolio and would like to connect...')}`;

    
    const link = isMobile ? mailtoLink : gmailLink;

    
    window.open(link, '_blank', 'noopener,noreferrer');
};