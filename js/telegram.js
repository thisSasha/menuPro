const botToken = '7277364807:AAElZRGHu0T7RXfTHqvNJq6RjqkldVKXL5o';
const chatIds = ['1818025468'];

export function sendBot(message) {
    chatIds.forEach(chatId => {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const params = {
            chat_id: chatId,
            text: message
        };
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(params));
    });
};


