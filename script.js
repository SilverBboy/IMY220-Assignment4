$(() => {
    $('#left').on('click', () => {
        const message = $('#message').val();
        addMessage(message, 'left');
    });

    $('#right').on('click', () => {
        const message = $('#message').val();
        addMessage(message, 'right');
    });

    function addMessage(message, direction) {
        const messageDiv = $('<div></div>');
        const messageP = $(`<p>${message}</p>`);

        messageDiv.append(messageP);
        $('.messages').append(messageDiv);

        messageDiv.addClass(`${direction} col-4 offset-4 message-container`);

        if (isYouTubeLink(message)) {

            const videoId = message.split('v=')[1];
            const link = videoId.split(' ')[0];
            const youtubeLink = `https://www.youtube.com/watch?v=${link}`;
            const youtubeAnchor = `<a href="${youtubeLink}" target="_blank">${youtubeLink}</a>`;
            console.log(youtubeAnchor);
            // Append the anchor tag to the paragraph
            let newText = message.replace(youtubeLink, youtubeAnchor);
            messageP.html(`<p>${newText}</p>`);
            console.log(messageP);

            const ampersandPosition = videoId.indexOf('&');
            if(ampersandPosition != -1) {
                videoId = videoId.substring(0, ampersandPosition);
            }
            const iframe = $(`<iframe height="315" src="https://www.youtube.com/embed/${link}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
            iframe.addClass('col-12');
            messageDiv.append(iframe);
        }

        $('#message').val('');
    }

    function isYouTubeLink(msg) {
        switch (true) {
            case msg.includes('https://www.youtube.com/watch?v='):
            case msg.includes('http://www.youtube.com/watch?v='):
            case msg.includes('https://www.youtube.com/'):
            case msg.includes('https://www.youtu.be/'):
                return true;
            default:
                return false;
        }
    }


});
